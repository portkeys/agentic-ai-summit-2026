/* Agentic AI Summit 2026 — schedule data
   Source: https://rdi.berkeley.edu/events/agentic-ai-summit-2026 (agenda)
           Agentic AI Summit 2026 Venue Map (stage -> building)
   Talk tuple: [name, affiliation, talkTitle, role]
   role: '' = featured talk | 'keynote' | 'opening keynote' | 'panelist' | 'moderator' | 'workshop' */

const EVENT = {
  name: 'Agentic AI Summit 2026',
  venue: 'UC Berkeley Campus',
  days: [
    { n: 1, label: 'Sat', date: 'Saturday, August 1', iso: '2026-08-01' },
    { n: 2, label: 'Sun', date: 'Sunday, August 2', iso: '2026-08-02' },
  ],
};

/* Stage -> building comes from the venue map pin colours. */
const STAGES = {
  plenary: { name: 'Plenary', venue: 'Zellerbach Auditorium', building: 'Zellerbach', short: 'Zellerbach Aud.' },
  atlas:   { name: 'Atlas',   venue: 'MLK 3/F — Pauley West', building: 'MLK',        short: 'Pauley West' },
  nexus:   { name: 'Nexus',   venue: 'Zellerbach Playhouse',  building: 'Zellerbach', short: 'Playhouse' },
  compass: { name: 'Compass', venue: 'MLK 3/F — Pauley East', building: 'MLK',        short: 'Pauley East' },
};

const VENUE_NOTES = [
  ['Check-in', 'General admission, Atlas/Compass speakers, silver/bronze/VC sponsors — MLK 3/F, near Stephens Lounge'],
  ['Check-in', 'Plenary/Nexus speakers, platinum/gold sponsors — Lower Sproul Plaza'],
  ['Posters', 'MLK 3/F'],
  ['Catering', 'MLK 1/F · MLK 3/F Stephens Lounge · Lower Sproul Plaza'],
  ['Sponsor exhibits', 'Zellerbach Auditorium Lobby · ZA Mezzanine · MLK 2/F · MLK 3/F Kerr Lobby'],
];

