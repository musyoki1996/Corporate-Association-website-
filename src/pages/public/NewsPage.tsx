import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { NewsArticle } from '../../types';
import { Bell, Calendar, ArrowRight, Share2, Search, ArrowLeft } from 'lucide-react';

interface NewsPageProps {
  initialSlug?: string;
  onNavigate: (path: string) => void;
}

export const NewsPage: React.FC<NewsPageProps> = ({ initialSlug, onNavigate }) => {
  const { news } = useApp();
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(() => {
    if (initialSlug) {
      return news.find(n => n.slug === initialSlug) || null;
    }
    return null;
  });
  const [categoryFilter, setCategoryFilter] = useState('ALL');

  const categories = ['ALL', 'Official Statement', 'Safety Alert', 'Regulatory Update', 'Advocacy'];

  const filteredNews = categoryFilter === 'ALL'
    ? news
    : news.filter(n => n.category === categoryFilter);

  // If viewing single article
  if (selectedArticle) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] py-12 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto space-y-6">
          <button
            onClick={() => setSelectedArticle(null)}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#101F68] hover:text-orange-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All News & Announcements</span>
          </button>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
            <img
              src={selectedArticle.imageUrl}
              alt={selectedArticle.title}
              className="w-full h-80 object-cover"
            />
            <div className="p-8 sm:p-10 space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2.5 py-1 rounded">
                  {selectedArticle.category}
                </span>
                <span className="text-xs text-slate-500">
                  {new Date(selectedArticle.publishedAt).toLocaleDateString('en-KE', { dateStyle: 'full' })} · By {selectedArticle.author}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#101F68] leading-tight">
                {selectedArticle.title}
              </h1>

              <div className="p-4 rounded-xl bg-slate-50 border-l-4 border-orange-500 text-xs sm:text-sm text-slate-700 italic">
                {selectedArticle.summary}
              </div>

              <div className="pt-4 text-sm text-slate-700 leading-relaxed space-y-4">
                <p>{selectedArticle.content}</p>
                <p>
                  The Digital Boda Drivers and Deliveries Association of Kenya (DBDDAK) continues to liaise closely with relevant government ministries, corporate app partners, and security apparatus to guarantee that motorcycle transport remains safe, orderly, and economically empowering for all citizens.
                </p>
                <p>
                  For media inquiries or further clarification, contact the National Communications Secretariat at <strong className="font-mono">admin@digitalboda.co.ke</strong> or telephone <strong className="font-mono">+254 710 353 974</strong>.
                </p>
              </div>

              <div className="pt-6 border-t border-slate-200 flex items-center justify-between">
                <button
                  onClick={() => alert('Link copied to clipboard for social sharing!')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs text-slate-600 font-medium"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share Statement</span>
                </button>
                <button
                  onClick={() => onNavigate('/verify-member')}
                  className="text-xs font-bold text-orange-600 hover:underline"
                >
                  Verify a Member
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <section className="bg-[#101F68] text-white py-14 sm:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 text-orange-400 text-xs font-semibold uppercase tracking-wider">
            <Bell className="w-4 h-4" />
            <span>Official Communications Hub</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            News, Press Releases & Safety Alerts
          </h1>
          <p className="text-base sm:text-lg text-slate-200 max-w-2xl font-normal leading-relaxed">
            Timely policy updates, regulatory advisories, and association announcements for riders and the Kenyan public.
          </p>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 space-y-8">
        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto text-xs font-bold border-b border-slate-200 pb-3">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`py-2 px-4 rounded-lg transition-colors whitespace-nowrap ${
                categoryFilter === cat
                  ? 'bg-[#101F68] text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map(article => (
            <div
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="h-48 overflow-hidden bg-slate-900 relative">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-[#101F68] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                    {article.category}
                  </span>
                </div>

                <div className="p-5 space-y-2">
                  <p className="text-[11px] text-slate-500">
                    {new Date(article.publishedAt).toLocaleDateString('en-KE', { dateStyle: 'medium' })} · {article.author}
                  </p>
                  <h3 className="text-base font-bold text-[#101F68] group-hover:text-orange-600 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {article.summary}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-4">
                <span className="text-xs font-bold text-orange-600 group-hover:underline flex items-center gap-1">
                  Read Full Statement <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
