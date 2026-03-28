import React, { useState } from 'react';
import { ChevronRight, ArrowLeft, Send } from 'lucide-react';
import { surveyQuestions } from '../data/mockData';

interface Props {
  onComplete: (results: any) => void;
}

const InterestSurvey: React.FC<Props> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<any[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers, surveyQuestions[step].options[optionIndex]];
    setAnswers(newAnswers);
    
    if (step < surveyQuestions.length - 1) {
      setStep(step + 1);
    } else {
      setIsAnalyzing(true);
      setTimeout(() => {
        const finalTraits: any = { art: 0, tech: 0, sports: 0, social: 0, logic: 0 };
        newAnswers.forEach(ans => {
          Object.entries(ans.traits).forEach(([trait, val]: [string, any]) => {
            finalTraits[trait] = (finalTraits[trait] || 0) + val;
          });
        });
        
        const topInterests = (['Art', 'Tech', 'Sports', 'Social'] as const)
          .map(k => ({ key: k, score: finalTraits[k.toLowerCase()] || 0 }))
          .sort((a, b) => b.score - a.score)
          .slice(0, 2)
          .map(x => x.key);

        onComplete({
          traits: finalTraits,
          tags: ['主动探索', '合作型', '目标导向'],
          interests: topInterests
        });
      }, 2000);
    }
  };

  if (isAnalyzing) {
    return (
      <div className="bg-white p-12 rounded-3xl border border-slate-100 shadow-xl text-center space-y-8 animate-pulse">
        <div className="w-20 h-20 bg-indigo-100 rounded-full mx-auto flex items-center justify-center">
          <Send className="w-10 h-10 text-indigo-600 animate-bounce" />
        </div>
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">AI 正在生成你的画像…</h2>
          <p className="text-slate-500">我们正在分析你的兴趣与能力，并推荐最匹配的社团。</p>
        </div>
        <div className="flex justify-center gap-2">
          {[0, 1, 2].map(i => (
            <div key={i} className="w-3 h-3 bg-indigo-400 rounded-full animate-ping" style={{ animationDelay: `${i * 0.2}s` }} />
          ))}
        </div>
      </div>
    );
  }

  const currentQuestion = surveyQuestions[step];
  const progress = ((step + 1) / surveyQuestions.length) * 100;

  return (
    <div className="bg-white p-8 md:p-12 rounded-3xl border border-slate-100 shadow-xl space-y-12">
      <div className="space-y-4">
        <div className="flex items-center justify-between text-sm text-slate-400 font-medium">
          <span>第 {step + 1} / {surveyQuestions.length} 题</span>
          <span>完成 {Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-indigo-600 transition-all duration-500 ease-out" 
            style={{ width: `${progress}%` }} 
          />
        </div>
      </div>

      <div className="space-y-8">
        <h2 className="text-3xl font-bold leading-tight">{currentQuestion.text}</h2>
        <div className="grid grid-cols-1 gap-4">
          {currentQuestion.options.map((option, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(i)}
              className="group p-6 text-left bg-slate-50 border-2 border-transparent rounded-2xl hover:bg-white hover:border-indigo-600 hover:shadow-lg hover:shadow-indigo-100 transition-all flex items-center justify-between"
            >
              <span className="text-lg font-semibold text-slate-700 group-hover:text-indigo-600">{option.text}</span>
              <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
            </button>
          ))}
        </div>
      </div>

      {step > 0 && (
        <button 
          onClick={() => setStep(step - 1)}
          className="flex items-center gap-2 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> 返回上一题
        </button>
      )}
    </div>
  );
};

export default InterestSurvey;
