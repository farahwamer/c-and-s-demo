// ─── Full application teams (used in Screen 2 and Screen 1 table) ────────────

export const applicationTeams = [
  {
    id: 1,
    team_name: 'VRing Democracy',
    location: 'San Francisco, CA',
    state: 'CA',
    members: ['Kai Nakamura (18)', 'Priya Sharma (17)', 'Diego Flores (19)', 'Zoe Washington (18)', "Liam O'Brien (17)"],
    project_title: 'VRing Democracy: Making Voting Accessible Through Virtual Reality',
    sdg_focus: 'Peace, Justice & Strong Institutions',
    civic_skill: 'Collaborating',
    civic_skill_full: 'Collaborating to Create Solutions',
    funding_amount: 7500,
    status: 'Under Review',
    description:
      'We are building immersive virtual reality experiences that walk immigrant communities through the voter registration and voting process in five languages. Our pilot at three community centers in the Mission District reached 340 first-generation immigrants in the first two months. Each VR module takes a user through the full process, from registration to casting a ballot, in their native language. We partnered with the San Francisco Department of Elections to ensure accuracy. Our next phase expands to Chinatown and the Tenderloin.',
    budget_breakdown:
      'VR headsets and equipment: $3,200 · Translation and content development: $1,800 · Community center partnerships: $1,500 · Marketing materials: $1,000',
    ai_scores: {
      community_impact: 4.5,
      feasibility: 4.2,
      civic_skill_alignment: 4.8,
      impact_rationale:
        'Project demonstrates measurable reach (340 participants in two months) with clear expansion plan. Direct connection to democratic participation in underserved communities.',
      feasibility_rationale:
        'Budget is well-structured. Partnership with SF Department of Elections adds institutional credibility. VR equipment costs are realistic for scope.',
      skill_rationale:
        'Strong alignment with Collaborating to Create Solutions. The project requires cross-sector collaboration (government, community organizations, immigrant communities) and produces a tangible civic tool.',
    },
  },
  {
    id: 2,
    team_name: 'We Build Us',
    location: 'Wylam, AL',
    state: 'AL',
    members: ['Jasmine Carter (16)', 'Marcus Thompson (17)', 'Aaliyah Brooks (16)', 'Devon Mitchell (15)', 'Sage Rivera (17)'],
    project_title: 'We Build Us: Community Gardens as Civic Third Spaces',
    sdg_focus: 'Sustainable Cities & Communities',
    civic_skill: 'Productive Conversations',
    civic_skill_full: 'Productive Conversations',
    funding_amount: 6000,
    status: 'Under Review',
    description:
      "We are converting three abandoned lots in Wylam into community gardens that serve as civic gathering spaces. Wylam is a historically Black neighborhood in Birmingham where public meeting spaces have disappeared over the past two decades. Our gardens are designed as 'third spaces' where neighbors can grow food, host community conversations, and plan collective action. We have already completed one garden with 24 raised beds and hosted our first community conversation attended by 67 residents, including the district city council representative.",
    budget_breakdown:
      'Materials and soil: $2,400 · Tools and equipment: $1,200 · Community event supplies: $800 · Signage and design: $600 · Seeds and plants: $1,000',
    ai_scores: {
      community_impact: 4.8,
      feasibility: 4.0,
      civic_skill_alignment: 4.3,
      impact_rationale:
        'Addresses both food access and civic infrastructure gaps in a historically underinvested community. 67 residents at first event demonstrates strong community buy-in.',
      feasibility_rationale:
        'First garden completed successfully. Budget is reasonable. Converting three lots is ambitious for the timeline but the team has demonstrated ability to execute.',
      skill_rationale:
        'Strong alignment with Productive Conversations. The garden model is designed specifically to create spaces for cross-generational civic dialogue.',
    },
  },
  {
    id: 3,
    team_name: 'Cypress Disaster Recovery',
    location: 'Cypress, TX',
    state: 'TX',
    members: ['Noah Hernandez (19)', 'Fatima Al-Rashid (18)', 'Jordan Lee (20)', 'Emily Tran (19)'],
    project_title: 'Cypress Disaster Recovery: Building Civic Preparedness Infrastructure',
    sdg_focus: 'Climate Action',
    civic_skill: 'Credible Information',
    civic_skill_full: 'Credible Information',
    funding_amount: 5500,
    status: 'Under Review',
    description:
      'After Hurricane Beryl devastated our community in 2024, we realized that disaster preparedness information was scattered, outdated, and inaccessible to non-English-speaking families. We are building a multilingual disaster preparedness resource hub and training program for underserved families in the Cypress-Fairbanks area. We have trained 45 community preparedness liaisons who serve as information bridges in their neighborhoods. Our resource kit has been distributed to 200+ families in English, Spanish, and Vietnamese.',
    budget_breakdown:
      'Resource kit production: $2,000 · Training materials: $1,200 · Translation services: $1,000 · Distribution and events: $800 · Technology (website and SMS alerts): $500',
    ai_scores: {
      community_impact: 4.3,
      feasibility: 4.5,
      civic_skill_alignment: 4.6,
      impact_rationale:
        'Directly addresses a demonstrated community need. 45 trained liaisons and 200+ families reached shows strong traction.',
      feasibility_rationale:
        'Most infrastructure already built. Budget is conservative and realistic. Clear distribution channels established.',
      skill_rationale:
        'Strong alignment with Credible Information. The entire project is built around ensuring communities can access, evaluate, and act on accurate preparedness information.',
    },
  },
]

