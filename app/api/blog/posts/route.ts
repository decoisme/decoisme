import { NextResponse } from 'next/server';
import { getAllPosts, getAllCategories } from '@/lib/blog';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const posts = await getAllPosts();
    const categories = await getAllCategories();
    
    return NextResponse.json({
      posts,
      categories,
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}
