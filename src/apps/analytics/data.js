export const timeRangeData = {
  month: {
    label: 'This Month',
    activeParticipants: 12847,
    activeChange: '+14.2%',
    civicActions: 3241,
    actionsChange: '+8.7%',
    communities: 847,
    communitiesChange: '+22.1%',
    programsActive: 6,
  },
  quarter: {
    label: 'This Quarter',
    activeParticipants: 35971,
    activeChange: '+18.4%',
    civicActions: 9075,
    actionsChange: '+11.2%',
    communities: 1203,
    communitiesChange: '+31.5%',
    programsActive: 6,
  },
  year: {
    label: 'This Year',
    activeParticipants: 53957,
    activeChange: '+24.7%',
    civicActions: 13612,
    actionsChange: '+19.3%',
    communities: 1805,
    communitiesChange: '+44.2%',
    programsActive: 6,
  },
};

export const skillsData = [
  { name: 'Productive Conversations', value: 67, color: '#C8942E' },
  { name: 'Credible Information', value: 54, color: '#2A7B88' },
  { name: 'Collaborating to Create Solutions', value: 41, color: '#8B6B3D' },
];

export const programsData = [
  { name: 'Campus Consortium', participants: 5340, color: '#C8942E' },
  { name: 'Regional Youth Summits', participants: 4120, color: '#D4A843' },
  { name: 'Youth Civic Solutions Competition', participants: 1892, color: '#2A7B88' },
  { name: 'Workplace Pilot', participants: 774, color: '#8B6B3D' },
  { name: 'Carnegie Young Leaders', participants: 487, color: '#4A7C59' },
  { name: 'Civic Spring Fellowship', participants: 234, color: '#6B7280' },
];

export const topStates = [
  { state: 'CA', participants: 1842, x: 80, y: 200 },
  { state: 'TX', participants: 1567, x: 220, y: 290 },
  { state: 'NY', participants: 1234, x: 580, y: 110 },
  { state: 'FL', participants: 1098, x: 490, y: 310 },
  { state: 'GA', participants: 876, x: 470, y: 270 },
  { state: 'IL', participants: 812, x: 400, y: 160 },
  { state: 'PA', participants: 645, x: 540, y: 135 },
  { state: 'MI', participants: 534, x: 430, y: 120 },
  { state: 'AZ', participants: 489, x: 140, y: 250 },
  { state: 'TN', participants: 421, x: 440, y: 235 },
];

export const metricCardDetails = {
  activeParticipants: {
    title: 'Active Participants',
    breakdown: [
      { label: 'Ages 14–17', value: '5,396', pct: '42%' },
      { label: 'Ages 18–21', value: '4,882', pct: '38%' },
      { label: 'Ages 22–24', value: '2,569', pct: '20%' },
    ],
    note: 'Across 6 active programs in 48 states.',
  },
  civicActions: {
    title: 'Civic Actions This Month',
    breakdown: [
      { label: 'Productive Conversations', value: '1,172', pct: '36%' },
      { label: 'Credible Info Actions', value: '875', pct: '27%' },
      { label: 'Collaborative Projects', value: '1,194', pct: '37%' },
    ],
    note: 'Actions logged across all skill domains.',
  },
  communities: {
    title: 'Communities Reached',
    breakdown: [
      { label: 'Urban', value: '412', pct: '49%' },
      { label: 'Suburban', value: '278', pct: '33%' },
      { label: 'Rural', value: '157', pct: '18%' },
    ],
    note: 'Communities with at least one active participant.',
  },
  programs: {
    title: 'Programs Active',
    breakdown: [
      { label: 'Carnegie Young Leaders', value: '487 participants', pct: '' },
      { label: 'Campus Consortium', value: '5,340 participants', pct: '' },
      { label: 'Regional Youth Summits', value: '4,120 participants', pct: '' },
      { label: '+ 3 more programs', value: '', pct: '' },
    ],
    note: 'All programs operating at full capacity.',
  },
};

