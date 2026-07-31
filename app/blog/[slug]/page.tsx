import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPostBySlugHybrid } from '@/lib/blog';
import { Calendar, Clock, ArrowLeft, Tag, User, Share2, Bookmark, ChevronRight, Sparkles } from 'lucide-react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { useMDXComponents } from '@/mdx-components';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlugHybrid(slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  console.log('[BlogPostPage] Requested slug:', slug);
  
  const post = await getPostBySlugHybrid(slug);
  console.log('[BlogPostPage] Post found:', !!post);
  if (post) {
    console.log('[BlogPostPage] Post title:', post.title);
    console.log('[BlogPostPage] Post source:', post.source);
  } else {
    console.log('[BlogPostPage] Post is NULL - calling notFound()');
  }

  if (!post) {
    notFound();
  }

  const components = useMDXComponents({});

  const formatMarkdownContent = (markdown: string) => {
    return markdown
      .replace(/^### (.*$)/gim, '<h3 class="text-2xl md:text-3xl font-black uppercase tracking-tight mt-16 mb-6 border-l-4 border-black pl-6">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-3xl md:text-4xl font-black uppercase tracking-tighter mt-20 mb-8 border-l-8 border-black pl-8">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-4xl md:text-5xl font-black uppercase tracking-tighter mt-20 mb-10">$1</h1>')
      .replace(/\*\*(.*)\*\*/gim, '<strong class="font-black bg-yellow-100 px-1">$1</strong>')
      .replace(/\*(.*)\*/gim, '<em class="font-mono text-sm italic">$1</em>')
      .replace(/\n\n/g, '</p><p class="mb-6 leading-relaxed text-lg">')
      .replace(/^(.+)$/gm, '<p class="mb-6 leading-relaxed text-lg">$1</p>')
      .replace(/<p class="mb-6 leading-relaxed text-lg"><h/g, '<h')
      .replace(/<\/h([1-6])><\/p>/g, '</h$1>');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Animated Top Bar */}
      <div className="border-b-2 border-black bg-black text-white overflow-hidden">
        <div className="flex whitespace-nowrap py-2 animate-marquee">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="inline-flex items-center gap-4 px-6 text-xs font-mono uppercase">
              <Sparkles className="h-3 w-3" />
              {post.category}
              <Tag className="h-3 w-3" />
              {post.readingTime}
            </span>
          ))}
        </div>
      </div>

      {/* Sticky Navigation */}
      <div className="sticky top-0 z-50 border-b-2 border-black bg-white/95 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest 
                         px-4 py-2 border-2 border-black hover:bg-black hover:text-white transition-colors duration-0"
            >
              <ArrowLeft className="h-3 w-3" />
              BACK TO BLOG
            </Link>
            <div className="flex items-center gap-3">
              <button className="p-2 border-2 border-black hover:bg-black hover:text-white transition-colors duration-0">
                <Share2 className="h-4 w-4" />
              </button>
              <button className="p-2 border-2 border-black hover:bg-black hover:text-white transition-colors duration-0">
                <Bookmark className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-6 py-12 md:py-20">
        {/* Header Section */}
        <header className="mb-16">
          {/* Category & Meta Bar */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <span className="px-4 py-2 bg-black text-white font-mono text-xs uppercase tracking-widest">
              {post.category}
            </span>
            <div className="flex items-center gap-3 text-sm font-mono text-gray-500">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {new Date(post.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {post.readingTime}
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <User className="h-3 w-3" />
                {post.author}
              </div>
            </div>
          </div>

          {/* Mega Title */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
            {post.title}
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl font-mono leading-relaxed text-gray-600 mb-8 border-l-4 border-black pl-6">
            {post.description}
          </p>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-8 border-t-2 border-gray-200">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-mono uppercase border-2 border-black hover:bg-black hover:text-white transition-colors duration-0"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <div className="text-lg leading-relaxed text-gray-800">
            {post.source === 'mdx' ? (
              <MDXRemote source={post.content} components={components} />
            ) : (
              <div 
                className="brutalist-content-v2"
                dangerouslySetInnerHTML={{ __html: formatMarkdownContent(post.content) }}
              />
            )}
          </div>
        </div>

        {/* Separator */}
        <div className="my-20">
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-black" />
            <Sparkles className="h-5 w-5" />
            <div className="flex-1 h-px bg-black" />
          </div>
        </div>

        {/* Author Card */}
        <div className="border-4 border-black p-8 bg-gray-50">
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 bg-black flex items-center justify-center flex-shrink-0">
              <User className="h-10 w-10 text-white" />
            </div>
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-2">
                WRITTEN BY
              </div>
              <h3 className="text-2xl font-black mb-3">{post.author}</h3>
              <p className="text-sm font-mono text-gray-600 mb-4">
                Developer & Designer specializing in modern web experiences.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono uppercase 
                           border-2 border-black hover:bg-black hover:text-white transition-colors duration-0"
              >
                VIEW PROFILE
                <ChevronRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      </article>

      {/* CTA Section - Full Width */}
      <div className="border-t-8 border-black bg-black text-white">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6">
              ENJOYED THIS?<br />LET'S TALK
            </h2>
            <p className="text-lg font-mono text-gray-400 max-w-2xl mx-auto">
              Ready to bring your ideas to life? Let's create something amazing together.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 text-sm font-mono uppercase tracking-widest 
                         bg-white text-black border-4 border-white hover:bg-black hover:text-white 
                         hover:translate-x-1 hover:translate-y-1 transition-all duration-200"
            >
              START A PROJECT
              <ChevronRight className="h-4 w-4" />
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 text-sm font-mono uppercase tracking-widest 
                         border-4 border-white text-white hover:bg-white hover:text-black transition-all duration-200"
            >
              <ArrowLeft className="h-4 w-4" />
              MORE ARTICLES
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Animated Bar */}
      <div className="border-t-2 border-black bg-black text-white overflow-hidden">
        <div className="flex whitespace-nowrap py-2 animate-marquee-reverse">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="inline-flex items-center gap-4 px-6 text-xs font-mono uppercase">
              <Sparkles className="h-3 w-3" />
              THANKS FOR READING
              <Tag className="h-3 w-3" />
              SHARE WITH OTHERS
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
