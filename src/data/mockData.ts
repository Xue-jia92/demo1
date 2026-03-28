export interface Club {
  id: string;
  name: string;
  category: 'Art' | 'Tech' | 'Sports' | 'Social' | 'Academic';
  description: string;
  tags: string[];
  skillsRequired: string[];
  matchScore?: number;
  activityLevel: number;
  membersCount: number;
  interviewDifficulty: 'Easy' | 'Medium' | 'Hard';
}

export const mockClubs: Club[] = [
  {
    id: '1',
    name: '像素摄影社',
    category: 'Art',
    description: '记录校园光影与故事。提供器材体验、后期训练与外拍活动。',
    tags: ['摄影', '审美', '外拍'],
    skillsRequired: ['基础审美', '表达能力'],
    activityLevel: 85,
    membersCount: 120,
    interviewDifficulty: 'Medium'
  },
  {
    id: '2',
    name: '代码巫师社',
    category: 'Tech',
    description: '黑客松、开源协作、项目实战。一起把想法做成作品。',
    tags: ['编程', 'AI', '创新'],
    skillsRequired: ['逻辑思维', '编码能力'],
    activityLevel: 95,
    membersCount: 80,
    interviewDifficulty: 'Hard'
  },
  {
    id: '3',
    name: '和声交响团',
    category: 'Art',
    description: '每周排练、年度音乐会。欢迎热爱音乐与舞台的你。',
    tags: ['音乐', '古典', '舞台'],
    skillsRequired: ['乐器基础', '团队协作'],
    activityLevel: 70,
    membersCount: 150,
    interviewDifficulty: 'Hard'
  },
  {
    id: '4',
    name: '灌篮者篮球社',
    category: 'Sports',
    description: '零基础也欢迎。常规训练、校内联赛、提升体能与对抗。',
    tags: ['篮球', '体能', '团队'],
    skillsRequired: ['体能', '协调性'],
    activityLevel: 90,
    membersCount: 200,
    interviewDifficulty: 'Easy'
  },
  {
    id: '5',
    name: '新声辩论社',
    category: 'Social',
    description: '训练表达与逻辑。专题辩题、赛制训练、模拟赛与公开课。',
    tags: ['表达', '逻辑', '议题'],
    skillsRequired: ['表达能力', '临场反应'],
    activityLevel: 75,
    membersCount: 60,
    interviewDifficulty: 'Medium'
  }
];

export const surveyQuestions = [
  {
    id: 'q1',
    text: '你更喜欢怎样度过周末？',
    options: [
      { text: '写代码/做点小项目', traits: { tech: 5, logic: 3 } },
      { text: '拿着相机去校园走走', traits: { art: 4, social: 1 } },
      { text: '练琴或排练一段作品', traits: { art: 5, emotion: 2 } },
      { text: '和朋友来一场球赛', traits: { sports: 5, social: 3 } }
    ]
  },
  {
    id: 'q2',
    text: '以下哪类挑战最让你兴奋？',
    options: [
      { text: '拆解问题并找到最优解', traits: { tech: 5, logic: 5 } },
      { text: '用作品表达情绪与观点', traits: { art: 5, emotion: 4 } },
      { text: '在比赛中对抗并赢下关键局', traits: { sports: 4, social: 2 } },
      { text: '组织团队把目标落地', traits: { social: 5, leadership: 5 } }
    ]
  },
  {
    id: 'q3',
    text: '你对社团投入时间的预期是？',
    options: [
      { text: '每周 1-2 小时，轻量参与', traits: { social: 2 } },
      { text: '每周 3-5 小时，稳定投入', traits: { social: 3, leadership: 1 } },
      { text: '每周 6-10 小时，想快速成长', traits: { tech: 2, art: 2, sports: 2 } },
      { text: '每周 10+ 小时，愿意承担角色', traits: { leadership: 5, social: 3 } }
    ]
  }
];
