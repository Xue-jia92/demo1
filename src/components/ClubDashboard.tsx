import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  BarChart2, 
  Filter, 
  TrendingUp, 
  Clock, 
  UserPlus, 
  MoreHorizontal,
  ChevronRight,
  Sparkles,
  Zap,
  Target
} from 'lucide-react';

const ClubDashboard: React.FC = () => {
  const [candidates] = useState([
    { id: 'c1', name: '张同学', match: 94, tags: ['Tech', 'Social'], status: '面试中', appliedAt: '2 小时前' },
    { id: 'c2', name: '李同学', match: 88, tags: ['Sports', 'Art'], status: '待处理', appliedAt: '5 小时前' },
    { id: 'c3', name: '王同学', match: 82, tags: ['Social', 'Tech'], status: '已入围', appliedAt: '1 天前' },
  ]);

  const tagMap: Record<string, string> = { Tech: '技术', Social: '社交', Sports: '体育', Art: '艺术', Academic: '学术' };
  const statColor: Record<string, { bg: string; icon: string }> = {
    indigo: { bg: 'bg-indigo-50', icon: 'text-indigo-600' },
    emerald: { bg: 'bg-emerald-50', icon: 'text-emerald-600' },
    amber: { bg: 'bg-amber-50', icon: 'text-amber-600' },
    violet: { bg: 'bg-violet-50', icon: 'text-violet-600' },
    slate: { bg: 'bg-slate-50', icon: 'text-slate-600' }
  };
  const barColor: Record<string, string> = {
    indigo: 'bg-indigo-500',
    emerald: 'bg-emerald-500',
    amber: 'bg-amber-500',
    violet: 'bg-violet-500',
    slate: 'bg-slate-500'
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-extrabold tracking-tight">社团招新后台</h2>
          <p className="text-slate-500 mt-2">用数据与 AI 提升筛选效率，找到最合适的成员。</p>
        </div>
        <div className="flex items-center gap-4 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
          <div className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl font-bold flex items-center gap-2">
            <Sparkles className="w-4 h-4" /> AI 匹配已开启
          </div>
          <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all flex items-center gap-2">
            <UserPlus className="w-5 h-5" /> 发起新一轮招新
          </button>
        </div>
      </header>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { icon: Users, label: '报名人数', val: '156', trend: '+12%', color: 'indigo' },
          { icon: Target, label: '高匹配候选（90%+）', val: '24', trend: '+5%', color: 'emerald' },
          { icon: Clock, label: '平均响应时间', val: '4.2h', trend: '-15%', color: 'amber' },
          { icon: TrendingUp, label: '转化率', val: '18%', trend: '+2%', color: 'violet' }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className={`w-12 h-12 ${statColor[stat.color]?.bg || 'bg-slate-50'} rounded-2xl flex items-center justify-center mb-6`}>
              <stat.icon className={`w-6 h-6 ${statColor[stat.color]?.icon || 'text-slate-600'}`} />
            </div>
            <div className="space-y-1">
              <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">{stat.label}</p>
              <div className="flex items-end justify-between">
                <span className="text-3xl font-extrabold">{stat.val}</span>
                <span className={`text-xs font-bold px-2 py-1 rounded-lg ${stat.trend.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                  {stat.trend}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Candidate List */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h3 className="text-xl font-bold">AI 推荐候选人</h3>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="text" placeholder="搜索姓名/标签…" className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none" />
              </div>
              <button className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-400 hover:text-indigo-600 transition-colors">
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="divide-y divide-slate-50">
            {candidates.map(candidate => (
              <div key={candidate.id} className="p-8 hover:bg-slate-50/50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-6 group">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center text-2xl font-bold text-slate-400 group-hover:from-indigo-100 group-hover:to-indigo-200 group-hover:text-indigo-600 transition-all duration-500 shadow-inner">
                    {candidate.name.charAt(0)}
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-lg font-extrabold flex items-center gap-2">
                      {candidate.name}
                      <span className="px-2 py-0.5 bg-indigo-600 text-white rounded-lg text-[10px] font-bold shadow-lg shadow-indigo-100">
                        匹配度 {candidate.match}%
                      </span>
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {candidate.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md uppercase tracking-tighter">#{tagMap[tag] || tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-8">
                  <div className="text-right space-y-1">
                    <p className="text-sm font-bold text-slate-700">{candidate.status}</p>
                    <p className="text-xs text-slate-400">{candidate.appliedAt}</p>
                  </div>
                  <button className="w-12 h-12 bg-white border border-slate-200 rounded-2xl flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-100 hover:shadow-lg transition-all active:scale-95 group-hover:translate-x-1">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="p-6 text-center border-t border-slate-50">
            <button className="text-indigo-600 font-bold hover:underline">查看全部候选人</button>
          </div>
        </div>

        {/* AI Analysis Side Panel */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-3xl text-white shadow-xl space-y-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Zap className="w-20 h-20 text-indigo-400" />
            </div>
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-indigo-400" /> 招新洞察
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              结合历史与当前数据，本轮更吸引 <span className="text-white font-bold">技术型</span> 同学，建议调整面试题侧重。
            </p>
            <div className="p-5 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 space-y-4">
              <p className="text-xs font-bold uppercase tracking-widest text-indigo-400">匹配建议</p>
              <p className="text-sm leading-relaxed text-indigo-50">
                优先关注带有 <span className="font-bold underline underline-offset-4 decoration-indigo-500">创新</span> 标签的候选人，留存与贡献潜力更高。
              </p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <BarChart2 className="w-6 h-6 text-indigo-600" /> 渠道分析
            </h3>
            <div className="space-y-6">
              {[
                { label: '平台智能推荐', val: 65, color: 'indigo' },
                { label: '好友推荐', val: 20, color: 'emerald' },
                { label: '线下海报', val: 15, color: 'slate' }
              ].map((channel, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-500">
                    <span>{channel.label}</span>
                    <span>{channel.val}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full ${barColor[channel.color] || 'bg-slate-500'} rounded-full`} style={{ width: `${channel.val}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubDashboard;
