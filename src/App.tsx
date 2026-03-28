import React, { useMemo, useState } from 'react';
import { CalendarDays, ChevronRight, GraduationCap, Sparkles } from 'lucide-react';
import { Club, mockClubs } from './data/mockData';
import ApplicationsPage, { Application } from './components/ApplicationsPage';
import ClubCenterCard from './components/ClubCenterCard';
import ClubDrawer from './components/ClubDrawer';
import InterestSurvey from './components/InterestSurvey';
import ProfileRadar from './components/ProfileRadar';
import ClubCard from './components/ClubCard';
import InterviewAssistant from './components/InterviewAssistant';
import ClubDashboard from './components/ClubDashboard';
import AppShell, { AppView } from './components/layout/AppShell';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('discover');
  const [userProfile, setUserProfile] = useState<any>(null);
  const [recommendedClubs, setRecommendedClubs] = useState<Club[]>([]);
  const [clubQuery, setClubQuery] = useState('');
  const [applications, setApplications] = useState<Application[]>([]);
  const [drawerClubId, setDrawerClubId] = useState<string | null>(null);
  const [interviewClubName, setInterviewClubName] = useState<string | undefined>(undefined);
  const [clubCenterTab, setClubCenterTab] = useState<
    '文化艺术' | '公益志愿' | '学术科创' | '体育健身' | '实践促进' | '国际交流' | '全部'
  >('文化艺术');

  const runMatching = (profile: any) => {
    const scoredClubs = mockClubs.map(club => {
      let score = 0;
      if (profile.interests.includes(club.category)) score += 40;
      score += Math.min(50, (club.activityLevel / 100) * 20 + (club.membersCount > 100 ? 10 : 0) + 20);
      return { ...club, matchScore: score };
    }).sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
    
    setRecommendedClubs(scoredClubs);
    setView('profile');
  };

  const handleSurveyComplete = (results: any) => {
    setUserProfile(results);
    runMatching(results);
  };

  const filteredClubs = useMemo(() => {
    const q = clubQuery.trim().toLowerCase();
    if (!q) return mockClubs;
    return mockClubs.filter(c => {
      const hay = `${c.name} ${c.category} ${c.description} ${c.tags.join(' ')} ${c.skillsRequired.join(' ')}`.toLowerCase();
      return hay.includes(q);
    });
  }, [clubQuery]);

  const clubCenterList = useMemo(() => {
    const tabMap: Record<typeof clubCenterTab, Club['category'][] | 'all'> = {
      全部: 'all',
      文化艺术: ['Art'],
      公益志愿: ['Social'],
      学术科创: ['Tech', 'Academic'],
      体育健身: ['Sports'],
      实践促进: ['Social'],
      国际交流: ['Social']
    };
    const filterCats = tabMap[clubCenterTab];
    const base = filteredClubs;
    if (filterCats === 'all') return base;
    return base.filter((c) => filterCats.includes(c.category));
  }, [clubCenterTab, filteredClubs]);

  const hotClubs = useMemo(() => {
    return [...mockClubs].sort((a, b) => b.activityLevel - a.activityLevel).slice(0, 3);
  }, []);

  const drawerClub = useMemo(() => {
    if (!drawerClubId) return null;
    return mockClubs.find((c) => c.id === drawerClubId) || null;
  }, [drawerClubId]);

  const appliedClubIds = useMemo(() => {
    return new Set(applications.map((a) => a.clubId));
  }, [applications]);

  const applyToClub = (club: Club) => {
    setApplications((prev) => {
      if (prev.some((a) => a.clubId === club.id)) return prev;
      const now = new Date().toLocaleString('zh-CN', { hour12: false });
      return [
        ...prev,
        {
          id: `app_${Date.now()}`,
          clubId: club.id,
          status: '已报名',
          appliedAt: now
        }
      ];
    });
    setDrawerClubId(null);
    setView('applications');
  };

  return (
    <AppShell view={view} onNavigate={setView}>
      {view === 'discover' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            <div className="rounded-[32px] border border-slate-200 bg-white/80 backdrop-blur shadow-sm overflow-hidden">
              <div className="p-8 md:p-10 flex flex-col md:flex-row md:items-center gap-8">
                <div className="flex-1 space-y-4">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-red-100 text-red-700 text-sm font-extrabold">
                    <Sparkles className="w-4 h-4" />
                    新生招新季 · 智能匹配已上线
                  </div>
                  <div className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                    欢迎回来，新生同学
                  </div>
                  <div className="text-slate-600 text-lg leading-relaxed max-w-2xl">
                    像在教学平台完成一门课程一样，按步骤完成测评、浏览、报名与面试训练，我们会持续优化你的匹配结果。
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => setView('survey')}
                      className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-red-700 text-white font-extrabold shadow-lg shadow-red-100 hover:bg-red-800"
                    >
                      开始兴趣测评 <ChevronRight className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setView('clubs')}
                      className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white border-2 border-slate-200 font-extrabold text-slate-700 hover:bg-slate-50"
                    >
                      去社团广场看看
                    </button>
                  </div>
                </div>
                <div className="w-full md:w-[340px] rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 shadow-xl">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-bold tracking-widest text-white/70 uppercase">本周任务</div>
                    <div className="text-xs font-extrabold text-white/80">40%</div>
                  </div>
                  <div className="mt-2 text-xl font-extrabold leading-snug">完成画像并报名 1 个社团</div>
                  <div className="mt-4 h-2 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full w-[40%] bg-red-600 rounded-full" />
                  </div>
                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                      <div className="text-xs text-white/70 font-bold">今日安排</div>
                      <div className="mt-2 text-sm font-extrabold">测评 · 3 分钟</div>
                    </div>
                    <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                      <div className="text-xs text-white/70 font-bold">下一步</div>
                      <div className="mt-2 text-sm font-extrabold">AI 面试训练</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: GraduationCap, title: '兴趣测评', desc: '用问卷生成画像，获得可解释推荐。' },
                { icon: Sparkles, title: '智能推荐', desc: '按照匹配度优先级排序，支持快速筛选。' },
                { icon: CalendarDays, title: '招新节奏', desc: '统一跟踪报名与面试进度，避免错过时间。' }
              ].map((x, i) => (
                <div key={i} className="rounded-3xl border border-slate-200 bg-white/80 backdrop-blur p-7 shadow-sm">
                  <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center text-red-700">
                    <x.icon className="w-6 h-6" />
                  </div>
                  <div className="mt-5 text-xl font-extrabold">{x.title}</div>
                  <div className="mt-2 text-slate-500 font-semibold leading-relaxed">{x.desc}</div>
                </div>
              ))}
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white/80 backdrop-blur shadow-sm p-8">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-extrabold">本周热门社团</div>
                  <div className="text-slate-500 font-semibold mt-1">参考活跃度与规模综合排序</div>
                </div>
                <button onClick={() => setView('clubs')} className="px-4 py-2 rounded-2xl border border-slate-200 bg-white font-extrabold text-slate-700 hover:bg-slate-50">
                  查看更多
                </button>
              </div>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                {hotClubs.map((club) => (
                  <ClubCard key={club.id} club={club} onOpen={(c) => setDrawerClubId(c.id)} onApply={applyToClub} />
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <div className="rounded-3xl border border-slate-200 bg-white/80 backdrop-blur shadow-sm p-7">
              <div className="text-xs font-bold tracking-widest text-slate-400 uppercase">我的进度</div>
              <div className="mt-2 text-2xl font-extrabold">招新学习路径</div>
              <div className="mt-5 space-y-3">
                {[
                  { t: '完成兴趣测评', s: userProfile ? '已完成' : '未开始', done: !!userProfile },
                  { t: '查看推荐列表', s: recommendedClubs.length ? '已生成' : '未生成', done: !!recommendedClubs.length },
                  { t: '报名社团', s: '待完成', done: false },
                  { t: 'AI 面试训练', s: '待完成', done: false }
                ].map((x) => (
                  <div key={x.t} className="flex items-center justify-between p-4 rounded-2xl border border-slate-200 bg-white">
                    <div className="font-extrabold text-slate-700">{x.t}</div>
                    <div className={x.done ? 'text-emerald-600 font-extrabold text-sm' : 'text-slate-400 font-extrabold text-sm'}>{x.s}</div>
                  </div>
                ))}
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <button onClick={() => setView('profile')} className="px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 font-extrabold text-slate-700 hover:bg-white">
                  查看画像
                </button>
                <button onClick={() => setView('interview')} className="px-4 py-3 rounded-2xl bg-red-700 text-white font-extrabold hover:bg-red-800 shadow-lg shadow-red-100">
                  去练面试
                </button>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white/80 backdrop-blur shadow-sm p-7">
              <div className="text-2xl font-extrabold">今日提醒</div>
              <div className="mt-4 space-y-3">
                {[
                  { t: '完善基本资料', d: '完善信息可提升推荐准确度。' },
                  { t: '收藏 3 个社团', d: '便于对比面试要求与时间投入。' },
                  { t: '准备自我介绍', d: 'AI 面试助手可给你模板与追问。' }
                ].map((x) => (
                  <div key={x.t} className="rounded-2xl border border-slate-200 bg-white p-5">
                    <div className="font-extrabold text-slate-700">{x.t}</div>
                    <div className="mt-1 text-slate-500 font-semibold">{x.d}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {view === 'survey' && (
        <div className="max-w-3xl mx-auto">
          <InterestSurvey onComplete={handleSurveyComplete} />
        </div>
      )}

      {view === 'profile' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <ProfileRadar profile={userProfile || { traits: { art: 0, tech: 0, sports: 0, social: 0, logic: 0 }, tags: [], interests: [] }} />
            <div className="rounded-3xl border border-slate-200 bg-white/80 backdrop-blur p-7 shadow-sm">
              <div className="text-2xl font-extrabold">你的画像标签</div>
              <div className="mt-4 flex flex-wrap gap-2">
                {(userProfile?.tags || ['先完成测评', '生成画像标签']).map((tag: string) => (
                  <span key={tag} className="px-3 py-1.5 bg-red-50 text-red-700 border border-red-100 rounded-full text-sm font-extrabold">
                    #{tag}
                  </span>
                ))}
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <button onClick={() => setView('survey')} className="px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 font-extrabold text-slate-700 hover:bg-white">
                  重新测评
                </button>
                <button onClick={() => setView('clubs')} className="px-4 py-3 rounded-2xl bg-red-700 text-white font-extrabold hover:bg-red-800 shadow-lg shadow-red-100">
                  去报名社团
                </button>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white/80 backdrop-blur p-7 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-2xl font-extrabold">为你推荐</div>
                  <div className="text-slate-500 font-semibold mt-1">基于画像的匹配度排序</div>
                </div>
                <button onClick={() => setView('clubs')} className="px-4 py-2 rounded-2xl border border-slate-200 bg-white font-extrabold text-slate-700 hover:bg-slate-50">
                  打开社团广场
                </button>
              </div>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {(recommendedClubs.length ? recommendedClubs : mockClubs.slice(0, 4)).map((club) => (
                  <ClubCard key={club.id} club={club} onOpen={(c) => setDrawerClubId(c.id)} onApply={applyToClub} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {view === 'clubs' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-lg p-5">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="text-lg font-extrabold text-slate-900">社团中心</div>
              <div className="flex items-center gap-2">
                <input
                  value={clubQuery}
                  onChange={(e) => setClubQuery(e.target.value)}
                  placeholder="输入关键字搜索社团"
                  className="w-[280px] max-w-[70vw] px-4 py-2 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-600/15 font-semibold"
                />
                <button
                  onClick={() => setClubQuery('')}
                  className="px-3 py-2 rounded-md border border-slate-200 bg-white hover:bg-slate-50 font-extrabold text-sm text-slate-700"
                >
                  重置
                </button>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-3 overflow-x-auto">
              {(['文化艺术', '公益志愿', '学术科创', '体育健身', '实践促进', '国际交流', '全部'] as const).map((t) => {
                const active = clubCenterTab === t;
                return (
                  <button
                    key={t}
                    onClick={() => setClubCenterTab(t)}
                    className={[
                      'px-4 py-2 rounded-full border text-sm font-extrabold whitespace-nowrap',
                      active ? 'bg-red-700 text-white border-red-700' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    ].join(' ')}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {clubCenterList.map((club) => (
              <ClubCenterCard key={club.id} club={club} onOpen={(c) => setDrawerClubId(c.id)} onApply={applyToClub} />
            ))}
          </div>
        </div>
      )}

      {view === 'applications' && (
        <ApplicationsPage
          applications={applications}
          clubs={mockClubs}
          onGoClubs={() => setView('clubs')}
          onStartInterview={(clubId) => {
            const club = mockClubs.find((c) => c.id === clubId);
            setInterviewClubName(club?.name);
            setView('interview');
          }}
          onUpdate={(id, patch) => setApplications((prev) => prev.map((x) => (x.id === id ? { ...x, ...patch } : x)))}
        />
      )}

      {view === 'interview' && <InterviewAssistant key={interviewClubName || 'default'} initialClubName={interviewClubName} />}
      {view === 'clubAdmin' && <ClubDashboard />}

      <ClubDrawer
        open={!!drawerClub}
        club={drawerClub}
        applied={!!(drawerClub && appliedClubIds.has(drawerClub.id))}
        onClose={() => setDrawerClubId(null)}
        onApply={applyToClub}
        onStartInterview={(club) => {
          setInterviewClubName(club.name);
          setDrawerClubId(null);
          setView('interview');
        }}
      />
    </AppShell>
  );
};

export default App;
