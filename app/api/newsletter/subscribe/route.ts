import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    // Validate email
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Trim and lowercase
    const cleanEmail = email.trim().toLowerCase();

    // Validate email format
    if (!EMAIL_REGEX.test(cleanEmail)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Check if already subscribed
    const { data: existing, error: checkError } = await supabase
      .from('newsletter_subscribers')
      .select('email, status')
      .eq('email', cleanEmail)
      .maybeSingle();

    if (checkError && checkError.code !== 'PGRST116') {
      console.error('[Newsletter] Error checking email:', checkError);
      return NextResponse.json(
        { error: 'Database error' },
        { status: 500 }
      );
    }

    // If already subscribed
    if (existing) {
      if (existing.status === 'active') {
        return NextResponse.json(
          { error: 'Email already subscribed' },
          { status: 409 }
        );
      } else {
        // Reactivate subscription
        const { error: updateError } = await supabase
          .from('newsletter_subscribers')
          .update({ 
            status: 'active',
            subscribed_at: new Date().toISOString()
          })
          .eq('email', cleanEmail);

        if (updateError) {
          console.error('[Newsletter] Error reactivating:', updateError);
          return NextResponse.json(
            { error: 'Failed to reactivate subscription' },
            { status: 500 }
          );
        }

        return NextResponse.json(
          { 
            success: true,
            message: 'Subscription reactivated!',
            email: cleanEmail
          },
          { status: 200 }
        );
      }
    }

    // Get client info
    const ip = request.headers.get('x-forwarded-for') || 
                request.headers.get('x-real-ip') || 
                'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // Insert new subscriber
    const { data, error: insertError } = await supabase
      .from('newsletter_subscribers')
      .insert({
        email: cleanEmail,
        status: 'active',
        source: 'website',
        ip_address: ip,
        user_agent: userAgent
      })
      .select()
      .single();

    if (insertError) {
      console.error('[Newsletter] Insert error:', insertError);
      
      // Check for unique constraint violation
      if (insertError.code === '23505') {
        return NextResponse.json(
          { error: 'Email already subscribed' },
          { status: 409 }
        );
      }

      return NextResponse.json(
        { error: 'Failed to subscribe' },
        { status: 500 }
      );
    }

    console.log('[Newsletter] New subscriber:', cleanEmail);

    return NextResponse.json(
      { 
        success: true,
        message: 'Successfully subscribed!',
        email: cleanEmail
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('[Newsletter] Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET endpoint to check subscription status (optional)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');

  if (!email) {
    return NextResponse.json(
      { error: 'Email parameter required' },
      { status: 400 }
    );
  }

  const cleanEmail = email.trim().toLowerCase();

  const { data, error } = await supabase
    .from('newsletter_subscribers')
    .select('email, status, subscribed_at')
    .eq('email', cleanEmail)
    .maybeSingle();

  if (error) {
    return NextResponse.json(
      { error: 'Database error' },
      { status: 500 }
    );
  }

  if (!data) {
    return NextResponse.json(
      { subscribed: false },
      { status: 200 }
    );
  }

  return NextResponse.json(
    { 
      subscribed: data.status === 'active',
      status: data.status,
      subscribedAt: data.subscribed_at
    },
    { status: 200 }
  );
}
