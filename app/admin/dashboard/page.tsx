// @ts-nocheck
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Plus,
  Edit,
  Trash2,
  LogOut,
  Terminal,
  Clock,
  Activity,
  Image as ImageIcon,
  Mail,
  BarChart,
  X,
  Save,
  FileText,
} from 'lucide-react';
import { getSupabase, Project, ContactMessage } from '@/lib/supabase';
import { toast } from 'sonner';
import { SystemLabel, MemoryAddress } from '@/components/ui/brutalist-elements';
import { HeroImageUpload } from '@/components/ui/hero-image-upload';

export default function AdminDashboard() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<'hero' | 'projects' | 'messages' | 'stats'>('hero');
  const [projects, setProjects] = useState<Project[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [heroImage, setHeroImage] = useState<string | null>(null);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [time, setTime] = useState('00:00:00');
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

  // Real-time clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

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
      toast.success('Hero image updated');
      return;
    }

    try {
      const { error } = await client
        .from('hero_settings')
        .update({ hero_image_url: url })
        .eq('id', '00000000-0000-0000-0000-000000000001');

      if (!error) {
        setHeroImage(url);
        toast.success('Hero image updated');
      } else {
        toast.error('Update failed');
      }
    } catch (error) {
      console.error('Error updating hero image:', error);
      toast.error('Update failed');
    }
  };

  const fetchProjects = async () => {
    try {
      const client = getSupabase();
      if (!client) {
        toast.error('Supabase not configured');
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

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      localStorage.removeItem('admin_authenticated');
      router.push('/admin');
      toast.success('Logged out');
    } catch (error) {
      console.error('Logout error:', error);
      localStorage.removeItem('admin_authenticated');
      router.push('/admin');
    }
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
        const { error } = await client
          .from('projects')
          .update(projectData)
          .eq('id', editingProject.id);

        if (error) throw error;
        toast.success('Project updated');
      } else {
        const { error } = await client.from('projects').insert([projectData]);

        if (error) throw error;
        toast.success('Project created');
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
    if (!confirm('Delete this project?')) return;

    const client = getSupabase();
    if (!client) return;

    try {
      const { error } = await client.from('projects').delete().eq('id', id);

      if (error) throw error;
      toast.success('Project deleted');
      fetchProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error('Failed to delete');
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
      console.error('Error marking as read:', error);
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-3 h-3 bg-black animate-pulse mb-4" />
          <p className="text-xs font-mono uppercase tracking-widest text-gray-400">
            LOADING...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Terminal Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-black">
        {/* Title Bar */}
        <div className="h-12 bg-black flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <Terminal className="h-4 w-4 text-white" />
            <span className="text-[11px] font-mono uppercase tracking-widest text-white">
              ADMIN.DASHBOARD
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Clock className="h-3 w-3 text-white" />
              <span className="text-[10px] font-mono text-white">{time}</span>
            </div>
            <MemoryAddress code="0xDASH" />
          </div>
        </div>

        {/* Status Bar */}
        <div className="h-10 flex items-center justify-between px-6 border-b border-gray-200">
          <SystemLabel label={`ACTIVE.TAB=${activeTab.toUpperCase()}`} />
          <div className="flex items-center gap-2">
            <a
              href="/admin/dashboard/blog"
              className="h-7 px-3 border border-gray-300 bg-white hover:border-black hover:bg-gray-50 transition-colors duration-0 flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest"
            >
              <FileText className="h-3 w-3" />
              BLOG
            </a>
            <button
              onClick={handleLogout}
              className="h-7 px-3 border border-black bg-white hover:bg-black hover:text-white transition-colors duration-0 flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest"
            >
              <LogOut className="h-3 w-3" />
              LOGOUT
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-black">
          {[
            { id: 'hero', label: 'HERO.IMG', icon: ImageIcon },
            { id: 'projects', label: 'PROJECTS', icon: Terminal },
            { id: 'messages', label: 'MESSAGES', icon: Mail },
            { id: 'stats', label: 'STATS', icon: BarChart },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-3 text-[10px] font-mono uppercase tracking-widest transition-colors duration-0 border-r border-black flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-black text-white'
                  : 'bg-white text-black hover:bg-gray-50'
              }`}
            >
              <tab.icon className="h-3.5 w-3.5" />
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* Hero Image Tab */}
        {activeTab === 'hero' && (
          <motion.div
            key="hero"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0 0)' }}
            transition={{ duration: 0.2, ease: 'linear' }}
            className="space-y-6"
          >
            <div className="border border-black p-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold tracking-tight mb-2">Hero Section Image</h2>
                <p className="text-xs font-mono uppercase tracking-wider text-gray-500">
                  // RECOMMENDED: 800x800px, MAX 5MB
                </p>
              </div>

              {heroImage && (
                <div className="mb-6">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-gray-600 mb-3">
                    CURRENT.IMAGE
                  </div>
                  <div className="relative w-full aspect-square max-w-md border border-black">
                    <img
                      src={heroImage}
                      alt="Hero"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const parent = e.currentTarget.parentElement;
                        if (parent) {
                          parent.innerHTML =
                            '<div class="flex items-center justify-center h-full text-red-500"><p>Failed to load</p></div>';
                        }
                      }}
                    />
                  </div>
                  <p className="text-[10px] font-mono text-gray-400 mt-2 break-all">
                    {heroImage}
                  </p>
                </div>
              )}

              <div className="space-y-3">
                <div className="text-[10px] font-mono uppercase tracking-widest text-gray-600">
                  {heroImage ? 'UPLOAD.NEW' : 'UPLOAD.IMAGE'}
                </div>
                <HeroImageUpload
                  currentImageUrl={heroImage || undefined}
                  onUploadSuccess={handleHeroImageUpload}
                  editable={true}
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <motion.div
            key="projects"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0 0)' }}
            transition={{ duration: 0.2, ease: 'linear' }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold tracking-tight">Manage Projects</h2>
              <button
                onClick={() => {
                  setShowProjectForm(!showProjectForm);
                  setEditingProject(null);
                }}
                className="h-10 px-4 bg-black text-white hover:bg-white hover:text-black border border-black transition-colors duration-0 flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest"
              >
                {showProjectForm ? (
                  <>
                    <X className="h-3.5 w-3.5" />
                    CANCEL
                  </>
                ) : (
                  <>
                    <Plus className="h-3.5 w-3.5" />
                    NEW.PROJECT
                  </>
                )}
              </button>
            </div>

            {showProjectForm && (
              <div className="border border-black p-6">
                <form onSubmit={handleProjectSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label className="block text-[10px] font-mono uppercase tracking-widest text-gray-600">
                        TITLE *
                      </label>
                      <input
                        value={projectForm.title}
                        onChange={(e) =>
                          setProjectForm({ ...projectForm, title: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-300 focus:border-black rounded-none font-mono text-sm transition-colors duration-0 focus:outline-none"
                        required
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="block text-[10px] font-mono uppercase tracking-widest text-gray-600">
                        IMAGE.URL
                      </label>
                      <input
                        value={projectForm.image_url}
                        onChange={(e) =>
                          setProjectForm({ ...projectForm, image_url: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-300 focus:border-black rounded-none font-mono text-sm transition-colors duration-0 focus:outline-none"
                        placeholder="https://..."
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="block text-[10px] font-mono uppercase tracking-widest text-gray-600">
                      SHORT.DESC *
                    </label>
                    <input
                      value={projectForm.short_description}
                      onChange={(e) =>
                        setProjectForm({ ...projectForm, short_description: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 focus:border-black rounded-none font-mono text-sm transition-colors duration-0 focus:outline-none"
                      required
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="block text-[10px] font-mono uppercase tracking-widest text-gray-600">
                      DESCRIPTION *
                    </label>
                    <textarea
                      value={projectForm.description}
                      onChange={(e) =>
                        setProjectForm({ ...projectForm, description: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 focus:border-black rounded-none font-mono text-sm transition-colors duration-0 focus:outline-none resize-none"
                      rows={4}
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label className="block text-[10px] font-mono uppercase tracking-widest text-gray-600">
                        CATEGORY *
                      </label>
                      <input
                        value={projectForm.category}
                        onChange={(e) =>
                          setProjectForm({ ...projectForm, category: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-300 focus:border-black rounded-none font-mono text-sm transition-colors duration-0 focus:outline-none"
                        placeholder="UI/UX Design"
                        required
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="block text-[10px] font-mono uppercase tracking-widest text-gray-600">
                        DATE *
                      </label>
                      <input
                        value={projectForm.date}
                        onChange={(e) =>
                          setProjectForm({ ...projectForm, date: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-300 focus:border-black rounded-none font-mono text-sm transition-colors duration-0 focus:outline-none"
                        placeholder="January 2024"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="block text-[10px] font-mono uppercase tracking-widest text-gray-600">
                      PLATFORM (COMMA.SEPARATED) *
                    </label>
                    <input
                      value={projectForm.platform}
                      onChange={(e) =>
                        setProjectForm({ ...projectForm, platform: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 focus:border-black rounded-none font-mono text-sm transition-colors duration-0 focus:outline-none"
                      placeholder="Figma, Adobe XD, Prototyping"
                      required
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="block text-[10px] font-mono uppercase tracking-widest text-gray-600">
                      TECH.STACK (COMMA.SEPARATED) *
                    </label>
                    <input
                      value={projectForm.tech_stack}
                      onChange={(e) =>
                        setProjectForm({ ...projectForm, tech_stack: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 focus:border-black rounded-none font-mono text-sm transition-colors duration-0 focus:outline-none"
                      placeholder="Next.js, TypeScript, Tailwind"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label className="block text-[10px] font-mono uppercase tracking-widest text-gray-600">
                        GITHUB.URL
                      </label>
                      <input
                        value={projectForm.github_url}
                        onChange={(e) =>
                          setProjectForm({ ...projectForm, github_url: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-300 focus:border-black rounded-none font-mono text-sm transition-colors duration-0 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="block text-[10px] font-mono uppercase tracking-widest text-gray-600">
                        LIVE.URL
                      </label>
                      <input
                        value={projectForm.live_url}
                        onChange={(e) =>
                          setProjectForm({ ...projectForm, live_url: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-300 focus:border-black rounded-none font-mono text-sm transition-colors duration-0 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex gap-px">
                    <button
                      type="submit"
                      className="flex-1 h-12 bg-black text-white hover:bg-white hover:text-black border border-black transition-colors duration-0 flex items-center justify-center gap-2 text-[10px] font-mono uppercase tracking-widest"
                    >
                      <Save className="h-3.5 w-3.5" />
                      {editingProject ? 'UPDATE' : 'CREATE'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowProjectForm(false);
                        setEditingProject(null);
                      }}
                      className="flex-1 h-12 bg-white text-black hover:bg-black hover:text-white border border-black transition-colors duration-0 flex items-center justify-center gap-2 text-[10px] font-mono uppercase tracking-widest"
                    >
                      <X className="h-3.5 w-3.5" />
                      CANCEL
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Projects Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-black border border-black">
              {projects.map((project) => (
                <div key={project.id} className="bg-white p-6">
                  <h3 className="font-bold text-sm mb-2 truncate">{project.title}</h3>
                  <p className="text-xs text-gray-600 mb-1 line-clamp-1">
                    {project.short_description}
                  </p>
                  <p className="text-[10px] font-mono uppercase text-gray-400 mb-4">
                    {project.category}
                  </p>
                  <div className="flex gap-px">
                    <button
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
                      className="flex-1 h-8 border border-black hover:bg-black hover:text-white transition-colors duration-0 flex items-center justify-center"
                    >
                      <Edit className="h-3 w-3" />
                    </button>
                    <button
                      onClick={() => handleDeleteProject(project.id)}
                      className="flex-1 h-8 border border-black hover:bg-black hover:text-white transition-colors duration-0 flex items-center justify-center"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {projects.length === 0 && (
              <div className="border border-gray-200 p-12 text-center">
                <p className="text-xs font-mono uppercase tracking-widest text-gray-400">
                  NO.PROJECTS.YET
                </p>
              </div>
            )}
          </motion.div>
        )}

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <motion.div
            key="messages"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0 0)' }}
            transition={{ duration: 0.2, ease: 'linear' }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold tracking-tight">Contact Messages</h2>

            <div className="border border-black rounded-none">
              {messages.map((message, index) => (
                <div
                  key={message.id}
                  className={`p-6 ${index !== 0 ? 'border-t border-gray-200' : ''} ${
                    !message.read ? 'bg-gray-50' : 'bg-white'
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-sm">{message.name}</h3>
                      <p className="text-xs text-gray-600 font-mono">{message.email}</p>
                    </div>
                    {!message.read && (
                      <button
                        onClick={() => handleMarkAsRead(message.id)}
                        className="px-3 py-1.5 border border-black hover:bg-black hover:text-white transition-colors duration-0 text-[10px] font-mono uppercase tracking-widest"
                      >
                        MARK.READ
                      </button>
                    )}
                  </div>
                  <p className="text-sm text-gray-700 mb-3">{message.message}</p>
                  <p className="text-[10px] text-gray-400 font-mono">
                    {new Date(message.created_at).toLocaleString()}
                  </p>
                </div>
              ))}

              {messages.length === 0 && (
                <div className="p-12 text-center">
                  <p className="text-xs font-mono uppercase tracking-widest text-gray-400">
                    NO.MESSAGES.YET
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Stats Tab */}
        {activeTab === 'stats' && (
          <motion.div
            key="stats"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0 0)' }}
            transition={{ duration: 0.2, ease: 'linear' }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold tracking-tight">Statistics</h2>

            <div className="grid md:grid-cols-3 gap-px bg-black border border-black">
              {[
                { value: projects.length, label: 'TOTAL.PROJECTS' },
                { value: messages.length, label: 'TOTAL.MESSAGES' },
                { value: messages.filter((m) => !m.read).length, label: 'UNREAD.MESSAGES' },
              ].map((stat, index) => (
                <div key={index} className="bg-white p-8 text-center">
                  <div className="text-4xl font-bold tracking-tight text-black mb-2">
                    {stat.value}
                  </div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest font-mono">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="border border-black p-6">
              <div className="text-[10px] font-mono uppercase tracking-widest text-gray-600 mb-4">
                // SYSTEM.INFO
              </div>
              <div className="space-y-2 text-sm font-mono">
                <div className="flex justify-between">
                  <span className="text-gray-500">BUILD:</span>
                  <span>v1.0.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">STATUS:</span>
                  <span className="flex items-center gap-2">
                    <Activity className="h-3 w-3 text-green-500" />
                    ONLINE
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">UPTIME:</span>
                  <span>{time}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
