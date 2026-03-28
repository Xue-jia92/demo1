import React from 'react';
import { Users, TrendingUp, ChevronRight, Star } from 'lucide-react';
import { Club } from '../data/mockData';

interface Props {
  club: Club;
  onOpen?: (club: Club) => void;
  onApply?: (club: Club) => void;
}

const ClubCard: React.FC<Props> = ({ club, onOpen, onApply }) => {
  const { name, category, description, tags, matchScore, activityLevel, membersCount, interviewDifficulty, skillsRequired } = club;

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

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Easy': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'Medium': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'Hard': return 'bg-rose-50 text-rose-600 border-rose-100';
      default: return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  return (
    <div className="group bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden flex flex-col justify-between h-full">
      {matchScore !== undefined && (
        <div className="absolute top-4 right-4 bg-red-700 text-white px-3 py-1.5 rounded-2xl flex items-center gap-1.5 shadow-lg shadow-red-100 z-10 animate-fade-in">
          <TrendingUp className="w-4 h-4" />
          <span className="text-sm font-bold">匹配度 {matchScore}%</span>
        </div>
      )}

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-slate-50 text-slate-500 rounded-full text-xs font-bold uppercase tracking-wider border border-slate-100">
              {categoryMap[category]}
            </span>
            <span className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-xs font-bold border border-red-100">
              活跃度 {activityLevel}
            </span>
          </div>
          <h3 className="text-2xl font-extrabold group-hover:text-red-700 transition-colors">{name}</h3>
          <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">
            {description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <span key={tag} className="text-xs font-medium text-slate-400 bg-slate-50 px-2 py-1 rounded-lg">#{tag}</span>
          ))}
        </div>

        <div className="space-y-3 rounded-2xl bg-slate-50 p-4 border border-slate-100">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>社团活跃度</span>
            <span>{activityLevel}/100</span>
          </div>
          <div className="h-2 bg-white rounded-full overflow-hidden border border-slate-100">
            <div className="h-full bg-gradient-to-r from-red-700 to-rose-600 rounded-full" style={{ width: `${activityLevel}%` }} />
          </div>
          <div className="flex flex-wrap gap-2">
            {skillsRequired.slice(0, 3).map(s => (
              <span key={s} className="text-xs font-semibold text-slate-600 bg-white px-2.5 py-1 rounded-xl border border-slate-100">
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-50">
          <div className="flex items-center gap-2 text-slate-500">
            <Users className="w-4 h-4 text-red-700" />
            <span className="text-sm font-semibold">{membersCount} 人</span>
          </div>
          <div className="flex items-center gap-2 text-slate-500">
            <Star className="w-4 h-4 text-amber-400" />
            <span className={`text-sm font-semibold px-2 py-0.5 rounded-lg border ${getDifficultyColor(interviewDifficulty)}`}>
              面试 {difficultyMap[interviewDifficulty]}
            </span>
          </div>
        </div>
      </div>

      <div className="pt-6 flex items-center justify-between gap-4">
        <button
          onClick={() => onApply?.(club)}
          className="flex-1 bg-slate-900 text-white py-3 rounded-2xl font-bold hover:bg-red-700 transition-all shadow-md active:scale-95"
        >
          一键报名
        </button>
        <button
          onClick={() => onOpen?.(club)}
          className="w-12 h-12 flex items-center justify-center bg-slate-50 text-slate-400 rounded-2xl hover:bg-red-50 hover:text-red-700 transition-all border border-slate-100"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ClubCard;