// ─── Additional teams (Screen 1 table) ───────────────────────────────────────

const additionalTeams = [
  {
    id: 4,
    team_name: 'Code the Vote',
    location: 'Detroit, MI',
    state: 'MI',
    members: ['Amara Diallo (17)', 'James Park (18)', 'Sofia Reyes (16)', 'Isaiah Brown (17)'],
    project_title: 'Civic Tech Workshops for High Schoolers',
    sdg_focus: 'Quality Education',
    civic_skill: 'Collaborating',
    civic_skill_full: 'Collaborating to Create Solutions',
    funding_amount: 4500,
    status: 'Active',
    description:
      'Code the Vote runs after-school workshops teaching Detroit high schoolers to build civic technology tools — voter registration chatbots, neighborhood issue-trackers, and school board meeting dashboards. Projects go live and serve real residents.',
    budget_breakdown: 'Equipment and software: $1,800 · Instructor stipends: $1,400 · Materials and printing: $700 · Community showcase event: $600',
    ai_scores: null,
  },
  {
    id: 5,
    team_name: 'Fresh Start Collective',
    location: 'Chicago, IL',
    state: 'IL',
    members: ['Destiny Williams (18)', 'Mateo Gonzalez (17)', 'Chloe Kim (16)', 'Andre Johnson (19)', 'Nia Okafor (17)', 'Tyler Hayes (18)'],
    project_title: 'Youth-Led Food Access Mapping',
    sdg_focus: 'Zero Hunger',
    civic_skill: 'Credible Information',
    civic_skill_full: 'Credible Information',
    funding_amount: 6500,
    status: 'Active',
    description:
      "Fresh Start Collective is building an open-data map of food access gaps across Chicago's South Side, working with community members to verify locations of food pantries, community fridges, and SNAP-accepting grocers. The map is published and updated weekly.",
    budget_breakdown: 'Data tools and hosting: $1,500 · Community researcher stipends: $2,400 · Design and outreach: $1,200 · Partnership events: $1,400',
    ai_scores: null,
  },
  {
    id: 6,
    team_name: 'Bridge Builders',
    location: 'Nashville, TN',
    state: 'TN',
    members: ['Emma Caldwell (17)', 'Darius King (18)', 'Leila Farouk (16)', 'Connor Walsh (17)', 'Priya Patel (18)'],
    project_title: 'Cross-Partisan Youth Dialogue Series',
    sdg_focus: 'Peace & Justice',
    civic_skill: 'Productive Conversations',
    civic_skill_full: 'Productive Conversations',
    funding_amount: 5000,
    status: 'Active',
    description:
      'Bridge Builders has facilitated 12 structured cross-partisan dialogue sessions bringing together 180 Nashville youth from across the political spectrum. Sessions use evidence-based facilitation techniques to build comfort with political disagreement. 89% of participants report measurable gains.',
    budget_breakdown: 'Facilitation training: $1,800 · Venue and catering: $1,600 · Participant materials: $900 · Program evaluation: $700',
    ai_scores: null,
  },
  {
    id: 7,
    team_name: 'Agua Para Todos',
    location: 'Tucson, AZ',
    state: 'AZ',
    members: ['Rosa Mendez (19)', 'Carlos Rivera (18)', 'Aisha Mohammed (17)', 'Jake Torres (19)', 'Maya Lightfoot (18)'],
    project_title: 'Water Access Advocacy for Border Communities',
    sdg_focus: 'Clean Water',
    civic_skill: 'Collaborating',
    civic_skill_full: 'Collaborating to Create Solutions',
    funding_amount: 7000,
    status: 'Under Review',
    description:
      'Agua Para Todos is documenting water access inequities affecting border communities in the Sonoran Desert, partnering with local environmental justice organizations to translate findings into policy recommendations presented to the Tucson City Council.',
    budget_breakdown: 'Field research and equipment: $2,800 · Translation and outreach: $1,600 · Policy brief design: $1,400 · Council presentation prep: $1,200',
    ai_scores: null,
  },
  {
    id: 8,
    team_name: 'The Commons Project',
    location: 'Portland, OR',
    state: 'OR',
    members: ['Hazel Nguyen (17)', 'Sam Osei (18)', 'Lily Chen (16)'],
    project_title: 'Public Library Civic Engagement Hubs',
    sdg_focus: 'Sustainable Cities',
    civic_skill: 'Productive Conversations',
    civic_skill_full: 'Productive Conversations',
    funding_amount: 4000,
    status: 'Active',
    description:
      'The Commons Project has established civic engagement hubs in three Portland public libraries — neutral spaces where residents meet monthly to deliberate on shared community priorities. Each hub is staffed by a trained youth facilitator.',
    budget_breakdown: 'Hub setup and materials: $1,600 · Facilitator stipends: $1,400 · Programming and events: $1,000',
    ai_scores: null,
  },
  {
    id: 9,
    team_name: 'Truth Check ATL',
    location: 'Atlanta, GA',
    state: 'GA',
    members: ['Jordan Bell (18)', 'Olivia Marsh (17)', 'Kevin Durant (16)', 'Anika Sharma (19)'],
    project_title: 'Student-Run Local News Verification',
    sdg_focus: 'Peace & Justice',
    civic_skill: 'Credible Information',
    civic_skill_full: 'Credible Information',
    funding_amount: 5500,
    status: 'Active',
    description:
      "Truth Check ATL operates a student-run fact-checking desk that verifies claims circulating in Atlanta's local news ecosystem. Published corrections reach thousands of residents through school media networks, social channels, and a partnership with a local public radio station.",
    budget_breakdown: 'Training and tools: $2,000 · Media partnerships: $1,500 · Student stipends: $1,400 · Publication costs: $600',
    ai_scores: null,
  },
  {
    id: 10,
    team_name: 'Green Corridors',
    location: 'Miami, FL',
    state: 'FL',
    members: ['Isabella Moreno (18)', 'Kwame Asante (17)', 'Nina Petrov (19)', 'Diego Ramirez (18)', 'Zara Ahmed (17)', 'Marcus Lee (16)'],
    project_title: 'Youth Climate Resilience Planning',
    sdg_focus: 'Climate Action',
    civic_skill: 'Collaborating',
    civic_skill_full: 'Collaborating to Create Solutions',
    funding_amount: 7500,
    status: 'Active',
    description:
      "Green Corridors is working with Miami's urban planning department to design youth-led climate resilience proposals for three flood-vulnerable neighborhoods. The team presents recommendations to city commissioners and tracks implementation through a public dashboard.",
    budget_breakdown: 'Research and mapping tools: $2,400 · Design and visualization: $2,000 · Community engagement events: $1,800 · Presentation materials: $1,300',
    ai_scores: null,
  },
  {
    id: 11,
    team_name: 'Speak Up Philly',
    location: 'Philadelphia, PA',
    state: 'PA',
    members: ['Destiny Howard (17)', 'Marcus Chen (18)', 'Aaliyah Davis (16)', 'Ethan Park (17)'],
    project_title: 'Youth Public Comment Training',
    sdg_focus: 'Peace & Justice',
    civic_skill: 'Productive Conversations',
    civic_skill_full: 'Productive Conversations',
    funding_amount: 3500,
    status: 'Completed',
    description:
      'Speak Up Philly trained 120 Philadelphia youth to give effective public comment at city council and school board meetings. The program ran two cohorts and is now used as a model by three other Pennsylvania cities. Project completed in December 2025.',
    budget_breakdown: 'Workshop materials: $1,400 · Venue and transportation: $1,100 · Participant stipends: $1,000',
    ai_scores: null,
  },
  {
    id: 12,
    team_name: 'Rural Voices',
    location: 'Bozeman, MT',
    state: 'MT',
    members: ['Wyatt Nelson (19)', 'Claire Hoffman (18)', 'Sam Redhorse (17)'],
    project_title: 'Small Town Civic Journalism',
    sdg_focus: 'Quality Education',
    civic_skill: 'Credible Information',
    civic_skill_full: 'Credible Information',
    funding_amount: 5000,
    status: 'Active',
    description:
      'Rural Voices publishes a weekly civic newsletter covering local government in Gallatin County — a fast-growing region with little existing local journalism. The newsletter has 1,400 subscribers and has driven measurable increases in planning meeting attendance.',
    budget_breakdown: 'Reporting tools and software: $1,200 · Production and design: $1,600 · Distribution and outreach: $1,200 · Equipment: $1,000',
    ai_scores: null,
  },
]