export const programDetails = {
  'Campus Consortium': {
    description: 'University and college partnerships driving sustained civic engagement on campuses across 38 states.',
    participants: 5340,
    teams: 312,
    avgScore: 64,
    status: 'Active',
  },
  'Regional Youth Summits': {
    description: 'Multi-day convenings bringing together young civic leaders from across regions to collaborate on shared challenges.',
    participants: 4120,
    teams: 48,
    avgScore: 71,
    status: 'Active',
  },
  'Youth Civic Solutions Competition': {
    description: 'National competition where teams of young people design and present civic solutions to real community problems.',
    participants: 1892,
    teams: 189,
    avgScore: 58,
    status: 'Active',
  },
  'Workplace Pilot': {
    description: 'Employer-partnered program introducing civic engagement frameworks in professional settings for young adults.',
    participants: 774,
    teams: 62,
    avgScore: 55,
    status: 'Active',
  },
  'Carnegie Young Leaders': {
    description: 'Flagship team-based program supporting youth-led civic projects in communities across the country.',
    participants: 487,
    teams: 98,
    avgScore: 62,
    status: 'Active',
  },
  'Civic Spring Fellowship': {
    description: 'Intensive six-month fellowship developing the next generation of civic infrastructure builders.',
    participants: 234,
    teams: 24,
    avgScore: 78,
    status: 'Active',
  },
};

