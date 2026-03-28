import React from 'react';
import { Sparkles, Brain, Award, Zap } from 'lucide-react';

interface Props {
  profile: any;
}

const ProfileRadar: React.FC<Props> = ({ profile }) => {
  const { traits } = profile;
  const maxTrait = Math.max(...Object.values(traits) as number[]);
  const labels = Object.keys(traits);
  
  const normalizedTraits = labels.reduce((acc, label) => {
    acc[label] = (traits[label] / (maxTrait || 1)) * 100;
    return acc;
  }, {} as any);

  const labelMap: Record<string, string> = {
    art: '艺术感知',
    tech: '技术倾向',
    sports: '运动活力',
    social: '社交倾向',
    logic: '逻辑思维',
    emotion: '情感表达',
    leadership: '领导力'
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl space-y-8 overflow-hidden relative group">
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
        <Sparkles className="w-24 h-24 text-indigo-600 rotate-12" />
      </div>

      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200">
          <Brain className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold">AI 画像概览</h3>
          <p className="text-sm text-slate-400">基于你的兴趣测评结果</p>
        </div>
      </div>

      <div className="space-y-6">
        {labels.map(label => (
          <div key={label} className="space-y-2">
            <div className="flex items-center justify-between text-sm font-bold">
              <span className="text-slate-700">{labelMap[label] || label}</span>
              <span className="text-indigo-600">{Math.round(normalizedTraits[label])}%</span>
            </div>
            <div className="h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-50">
              <div 
                className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-1000 ease-out shadow-sm"
                style={{ width: `${normalizedTraits[label]}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-50">
        <div className="flex items-center gap-2 text-slate-500 text-xs font-medium uppercase tracking-wider">
          <Award className="w-4 h-4 text-amber-500" /> 强项：{labelMap[labels[0]] || labels[0]}
        </div>
        <div className="flex items-center gap-2 text-slate-500 text-xs font-medium uppercase tracking-wider">
          <Zap className="w-4 h-4 text-sky-500" /> 风格：均衡型
        </div>
      </div>
    </div>
  );
};

export default ProfileRadar;
