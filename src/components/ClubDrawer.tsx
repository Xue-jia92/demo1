import React from 'react';
import { X, Users, Star, Sparkles, Target, CalendarDays, BadgeCheck, GraduationCap } from 'lucide-react';
import type { Club } from '../data/mockData';

const categoryMap: Record<Club['category'], string> = {
  Art: '艺术',
  Tech: '技术',
  Sports: '体育',
  Social: '社交',
  Academic: '学术'
};

const difficultyMap: Record<Club['interviewDifficulty'], string> = {
  Easy: '容易',
  Medium: '中等',
  Hard: '较难'
};

export default function ClubDrawer({
  open,
  club,
  applied,
  onClose,
  onApply,
  onStartInterview
}: {
  open: boolean;
  club: Club | null;
  applied: boolean;
  onClose: () => void;
  onApply: (club: Club) => void;
  onStartInterview?: (club: Club) => void;
}) {
  if (!open || !club) return null;

  const highlights = [
    { icon: Target, title: '适合人群', desc: '希望系统性成长、愿意参与活动与项目协作的同学。' },
    { icon: GraduationCap, title: '你将获得', desc: '技能训练、同伴协作、作品展示与招新季快速成长。' },
    { icon: CalendarDays, title: '节奏建议', desc: '每周 3-5 小时稳定投入，效果最好。' }
  ];

  return (
    <div className="fixed inset-0 z-[60]">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full sm:w-[560px] bg-white shadow-2xl border-l border-slate-200 overflow-y-auto">
        <div className="p-6 border-b border-slate-200 bg-white/70 backdrop-blur sticky top-0 z-10">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-700 text-xs font-extrabold">
                  {categoryMap[club.category]}
                </span>
                <span className="px-3 py-1 rounded-full bg-red-50 border border-red-100 text-red-700 text-xs font-extrabold">
                  活跃度 {club.activityLevel}
                </span>
                <span className="px-3 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-extrabold">
                  面试 {difficultyMap[club.interviewDifficulty]}
                </span>
              </div>
              <div className="text-2xl font-extrabold text-slate-900">{club.name}</div>
              <div className="text-slate-500 font-semibold leading-relaxed">{club.description}</div>
            </div>
            <button
              onClick={onClose}
              className="w-11 h-11 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="rounded-3xl bg-gradient-to-br from-red-700 to-rose-600 text-white p-6 shadow-xl shadow-red-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="text-xs font-bold tracking-widest text-white/70 uppercase">一键报名</div>
                <div className="text-xl font-extrabold mt-1">报名后自动同步进度与面试提醒</div>
              </div>
            </div>
            <div className="mt-5 flex gap-3">
              <button
                disabled={applied}
                onClick={() => onApply(club)}
                className={[
                  'flex-1 px-5 py-3 rounded-2xl font-extrabold border',
                  applied
                    ? 'bg-white/20 border-white/20 text-white/80 cursor-not-allowed'
                    : 'bg-white text-red-700 border-white hover:bg-white/90'
                ].join(' ')}
              >
                {applied ? '已报名' : '立即报名'}
              </button>
              <button
                onClick={() => onStartInterview?.(club)}
                className="px-5 py-3 rounded-2xl font-extrabold bg-white/15 hover:bg-white/20 border border-white/20"
              >
                去练面试
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {highlights.map((h) => (
              <div key={h.title} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="w-10 h-10 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center text-red-700">
                  <h.icon className="w-5 h-5" />
                </div>
                <div className="mt-4 font-extrabold text-slate-800">{h.title}</div>
                <div className="mt-2 text-sm text-slate-500 font-semibold leading-relaxed">{h.desc}</div>
              </div>
            ))}
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-5">
            <div className="text-xl font-extrabold">招新信息</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5">
                <div className="flex items-center justify-between">
                  <div className="text-slate-600 font-extrabold text-sm">成员规模</div>
                  <div className="flex items-center gap-2 text-slate-700 font-extrabold">
                    <Users className="w-4 h-4 text-red-700" />
                    {club.membersCount} 人
                  </div>
                </div>
                <div className="mt-3 text-slate-500 font-semibold text-sm">规模更大，活动更丰富，协作机会更多。</div>
              </div>
              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5">
                <div className="flex items-center justify-between">
                  <div className="text-slate-600 font-extrabold text-sm">面试难度</div>
                  <div className="flex items-center gap-2 text-slate-700 font-extrabold">
                    <Star className="w-4 h-4 text-amber-500" />
                    {difficultyMap[club.interviewDifficulty]}
                  </div>
                </div>
                <div className="mt-3 text-slate-500 font-semibold text-sm">建议先用 AI 面试助手练习再参加面试。</div>
              </div>
            </div>

            <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5">
              <div className="flex items-center justify-between text-sm font-extrabold text-slate-700">
                <div>社团活跃度</div>
                <div>{club.activityLevel}/100</div>
              </div>
              <div className="mt-3 h-2 rounded-full bg-white border border-slate-200 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-red-700 to-rose-600 rounded-full" style={{ width: `${club.activityLevel}%` }} />
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
            <div className="text-xl font-extrabold">能力要求</div>
            <div className="flex flex-wrap gap-2">
              {club.skillsRequired.map((s) => (
                <span key={s} className="px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 text-sm font-extrabold">
                  {s}
                </span>
              ))}
            </div>
            <div className="rounded-2xl bg-emerald-50 border border-emerald-100 p-5 flex gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <BadgeCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="font-extrabold text-emerald-800">小提示</div>
                <div className="mt-1 text-emerald-700 font-semibold text-sm leading-relaxed">
                  不需要全部满足。用 1-2 个具体经历证明你的能力与投入意愿，比堆技能清单更有效。
                </div>
              </div>
            </div>
          </div>

          <div className="h-6" />
        </div>
      </div>
    </div>
  );
}