const SESSIONS = [

/* ── PLENARY · SATURDAY — Zellerbach Auditorium ───────────────────── */
{ day:1, stage:'plenary', start:'09:15', kind:'opening', title:'Opening Remarks', talks:[
  ['Rich Lyons','Chancellor, UC Berkeley','',''],
  ['Dawn Song','Professor, UC Berkeley; Co-Director, Berkeley RDI; VP of AI Research, Meta Superintelligence Labs','',''],
]},
{ day:1, stage:'plenary', start:'09:30', kind:'session', title:'Session 1: Agentic AI Infrastructure & Platform', talks:[
  ['Peter DeSantis','SVP, Foundational AI Models, Custom Silicon, Quantum Computing, Amazon','Constraint-Driven Innovation: A Look at the AI Systems Problem','opening keynote'],
  ['Saurabh Tiwary','Vice President, Google DeepMind','From Models to Agents to Discovery: Building the Full Stack of Agentic AI',''],
  ['Jonathan Cohen','VP of Applied Research, Nvidia','Accelerated Computing for Agentic AI',''],
  ['Chuan Li','Chief Scientific Officer, Lambda','A Lab Notebook for Agents',''],
]},
{ day:1, stage:'plenary', start:'10:20', kind:'panel', title:'Panel: Agentic AI Infrastructure & Platform', talks:[
  ['Peter DeSantis','Amazon','','panelist'],
  ['Saurabh Tiwary','Google DeepMind','','panelist'],
  ['Jonathan Cohen','Nvidia','','panelist'],
  ['Chuan Li','Lambda','','panelist'],
  ['Todd Graham','Managing Partner, M12','','moderator'],
]},
{ day:1, stage:'plenary', start:'10:45', kind:'fireside', title:'Fireside Chat: RSI: Demystifying the "Foom"', talks:[
  ['Dawn Song','Professor, UC Berkeley; Co-Director, Berkeley RDI','',''],
  ['Jasjeet Sekhon','Chief Strategy Officer, Google DeepMind','',''],
]},
{ day:1, stage:'plenary', start:'11:10', kind:'session', title:'Session 2: Future of Software Engineering', talks:[
  ['Peter Steinberger','Creator of OpenClaw, OpenAI','',''],
  ['Ryan Lopopolo','Principal Engineer, Agentic Google Cloud Platform','Harness Engineering: How to Build Software When Humans Steer and Agents Execute',''],
  ['Michele Catasta','President, Replit','Continual Learning for Agents',''],
  ['Alex Graveley','Director, Comet, Perplexity AI','Omniscient Agents',''],
]},
{ day:1, stage:'plenary', start:'11:35', kind:'panel', title:'Panel: Future of Software Engineering', talks:[
  ['Peter Steinberger','OpenAI','','panelist'],
  ['Ryan Lopopolo','Google Cloud Platform','','panelist'],
  ['Michele Catasta','Replit','','panelist'],
  ['Alex Graveley','Perplexity AI','','panelist'],
  ['Anjney Midha','Founder, AMP PBC','','moderator'],
]},
{ day:1, stage:'plenary', start:'12:00', kind:'break', title:'Lunch & Poster Presentations', talks:[]},
{ day:1, stage:'plenary', start:'13:30', kind:'session', title:'Session 3: Agentic AI Foundational Capabilities', talks:[
  ['Dawn Song','Professor, UC Berkeley; Co-Director, Berkeley RDI','Towards Building Safe and Secure Agentic AI','keynote'],
  ['Wojciech Zaremba','Co-Founder, OpenAI','Building Resilience for the Intelligence Age',''],
  ['Jerry Tworek','CEO, Core Automation; Former VP of Research at OpenAI','Opportunities and Challenges for Long-Horizon Agents',''],
  ['Oriol Vinyals','VP of Research, Google DeepMind','',''],
  ['Dan Roth','Chief AI Scientist, Oracle; Professor, UPenn','AI for Data and Data for AI',''],
  ['Weizhu Chen','Technical Fellow & CVP, Microsoft AI','Continuous Model Improvement',''],
]},
{ day:1, stage:'plenary', start:'14:35', kind:'panel', title:'Panel: Agentic AI Foundational Capabilities', talks:[
  ['Dawn Song','UC Berkeley','','panelist'],
  ['Wojciech Zaremba','OpenAI','','panelist'],
  ['Jerry Tworek','Core Automation','','panelist'],
  ['Oriol Vinyals','Google DeepMind','','panelist'],
  ['Dan Roth','Oracle','','panelist'],
  ['Weizhu Chen','Microsoft AI','','panelist'],
  ['Maxwell Zeff','Senior Writer, Wired','','moderator'],
]},
{ day:1, stage:'plenary', start:'15:10', kind:'session', title:'Session 4: Robotics & World Models', talks:[
  ['Sergey Levine','Co-Founder, Physical Intelligence; Professor, UC Berkeley','Robot Foundation Models',''],
  ['Jim Fan','Director of Robotics & Distinguished Scientist, Nvidia','Robotics: Endgame',''],
  ['Michael Spranger','President, Sony AI','From Games to the Real World: How Reinforcement Learning Is Powering Performance and Fun',''],
  ['Anastasis Germanidis','Co-Founder/Co-CEO, Runway','Real-World Superintelligence',''],
  ['Wei Zhan','Chief Scientist, Applied Intuition','E2E Autonomy Without Imitation',''],
]},
{ day:1, stage:'plenary', start:'15:55', kind:'panel', title:'Panel: Robotics & World Models', talks:[
  ['Sergey Levine','Physical Intelligence','','panelist'],
  ['Jim Fan','Nvidia','','panelist'],
  ['Michael Spranger','Sony AI','','panelist'],
  ['Anastasis Germanidis','Runway','','panelist'],
  ['Wei Zhan','Applied Intuition','','panelist'],
  ['Guru Chahal','Partner, Lightspeed Venture Partners','','moderator'],
]},
{ day:1, stage:'plenary', start:'16:20', kind:'break', title:'Break', talks:[]},
{ day:1, stage:'plenary', start:'16:30', kind:'panel', title:'Session 5: Agentic AI in Capital Markets', talks:[
  ['Jeff Wecker','CTO, Two Sigma','','panelist'],
  ['Jen Allum','SVP, Co-Head of GenAI, The D. E. Shaw Group','','panelist'],
  ['Ali Nazari','Head of Deep Learning Research, Susquehanna International Group','','panelist'],
  ['Li Deng','Chief AI Officer, Vatic Investments; Former Chief AI Officer, Citadel','','panelist'],
  ['Bradley Olson','Technology Editor, WSJ','','moderator'],
]},
{ day:1, stage:'plenary', start:'17:00', kind:'fireside', title:'Fireside Chat', talks:[
  ['Andrew Ng','Founder, DeepLearning.AI','',''],
  ['Alfred Lin','General Partner, Sequoia Capital','',''],
]},
{ day:1, stage:'plenary', start:'17:30', kind:'break', title:'Reception & Poster Presentations', talks:[]},

/* ── ATLAS · SATURDAY — MLK 3/F Pauley West ───────────────────────── */
{ day:1, stage:'atlas', start:'09:30', kind:'opening', title:'Opening Remarks', talks:[
  ['Jennifer Chayes','Dean of CDSS, UC Berkeley','',''],
  ['Dawn Song','Professor, UC Berkeley; Co-Director, Berkeley RDI','',''],
]},
{ day:1, stage:'atlas', start:'09:40', kind:'session', title:'Session 1: Enterprise AI', talks:[
  ['Rao Surapaneni','VP/GM AI Search & Specialized AI, Google Cloud','Enterprise AI - Agent Governance',''],
  ['Adarsh Hiremath','Co-CEO, Mercor','Enterprise AI',''],
  ['Duncan Lennox','Chief Product & Technology Officer, HubSpot',"Off-the-Shelf AI Hit a Wall. Here's What HubSpot Did to Solve It.",''],
]},
{ day:1, stage:'atlas', start:'10:15', kind:'panel', title:'Panel: Enterprise AI', talks:[
  ['Rao Surapaneni','Google Cloud','','panelist'],
  ['Adarsh Hiremath','Mercor','','panelist'],
  ['Duncan Lennox','HubSpot','','panelist'],
  ['Anahita Tafvizi','Chief Data & AI Officer, Snowflake','','panelist'],
  ['Surojit Chatterjee','Founder/CEO, Ema','','panelist'],
  ['Aaron Jacobson','GP, NEA','','moderator'],
]},
{ day:1, stage:'atlas', start:'10:45', kind:'break', title:'Break', talks:[]},
{ day:1, stage:'atlas', start:'11:05', kind:'fireside', title:'Fireside Chat', talks:[
  ['Ali Ghodsi','Co-Founder/CEO, Databricks','',''],
  ['Andy Konwinski','Co-Founder, Databricks; Perplexity; Laude Ventures','',''],
]},
{ day:1, stage:'atlas', start:'11:30', kind:'break', title:'Lunch & Poster Presentations', talks:[]},
{ day:1, stage:'atlas', start:'13:00', kind:'session', title:'Session 2: Frontier Research', talks:[
  ['Richard Socher','Founder/CEO, Recursive Superintelligence','The Eureka Machine: Recursive Superintelligence for Science',''],
  ['Ed Chi','VP of Research, Google DeepMind','The Future of Personalized Universal Agents',''],
  ['Ekin Dogus Cubuk','Co-Founder, Periodic Labs','Combining Experiments, Large Language Models, and Theory to Discover Quantum Materials',''],
  ['Andi Peng','Co-Founder, Humans&','Collaborative AI in the Era of Agents',''],
  ['Igor Babuschkin','Co-Founder/CEO, River AI','Personal AI and Continual Learning: New Frontiers in Agentic AI',''],
]},
{ day:1, stage:'atlas', start:'13:40', kind:'panel', title:'Panel: Frontier Research', talks:[
  ['Richard Socher','Recursive Superintelligence','','panelist'],
  ['Ed Chi','Google DeepMind','','panelist'],
  ['Ekin Dogus Cubuk','Periodic Labs','','panelist'],
  ['Andi Peng','Humans&','','panelist'],
  ['Igor Babuschkin','Co-Founder/CEO, River AI','','moderator'],
]},
{ day:1, stage:'atlas', start:'14:15', kind:'panel', title:'Session 3: Agentic AI Developer Platforms', talks:[
  ['Matt White','Former Global CTO of AI, Linux Foundation; CTO, PyTorch Foundation','','panelist'],
  ['Dima Dmytro Dzhulgakov','Co-Founder/CTO, Fireworks AI','','panelist'],
  ['Ivan Burazin','Co-Founder/CEO, Daytona','','panelist'],
  ['Mazin Gilbert','Executive Director, Agentic AI Foundation & Linux Foundation','','panelist'],
  ['Megan Morrone','Editor of Technology, Axios','','moderator'],
]},
{ day:1, stage:'atlas', start:'14:50', kind:'session', title:'Session 4: Agentic AI in Finance & Legal', talks:[
  ['Milind Naphade','SVP, AI Foundations, Capital One','Advancing the State of the Art: The Frontier of Enterprise Agentic AI',''],
  ['Nikhil Chandhok','Chief Product & Technology Officer, Circle','Building Infrastructure for the Agentic Economy',''],
  ['Faraz Shafiq','Head of AI, Wells Fargo','Reimagining Banking in the AI Era',''],
]},
{ day:1, stage:'atlas', start:'15:20', kind:'panel', title:'Panel: Agentic AI in Finance & Legal', talks:[
  ['Nikhil Chandhok','Circle','','panelist'],
  ['Faraz Shafiq','Wells Fargo','','panelist'],
  ['Matt Carbonara','Investor, Mayfield','','moderator'],
]},
{ day:1, stage:'atlas', start:'15:50', kind:'spotlight', title:'Startup Spotlight',
  note:'Featured startups: Narada AI, cognee, Nimblemind, AgntID, RELAI, Headroom, Founding Dev, ArmorIQ, Keenable AI, H Company, Ludo Robotics, Nimble', talks:[]},
{ day:1, stage:'atlas', start:'16:50', kind:'break', title:'Reception & Poster Presentations', talks:[]},

/* ── NEXUS · SATURDAY — Zellerbach Playhouse ──────────────────────── */
{ day:1, stage:'nexus', start:'10:00', kind:'session', title:'Session 1: Foundational Capabilities', talks:[
  ['Jianfeng Gao','Technical Fellow & Corporate Vice President, Microsoft Research','Agentic Modeling via Internalizing Agent Harnesses','keynote'],
  ['Sanja Fidler','Associate Professor, University of Toronto; Former VP of AI Research, Nvidia','World Models for Physical AI Simulation','keynote'],
  ['Giambattista Parascandolo','Research Fellow, OpenAI','When Language Models Learned to Reason',''],
  ['Aditya Grover','Co-Founder/CTO, Inception Labs','Redefining the Token Efficiency Frontier with Diffusion LLMs',''],
]},
{ day:1, stage:'nexus', start:'10:50', kind:'workshop', title:'Workshop: Turning Chatbots into Agents — What Modern RL Looks Like', note:'by Daytona', talks:[
  ['Lovre Pesut','AI Engineer, Daytona','','workshop'],
  ['Muhammad Hashmi','DevRel, Daytona','','workshop'],
]},
{ day:1, stage:'nexus', start:'11:50', kind:'break', title:'Lunch & Poster Presentations', talks:[]},
{ day:1, stage:'nexus', start:'13:30', kind:'session', title:'Session 2: Robotics & World Models', talks:[
  ['Peter Stone','Chief Scientist, Sony AI; Professor, UT Austin','Outplaying Elite Table Tennis Players with an Autonomous Robot','keynote'],
  ['Vincent Vanhoucke','Distinguished Engineer, Waymo','Trustworthy Agents in the Real World: Physical Autonomy Lessons for the Agentic AI Era','keynote'],
  ['Trevor Darrell','Professor, UC Berkeley','Real-World Reasoning Agents',''],
  ['Manmohan Chandraker','Professor, University of California, San Diego','Making Autonomy Autonomous: Toward Mental Models for Discovery and Intuition',''],
  ['Bolei Zhou','Associate Professor, UCLA; Chief AI Scientist, Coco Robotics','Scaling Sidewalk Autonomy with World Models',''],
]},
{ day:1, stage:'nexus', start:'14:30', kind:'workshop', title:'Workshop: Open-Source Agent Investigations — Security Arena, Distilled Traces, and Auto-Optimization', note:'by Lambda', talks:[
  ['Devina Jain','Research Engineer, Lambda','','workshop'],
  ['Zach Mueller','Head of Developer Relations, Lambda','','workshop'],
  ['Chuan Li','Chief Science Officer, Lambda','','workshop'],
]},
{ day:1, stage:'nexus', start:'15:30', kind:'workshop', title:'Workshop: Building Agentic Apps End-to-End with Replit Agent', talks:[
  ['Brandon Middleton','Head of Education, Replit','','workshop'],
]},
{ day:1, stage:'nexus', start:'16:30', kind:'session', title:'Session 3: Frameworks & Dev Platforms', talks:[
  ['Philip Rathle','CTO, Neo4j','Graphs Are the Knowledge Layer for Agentic AI',''],
  ['Josh Albrecht','Co-founder and CTO, Imbue','Building Punk Software: An Open Agent Stack',''],
  ['Woosuk Kwon','Co-Founder & CTO, Inferact','vLLM: Building Open and Efficient Inference for Agents',''],
  ['Banghua Zhu','Co-Founder, RadixArk','Building Frontier Inference and Training Infra for Agent: A Case Study of SGLang and Miles',''],
  ['Ranjan Sinha','IBM Fellow, CTO & VP for watsonx, Enterprise AI, IBM','Speaking the Same Language: NLIP for Agent Interoperability',''],
]},
{ day:1, stage:'nexus', start:'17:45', kind:'break', title:'Reception & Poster Presentations', talks:[]},

/* ── COMPASS · SATURDAY — MLK 3/F Pauley East ─────────────────────── */
{ day:1, stage:'compass', start:'10:00', kind:'session', title:'Session 1: Enterprise AI', talks:[
  ['Sunita Verma','Chief Technology Officer (CTO), Ironclad','Rate Limiter on AI Adoption Is Organizational','keynote'],
  ['Ori Goshen','Co-Founder/CEO, AI21 Labs','Self Optimizing Agents',''],
  ['Rene Pajta','Chief Architect Cloud & AI, Microsoft','The Enterprise Version of the One-Person Unicorn',''],
  ['Vincent Sunn Chen','VP & Founding Member, Snorkel AI','The Art & Science of Benchmarking Agents',''],
  ['David Hsu','CEO and founder, Retool','Governance Is the Bottleneck to AI',''],
  ['Dan Klein','Professor, UC Berkeley; Co-founder CTO, Scaled Cognition','Superintelligence vs. Super-Reliability',''],
]},
{ day:1, stage:'compass', start:'11:10', kind:'workshop', title:'Workshop: From Assistants to AI Employees — Designing Agents That Own a Role, Not a Task', note:'by Ema', talks:[
  ['Anushka Pathak','Product Manager, Ema','','workshop'],
  ['Soham Shah','ML Engineer, Ema','','workshop'],
  ['Eric Victorson','Software Engineer, Ema','','workshop'],
]},
{ day:1, stage:'compass', start:'12:10', kind:'break', title:'Lunch & Poster Presentations', talks:[]},
{ day:1, stage:'compass', start:'13:00', kind:'session', title:'Session 2: Agent Evaluation & Benchmarks', talks:[
  ['Anastasios N Angelopoulos','Co-Founder/CEO, LLMArena','Agent Arena: Causal Evaluations of Agents in the Real World',''],
  ['Michal Shmueli-Scheuer','Distinguished Engineer, AI Benchmarking and Evaluation, IBM Research',"Ready for General Agents? Let's Test It.",''],
  ['Priya Ponnapalli','SVP of Engineering, Enterprise AI, Scale AI','Building Reliable Agents: An Evals-First Approach',''],
  ['Srijith Rajamohan','Head of AI Research, Redis','Spec-Driven Agents: Hierarchical Specs, Tooling, and Trajectory-Based Evaluation',''],
]},
{ day:1, stage:'compass', start:'13:45', kind:'session', title:'Session 3: AI for Math', talks:[
  ['Sergei Gukov','Executive Director, American Institute of Mathematics; John D. MacArthur Professor, Caltech','The Future of AI for Long-Horizon and Sparse-Reward Tasks','keynote'],
  ['Lijie Chen','Researcher, OpenAI','The Unit Distance Conjecture and AI for Math',''],
  ['Vijay Ganesh','Professor, Georgia Institute of Technology','Semantic Alignment Models for Math and Software Engineering',''],
]},
{ day:1, stage:'compass', start:'14:15', kind:'workshop', title:'Workshop: Omnigent — A Meta Harness for AI Agents', note:'by Databricks', talks:[
  ['Aravind Segu','Software Engineer, Databricks','','workshop'],
]},
{ day:1, stage:'compass', start:'15:15', kind:'break', title:'Reception & Poster Presentations', talks:[]},

/* ── PLENARY · SUNDAY — Zellerbach Auditorium ─────────────────────── */
{ day:2, stage:'plenary', start:'10:00', kind:'session', title:'Session 1: AI for Science', talks:[
  ['Markus J. Buehler','Professor, MIT; Founder & CTO, Unreasonable Labs','Superintelligence for Scientific Discovery: Multi-Agent Swarms and Large Reasoning Models','keynote'],
  ['James Zou','Professor, Stanford','Harnessing the Collective Intelligence of Agents for Science',''],
  ['Eric Ho','Co-Founder/CEO, Goodfire','Unlocking Scientific Abundance by Learning from Superhuman AI',''],
  ['Andrew Schoen','Partner, NEA','Solving Quantum Science Problems with SMART: A Self-evolving Multi-Agent Research Tree',''],
  ['Mengdi Wang','Professor, Princeton','LabOS: The AI-XR Co-Scientist That Sees and Works With Humans',''],
  ['Rose Yu','Professor, UC San Diego; CEO/Co-Founder, GistFlow','Towards AI Co-Scientists: Agentic AI for Scientific Discovery',''],
  ['Jonathan Welch','Head of AI, Albert Invent','Building AI for the Physical World: Lessons from Accelerating Discovery for Chemists Across the Globe',''],
]},
{ day:2, stage:'plenary', start:'11:00', kind:'workshop', title:'Building a Token-Efficient OpenClaw Agentic System', note:'by AMD', talks:[
  ['Mahdi Ghodsi','AI Solutions Architect, AMD','','workshop'],
  ['Satya Devineni','Product Application Engineer, AMD','','workshop'],
  ['Eda Zhou','Software Development Engineer, AMD','','workshop'],
]},
{ day:2, stage:'plenary', start:'12:10', kind:'break', title:'Lunch & Poster Presentations', talks:[]},
{ day:2, stage:'plenary', start:'13:30', kind:'session', title:'Session 2: Coding & Web Agents', talks:[
  ['Silas Alberti','SVP of Research, Cognition','Scaling RL for Coding Agents — Lessons from Training SWE-1.7',''],
  ['Dhruv Batra','Chief Scientist / co-founder, Yutori','Computer-Use Models Will Agentify the Web, Not APIs',''],
  ['Shamir Abdul Aziz','Principal Product Manager, Microsoft','Zero Ops — Agents Operate, Humans Govern',''],
  ['Krishnakumar Sharma','CEO, Omokai','Agentic Coding, the Boring Way',''],
]},
{ day:2, stage:'plenary', start:'14:05', kind:'workshop', title:'Workshop by Fetcherr', talks:[
  ['Uri Yerushalmi','Chief AI Officer, Fetcherr','Market Models: The Missing Foundation for Quantitative Decision Agents','keynote'],
  ['Hadar Sharvit','Director of Deep Learning, Fetcherr','Architecting Quantitative Decision Agents','workshop'],
]},
{ day:2, stage:'plenary', start:'15:05', kind:'session', title:'Session 3: Agentic AI in Finance & Healthcare', talks:[
  ['Krishnaram Kenthapadi','Chief Scientist, Oracle Health','Trustworthy Multi-Agent AI Systems for Healthcare: Challenges & Lessons Learned',''],
  ['Venkat Bhat','Associate Professor; Director, AI for Mental Health (AI-M) Program, University of Toronto','Agentic AI Applications for Mental Health: From Chatbots to Clinical Orchestration',''],
  ['Shaghayegh Gharghabi','Deep Learning Scientists, NVIDIA','One Environment, Whole Lifecycle: Agentic Post-Training for Nemotron in Finance',''],
]},
{ day:2, stage:'plenary', start:'15:30', kind:'session', title:'Session 4: Secure Agentic AI', talks:[
  ['Jon-Rav Shende','Chief Technology Officer, Thales Group','Observability Is Not Governance: Building a Runtime Trust Plane for Agentic AI',''],
  ['Bo Li','Co-Founder and CEO, Virtue AI; UIUC','Securing AI Agents: From Risk Assessment and Runtime Guardrails to Self-Improvement and Certification',''],
  ['Eric Wallace','Researcher, OpenAI','Training Robust Agents',''],
  ['Milad Nasr','Research Scientist, Anthropic','End-to-End Security Research with a Language Model',''],
  ['Itsik Mantin','Head of AI Security Research, Intuit','When Good Agents Go Rogue',''],
  ['John A McDermid','Director, Centre for Assuring Autonomy, University of York','Safety and Security of Agentic AI',''],
  ['Mohamed Nabeel','Senior Principal Researcher, Palo Alto Networks','Ghost in the Web Store: Preempting LLM-Hallucinated Browser Extension Supply Chain Attacks',''],
]},
{ day:2, stage:'plenary', start:'16:45', kind:'workshop', title:'Workshop: Future of Agent Evaluation', talks:[]},
{ day:2, stage:'plenary', start:'17:45', kind:'break', title:'Reception & Poster Presentations', talks:[]},

/* ── ATLAS · SUNDAY — MLK 3/F Pauley West ─────────────────────────── */
{ day:2, stage:'atlas', start:'10:00', kind:'session', title:'Session 1: AI Systems', talks:[
  ['Ion Stoica','Co-Founder, Databricks and Anyscale; Professor, UC Berkeley','','keynote'],
  ['Nick Harris','Founder/CEO, Lightmatter','Photonics Is the Future of Computing',''],
  ['Gosia Steinder','IBM Fellow, IBM Research','Beyond Harnesses — Platform Solutions for Agent Reliability, Security, and Efficiency',''],
  ['Tim Hockin','Distinguished Engineer, Google','Is Kubernetes Good for Agents? Infrastructure Solutions for Agent-Shaped Problems',''],
]},
{ day:2, stage:'atlas', start:'10:45', kind:'workshop', title:'Workshop: Why Your AI Agent Needs a Wallet — Agentic Commerce on Arc with USDC and Nanopayments', talks:[
  ['Harshal Bhangale','Staff Software Engineer, Circle','','workshop'],
]},
{ day:2, stage:'atlas', start:'11:45', kind:'break', title:'Lunch & Poster Presentations', talks:[]},
{ day:2, stage:'atlas', start:'13:30', kind:'session', title:'Session 2: Frameworks & Dev Platforms', talks:[
  ['Wenbo Guo','Assistant Professor, UCSB','OpenSage: Next Generation of Agentic AI',''],
  ['Ramesh Raskar','Professor, MIT','The Agentic Web and the Bazaar Era of AI',''],
  ['Shiva Kasiviswanthan','Principal Applied Scientist, Amazon Web Services','Toward Adaptive Agent Frameworks',''],
  ['Tanya Roosta','Director of AI, AMD, Berkeley','Agentic AI for Information Retrieval',''],
  ['Denis Akhiyarov','Senior Staff AI Scientist, ServiceNow','Are Small LLMs Ready for Coding Agents?',''],
  ['Nilou Salehi','Associate professor, UC Berkeley','Agent Learning Requires Compressing Information into an Executable Reasoning Structure',''],
  ['Johann Schleier-Smith','Senior Staff Engineer, Temporal','Systems Foundations for Agentic AI',''],
]},
{ day:2, stage:'atlas', start:'14:20', kind:'workshop', title:'Workshop: Build AI Agents That Survive Failure', note:'by Temporal', talks:[
  ['Nikolay Advolodkin','Senior Staff Developer Advocate, Temporal','','workshop'],
]},
{ day:2, stage:'atlas', start:'15:20', kind:'session', title:'Session 3: Foundational Capabilities', talks:[
  ['Doga Kerestecioglu','Principal Applied Scientist, Microsoft Corporation','Mindful Agents: Human-Inspired Memories for Long-Horizon Tasks',''],
  ['Ian Fischer','Co-CEO, Poetiq','An Optimization Perspective on Recursive Self-Improvement',''],
  ['Yu Su','CEO, NeoCognition; Associate Professor, OSU','Intelligence + Continual Learning = Expertise',''],
  ['Furong Huang','Associate Professor, University of Maryland','Reasoning as Control: Adaptive Test-Time Compute for Planning Agents',''],
  ['Raja Giryes','Professor, Tel Aviv University','On the Visual Capabilities of Multimodal Models',''],
]},
{ day:2, stage:'atlas', start:'16:10', kind:'workshop', title:'Workshop: The Open Agentic Stack — Open Source, Open Standards and Composability', note:'by Linux Foundation', talks:[
  ['Matt White','Former Global CTO of AI, Linux Foundation; CTO, PyTorch Foundation','','workshop'],
]},
{ day:2, stage:'atlas', start:'17:10', kind:'break', title:'Reception & Poster Presentations', talks:[]},

/* ── COMPASS · SUNDAY — MLK 3/F Pauley East ───────────────────────── */
{ day:2, stage:'compass', start:'10:00', kind:'session', title:'Session 1: AI Safety', talks:[
  ['Chris Bregler','Senior Director / Distinguished Scientist, Google DeepMind','Deepfakes and More: How Agents with New Tools Can Mitigate and Provide More Context','keynote'],
  ['Kathy Baxter','VP / Principal Architect, Responsible AI & Tech, Salesforce','The Human in the Loop: Navigating the Realities of AI for Employee Flourishing',''],
  ['Lovedeep Gondara','Head of AI R&D, Vanguard; Adjunct Professor, University of British Columbia','Trustworthy Agentic AI in Regulated Domains: Robustness, Privacy, and Accountability as Co-Design Imperatives',''],
  ['Alex Obadia','Programme Director, Advanced Research & Invention Agency','A Society of Agents: Trust at Machine Speed, from Bits to Atoms',''],
  ['Neil Lawrence','Chief Scientist and Co-founder, Trent AI','Viable Systems, Judgment, and AI Safety',''],
  ['Huan Sun','Associate Professor, The Ohio State University','Smarter and Safer Everyday? Continual Learning and Safety in Computer-Use Agents',''],
  ['Navrina Singh','CEO, Founder, Credo AI','Earning Autonomy: Governance as Code for the Agentic Enterprise',''],
]},
{ day:2, stage:'compass', start:'11:00', kind:'workshop', title:'Workshop: Infrastructure You Can Talk To', note:'by SUSE', talks:[
  ['Jeff Price','Field CTO of North America, SUSE','','workshop'],
]},
{ day:2, stage:'compass', start:'12:10', kind:'break', title:'Lunch & Poster Presentations', talks:[]},
{ day:2, stage:'compass', start:'13:00', kind:'session', title:'Session 2: AI Systems', talks:[
  ['Jun Yang','Senior Director of Compute Architecture, NVIDIA','Using Agents to Build Production AI Systems: Lessons, Pitfalls, and Limits',''],
  ['Ankit Sobti','Co-Founder & CTO, Postman','From Agent Demos to Production: How Postman Is Building Reliable AI Agent Infrastructure',''],
  ['Rahul Bakshi','Director, Applied Science (Edge AI), Amazon','Scale Compute to the Signal',''],
  ['John Liu','Principal Product Manager, AWS','Looping for Model Optimization',''],
  ['Jongryool Kim','Senior Director / Head of AI System Infra., SK hynix','Disaggregated LLM Serving with Shared Memory KV Cache at Rack-Scale',''],
  ['Ben Athiwaratkun','Senior Director, Core ML (Turbo), Together AI','Unified Orchestration System for Verifier-Free Evolution',''],
  ['Tushar Krishna','Associate Professor, Georgia Tech; CEO, InfraVana','How Agentic AI Is Rewriting the Rules of AI Infrastructure',''],
]},
{ day:2, stage:'compass', start:'13:45', kind:'session', title:'Session 3: Enterprise AI', talks:[
  ['Eno Reyes','Co-Founder / CTO, Factory AI','Building the Software Factory',''],
  ['Ankit Goyal','Principal Staff Software Engineer, LinkedIn','Infrastructure for Long-Running Agents',''],
  ['Daniel Homola','Lead AI Engineer, BMW Research','From Multi-Agent Patterns to Reliable Orchestration',''],
  ['Christopher Petrillo','Principal Product Manager, The Wikimedia Foundation',"Agentic AI and the Human Core: Scaling Wikimedia's Participatory Model",''],
  ['Nayaki Nayyar','CEO, Siteimprove','Transforming from SaaS to an Agentic Enterprise',''],
  ['Surbhi Rathore','VP, AI Products & Strategy, Invoca','Agentic AI Is a UX Problem Disguised as a Technology Breakthrough',''],
  ['Daniel Fink','AI Engineering Lead, Cognizant','Scaling Up Config-Driven Multi-Agent Networks with Neuro SAN',''],
]},
{ day:2, stage:'compass', start:'14:30', kind:'session', title:'Session 4: Agent Evaluation & Benchmarks', talks:[
  ['Debarshi Raha','VP & Fellow Engineer, DigitalOcean','Preferences > Benchmarks: Model Routing for How Teams Actually Build','keynote'],
  ['Yuan (Emily) Xue','Head of Enterprise AI, Scale AI','The Exam Before Enterprise Deployment',''],
  ['Chenguang Wang','Assistant Professor, UC Santa Cruz; Research Advisor, Scale AI','From Training to Evaluation: Open Recipes for Building Agentic AI at Scale AI',''],
  ['Zelin Wan','Senior AI Engineer, Postman','Measuring API Agent Reliability for Long-Horizon Tasks in Production',''],
  ['Rahul Krishna','Senior Research Scientist, IBM Software Innovation Labs','ScarfBench: Can Agents Migrate Enterprise Java?',''],
  ['Grace Tang','AI @ Hex',"Data Benchmarks: Where Everything's Made Up and the Points Don't Matter",''],
  ['Arindam Sett','Principal ML Engineer, Genentech','AIDaR: AI Data Readiness Evaluations Framework',''],
  ['Scott Clark','Co-Founder & CEO, Distributional','How Better Evals Can Bring Abundance Through Accelerated Scientific Discovery',''],
  ['Aayush Agrawal','Product Lead, Uber','Evals: The Engine for Agent Improvement',''],
]},
{ day:2, stage:'compass', start:'15:40', kind:'break', title:'Reception & Poster Presentations', talks:[]},

];
