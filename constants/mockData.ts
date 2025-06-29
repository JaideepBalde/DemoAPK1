export const marketData = {
  nifty: {
    value: 19847.5,
    change: 0.85,
    changePercent: 0.0043,
  },
  sensex: {
    value: 66589.93,
    change: 285.94,
    changePercent: 0.0043,
  },
  sentimentScore: 68,
  volatileSectors: [
    { name: 'Banking', change: -2.1, color: '#ef4444' },
    { name: 'IT', change: 1.8, color: '#10b981' },
    { name: 'Auto', change: -0.9, color: '#ef4444' },
    { name: 'Pharma', change: 2.3, color: '#10b981' },
  ],
};

export const newsData = [
  {
    id: '1',
    title: 'RBI Keeps Repo Rate Unchanged at 6.5%',
    summary: 'Central bank maintains status quo amid inflation concerns...',
    time: '2 hours ago',
    sentiment: 'neutral',
  },
  {
    id: '2',
    title: 'IT Sector Shows Strong Q4 Results',
    summary: 'Major IT companies report better-than-expected earnings...',
    time: '4 hours ago',
    sentiment: 'positive',
  },
  {
    id: '3',
    title: 'Foreign Investors Continue Selling Spree',
    summary: 'FIIs withdraw ₹2,847 crore from Indian equity markets...',
    time: '6 hours ago',
    sentiment: 'negative',
  },
];

export const sentimentAnalysis = {
  overall: 68,
  confidence: 84,
  phrases: [
    { text: 'bullish outlook', sentiment: 'positive' },
    { text: 'market volatility', sentiment: 'negative' },
    { text: 'strong fundamentals', sentiment: 'positive' },
    { text: 'growth prospects', sentiment: 'positive' },
    { text: 'regulatory concerns', sentiment: 'negative' },
  ],
  sectors: [
    { name: 'Banking', score: 45 },
    { name: 'IT', score: 78 },
    { name: 'Auto', score: 52 },
    { name: 'Pharma', score: 71 },
    { name: 'Energy', score: 63 },
  ],
};

export const cyberThreats = [
  {
    id: '1',
    title: 'Phishing Attack on Banking Customers',
    severity: 'high',
    company: 'HDFC Bank',
    date: '2024-01-15',
    description: 'Sophisticated phishing campaign targeting mobile banking users',
    impact: 'Customer credentials compromise',
    recommendation: 'Update security protocols and user awareness',
  },
  {
    id: '2',
    title: 'Ransomware Threat in Payment Systems',
    severity: 'critical',
    company: 'Payment Gateway Inc',
    date: '2024-01-14',
    description: 'Advanced ransomware targeting payment processing infrastructure',
    impact: 'Service disruption and data encryption',
    recommendation: 'Immediate security audit and backup verification',
  },
  {
    id: '3',
    title: 'Data Breach in Trading Platform',
    severity: 'medium',
    company: 'TradePro',
    date: '2024-01-13',
    description: 'Unauthorized access to user trading data and preferences',
    impact: 'User privacy and trading patterns exposed',
    recommendation: 'Enhanced access controls and monitoring',
  },
  {
    id: '4',
    title: 'API Vulnerability in FinTech App',
    severity: 'high',
    company: 'PayMax',
    date: '2024-01-12',
    description: 'Critical API vulnerability allowing unauthorized transactions',
    impact: 'Financial transactions at risk',
    recommendation: 'Immediate API security patch and testing',
  },
];

export const finbotResponses = {
  'what is p/e ratio': {
    response: 'P/E ratio (Price-to-Earnings) is a valuation metric calculated by dividing a company\'s current share price by its earnings per share (EPS). It indicates how much investors are willing to pay per rupee of earnings. A high P/E suggests growth expectations, while a low P/E might indicate undervaluation or declining prospects.',
    followUp: 'Would you like to know about other valuation metrics like P/B ratio or EV/EBITDA?',
  },
  'market psychology': {
    response: 'Market psychology involves understanding investor emotions like fear and greed. Key concepts include: 1) Fear of Missing Out (FOMO) drives buying at peaks, 2) Loss aversion makes investors hold losing positions too long, 3) Herd mentality causes market bubbles and crashes, 4) Anchoring bias affects price expectations.',
    followUp: 'Want to learn about behavioral finance strategies to overcome these biases?',
  },
  'asset allocation': {
    response: 'Asset allocation is the strategy of spreading investments across different asset classes (stocks, bonds, commodities, real estate) to optimize risk-return profile. Common strategies include: 1) Age-based (100-age in stocks), 2) Risk-based (conservative, moderate, aggressive), 3) Goal-based allocation.',
    followUp: 'Shall I explain how to build a diversified portfolio for your risk profile?',
  },
  'cybersecurity tips': {
    response: 'Essential cybersecurity practices for trading: 1) Use strong, unique passwords and 2FA, 2) Trade only on secure networks (avoid public WiFi), 3) Keep trading apps updated, 4) Monitor account statements regularly, 5) Be cautious of phishing emails and fake trading platforms.',
    followUp: 'Would you like specific tips for securing your mobile trading apps?',
  },
  'budgeting': {
    response: 'Effective budgeting for investments: 1) Follow 50/30/20 rule (needs/wants/savings), 2) Build emergency fund (6 months expenses), 3) Start with small SIPs in mutual funds, 4) Increase investment amount with salary increments, 5) Review and rebalance quarterly.',
    followUp: 'Want me to help create a personalized investment budget plan?',
  },
};

export const learningModules = [
  {
    id: '1',
    title: 'Reading Stock Charts',
    description: 'Master technical analysis with candlestick patterns and indicators',
    duration: '45 min',
    difficulty: 'Beginner',
    progress: 0,
    lessons: [
      'Introduction to Chart Types',
      'Understanding Candlestick Patterns',
      'Support and Resistance Levels',
      'Moving Averages and Trends',
      'Volume Analysis',
    ],
  },
  {
    id: '2',
    title: 'Cybersecurity in Trading',
    description: 'Protect your investments from cyber threats and fraud',
    duration: '30 min',
    difficulty: 'Intermediate',
    progress: 25,
    lessons: [
      'Common Trading Platform Threats',
      'Secure Trading Practices',
      'Identity Protection',
      'Phishing Recognition',
      'Mobile Security for Traders',
    ],
  },
  {
    id: '3',
    title: 'Basics of Asset Allocation',
    description: 'Build a diversified portfolio for long-term wealth creation',
    duration: '60 min',
    difficulty: 'Beginner',
    progress: 60,
    lessons: [
      'Understanding Asset Classes',
      'Risk Tolerance Assessment',
      'Portfolio Diversification',
      'Rebalancing Strategies',
      'Tax-Efficient Investing',
    ],
  },
  {
    id: '4',
    title: 'Advanced Options Trading',
    description: 'Master complex strategies for experienced traders',
    duration: '90 min',
    difficulty: 'Advanced',
    progress: 0,
    lessons: [
      'Options Basics and Greeks',
      'Covered Call Strategies',
      'Protective Put Strategies',
      'Iron Condor and Butterflies',
      'Risk Management in Options',
    ],
  },
];