export const funderData = {
  carnegie_corporation: {
    label: 'Carnegie Corporation of New York',
    program: 'Carnegie Young Leaders',
    sections: {
      executive_summary: {
        title: 'Executive Summary',
        content: 'The Carnegie Young Leaders program continues to demonstrate strong growth and civic impact across the United States. With 487 active participants organized in 98 teams across 34 states, the program is on track to exceed its FY26 engagement targets. Youth-led civic projects are deepening community roots while building durable civic skills across all three domains.',
      },
      participation_data: {
        title: 'Participation Data',
        content: '487 active participants across 98 teams in 34 states. Average team size: 5 members. Age distribution: 14–17 (42%), 18–21 (38%), 22–24 (20%). Gender: 54% female, 43% male, 3% non-binary. 18% of teams operate in rural communities, up from 11% last quarter — indicating expanding geographic reach into underserved areas.',
      },
      civic_skills: {
        title: 'Civic Skill Metrics',
        content: 'Average civic skill development score: 62% across the Carnegie portfolio. Productive Conversations: 67% proficiency (+12 points from baseline). Credible Information: 54% proficiency (+18 points from baseline — highest gain across all domains). Collaborating to Create Solutions: 41% proficiency (+9 points from baseline). The 14–17 cohort shows the highest rate of skill development across all three domains.',
      },
      geographic: {
        title: 'Geographic Distribution',
        content: 'Carnegie Young Leaders teams are concentrated in California (12%), Texas (9%), New York (8%), Florida (7%), and Georgia (6%). Rural community representation has grown from 11% to 18% this quarter, reflecting deliberate expansion into underserved geographies. All four major US regions are represented.',
      },
      featured_stories: {
        title: 'Featured Stories',
        content: 'VRing Democracy — San Francisco, CA: Built immersive VR experiences helping immigrant communities navigate the voting process in five languages. Reached 340 first-generation immigrants in two months.\n\nWe Build Us — Wylam, AL: Converting abandoned lots into civic gathering spaces in a historically Black neighborhood. Hosted first community dialogue with 67 residents.\n\nCypress Disaster Recovery — Cypress, TX: Built multilingual disaster preparedness resources post-Hurricane Beryl. Trained 45 community liaisons now serving 200+ families.',
      },
      financial_summary: {
        title: 'Resource & Milestone Summary',
        content: 'Grant disbursement is on schedule: 82% of the annual allocation has been deployed across active teams. 94% of teams are meeting their project milestones on time or ahead of schedule. Efficiency gains from shared platform infrastructure have reduced per-participant overhead by 12% compared to the prior year.',
      },
    },
  },
  hewlett_foundation: {
    label: 'William and Flora Hewlett Foundation',
    program: 'Civic Skill Development Portfolio',
    sections: {
      executive_summary: {
        title: 'Executive Summary',
        content: 'Civic skill development across the C&S portfolio shows meaningful and measurable gains, particularly in the Credible Information domain where growth from baseline is the strongest at +18 percentage points. The 14–17 age cohort continues to show the highest rate of development across all three skill domains, validating the early-intervention design of the portfolio.',
      },
      participation_data: {
        title: 'Participation Data',
        content: '12,847 young people are actively developing civic skills across all C&S programs. 67% of participants engaged with at least two of the three civic skill domains in the current month. Average engagement duration: 4.2 months. Return engagement rate: 64%, indicating sustained participation rather than one-time interactions.',
      },
      civic_skills: {
        title: 'Civic Skill Metrics',
        content: 'Productive Conversations proficiency: 67% (+12 points from baseline). Credible Information proficiency: 54% (+18 points from baseline — strongest gain). Collaborating to Create Solutions: 41% (+9 points from baseline). Skill gains are distributed across urban, suburban, and rural participants within a 3% parity margin, demonstrating that the digital infrastructure is effectively reaching non-urban communities.',
      },
      geographic: {
        title: 'Geographic Distribution',
        content: 'Skill development is active across 847 communities in 48 states. Urban-rural skill development parity is within 3 percentage points across all three domains — a key indicator of equitable access. The platform\'s mobile-first design (68% of sessions on mobile) is a primary driver of rural reach.',
      },
      featured_stories: {
        title: 'Featured Stories',
        content: 'Bridge Builders — Nashville, TN: Cross-partisan dialogue series engaged 180 participants; 89% reported increased comfort with political disagreement, a direct indicator of Productive Conversations skill development in a high-stakes context.\n\nTruth Check ATL — Atlanta, GA: Student-run local news verification project has systematically evaluated 240 news sources, building durable Credible Information skills at scale.',
      },
      financial_summary: {
        title: 'Resource & Milestone Summary',
        content: 'Portfolio-wide resource deployment is tracking ahead of projections. The cost per participant skill gain has decreased 12% from the prior year, driven by platform infrastructure efficiencies. Skill assessment infrastructure is now embedded in all six active programs, enabling consistent measurement at scale.',
      },
    },
  },
  einhorn_collaborative: {
    label: 'Einhorn Collaborative',
    program: 'Cross-Partisan Youth Engagement',
    sections: {
      executive_summary: {
        title: 'Executive Summary',
        content: 'Cross-partisan engagement continues to be a distinctive strength of the C&S portfolio. 23% of peer connections on the platform are cross-geographic, connecting young people in different states working on similar civic issues. These cross-geographic connections are creating the relational infrastructure for genuine cross-partisan understanding — one of the portfolio\'s most strategically important outcomes.',
      },
      participation_data: {
        title: 'Participation Data',
        content: '847 communities represented across the portfolio. 2,340 cross-geographic peer connections formed to date. 78% of participants in cross-geographic connections report engaging with someone of a different political perspective within their first month — a leading indicator of cross-partisan relationship formation.',
      },
      civic_skills: {
        title: 'Civic Skill Metrics',
        content: 'Productive Conversations is the primary skill domain for cross-partisan outcomes. Participants in cross-geographic peer connections show 15% higher Productive Conversations scores than the portfolio average. This suggests that cross-geographic connection is both a driver and a reinforcer of dialogue capacity.',
      },
      geographic: {
        title: 'Geographic Distribution',
        content: 'Cross-geographic connections span all 48 active states. Strongest cross-regional bridges: Rural-Urban connections within the same state (31%), Southeast-Midwest (28%), and Northeast-Southwest (22%). The geographic diversity of connections is a leading indicator of cross-partisan relationship formation.',
      },
      featured_stories: {
        title: 'Featured Stories',
        content: 'Bridge Builders — Nashville, TN: Dialogue series brought together participants across partisan lines; 89% reported increased comfort with political disagreement. Their model has been organically adapted by three other teams in different states — a signal of replicable cross-partisan practice.\n\nCivic Connections Exchange: A new cross-program initiative pairing teams in red and blue districts to collaborate on shared civic challenges. Early results show 2.4x higher engagement rates than standard program participation.',
      },
      financial_summary: {
        title: 'Resource & Milestone Summary',
        content: 'Resources dedicated to cross-partisan programming are being deployed efficiently, with 12 programs now designating cross-partisan engagement as a primary outcome. Per-interaction costs have declined as the platform\'s matching infrastructure has improved, enabling more organic cross-partisan connections at lower marginal cost.',
      },
    },
  },
  tepper_foundation: {
    label: 'The Tepper Foundation',
    program: 'Youth Civic Infrastructure',
    sections: {
      executive_summary: {
        title: 'Executive Summary',
        content: 'The technology infrastructure investment is enabling C&S to scale civic engagement while maintaining quality and personalization. Platform adoption continues to accelerate with 14.2% month-over-month growth in active participants — a trajectory that would bring the platform to meaningful national scale within 18 months at current growth rates.',
      },
      participation_data: {
        title: 'Participation Data',
        content: '12,847 active participants on the platform. 3,241 civic actions completed this month (+8.7% month-over-month). Average session duration: 12 minutes — significantly above benchmark for civic engagement platforms. Return visit rate: 64%, indicating that the personalized content experience is driving sustained engagement rather than one-time activation.',
      },
      civic_skills: {
        title: 'Civic Skill Metrics',
        content: 'The platform\'s embedded civic skill framework is showing measurable behavioral impact. Young people who complete at least one skill pathway show 23% higher engagement retention than those who do not — validating the design decision to integrate skill development directly into the participation experience rather than treating it as a separate assessment layer.',
      },
      geographic: {
        title: 'Geographic Distribution',
        content: 'Platform reach extends across 847 communities in 48 states. Mobile access accounts for 68% of sessions, validating the mobile-first design decision and ensuring reach into communities where desktop access is limited. Platform uptime has been 99.7% over the trailing quarter.',
      },
      featured_stories: {
        title: 'Featured Stories',
        content: 'AI-Powered Civic Action Engine: The platform\'s content engine surfaces an average of 340 new civic actions per week, categorized across the three civic skill domains. 78% of users report that recommended actions feel personally relevant to their interests and location — a strong signal of recommendation quality.\n\nAccessibility Expansion: The platform\'s recent multilingual expansion (now supporting 7 languages) has increased participation from non-English-speaking communities by 34% in two months.',
      },
      financial_summary: {
        title: 'Resource & Milestone Summary',
        content: 'Infrastructure investment milestones are tracking on schedule. Per-active-user platform costs continue to decline as the user base scales, demonstrating the leverage of the infrastructure investment. The platform is on track to achieve projected per-user cost reductions by the end of FY26, validating the infrastructure-first investment thesis.',
      },
    },
  },
};

