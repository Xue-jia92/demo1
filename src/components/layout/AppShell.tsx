import React from 'react';
import { Search, User, Download, Newspaper, CalendarDays, Sparkles } from 'lucide-react';

export type AppView =
  | 'discover'
  | 'survey'
  | 'profile'
  | 'clubs'
  | 'applications'
  | 'interview'
  | 'clubAdmin';

const nav: Array<{ key: AppView; label: string }> = [
  { key: 'discover', label: '首页' },
  { key: 'clubs', label: '社团' },
  { key: 'applications', label: '我的报名' },
  { key: 'interview', label: 'AI 面试' }
];

export default function AppShell({
  view,
  onNavigate,
  children
}: {
  view: AppView;
  onNavigate: (view: AppView) => void;
  children: React.ReactNode;
}) {
  const isClubCenter = view === 'clubs';
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="h-14 flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-red-700 text-white flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="leading-tight">
                <div className="text-sm font-extrabold text-slate-900">社团招新智能匹配平台</div>
                <div className="text-[11px] font-semibold text-slate-400">ClubMatch AI</div>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-2">
              {nav.map((item) => {
                const active = item.key === view;
                return (
                  <button
                    key={item.key}
                    onClick={() => onNavigate(item.key)}
                    className={[
                      'px-4 py-2 rounded-md font-extrabold text-sm transition-colors',
                      active ? 'bg-red-700 text-white' : 'text-slate-700 hover:bg-slate-100'
                    ].join(' ')}
                  >
                    {item.label}
                  </button>
                );
              })}
              <button
                onClick={() => onNavigate('discover')}
                className="px-4 py-2 rounded-md font-extrabold text-sm text-slate-700 hover:bg-slate-100 inline-flex items-center gap-2"
              >
                <Newspaper className="w-4 h-4 text-red-700" />
                新闻
              </button>
              <button
                onClick={() => onNavigate('discover')}
                className="px-4 py-2 rounded-md font-extrabold text-sm text-slate-700 hover:bg-slate-100 inline-flex items-center gap-2"
              >
                <CalendarDays className="w-4 h-4 text-red-700" />
                活动
              </button>
              <button
                onClick={() => onNavigate('discover')}
                className="px-4 py-2 rounded-md font-extrabold text-sm text-slate-700 hover:bg-slate-100 inline-flex items-center gap-2"
              >
                <Download className="w-4 h-4 text-red-700" />
                资料下载
              </button>
            </nav>

            <div className="flex-1" />

            <div className="hidden lg:flex items-center gap-3 w-[360px]">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  placeholder="请输入关键字搜索"
                  className="w-full pl-9 pr-4 py-2 rounded-md border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-red-600/15"
                />
              </div>
            </div>

            <button className="px-4 py-2 rounded-md border border-slate-200 bg-white hover:bg-slate-50 font-extrabold text-sm text-slate-700 inline-flex items-center gap-2">
              <User className="w-4 h-4 text-red-700" />
              登录
            </button>
          </div>
        </div>

        {isClubCenter && (
          <div
            className="h-36 md:h-44 border-t border-slate-200"
            style={{
              backgroundImage:
                'linear-gradient(90deg, rgba(127,29,29,0.78), rgba(127,29,29,0.15)), linear-gradient(0deg, rgba(15,23,42,0.25), rgba(15,23,42,0.25)), radial-gradient(circle at 30% 30%, rgba(255,255,255,0.25), rgba(255,255,255,0) 55%)',
              backgroundColor: '#374151'
            }}
          >
            <div className="max-w-6xl mx-auto px-4 h-full flex items-center">
              <div className="text-white">
                <div className="text-2xl md:text-3xl font-extrabold tracking-wide">社团中心</div>
                <div className="text-white/80 font-semibold mt-1">CLUB CENTER</div>
              </div>
            </div>
          </div>
        )}
      </header>

      <main className={isClubCenter ? 'max-w-6xl mx-auto px-4 py-8' : 'max-w-7xl mx-auto px-4 py-8'}>
        {children}
      </main>

      <footer className="border-t border-slate-200 py-10 text-center text-slate-500 bg-white">
        <div className="text-sm font-semibold">© 2026 ClubMatch AI · 让兴趣与社团更高效地相遇</div>
      </footer>
    </div>
  );
}
