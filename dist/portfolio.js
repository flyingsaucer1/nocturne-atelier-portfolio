// Add future projects here; distinguish actual screenshots from illustrative previews.
window.PORTFOLIO = {
  name: 'Nocturne Atelier', bio: '', github: 'https://github.com/flyingsaucer1',
  linkedin: '', email: 'arshp038@gmail.com',
  projects: [{
    id: 'kernelguard', title: 'KernelGuard', category: 'Linux security monitoring', year: '2026',
    description: 'Making system activity easier to understand. A Linux host monitor that brings events, security alerts, and the evidence behind them into one clear dashboard.',
    work: 'Linux audit ingestion, a relational event database, five explainable detection rules, host and USB inventories, and administrator review. The dashboard preview uses synthetic demo data. KernelGuard detects and reports policy matches; it does not block attacks.',
    role: 'I designed and built KernelGuard end to end, from Linux audit parsing, collection checkpoints, replay protection, and host and USB inventories to the event database, detection rules, and dashboard.',
    stack: ['Python', 'Flask', 'SQLAlchemy', 'MySQL', 'Linux'],
    image: 'assets/kernelguard.png', imageAlt: 'KernelGuard dashboard with synthetic demonstration data', imageNote: 'Actual dashboard, shown with synthetic demo data.', github: 'https://github.com/flyingsaucer1/KernelGuard', url: ''
  }, {
    id: 'careerpilot', title: 'CareerPilot AI', category: 'AI career workspace · In development', year: '2026',
    description: 'A focused workspace for the job search. Resume analysis, job-description matching, editable drafts, and application tracking come together in one considered interface.',
    work: 'Resume upload and analysis, explainable ATS comparisons, editable resume versions with PDF and Word exports, job application tracking, career analytics, and interview preparation. AI suggestions are reviewed before being applied. Commercial launch is still in progress.',
    role: 'I designed and built CareerPilot AI end to end, including the React workspace, authenticated APIs, resume workflows, stored application data, and integrations with configurable AI providers.',
    stack: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB'],
    image: 'assets/careerpilot.png', imageAlt: 'CareerPilot AI landing page with resume workspace preview', imageNote: 'Actual CareerPilot landing page. The illustrated readiness panel is demonstration content.', github: 'https://github.com/flyingsaucer1/AI-Career-Assistant', url: ''
  }, {
    id: 'wealthsense', title: 'WealthSense', category: 'Market research · Paper trading', year: '2026',
    description: 'An editorial-style workspace for Indian markets, bringing global market pulse, experimental signals, portfolio tracking, and paper trading together.',
    work: 'WealthSense combines market quotes and news sentiment with manually tracked holdings, separate virtual trading accounts, and an opt-in daily paper bot. Its research signals are experimental, not validated forecasts. Trades are virtual and never sent to a broker.',
    role: 'I built the Flask application, portfolio and paper-trading flows, market data and sentiment features, and the machine-learning research pipeline.',
    stack: ['Python', 'Flask', 'SQLite', 'LightGBM', 'Chart.js'],
    image: 'assets/wealthsense.svg', imageAlt: 'Illustrative WealthSense newspaper-style dashboard with market research, portfolio, and paper trading panels', imageNote: 'Illustrative interface preview based on WealthSense features; no live market data or performance claims.', github: 'https://github.com/flyingsaucer1/WealthSense', url: ''
  }]
};