// Chart data for funder report sections
export const reportChartData = {

  // Civic skills chart — same baseline/current data for all funders
  civic_skills: [
    { skill: 'Productive\nConversations', baseline: 55, current: 67, color: '#C8942E' },
    { skill: 'Credible\nInformation', baseline: 36, current: 54, color: '#2A7B88' },
    { skill: 'Collaborating to\nCreate Solutions', baseline: 32, current: 41, color: '#8B6B3D' },
  ],

  // Participation charts — funder-specific
  participation: {
    carnegie_corporation: {
      type: 'horizontal_bar',
      label: 'Age Distribution — Carnegie Young Leaders',
      data: [
        { name: 'Ages 14–17', value: 42, color: '#C8942E' },
        { name: 'Ages 18–21', value: 38, color: '#D4A843' },
        { name: 'Ages 22–24', value: 20, color: '#8B6B3D' },
      ],
      unit: '%',
    },
    hewlett_foundation: {
      type: 'horizontal_bar',
      label: 'Domain Engagement — Portfolio',
      data: [
        { name: 'Productive Conversations', value: 78, color: '#C8942E' },
        { name: 'Credible Information', value: 61, color: '#2A7B88' },
        { name: 'Collaborating to Create Solutions', value: 67, color: '#8B6B3D' },
        { name: 'Two or more domains', value: 67, color: '#4A7C59' },
      ],
      unit: '% of participants',
    },
    einhorn_collaborative: {
      type: 'horizontal_bar',
      label: 'Cross-Partisan Connection Types',
      data: [
        { name: 'Rural–Urban (same state)', value: 31, color: '#C8942E' },
        { name: 'Southeast–Midwest', value: 28, color: '#2A7B88' },
        { name: 'Northeast–Southwest', value: 22, color: '#8B6B3D' },
        { name: 'Other cross-regional', value: 19, color: '#D4A843' },
      ],
      unit: '% of connections',
    },
    tepper_foundation: {
      type: 'horizontal_bar',
      label: 'Platform Engagement Metrics',
      data: [
        { name: 'Return visit rate', value: 64, color: '#C8942E' },
        { name: 'Actions completed (monthly)', value: 87, color: '#2A7B88' },
        { name: 'Skill pathway completion', value: 58, color: '#8B6B3D' },
        { name: 'Content relevance rating', value: 78, color: '#4A7C59' },
      ],
      unit: '%',
    },
  },

  // Geographic charts — funder-specific
  geographic: {
    carnegie_corporation: {
      type: 'horizontal_bar',
      label: 'Top 5 States by Team Representation',
      data: [
        { name: 'California', value: 12, color: '#C8942E' },
        { name: 'Texas', value: 9, color: '#D4A843' },
        { name: 'New York', value: 8, color: '#2A7B88' },
        { name: 'Florida', value: 7, color: '#8B6B3D' },
        { name: 'Georgia', value: 6, color: '#4A7C59' },
      ],
      unit: '% of teams',
    },
    hewlett_foundation: {
      type: 'horizontal_bar',
      label: 'Urban–Rural Skill Development Parity',
      data: [
        { name: 'Productive Conversations', value: 3, color: '#C8942E' },
        { name: 'Credible Information', value: 2, color: '#2A7B88' },
        { name: 'Collaborating to Create Solutions', value: 3, color: '#8B6B3D' },
      ],
      unit: 'pt gap (urban vs rural)',
      note: 'Lower is better — indicates equitable access.',
    },
    einhorn_collaborative: {
      type: 'horizontal_bar',
      label: 'Cross-Geographic Connections by Region Pair',
      data: [
        { name: 'Rural–Urban (same state)', value: 724, color: '#C8942E' },
        { name: 'Southeast–Midwest', value: 655, color: '#2A7B88' },
        { name: 'Northeast–Southwest', value: 515, color: '#8B6B3D' },
        { name: 'Other pairings', value: 446, color: '#D4A843' },
      ],
      unit: 'connections',
    },
    tepper_foundation: {
      type: 'horizontal_bar',
      label: 'Session Access by Device Type',
      data: [
        { name: 'Mobile', value: 68, color: '#C8942E' },
        { name: 'Desktop', value: 24, color: '#2A7B88' },
        { name: 'Tablet', value: 8, color: '#8B6B3D' },
      ],
      unit: '% of sessions',
    },
  },
};

export const reportSectionKeys = [
  { key: 'executive_summary', label: 'Executive Summary' },
  { key: 'participation_data', label: 'Participation Data' },
  { key: 'civic_skills', label: 'Civic Skill Metrics' },
  { key: 'geographic', label: 'Geographic Distribution' },
  { key: 'featured_stories', label: 'Featured Stories' },
  { key: 'financial_summary', label: 'Resource & Milestone Summary' },
];
