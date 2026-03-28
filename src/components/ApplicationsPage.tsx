import React, { useMemo, useState } from 'react';
import { CalendarDays, ChevronRight, ClipboardList, Filter, GraduationCap } from 'lucide-react';
import type { Club } from '../data/mockData';

export type ApplicationStatus =
  | '已报名'
  | '待筛选'
  | '待面试'
  | '面试中'
  | '已录取'
  | '未通过';

export type Application = {
  id: string;
  clubId: string;
  status: ApplicationStatus;
  appliedAt: string;
  interviewAt?: string;
  note?: string;
};

const statusStyle: Record<ApplicationStatus, string> = {
  已报名: 'bg-indigo-50 text-indigo-700 border-indigo-100',
  待筛选: 'bg-slate-50 text-slate-700 border-slate-200',
  待面试: 'bg-amber-50 text-amber-700 border-amber-100',
  面试中: 'bg-violet-50 text-violet-700 border-violet-100',
  已录取: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  未通过: 'bg-rose-50 text-rose-700 border-rose-100'
};

const progressOf: Record<ApplicationStatus, number> = {
  已报名: 25,
  待筛选: 35,
  待面试: 55,
  面试中: 75,
  已录取: 100,
  未通过: 100
};

export default function ApplicationsPage({
  applications,
  clubs,
  onGoClubs,
  onStartInterview,
  onUpdate
}: {
  applications: Application[];
  clubs: Club[];
  onGoClubs: () => void;
  onStartInterview: (clubId: string) => void;
  onUpdate: (id: string, patch: Partial<Application>) => void;
}) {
  const [tab, setTab] = useState<'全部' | ApplicationStatus>('全部');

  const clubById = useMemo(() => {
    const m = new Map<string, Club>();
    for (const c of clubs) m.set(c.id, c);
    return m;
  }, [clubs]);

  const list = useMemo(() => {
    if (tab === '全部') return applications;
    return applications.filter((a) => a.status === tab);
  }, [applications, tab]);

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white/80 backdrop-blur p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="text-3xl font-extrabold">我的报名</div>
            <div className="text-slate-500 font-semibold">
              像教学平台“我的课程”一样，统一管理报名、面试与录取进度。
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onGoClubs}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-indigo-600 text-white font-extrabold hover:bg-indigo-700 shadow-lg shadow-indigo-100"
            >
              去社团广场 <ChevronRight className="w-5 h-5" />
            </button>
            <button className="w-12 h-12 rounded-2xl border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:bg-slate-50">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {(['全部', '已报名', '待筛选', '待面试', '面试中', '已录取', '未通过'] as const).map((k) => (
            <button
              key={k}
              onClick={() => setTab(k as any)}
              className={[
                'px-4 py-2 rounded-2xl border text-sm font-extrabold transition-colors',
                tab === k ? 'bg-slate-900 text-white border-slate-900' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              ].join(' ')}
            >
              {k}
            </button>
          ))}
        </div>
      </div>

      {applications.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 bg-white/80 backdrop-blur p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-extrabold">
                <ClipboardList className="w-4 h-4" />
                还没有报名记录
              </div>
              <div className="mt-4 text-3xl font-extrabold leading-tight">
                从“社团广场”开始，建立你的招新进度表
              </div>
              <div className="mt-3 text-slate-500 font-semibold leading-relaxed">
                报名后，这里会自动生成进度卡片：筛选、面试时间、结果与下一步行动建议。
              </div>
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={onGoClubs}
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-indigo-600 text-white font-extrabold hover:bg-indigo-700 shadow-lg shadow-indigo-100"
                >
                  去社团广场 <ChevronRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => onStartInterview('')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white border-2 border-slate-200 font-extrabold text-slate-700 hover:bg-slate-50"
                >
                  先练面试 <GraduationCap className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8 shadow-xl">
                <div className="text-xs font-bold tracking-widest text-white/70 uppercase">示例进度</div>
                <div className="mt-2 text-xl font-extrabold">报名 → 面试 → 录取</div>
                <div className="mt-4 space-y-3">
                  {[
                    { t: '报名提交', s: '已完成', p: 25 },
                    { t: '简历筛选', s: '进行中', p: 55 },
                    { t: '面试安排', s: '待确认', p: 0 }
                  ].map((x) => (
                    <div key={x.t} className="rounded-2xl bg-white/5 border border-white/10 p-5">
                      <div className="flex items-center justify-between">
                        <div className="font-extrabold">{x.t}</div>
                        <div className="text-xs font-extrabold text-white/70">{x.s}</div>
                      </div>
                      <div className="mt-3 h-2 rounded-full bg-white/10 overflow-hidden">
                        <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${x.p}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex items-center gap-2 text-white/70 text-sm font-semibold">
                  <CalendarDays className="w-4 h-4" />
                  面试时间会自动同步到这里
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
            {list.map((app) => {
              const club = clubById.get(app.clubId);
              if (!club) return null;
              const progress = progressOf[app.status] ?? 0;
              return (
                <div key={app.id} className="rounded-3xl border border-slate-200 bg-white/80 backdrop-blur p-7 shadow-sm">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                    <div className="space-y-2">
                      <div className="text-2xl font-extrabold">{club.name}</div>
                      <div className="text-slate-500 font-semibold leading-relaxed">{club.description}</div>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {club.tags.slice(0, 4).map((t) => (
                          <span key={t} className="px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-600 text-xs font-extrabold">
                            #{t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3 md:text-right">
                      <div className={`inline-flex items-center px-3 py-1.5 rounded-2xl border text-sm font-extrabold ${statusStyle[app.status]}`}>
                        {app.status}
                      </div>
                      <div className="text-xs text-slate-400 font-semibold">报名时间：{app.appliedAt}</div>
                      {app.interviewAt ? (
                        <div className="text-xs text-slate-500 font-extrabold">面试时间：{app.interviewAt}</div>
                      ) : (
                        <div className="text-xs text-slate-400 font-semibold">面试时间：待通知</div>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 rounded-2xl bg-slate-50 border border-slate-200 p-5">
                    <div className="flex items-center justify-between text-sm font-extrabold text-slate-700">
                      <div>当前进度</div>
                      <div>{progress}%</div>
                    </div>
                    <div className="mt-3 h-2 rounded-full bg-white border border-slate-200 overflow-hidden">
                      <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${progress}%` }} />
                    </div>
                    <div className="mt-4 flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={() => onStartInterview(club.id)}
                        className="flex-1 px-5 py-3 rounded-2xl bg-indigo-600 text-white font-extrabold hover:bg-indigo-700 shadow-lg shadow-indigo-100"
                      >
                        去练面试
                      </button>
                      <select
                        value={app.status}
                        onChange={(e) => onUpdate(app.id, { status: e.target.value as ApplicationStatus })}
                        className="flex-1 px-5 py-3 rounded-2xl border border-slate-200 bg-white font-extrabold text-slate-700"
                      >
                        {(['已报名', '待筛选', '待面试', '面试中', '已录取', '未通过'] as const).map((s) => (
                          <option key={s} value={s}>
                            标记为：{s}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white/80 backdrop-blur p-7 shadow-sm">
              <div className="text-2xl font-extrabold">面试日历</div>
              <div className="mt-2 text-slate-500 font-semibold">把关键节点像课程安排一样管理。</div>
              <div className="mt-5 space-y-3">
                {applications
                  .filter((a) => a.interviewAt)
                  .slice(0, 4)
                  .map((a) => (
                    <div key={a.id} className="rounded-2xl border border-slate-200 bg-white p-5">
                      <div className="text-sm font-extrabold text-slate-700">{clubById.get(a.clubId)?.name}</div>
                      <div className="mt-1 text-slate-500 font-semibold text-sm">{a.interviewAt}</div>
                    </div>
                  ))}
                {applications.every((a) => !a.interviewAt) && (
                  <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-center">
                    <div className="text-slate-700 font-extrabold">暂无面试安排</div>
                    <div className="mt-1 text-slate-500 font-semibold text-sm">收到通知后会自动显示在这里。</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