export const allTeams = [
  ...applicationTeams,
  ...additionalTeams,
]

// ─── Team locations for map ───────────────────────────────────────────────────

export const teamLocations = [
  { name: 'VRing Democracy',          coordinates: [-122.4194, 37.7749] },
  { name: 'We Build Us',              coordinates: [-86.8104, 33.5186]  },
  { name: 'Cypress Disaster Recovery',coordinates: [-95.6972, 29.9691]  },
  { name: 'Code the Vote',            coordinates: [-83.0458, 42.3314]  },
  { name: 'Fresh Start Collective',   coordinates: [-87.6298, 41.8781]  },
  { name: 'Bridge Builders',          coordinates: [-86.7816, 36.1627]  },
  { name: 'Agua Para Todos',          coordinates: [-110.9747, 32.2226] },
  { name: 'The Commons Project',      coordinates: [-122.6750, 45.5051] },
  { name: 'Truth Check ATL',          coordinates: [-84.3880, 33.7490]  },
  { name: 'Green Corridors',          coordinates: [-80.1918, 25.7617]  },
  { name: 'Speak Up Philly',          coordinates: [-75.1652, 39.9526]  },
  { name: 'Rural Voices',             coordinates: [-111.0429, 45.6770] },
]

// ─── Funder report data ───────────────────────────────────────────────────────

