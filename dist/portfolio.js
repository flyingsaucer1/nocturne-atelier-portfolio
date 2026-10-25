// Add future projects here; distinguish actual screenshots from illustrative previews.
window.PORTFOLIO = {
  name: 'Nocturne Atelier', bio: '', github: 'https://github.com/flyingsaucer1',
  linkedin: '', email: 'arshp038@gmail.com',
  projects: [{
    id: 'kernelguard', title: 'KernelGuard', category: 'Linux host activity monitor', year: '2026',
    description: 'A Linux host monitor that turns audit events and host inventory into explainable security alerts, with the evidence ready for administrator review.',
    work: 'KernelGuard collects grouped Linux Audit events and snapshots of users, sessions, processes, and USB devices. It stores structured evidence in SQLite or MySQL, avoids duplicate imports, and evaluates five configurable policies. A local Flask dashboard brings event timelines, collector status, alert evidence, and device-enrollment history together. The included demo uses synthetic data; live collection needs a configured Linux lab.',
    role: 'I built the Python CLI, Audit parser and collectors, relational data model, detection rules, administrator review flows, and Flask dashboard. The rules report policy matches for human investigation; they do not block activity or establish malicious intent.',
    features: ['Parse Linux Audit file, process, and authentication events with replay protection', 'Detect repeated failed logins, after-hours and bulk protected-file access, selected privileged commands, and unapproved USB devices', 'Track users, sessions, processes, and USB enrollment decisions across inventory snapshots', 'Review alert evidence, policy details, collector status, and event timelines in a local dashboard', 'Run a repeatable synthetic demo or collect live Audit and inventory data on a configured Linux host'],
    stack: ['Python', 'Flask', 'SQLAlchemy', 'SQLite / MySQL', 'Linux auditd', 'psutil / pyudev'],
    image: 'assets/kernelguard.png', imageAlt: 'KernelGuard dashboard with synthetic demonstration data', imageNote: 'Actual KernelGuard dashboard, shown with synthetic demo data.', github: 'https://github.com/flyingsaucer1/KERNAL_GUARD', url: ''
  }, {
    id: 'careerpilot', title: 'CareerPilot AI', category: 'AI career workspace · In development', year: '2026',
    description: 'A job-search workspace that connects resume review, job-specific ATS comparisons, editable drafts, application tracking, and interview practice.',
    work: 'Users can upload private PDF or Word resumes, extract and review their content, compare a resume with a job description, and choose which suggested edits to apply. Clean saved versions can be edited and exported as PDF or Word files. The workspace also tracks applications and supports written interview practice. ATS scores and AI feedback are guidance, not hiring guarantees.',
    role: 'I built the React and TypeScript workspace, Express API, account flows, MongoDB models, private file handling, resume exports, and AI-provider integration. Groq, Gemini, and local Ollama are configurable; the public launch is still in progress.',
    features: ['Private PDF and Word resume uploads with text extraction and analysis', 'Job-specific ATS estimates, keyword comparisons, and explainable suggestions', 'Apply or skip edits, save revised resumes, compare versions, and export files', 'Track applications, stages, notes, and career analytics', 'Practice interviews with generated questions and written-answer feedback'],
    stack: ['React', 'TypeScript', 'Vite', 'Express', 'MongoDB', 'Cloudinary'],
    image: 'assets/careerpilot.png', imageAlt: 'CareerPilot AI landing page with resume workspace preview', imageNote: 'Actual CareerPilot landing page. The illustrated readiness panel is demonstration content.', github: 'https://github.com/flyingsaucer1/AI-Career-Assistant', url: 'https://career-pilot-preview.vercel.app/'
  }, {
    id: 'wealthsense', title: 'WealthSense', category: 'Market research · Paper trading', year: '2026',
    description: 'A market workspace for NSE stocks with global index context, news sentiment, manually tracked holdings, and virtual paper trading.',
    work: 'WealthSense combines Yahoo Finance prices and charts with global market quotes, news-headline sentiment, and experimental research signals. Users can track holdings separately from a virtual trading account with cash, positions, trade history, and an optional paper bot. No orders reach a broker, and the research signals are not validated forecasts.',
    role: 'I built the Flask APIs and account flows, local SQLite and hosted Turso storage, market-data and news integrations, Chart.js visualizations, paper-trading rules, and offline pandas and LightGBM research scripts. The research pipeline runs separately from the hosted website.',
    features: ['View global indices, NSE stock history, charts, and headline sentiment', 'Track manually entered holdings with estimated value and profit or loss', 'Place virtual buy and sell orders with per-user cash and position limits', 'Opt in to a daily paper bot when current recommendation data is available', 'Explore experimental signals from a separate backtesting and model pipeline'],
    stack: ['Python', 'Flask', 'SQLite / Turso', 'yfinance', 'LightGBM', 'Chart.js'],
    image: 'assets/wealthsense.svg', imageAlt: 'Illustrative WealthSense newspaper-style dashboard with market research, portfolio, and paper trading panels', imageNote: 'Illustrative interface preview based on WealthSense features; no live market data or performance claims.', github: 'https://github.com/flyingsaucer1/WealthSense', url: 'https://wealthsense-bay.vercel.app/'
  }]
};
