// @ts-nocheck
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { HeroImageUpload } from '@/components/ui/hero-image-upload';
import { motion } from 'framer-motion';
import {
  Plus,
  Edit,
  Trash2,
  LogOut,
  FolderKanban,
  Mail,
  BarChart,
} from 'lucide-react';
import { getSupabase, Project, ContactMessage } from '@/lib/supabase';
import { toast } from 'sonner';

export default function AdminDashboard() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'projects' | 'messages' | 'stats' | 'hero'>(
    'projects'
  );
  const [projects, setProjects] = useState<Project[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [heroImage, setHeroImage] = useState<string | null>(null);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    short_description: '',
    image_url: '',
    gallery_images: '',
    category: '',
    date: '',
    platform: '',
    tech_stack: '',
    github_url: '',
    live_url: '',
    featured: false,
  });

  useEffect(() => {
    const isAuth = localStorage.getItem('admin_authenticated');
    if (!isAuth) {
      router.push('/admin');
    } else {
      setAuthenticated(true);
      fetchProjects();
      fetchMessages();
      fetchHeroImage();
    }
  }, [router]);

  const fetchHeroImage = async () => {
    try {
      const client = getSupabase();
      if (!client) return;

      const { data, error } = await client
        .from('hero_settings')
        .select('hero_image_url')
        .eq('id', '00000000-0000-0000-0000-000000000001')
        .single();

      if (data && !error) {
        // @ts-ignore
        setHeroImage(data.hero_image_url);
      }
    } catch (error) {
      console.error('Error fetching hero image:', error);
    }
  };

  const handleHeroImageUpload = async (url: string) => {
    const client = getSupabase();
    if (!client) {
      setHeroImage(url);
      toast.success('Hero image updated!');
      return;
    }

    try {
      const { error } = await client
        .from('hero_settings')
        // @ts-ignore
        .update({ hero_image_url: url })
        .eq('id', '00000000-0000-0000-0000-000000000001');

      if (!error) {
        setHeroImage(url);
        toast.success('Hero image updated successfully!');
      } else {
        toast.error('Failed to update hero image');
      }
    } catch (error) {
      console.error('Error updating hero image:', error);
      toast.error('Failed to update hero image');
    }
  };

  const fetchProjects = async () => {
    try {
      const client = getSupabase();
      if (!client) {
        toast.error('Supabase not configured. Please add your credentials to .env.local');
        return;
      }

      const { data, error } = await client
        .from('projects')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast.error('Failed to fetch projects');
    }
  };

  const fetchMessages = async () => {
    try {
      const client = getSupabase();
      if (!client) return;

      const { data, error } = await client
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_authenticated');
    router.push('/admin');
  };

  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const client = getSupabase();
    if (!client) {
      toast.error('Supabase not configured');
      return;
    }

    const projectData = {
      ...projectForm,
      tech_stack: projectForm.tech_stack.split(',').map((t) => t.trim()),
      platform: projectForm.platform.split(',').map((t) => t.trim()),
      gallery_images: projectForm.gallery_images.split(',').map((t) => t.trim()).filter(Boolean),
      order_index: projects.length + 1,
    };

    try {
      if (editingProject) {
        // @ts-ignore - Supabase type inference issue
        const { error } = await client
          .from('projects')
          .update(projectData)
          .eq('id', editingProject.id);

        if (error) throw error;
        toast.success('Project updated successfully!');
      } else {
        // @ts-ignore - Supabase type inference issue
        const { error } = await client.from('projects').insert([projectData]);

        if (error) throw error;
        toast.success('Project created successfully!');
      }

      setShowProjectForm(false);
      setEditingProject(null);
      setProjectForm({
        title: '',
        description: '',
        short_description: '',
        image_url: '',
        gallery_images: '',
        category: '',
        date: '',
        platform: '',
        tech_stack: '',
        github_url: '',
        live_url: '',
        featured: false,
      });
      fetchProjects();
    } catch (error) {
      console.error('Error saving project:', error);
      toast.error('Failed to save project');
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    const client = getSupabase();
    if (!client) return;

    try {
      const { error } = await client.from('projects').delete().eq('id', id);

      if (error) throw error;
      toast.success('Project deleted successfully!');
      fetchProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error('Failed to delete project');
    }
  };

  const handleMarkAsRead = async (id: string) => {
    const client = getSupabase();
    if (!client) return;

    try {
      const { error } = await client
        .from('contact_messages')
        .update({ read: true })
        .eq('id', id);

      if (error) throw error;
      fetchMessages();
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <header className="bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="rounded-full"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          {[
            { id: 'hero', label: 'Hero Image', icon: FolderKanban },
            { id: 'projects', label: 'Projects', icon: FolderKanban },
            { id: 'messages', label: 'Messages', icon: Mail },
            { id: 'stats', label: 'Statistics', icon: BarChart },
          ].map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'default' : 'outline'}
              onClick={() => setActiveTab(tab.id as any)}
              className="rounded-full"
            >
              <tab.icon className="h-4 w-4 mr-2" />
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Hero Image Tab */}
        {activeTab === 'hero' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold">Manage Hero Image</h2>
            <Card className="p-8">
              <div className="max-w-2xl mx-auto space-y-6">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Hero Section Image</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Upload gambar untuk ditampilkan di Hero Section (homepage). Recommended: 800x800px (square), max 5MB.
                  </p>
                </div>
                
                {/* Current Image Preview - Only show if image exists */}
                {heroImage && (
                  <div className="mb-6">
                    <Label className="mb-2 block">Current Image:</Label>
                    <div className="relative w-full aspect-square max-w-md mx-auto rounded-2xl overflow-hidden border-2 border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-900">
                      <img 
                        src={heroImage} 
                        alt="Current Hero" 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          console.error('Image load error:', heroImage);
                          // Show error message
                          const parent = e.currentTarget.parentElement;
                          if (parent) {
                            parent.innerHTML = '<div class="flex items-center justify-center h-full text-red-500"><p>Failed to load image</p></div>';
                          }
                        }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center break-all">
                      {heroImage}
                    </p>
                  </div>
                )}

                {/* Upload Section */}
                <div className="space-y-4">
                  <Label>{heroImage ? 'Upload New Image:' : 'Upload Image:'}</Label>
                  <HeroImageUpload
                    currentImageUrl={heroImage || undefined}
                    onUploadSuccess={handleHeroImageUpload}
                    editable={true}
                  />
                </div>

                <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl">
                  <h4 className="font-semibold text-sm mb-2">Tips:</h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• Format: JPG, PNG, atau WebP</li>
                    <li>• Ukuran maksimal: 5MB</li>
                    <li>• Dimensi recommended: 800x800px (square)</li>
                    <li>• Compress gambar sebelum upload untuk loading lebih cepat</li>
                    <li>• Click area upload atau drag & drop gambar</li>
                  </ul>
                </div>

                {/* Debug Info (only in development) */}
                {process.env.NODE_ENV === 'development' && (
                  <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded text-xs">
                    <p className="font-mono">Debug: heroImage = {heroImage || 'null'}</p>
                  </div>
                )}
              </div>
            </Card>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Manage Projects</h2>
              <Button
                onClick={() => setShowProjectForm(!showProjectForm)}
                className="rounded-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Project
              </Button>
            </div>

            {showProjectForm && (
              <Card className="p-6">
                <form onSubmit={handleProjectSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Title</Label>
                      <Input
                        value={projectForm.title}
                        onChange={(e) =>
                          setProjectForm({ ...projectForm, title: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Image URL</Label>
                      <Input
                        value={projectForm.image_url}
                        onChange={(e) =>
                          setProjectForm({
                            ...projectForm,
                            image_url: e.target.value,
                          })
                        }
                        placeholder="https://images.unsplash.com/photo-xxx or /projects/image.jpg"
                      />
                      <p className="text-xs text-gray-500">
                        Main project image. Use Unsplash URL or upload to /public/projects/
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Short Description</Label>
                    <Input
                      value={projectForm.short_description}
                      onChange={(e) =>
                        setProjectForm({
                          ...projectForm,
                          short_description: e.target.value,
                        })
                      }
                      placeholder="Brief project summary"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={projectForm.description}
                      onChange={(e) =>
                        setProjectForm({
                          ...projectForm,
                          description: e.target.value,
                        })
                      }
                      required
                      rows={3}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Category</Label>
                      <Input
                        value={projectForm.category}
                        onChange={(e) =>
                          setProjectForm({
                            ...projectForm,
                            category: e.target.value,
                          })
                        }
                        placeholder="UI/UX Design, Web Design, etc."
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Date</Label>
                      <Input
                        value={projectForm.date}
                        onChange={(e) =>
                          setProjectForm({
                            ...projectForm,
                            date: e.target.value,
                          })
                        }
                        placeholder="January 2024"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Gallery Images (comma separated URLs)</Label>
                    <Textarea
                      value={projectForm.gallery_images}
                      onChange={(e) =>
                        setProjectForm({
                          ...projectForm,
                          gallery_images: e.target.value,
                        })
                      }
                      placeholder="https://images.unsplash.com/photo-1.jpg, https://images.unsplash.com/photo-2.jpg, https://images.unsplash.com/photo-3.jpg"
                      rows={2}
                    />
                    <p className="text-xs text-gray-500">
                      Multiple images for project gallery. Separate with commas. First image will be shown by default.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>Platform/Tools (comma separated)</Label>
                    <Input
                      value={projectForm.platform}
                      onChange={(e) =>
                        setProjectForm({
                          ...projectForm,
                          platform: e.target.value,
                        })
                      }
                      placeholder="Figma, Adobe XD, Prototyping"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Tech Stack (comma separated)</Label>
                    <Input
                      value={projectForm.tech_stack}
                      onChange={(e) =>
                        setProjectForm({
                          ...projectForm,
                          tech_stack: e.target.value,
                        })
                      }
                      placeholder="Next.js, TypeScript, Tailwind"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>GitHub URL</Label>
                      <Input
                        value={projectForm.github_url}
                        onChange={(e) =>
                          setProjectForm({
                            ...projectForm,
                            github_url: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Live URL</Label>
                      <Input
                        value={projectForm.live_url}
                        onChange={(e) =>
                          setProjectForm({
                            ...projectForm,
                            live_url: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button type="submit" className="rounded-full">
                      {editingProject ? 'Update' : 'Create'} Project
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setShowProjectForm(false);
                        setEditingProject(null);
                      }}
                      className="rounded-full"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </Card>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Card key={project.id} className="p-6">
                  <h3 className="font-bold text-lg mb-2">{project.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setEditingProject(project);
                        setProjectForm({
                          title: project.title,
                          description: project.description,
                          short_description: project.short_description,
                          image_url: project.image_url,
                          gallery_images: project.gallery_images.join(', '),
                          category: project.category,
                          date: project.date,
                          platform: project.platform.join(', '),
                          tech_stack: project.tech_stack.join(', '),
                          github_url: project.github_url || '',
                          live_url: project.live_url || '',
                          featured: project.featured,
                        });
                        setShowProjectForm(true);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteProject(project.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold">Contact Messages</h2>
            <div className="space-y-4">
              {messages.map((message) => (
                <Card
                  key={message.id}
                  className={`p-6 ${
                    !message.read ? 'border-blue-500 border-2' : ''
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold">{message.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {message.email}
                      </p>
                    </div>
                    {!message.read && (
                      <Button
                        size="sm"
                        onClick={() => handleMarkAsRead(message.id)}
                      >
                        Mark as Read
                      </Button>
                    )}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    {message.message}
                  </p>
                  <p className="text-xs text-gray-500 mt-4">
                    {new Date(message.created_at).toLocaleString()}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Stats Tab */}
        {activeTab === 'stats' && (
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6">
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                Total Projects
              </h3>
              <p className="text-4xl font-bold">{projects.length}</p>
            </Card>
            <Card className="p-6">
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                Total Messages
              </h3>
              <p className="text-4xl font-bold">{messages.length}</p>
            </Card>
            <Card className="p-6">
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                Unread Messages
              </h3>
              <p className="text-4xl font-bold">
                {messages.filter((m) => !m.read).length}
              </p>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
