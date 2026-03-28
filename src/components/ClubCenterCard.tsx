import React from 'react';
import { Users, ArrowRight, Sparkles } from 'lucide-react';
import type { Club } from '../data/mockData';

const categoryMap: Record<Club['category'], string> = {
  Art: '文化艺术',
  Tech: '学术科创',
  Sports: '体育健身',
  Social: '实践促进',
  Academic: '学术科创'
};

function initialOf(name: string) {
  const s = name.trim();
  if (!s) return '社';
  return s.slice(0, 1);
}

export default function ClubCenterCard({
  club,
  onOpen,
  onApply
}: {
  club: Club;
  onOpen: (club: Club) => void;
  onApply: (club: Club) => void;
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="h-40 bg-slate-50 border-b border-slate-200 flex items-center justify-center relative">
        <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-extrabold text-slate-700">
          {categoryMap[club.category]}
        </div>
        <div className="w-24 h-24 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-700 to-rose-600 text-white flex items-center justify-center font-extrabold text-3xl">
            {initialOf(club.name)}
          </div>
        </div>
      </div>

      <div className="p-5 space-y-3">
        <div className="text-base font-extrabold text-slate-900 line-clamp-1">{club.name}</div>
        <div className="text-sm text-slate-600 leading-relaxed line-clamp-2">{club.description}</div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2 text-slate-500">
            <Users className="w-4 h-4 text-red-700" />
            <div className="text-xs font-extrabold">{club.membersCount} 人</div>
          </div>
          <button
            onClick={() => onApply(club)}
            className="text-red-700 font-extrabold text-sm hover:text-red-800 inline-flex items-center gap-1"
          >
            加入 <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <button
          onClick={() => onOpen(club)}
          className="w-full mt-2 px-4 py-2.5 rounded-md border border-slate-200 bg-white hover:bg-slate-50 font-extrabold text-sm text-slate-700 inline-flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4 text-red-700" />
          查看详情
        </button>
      </div>
    </div>
  );
}

