'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Mail, Download, Trash2, RefreshCw, Calendar, User } from 'lucide-react';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface Subscriber {
  id: string;
  email: string;
  status: string;
  subscribed_at: string;
  source: string;
  created_at: string;
}

export default function NewsletterDashboard() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'active' | 'unsubscribed'>('all');

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('newsletter_subscribers')
        .select('*')
        .order('subscribed_at', { ascending: false });

      if (error) throw error;
      setSubscribers(data || []);
    } catch (error) {
      console.error('Error fetching subscribers:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredSubscribers = subscribers.filter(sub => {
    if (filter === 'all') return true;
    return sub.status === filter;
  });

  const activeCount = subscribers.filter(s => s.status === 'active').length;
  const unsubscribedCount = subscribers.filter(s => s.status === 'unsubscribed').length;

  const exportToCSV = () => {
    const headers = ['Email', 'Status', 'Subscribed At', 'Source'];
    const rows = filteredSubscribers.map(sub => [
      sub.email,
      sub.status,
      new Date(sub.subscribed_at).toLocaleString(),
      sub.source
    ]);

    const csv = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `newsletter-subscribers-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">
          NEWSLETTER SUBSCRIBERS
        </h1>
        <p className="text-sm font-mono text-gray-600">
          Manage and export your newsletter subscribers
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="border-4 border-black p-6 bg-white">
          <div className="text-3xl font-black mb-2">{subscribers.length}</div>
          <div className="text-xs font-mono uppercase text-gray-600">Total Subscribers</div>
        </div>
        <div className="border-4 border-black p-6 bg-green-50">
          <div className="text-3xl font-black mb-2 text-green-700">{activeCount}</div>
          <div className="text-xs font-mono uppercase text-gray-600">Active</div>
        </div>
        <div className="border-4 border-black p-6 bg-red-50">
          <div className="text-3xl font-black mb-2 text-red-700">{unsubscribedCount}</div>
          <div className="text-xs font-mono uppercase text-gray-600">Unsubscribed</div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          {/* Filter Buttons */}
          {(['all', 'active', 'unsubscribed'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 border-2 border-black font-mono text-xs uppercase tracking-wider transition-colors duration-0
                ${filter === f ? 'bg-black text-white' : 'bg-white hover:bg-gray-100'}`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {/* Refresh */}
          <button
            onClick={fetchSubscribers}
            disabled={loading}
            className="px-4 py-2 border-2 border-black font-mono text-xs uppercase hover:bg-black hover:text-white transition-colors duration-0 flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            REFRESH
          </button>

          {/* Export */}
          <button
            onClick={exportToCSV}
            disabled={filteredSubscribers.length === 0}
            className="px-4 py-2 bg-black text-white border-2 border-black font-mono text-xs uppercase hover:bg-white hover:text-black transition-colors duration-0 flex items-center gap-2 disabled:opacity-50"
          >
            <Download className="h-4 w-4" />
            EXPORT CSV
          </button>
        </div>
      </div>

      {/* Subscribers List */}
      {loading ? (
        <div className="border-4 border-black p-20 text-center">
          <div className="text-2xl font-black animate-pulse">LOADING...</div>
        </div>
      ) : filteredSubscribers.length === 0 ? (
        <div className="border-4 border-black p-20 text-center">
          <Mail className="h-12 w-12 mx-auto mb-4 opacity-20" />
          <div className="text-2xl font-black mb-2">NO SUBSCRIBERS</div>
          <p className="text-sm font-mono text-gray-600">
            {filter === 'all' 
              ? 'No one has subscribed yet.' 
              : `No ${filter} subscribers.`}
          </p>
        </div>
      ) : (
        <div className="border-4 border-black overflow-hidden">
          <table className="w-full">
            <thead className="bg-black text-white">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-mono uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-xs font-mono uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-mono uppercase tracking-wider">
                  Subscribed
                </th>
                <th className="px-6 py-4 text-left text-xs font-mono uppercase tracking-wider">
                  Source
                </th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-black">
              {filteredSubscribers.map((subscriber) => (
                <tr key={subscriber.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span className="font-mono text-sm">{subscriber.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`
                      px-3 py-1 text-xs font-mono uppercase border-2
                      ${subscriber.status === 'active' 
                        ? 'bg-green-50 border-green-600 text-green-700' 
                        : 'bg-red-50 border-red-600 text-red-700'}
                    `}>
                      {subscriber.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs font-mono text-gray-600">
                      {new Date(subscriber.subscribed_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-mono uppercase text-gray-600">
                      {subscriber.source}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Results Counter */}
      {!loading && filteredSubscribers.length > 0 && (
        <div className="mt-4 text-sm font-mono text-gray-600">
          Showing {filteredSubscribers.length} of {subscribers.length} subscribers
        </div>
      )}
    </div>
  );
}
