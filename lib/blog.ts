import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { createClient } from '@supabase/supabase-js';

const postsDirectory = path.join(process.cwd(), 'content/blog');

// Create Supabase client for server-side (with service role if needed)
function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!url || !key) {
    console.error('Supabase credentials missing in lib/blog.ts');
    return null;
  }
  
  return createClient(url, key);
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  coverImage?: string;
  readingTime: string;
  content: string;
  published?: boolean;
  source: 'mdx' | 'database';
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  coverImage?: string;
  readingTime: string;
  published?: boolean;
  source: 'mdx' | 'database';
}

// Get all blog post slugs
export function getAllPostSlugs(): string[] {
  try {
    const files = fs.readdirSync(postsDirectory);
    return files
      .filter((file) => file.endsWith('.mdx'))
      .map((file) => file.replace(/\.mdx$/, ''));
  } catch {
    return [];
  }
}

// Get post by slug - DATABASE ONLY
export async function getPostBySlugHybrid(slug: string): Promise<BlogPost | null> {
  console.log('[lib/blog] getPostBySlugHybrid called for:', slug);
  
  // ONLY get from database (no MDX fallback)
  const dbPost = await getDatabasePostBySlug(slug);
  
  if (dbPost) {
    console.log('[lib/blog] Post found in database');
    return dbPost;
  }
  
  console.log('[lib/blog] Post not found');
  return null;
}

// Database post type
interface DatabasePost {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  content: string;
  author: string;
  category: string;
  tags: string[];
  cover_image: string | null;
  published: boolean;
  published_at: string | null;
  reading_time: number;
  created_at: string;
  updated_at: string;
}

// Get post from database
async function getDatabasePostBySlug(slug: string): Promise<BlogPost | null> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    console.error('Supabase client is null in getDatabasePostBySlug');
    return null;
  }

  try {
    console.log('[lib/blog] Fetching post by slug:', slug);
    
    // First try: Get with published = true
    let { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .maybeSingle<DatabasePost>();

    // If not found, try without published filter (for debugging)
    if (!data && !error) {
      console.log('[lib/blog] No published post found, trying without published filter...');
      const result = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .maybeSingle<DatabasePost>();
      
      data = result.data;
      error = result.error;
      
      if (data) {
        console.log('[lib/blog] Found post but published =', data.published);
        // Only return if actually published
        if (!data.published) {
          console.log('[lib/blog] Post is not published, returning null');
          return null;
        }
      }
    }

    if (error) {
      console.error('[lib/blog] Error fetching post:', error);
      return null;
    }
    
    if (!data) {
      console.log('[lib/blog] No post found for slug:', slug);
      return null;
    }

    console.log('[lib/blog] Post found:', data.title);
    return {
      slug: data.slug,
      title: data.title,
      description: data.description || '',
      date: data.published_at || data.created_at,
      author: data.author || 'Decoisme',
      category: data.category || 'Design',
      tags: data.tags || [],
      coverImage: data.cover_image || undefined,
      readingTime: `${data.reading_time || 5} min read`,
      content: data.content,
      published: data.published,
      source: 'database' as const,
    };
  } catch (error) {
    console.error('[lib/blog] Exception in getDatabasePostBySlug:', error);
    return null;
  }
}

// Get post by slug (MDX only)
export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    // Calculate reading time
    const wordCount = content.split(/\s+/).length;
    const readingTimeMin = Math.ceil(wordCount / 200); // 200 words per minute
    const readingTimeText = `${readingTimeMin} min read`;

    return {
      slug,
      title: data.title,
      description: data.description,
      date: data.date,
      author: data.author || 'Decoisme',
      category: data.category || 'Design',
      tags: data.tags || [],
      coverImage: data.coverImage,
      readingTime: readingTimeText,
      content,
      published: true,
      source: 'mdx' as const,
    };
  } catch {
    return null;
  }
}

// Get all posts (sorted by date, newest first) - DATABASE ONLY
export async function getAllPosts(): Promise<BlogPostMeta[]> {
  console.log('[lib/blog] getAllPosts called - DATABASE ONLY MODE');
  
  // ONLY get database posts (no MDX)
  const dbPosts = await getAllDatabasePosts();
  
  console.log('[lib/blog] Total posts from database:', dbPosts.length);
  
  // Sort by date
  return dbPosts.sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));
}

// Get MDX posts only
function getAllMDXPosts(): BlogPostMeta[] {
  const slugs = getAllPostSlugs();
  const posts = slugs
    .map((slug) => {
      const post = getPostBySlug(slug);
      if (!post) return null;
      const { content, ...meta } = post;
      return meta;
    })
    .filter((post): post is BlogPostMeta => post !== null)
    .sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));

  return posts;
}

// Get database posts only
async function getAllDatabasePosts(): Promise<BlogPostMeta[]> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    console.error('Supabase client is null in getAllDatabasePosts');
    return [];
  }

  try {
    console.log('[lib/blog] Fetching all database posts...');
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .order('published_at', { ascending: false, nullsFirst: false });

    if (error) {
      console.error('[lib/blog] Error fetching posts:', error);
      return [];
    }
    
    if (!data || data.length === 0) {
      console.log('[lib/blog] No posts found');
      return [];
    }

    console.log('[lib/blog] Found', data.length, 'posts');
    return data.map((post: DatabasePost) => ({
      slug: post.slug,
      title: post.title,
      description: post.description || '',
      date: post.published_at || post.created_at,
      author: post.author || 'Decoisme',
      category: post.category || 'Design',
      tags: post.tags || [],
      coverImage: post.cover_image || undefined,
      readingTime: `${post.reading_time || 5} min read`,
      published: post.published,
      source: 'database' as const,
    }));
  } catch (error) {
    console.error('[lib/blog] Exception in getAllDatabasePosts:', error);
    return [];
  }
}

// Get posts by category
export async function getPostsByCategory(category: string): Promise<BlogPostMeta[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter((post) => post.category === category);
}

// Get all unique categories
export async function getAllCategories(): Promise<string[]> {
  const allPosts = await getAllPosts();
  const categories = allPosts.map((post) => post.category);
  return Array.from(new Set(categories));
}

// Get all unique tags
export async function getAllTags(): Promise<string[]> {
  const allPosts = await getAllPosts();
  const tags = allPosts.flatMap((post) => post.tags);
  return Array.from(new Set(tags));
}