export const funderReports = {
  carnegie: {
    id: 'carnegie',
    label: 'Carnegie Corporation of New York',
    header: 'Carnegie Corporation of New York',
    subheader: 'Carnegie Young Leaders · Quarterly Report · Q1 2026',
    program: 'Carnegie Young Leaders',
    stats: [
      { label: 'Active Participants', value: 487 },
      { label: 'Teams', value: 98 },
      { label: 'States', value: 34 },
    ],
    summaryText:
      '487 active participants across 98 teams in 34 states. Average civic skill development score: 62%. Projects addressing Education (34%), Environment (22%), Health (18%), and Community Development (26%). Three teams selected for spotlight this quarter.',
    sdgData: [
      { name: 'Education',    value: 34 },
      { name: 'Environment',  value: 22 },
      { name: 'Health',       value: 18 },
      { name: 'Community',    value: 26 },
    ],
    skillProgress: [
      { skill: 'Productive Conversations', color: '#C8942E', value: 67 },
      { skill: 'Credible Information',      color: '#2A7B88', value: 54 },
      { skill: 'Collaborating',             color: '#8B6B3D', value: 62 },
    ],
    featuredTeams: [
      {
        name: 'VRing Democracy — San Francisco, CA',
        story:
          "In San Francisco's Mission District, VRing Democracy has reached 340 first-generation immigrants through immersive virtual reality voter education — available in five languages and developed in partnership with the SF Department of Elections. The team is now expanding to Chinatown and the Tenderloin.",
      },
      {
        name: 'We Build Us — Wylam, AL',
        story:
          "In Wylam, a historically Black neighborhood in Birmingham, We Build Us has converted abandoned lots into civic gathering spaces. Their first community garden event drew 67 residents and the district's city council representative — a direct demonstration of physical space as civic infrastructure.",
      },
    ],
  },

  hewlett: {
    id: 'hewlett',
    label: 'William and Flora Hewlett Foundation',
    header: 'William and Flora Hewlett Foundation',
    subheader: 'Civic Skill Development Portfolio · Quarterly Report · Q1 2026',
    program: 'Civic Skill Development Portfolio',
    stats: [
      { label: 'Youth Developing Skills', value: 12847 },
      { label: 'Program Cohorts', value: 98 },
      { label: 'States Represented', value: 34 },
    ],
    summaryText:
      '12,847 young people are actively developing civic skills across all cohorts. Strongest gains appear in the 14–17 age bracket. Credible Information shows the highest growth from baseline (+18%), suggesting that media literacy and source evaluation are areas where structured practice produces rapid gains.',
    sdgData: [
      { name: 'Education',   value: 38 },
      { name: 'Environment', value: 19 },
      { name: 'Health',      value: 21 },
      { name: 'Community',   value: 22 },
    ],
    skillProgress: [
      { skill: 'Productive Conversations', color: '#C8942E', value: 67, note: '+12% from baseline' },
      { skill: 'Credible Information',      color: '#2A7B88', value: 54, note: '+18% from baseline' },
      { skill: 'Collaborating',             color: '#8B6B3D', value: 41, note: '+9% from baseline'  },
    ],
    featuredTeams: [
      {
        name: 'Cypress Disaster Recovery — Cypress, TX',
        story:
          'Following Hurricane Beryl, Cypress Disaster Recovery built a multilingual preparedness program reaching 200+ families in English, Spanish, and Vietnamese. Their 45 trained community liaisons demonstrate peer-to-peer civic skill transfer at scale — a model with direct implications for the Credible Information skill domain.',
      },
      {
        name: 'Truth Check ATL — Atlanta, GA',
        story:
          "Truth Check ATL students are verifying local news claims and publishing corrections through school media networks and a partnership with a local public radio station. The project directly applies Credible Information skills and has reached thousands of Atlanta residents, building community-wide media literacy.",
      },
    ],
  },

  einhorn: {
    id: 'einhorn',
    label: 'Einhorn Collaborative',
    header: 'Einhorn Collaborative',
    subheader: 'Cross-Partisan Youth Engagement · Quarterly Report · Q1 2026',
    program: 'Cross-Partisan Youth Engagement',
    stats: [
      { label: 'Communities Represented', value: 847 },
      { label: 'Teams', value: 98 },
      { label: 'States', value: 34 },
    ],
    summaryText:
      '847 communities represented in cross-partisan dialogue initiatives. 23% of peer connections are cross-geographic, linking young people in different states around shared issues. Bridge Builders in Nashville has become a flagship model: 89% of their 180 participants report increased comfort navigating political disagreement.',
    sdgData: [
      { name: 'Dialogue',    value: 41 },
      { name: 'Democracy',   value: 28 },
      { name: 'Community',   value: 19 },
      { name: 'Education',   value: 12 },
    ],
    skillProgress: [
      { skill: 'Productive Conversations', color: '#C8942E', value: 78 },
      { skill: 'Credible Information',      color: '#2A7B88', value: 61 },
      { skill: 'Collaborating',             color: '#8B6B3D', value: 55 },
    ],
    featuredTeams: [
      {
        name: 'Bridge Builders — Nashville, TN',
        story:
          "Bridge Builders' Cross-Partisan Youth Dialogue Series has engaged 180 participants across partisan lines. Using evidence-based facilitation, 89% of participants report increased comfort with political disagreement — a breakthrough outcome in a city where civic polarization has measurably increased over the past five years.",
      },
      {
        name: 'The Commons Project — Portland, OR',
        story:
          "The Commons Project has established civic engagement hubs in three Portland public libraries — neutral spaces where residents across political identities deliberate monthly on shared community priorities. Youth facilitators are trained to hold productive tension without imposing consensus.",
      },
    ],
  },
}
