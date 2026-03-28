import React, { useMemo, useState } from 'react';
import { 
  Bot, 
  RotateCcw,
  Send, 
  Sparkles, 
  Star, 
  AlertCircle,
  Lightbulb
} from 'lucide-react';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  suggestions?: string[];
};

type Analysis = {
  confidence: number;
  relevance: number;
  structure: number;
  examples: number;
};

const clamp = (n: number) => Math.max(0, Math.min(100, n));

const InterviewAssistant: React.FC<{ initialClubName?: string }> = ({ initialClubName }) => {
  const [selectedClub, setSelectedClub] = useState<string | null>(initialClubName || null);
  const [analysis, setAnalysis] = useState<Analysis>({
    confidence: 72,
    relevance: 78,
    structure: 65,
    examples: 55
  });

  const [messages, setMessages] = useState<Message[]>(() => {
    if (!initialClubName) {
      return [
        {
          role: 'assistant',
          content: '你好，我是 ClubMatch AI 面试助手。你想准备哪个社团的面试？（可在右侧选择社团，或直接输入名称）',
          id: 'm1'
        }
      ];
    }
    return [
      {
        role: 'assistant',
        content: `我们就按「${initialClubName}」来练。先来一个常见题：请用 60 秒做一次自我介绍，并说明你为什么想加入？`,
        id: 'm1',
        suggestions: ['用 STAR 结构（情境-任务-行动-结果）', '尽量给出可量化结果', '结尾给出你的投入承诺']
      }
    ];
  });
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const getFirstQuestion = (clubName: string) => {
    if (clubName.includes('辩论')) return '先来一个常见题：请用 60 秒做一次自我介绍，并说明你为什么想加入辩论社？';
    if (clubName.includes('摄影')) return '先来一个常见题：你最喜欢的一张照片是什么？它为什么打动你？';
    if (clubName.includes('篮球')) return '先来一个常见题：你在团队里通常扮演什么角色？举一个例子。';
    if (clubName.includes('交响') || clubName.includes('乐')) return '先来一个常见题：你最近练习的一段作品是什么？你如何安排练习计划？';
    return '先来一个常见题：请介绍一次你解决问题的经历（项目/学习/活动都可以），重点说清楚你的思路。';
  };

  const questionBank = useMemo(() => {
    const base = [
      '请用 60 秒做一次自我介绍。',
      '你为什么想加入这个社团？',
      '说说你一次合作/项目的经历，你承担了什么？',
      '你如何安排时间，保证学业与社团投入？',
      '遇到分歧或冲突时，你通常怎么解决？'
    ];
    if (!selectedClub) return base;
    if (selectedClub.includes('摄影')) return [...base, '你最满意的一张作品是什么？拍摄与后期分别做了什么？'];
    if (selectedClub.includes('辩论')) return [...base, '给你一个观点，请给出 2 条论点与 1 个反驳预案。'];
    if (selectedClub.includes('篮球')) return [...base, '你在团队中更像得分手还是组织者？为什么？'];
    if (selectedClub.includes('代码') || selectedClub.includes('编程')) return [...base, '讲讲你最近解决的一个 Bug/难题：你如何定位与验证？'];
    return base;
  }, [selectedClub]);

  const evaluateAnswer = (answer: string) => {
    const len = answer.trim().length;
    const hasNumber = /\d/.test(answer);
    const hasStructure = /(因为|所以|首先|其次|最后|结果|总结)/.test(answer);
    const hasExample = /(比如|例如|项目|活动|比赛|作品)/.test(answer);

    const confidence = clamp(55 + len / 6);
    const relevance = clamp(60 + (hasExample ? 15 : 0) + (len > 80 ? 10 : 0));
    const structure = clamp(45 + (hasStructure ? 25 : 0) + (len > 60 ? 10 : 0));
    const examples = clamp(40 + (hasExample ? 35 : 0) + (hasNumber ? 10 : 0));
    return { confidence, relevance, structure, examples };
  };

  const pushAssistant = (content: string, suggestions?: string[]) => {
    setMessages((prev) => [
      ...prev,
      {
        role: 'assistant',
        content,
        id: Date.now().toString(),
        suggestions
      }
    ]);
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    const userMessage: Message = { role: 'user', content: inputValue, id: Date.now().toString() };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      if (!selectedClub) {
        const clubName = userMessage.content.trim();
        setSelectedClub(clubName);
        pushAssistant(`好的，我们就按「${clubName}」来练。${getFirstQuestion(clubName)}`, [
          '用 STAR 结构（情境-任务-行动-结果）',
          '尽量给出可量化结果',
          '结尾给出你的投入承诺'
        ]);
        return;
      }

      setAnalysis(evaluateAnswer(userMessage.content));
      pushAssistant('收到。接下来我会追问一题：如果你加入后发现节奏很紧，你会如何平衡学习与社团？', [
        '给出你的时间安排方式',
        '说明优先级与取舍标准',
        '补充你愿意承担的具体职责'
      ]);
    }, 1500);
  };

  const handleAsk = (q: string) => {
    setMessages((prev) => [
      ...prev,
      { role: 'assistant', content: q, id: Date.now().toString(), suggestions: ['先给结论，再给例子', '用 1 个量化结果收尾'] }
    ]);
  };

  const reset = () => {
    setSelectedClub(initialClubName || null);
    setAnalysis({ confidence: 72, relevance: 78, structure: 65, examples: 55 });
    setMessages(() => {
      if (!initialClubName) {
        return [
          {
            role: 'assistant',
            content: '你好，我是 ClubMatch AI 面试助手。你想准备哪个社团的面试？（可在右侧选择社团，或直接输入名称）',
            id: 'm1'
          }
        ];
      }
      return [
        {
          role: 'assistant',
          content: `我们就按「${initialClubName}」来练。先来一个常见题：请用 60 秒做一次自我介绍，并说明你为什么想加入？`,
          id: 'm1',
          suggestions: ['用 STAR 结构（情境-任务-行动-结果）', '尽量给出可量化结果', '结尾给出你的投入承诺']
        }
      ];
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
      <div className="lg:col-span-2 flex flex-col h-[700px] bg-white border border-slate-200 rounded-3xl shadow-xl overflow-hidden">
        <div className="p-6 bg-red-700 text-white flex items-center gap-4 shadow-lg">
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
            <Bot className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-xl font-bold">AI 模拟面试</h2>
            <p className="text-red-100 text-sm">当前社团：{selectedClub || '未选择'}</p>
          </div>
          <div className="flex-1" />
          <button
            onClick={reset}
            className="w-11 h-11 rounded-2xl bg-white/15 hover:bg-white/20 border border-white/20 flex items-center justify-center"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-slate-50/50">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] space-y-4 ${msg.role === 'user' ? 'order-2' : 'order-1'}`}>
                <div className={`p-5 rounded-3xl text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-red-700 text-white rounded-tr-none' 
                    : 'bg-white text-slate-700 rounded-tl-none border border-slate-200'
                }`}>
                  {msg.content}
                </div>
                
                {msg.suggestions && (
                  <div className="flex flex-wrap gap-2 animate-fade-in">
                    {msg.suggestions.map((s: string, i: number) => (
                      <span key={i} className="px-3 py-1.5 bg-red-50 text-red-700 rounded-xl text-xs font-bold border border-red-100 flex items-center gap-1.5">
                        <Lightbulb className="w-3.5 h-3.5" /> {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white p-4 rounded-3xl border border-slate-200 flex gap-1.5 shadow-sm">
                <div className="w-2 h-2 bg-red-200 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-red-300 rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-red-400 rounded-full animate-bounce delay-200" />
              </div>
            </div>
          )}
        </div>

        <div className="p-6 bg-white border-t border-slate-100 flex items-center gap-4">
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={selectedClub ? '输入你的回答…' : '输入社团名称（如：代码巫师社）…'} 
            className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-red-600/15 text-slate-700"
          />
          <button 
            onClick={handleSend}
            className="w-14 h-14 bg-red-700 text-white rounded-2xl flex items-center justify-center hover:bg-red-800 shadow-lg shadow-red-100 transition-all active:scale-95"
          >
            <Send className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-xl font-extrabold">训练模式</div>
              <div className="text-slate-500 font-semibold text-sm mt-1">选题练习 + 追问反馈 + 结构化建议</div>
            </div>
            <select
              value={selectedClub || ''}
              onChange={(e) => setSelectedClub(e.target.value || null)}
              className="px-4 py-2.5 rounded-2xl border border-slate-200 bg-white font-extrabold text-slate-700"
            >
              <option value="">未选择</option>
              <option value="代码巫师社">代码巫师社</option>
              <option value="像素摄影社">像素摄影社</option>
              <option value="灌篮者篮球社">灌篮者篮球社</option>
              <option value="新声辩论社">新声辩论社</option>
              <option value="和声交响团">和声交响团</option>
            </select>
          </div>

          <div className="rounded-3xl bg-slate-50 border border-slate-200 p-6">
            <div className="text-sm font-extrabold text-slate-700">题库（点击即可开始练习）</div>
            <div className="mt-4 grid grid-cols-1 gap-3">
              {questionBank.slice(0, 5).map((q) => (
                <button
                  key={q}
                  onClick={() => handleAsk(q)}
                  className="text-left px-5 py-4 rounded-2xl bg-white border border-slate-200 hover:border-red-200 hover:bg-red-50/30 transition-colors"
                >
                  <div className="text-slate-800 font-extrabold">{q}</div>
                  <div className="mt-1 text-slate-500 font-semibold text-sm">建议：先结论，再例子，最后给结果</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl space-y-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-amber-500" /> 表现分析
          </h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm font-bold">
                <span className="text-slate-500 uppercase tracking-wider">表达自信</span>
                <span className="text-red-700">{Math.round(analysis.confidence)}%</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-red-700 rounded-full" style={{ width: `${analysis.confidence}%` }} />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm font-bold">
                <span className="text-slate-500 uppercase tracking-wider">回答相关</span>
                <span className="text-emerald-500">{Math.round(analysis.relevance)}%</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${analysis.relevance}%` }} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="text-xs font-bold text-slate-500 tracking-widest uppercase">结构清晰</div>
                <div className="mt-2 text-2xl font-extrabold text-slate-800">{Math.round(analysis.structure)}%</div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="text-xs font-bold text-slate-500 tracking-widest uppercase">例子充分</div>
                <div className="mt-2 text-2xl font-extrabold text-slate-800">{Math.round(analysis.examples)}%</div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-50 space-y-4">
            <h4 className="font-bold text-slate-700">改进建议</h4>
            <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl flex gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
              <p className="text-sm text-amber-700 leading-relaxed">
                建议把回答写成三段：结论（1 句话）→ 例子（STAR）→ 结果（量化/影响）。如果能补充数字与复盘，会更加分。
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-700 to-rose-600 p-8 rounded-3xl text-white shadow-xl space-y-6">
          <h3 className="text-xl font-bold">面试小贴士</h3>
          <ul className="space-y-4">
            {[
              '提前 5 分钟到达，保持从容',
              '用具体经历证明你的热情与能力',
              '主动询问团队协作与成长路径'
            ].map((tip, i) => (
              <li key={i} className="flex items-start gap-3 text-red-100 text-sm">
                <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <Star className="w-3 h-3 text-white" />
                </div>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InterviewAssistant;
