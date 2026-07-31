// @ts-nocheck
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Plus,
  Edit,
  Trash2,
  ArrowLeft,
  Save,
  Eye,
  EyeOff,
  Calendar,
  Tag,
  FileText,
} from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import { toast } from 'sonner';
import Link from 'next/link';

// Create Supabase client directly
function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!url || !key) {
    console.error('Supabase credentials missing');
    return null;
  }
  
  return createClient(url, key);
}

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
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

export default function BlogManagement() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null); // Track which action is loading
  const [formData, setFormData] = useState({
    slug: '',
    title: '',
    description: '',
    content: '',
    author: 'Muhammad Dinan Ghifari',
    category: 'Design',
    tags: '',
    cover_image: '',
    published: false,
    reading_time: 5,
  });

  useEffect(() => {
    const isAuth = localStorage.getItem('admin_authenticated');
    if (!isAuth) {
      router.push('/admin');
    } else {
      setAuthenticated(true);
      fetchPosts();
    }
  }, [router]);

  const fetchPosts = async () => {
    console.log('fetchPosts called');
    
    const client = getSupabaseClient();
    if (!client) {
      console.error('Supabase client is null');
      toast.error('Database not configured - check .env.local');
      return [];
    }

    try {
      console.log('Fetching posts from Supabase...');
      const { data, error } = await client
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error:', error);
        toast.error('Failed to fetch posts: ' + error.message);
        return [];
      }
      
      if (data) {
        console.log('Fetched posts:', data.length);
        console.log('Setting new posts to state...');
        setPosts([...data]); // Force new array reference
        console.log('State updated!');
        return data;
      }
      
      return [];
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast.error('Failed to fetch posts');
      return [];
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const client = getSupabaseClient();
    if (!client) {
      toast.error('Database not configured - check .env.local');
      setLoading(false);
      return;
    }

    try {
      const tagsArray = formData.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);

      const postData = {
        ...formData,
        tags: tagsArray,
        published_at: formData.published ? new Date().toISOString() : null,
      };

      if (editingPost) {
        // Update existing post
        const { error } = await client
          .from('blog_posts')
          .update(postData)
          .eq('id', editingPost.id);

        if (error) throw error;
        toast.success('Post updated successfully!');
      } else {
        // Create new post
        const { error } = await client.from('blog_posts').insert([postData]);

        if (error) throw error;
        toast.success('Post created successfully!');
      }

      // Reset form and refresh
      setFormData({
        slug: '',
        title: '',
        description: '',
        content: '',
        author: 'Muhammad Dinan Ghifari',
        category: 'Design',
        tags: '',
        cover_image: '',
        published: false,
        reading_time: 5,
      });
      setEditingPost(null);
      setShowForm(false);
      await fetchPosts();
    } catch (error: any) {
      console.error('Error saving post:', error);
      toast.error(error.message || 'Failed to save post');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (post: BlogPost) => {
    console.log('handleEdit called for:', post.title);
    
    setEditingPost(post);
    setFormData({
      slug: post.slug,
      title: post.title,
      description: post.description,
      content: post.content,
      author: post.author,
      category: post.category,
      tags: post.tags.join(', '),
      cover_image: post.cover_image || '',
      published: post.published,
      reading_time: post.reading_time,
    });
    setShowForm(true);
    
    console.log('Scrolling to top...');
    // Scroll to form smoothly
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const handleDelete = async (id: string, title: string) => {
    console.log('handleDelete called for:', title);
    console.log('Post ID:', id);
    
    const confirmed = confirm(`Are you sure you want to delete "${title}"?\n\nThis action cannot be undone!`);
    console.log('User confirmed:', confirmed);
    
    if (!confirmed) return;

    const client = getSupabaseClient();
    if (!client) {
      console.error('Supabase client is null');
      toast.error('Database not configured - check .env.local');
      return;
    }

    console.log('Setting loading state...');
    setActionLoading(`delete-${id}`);

    try {
      console.log('Sending delete request to database...');
      
      const { data, error } = await client
        .from('blog_posts')
        .delete()
        .eq('id', id)
        .select(); // Return deleted data to confirm

      console.log('Database response:', data);
      
      if (error) {
        console.error('Supabase error:', error);
        console.error('Error code:', error.code);
        console.error('Error message:', error.message);
        throw error;
      }
      
      console.log('Delete successful!');
      
      // Only update UI after database confirms deletion
      setPosts(prevPosts => prevPosts.filter(p => p.id !== id));
      console.log('UI updated - post removed!');
      
      toast.success('Post deleted successfully!');
      
    } catch (error: any) {
      console.error('Error deleting post:', error);
      console.error('Error details:', error.message);
      toast.error('Failed to delete post: ' + (error.message || 'Unknown error'));
    } finally {
      console.log('Clearing loading state...');
      setActionLoading(null);
    }
  };

  const togglePublish = async (post: BlogPost) => {
    console.log('togglePublish called for:', post.title);
    console.log('Current state:', post.published);
    
    const client = getSupabaseClient();
    if (!client) {
      console.error('Supabase client is null');
      toast.error('Database not configured - check .env.local');
      return;
    }

    console.log('Setting loading state...');
    setActionLoading(`publish-${post.id}`);

    try {
      const newPublishedState = !post.published;
      console.log('Updating to:', newPublishedState);
      
      const updateData = {
        published: newPublishedState,
        published_at: newPublishedState ? new Date().toISOString() : null,
      };
      
      console.log('Sending update to database:', updateData);
      
      const { data, error } = await client
        .from('blog_posts')
        .update(updateData)
        .eq('id', post.id)
        .select(); // Important: return updated data

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      console.log('Database response:', data);
      console.log('Update successful!');
      
      // Only update UI after database confirms success
      setPosts(prevPosts => 
        prevPosts.map(p => 
          p.id === post.id 
            ? { ...p, ...updateData }
            : p
        )
      );
      
      console.log('UI updated!');
      
      toast.success(
        newPublishedState 
          ? `"${post.title}" is now live on /blog!` 
          : `"${post.title}" is now hidden (draft)`
      );
      
    } catch (error: any) {
      console.error('Error toggling publish:', error);
      console.error('Error details:', error.message);
      toast.error('Failed to update post: ' + (error.message || 'Unknown error'));
    } finally {
      console.log('Clearing loading state...');
      setActionLoading(null);
    }
  };

  if (!authenticated) {
    return <div className="min-h-screen flex items-center justify-center">
      <p className="text-xs font-mono uppercase tracking-widest text-gray-400">Loading...</p>
    </div>;
  }

  return (
    <div className="min-h-screen bg-white p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="border border-black p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Link
                href="/admin/dashboard"
                className="w-8 h-8 border border-black hover:bg-black hover:text-white transition-colors duration-0 flex items-center justify-center"
              >
                <ArrowLeft className="h-4 w-4" />
              </Link>
              <h1 className="text-2xl font-bold tracking-tight text-black">
                Blog Management
              </h1>
            </div>
            <button
              onClick={() => {
                setEditingPost(null);
                setFormData({
                  slug: '',
                  title: '',
                  description: '',
                  content: '',
                  author: 'Muhammad Dinan Ghifari',
                  category: 'Design',
                  tags: '',
                  cover_image: '',
                  published: false,
                  reading_time: 5,
                });
                setShowForm(!showForm);
              }}
              className="px-4 py-2 text-xs font-mono uppercase tracking-widest bg-black text-white hover:bg-white hover:text-black border border-black transition-colors duration-0 flex items-center gap-2"
            >
              {showForm ? 'Cancel' : <><Plus className="h-4 w-4" /> New Post</>}
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="border border-gray-200 p-4">
              <p className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-1">
                Total Posts
              </p>
              <p className="text-2xl font-bold">{posts.length}</p>
            </div>
            <div className="border border-gray-200 p-4">
              <p className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-1">
                Published
              </p>
              <p className="text-2xl font-bold">
                {posts.filter((p) => p.published).length}
              </p>
            </div>
            <div className="border border-gray-200 p-4">
              <p className="text-xs font-mono uppercase tracking-widest text-gray-400 mb-1">
                Drafts
              </p>
              <p className="text-2xl font-bold">
                {posts.filter((p) => !p.published).length}
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="border border-black p-6 mb-6"
          >
            <h2 className="text-lg font-bold mb-4">
              {editingPost ? 'Edit Post' : 'New Post'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-gray-600 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    required
                    className="w-full p-2 border border-gray-300 text-sm focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-gray-600 mb-2">
                    Slug * (URL-friendly)
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData({ ...formData, slug: e.target.value })
                    }
                    required
                    pattern="[a-z0-9-]+"
                    placeholder="my-post-slug"
                    className="w-full p-2 border border-gray-300 text-sm focus:outline-none focus:border-black font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-gray-600 mb-2">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  required
                  rows={2}
                  className="w-full p-2 border border-gray-300 text-sm focus:outline-none focus:border-black resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-widest text-gray-600 mb-2">
                  Content * (Markdown supported)
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => {
                    const content = e.target.value;
                    setFormData({ ...formData, content });
                    // Auto-calculate reading time
                    const wordCount = content.split(/\s+/).length;
                    const readingTime = Math.ceil(wordCount / 200);
                    setFormData((prev) => ({
                      ...prev,
                      content,
                      reading_time: readingTime,
                    }));
                  }}
                  required
                  rows={15}
                  className="w-full p-2 border border-gray-300 text-sm focus:outline-none focus:border-black resize-none font-mono"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-gray-600 mb-2">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 text-sm focus:outline-none focus:border-black"
                  >
                    <option>Design</option>
                    <option>Tutorial</option>
                    <option>Case Study</option>
                    <option>Development</option>
                    <option>Business</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-gray-600 mb-2">
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) =>
                      setFormData({ ...formData, tags: e.target.value })
                    }
                    placeholder="Design, UI/UX, Figma"
                    className="w-full p-2 border border-gray-300 text-sm focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-gray-600 mb-2">
                    Reading Time (min)
                  </label>
                  <input
                    type="number"
                    value={formData.reading_time}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        reading_time: parseInt(e.target.value),
                      })
                    }
                    className="w-full p-2 border border-gray-300 text-sm focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) =>
                      setFormData({ ...formData, published: e.target.checked })
                    }
                    className="w-4 h-4"
                  />
                  <span className="text-xs font-mono uppercase tracking-widest text-gray-600">
                    Publish Immediately
                  </span>
                </label>
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 text-xs font-mono uppercase tracking-widest bg-black text-white hover:bg-white hover:text-black border border-black transition-colors duration-0 disabled:opacity-50 flex items-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  {loading ? 'Saving...' : 'Save Post'}
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Posts List */}
        <div className="border border-black">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 p-4 border-b border-black bg-black text-white">
            <div className="col-span-6 md:col-span-5">
              <span className="text-xs font-mono uppercase tracking-widest">
                Title
              </span>
            </div>
            <div className="hidden md:block md:col-span-2">
              <span className="text-xs font-mono uppercase tracking-widest">
                Category
              </span>
            </div>
            <div className="hidden md:block md:col-span-2">
              <span className="text-xs font-mono uppercase tracking-widest">
                Status
              </span>
            </div>
            <div className="col-span-6 md:col-span-3">
              <span className="text-xs font-mono uppercase tracking-widest">
                Actions
              </span>
            </div>
          </div>

          {/* Posts */}
          {posts.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-xs font-mono uppercase tracking-widest text-gray-400">
                No posts yet. Create your first one!
              </p>
            </div>
          ) : (
            posts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-12 gap-4 p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-0"
              >
                <div className="col-span-6 md:col-span-5">
                  <p className="text-sm font-medium text-black mb-1">
                    {post.title}
                  </p>
                  <p className="text-xs text-gray-400 font-mono">
                    /{post.slug}
                  </p>
                </div>
                <div className="hidden md:block md:col-span-2">
                  <span className="px-2 py-1 text-xs font-mono uppercase bg-gray-100 text-gray-600">
                    {post.category}
                  </span>
                </div>
                <div className="hidden md:block md:col-span-2">
                  <div className="flex items-center gap-2">
                    {post.published ? (
                      <Eye className="h-3 w-3 text-green-600" />
                    ) : (
                      <EyeOff className="h-3 w-3 text-gray-400" />
                    )}
                    <span className="text-xs font-mono uppercase text-gray-600">
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                </div>
                <div className="col-span-6 md:col-span-3 flex gap-2">
                  {/* Visibility Toggle */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      togglePublish(post);
                    }}
                    disabled={actionLoading === `publish-${post.id}`}
                    className={`
                      px-3 py-2 text-xs border transition-colors duration-200
                      ${post.published
                        ? 'border-green-600 text-green-600 hover:bg-green-600 hover:text-white'
                        : 'border-gray-300 text-gray-400 hover:border-black hover:text-black'
                      }
                      ${actionLoading === `publish-${post.id}` ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
                    title={post.published ? 'Unpublish' : 'Publish'}
                  >
                    {actionLoading === `publish-${post.id}` ? (
                      <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    ) : post.published ? (
                      <Eye className="h-4 w-4" />
                    ) : (
                      <EyeOff className="h-4 w-4" />
                    )}
                  </button>

                  {/* Edit */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      handleEdit(post);
                    }}
                    className="px-3 py-2 text-xs border border-gray-300 hover:border-black hover:bg-black hover:text-white transition-colors duration-200"
                    title="Edit"
                  >
                    <Edit className="h-4 w-4" />
                  </button>

                  {/* Delete */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      handleDelete(post.id, post.title);
                    }}
                    disabled={actionLoading === `delete-${post.id}`}
                    className={`
                      px-3 py-2 text-xs border border-gray-300 hover:border-red-600 hover:bg-red-600 hover:text-white transition-colors duration-200
                      ${actionLoading === `delete-${post.id}` ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
                    title="Delete"
                  >
                    {actionLoading === `delete-${post.id}` ? (
                      <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </button>

                  {/* View on Site */}
                  <a
                    href={`/blog/${post.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      console.log('View clicked:', post.slug);
                    }}
                    className="px-3 py-2 text-xs border border-gray-300 hover:border-blue-600 hover:bg-blue-600 hover:text-white transition-colors duration-200 flex items-center"
                    title="View"
                  >
                    <FileText className="h-4 w-4" />
                  </a>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
