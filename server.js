import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Load Raw Question Bank
const questionsPath = path.join(__dirname, 'bit-btech-questions.json');
let questionBank = { questions: [] };
try {
  questionBank = JSON.parse(fs.readFileSync(questionsPath, 'utf-8'));
  console.log(`Loaded ${questionBank.questions.length} questions from bit-btech-questions.json`);
} catch (error) {
  console.error("Error loading bit-btech-questions.json:", error);
}

// Load System Prompt for Gemini
const promptPath = path.join(__dirname, 'system_prompt.txt');
let systemPrompt = '';
try {
  systemPrompt = fs.readFileSync(promptPath, 'utf-8');
  console.log("Loaded system_prompt.txt successfully.");
} catch (error) {
  console.error("Error loading system_prompt.txt:", error);
}

// In-Memory Database initialized with BITS Pilani Skill Mock Submissions
const submissions = new Map();

// Suresh Kumar (DO NOT ENROLL)
submissions.set('mock_01_suresh', {
  id: 'mock_01_suresh',
  employee_metadata: {
    name: "Suresh Kumar",
    department: "Operations",
    current_plant: "Veerasandra Plant, Bangalore"
  },
  user_selections: {
    q1: "A", q2: "A", q3: "A", q4: "A", q5: "B",
    q6: "A", q7: "A", q8: "C", q9: "C", q10: "B"
  },
  score_tallies: { GC: 1, SO: 8, SQ: 1 },
  api_response: {
    diagnosis: "Suresh displays a pronounced Short-Term Optimizer (SO) mindset with high entitlement expectations. While expressing a strong desire to transition to a high-responsibility Plant Manager role, he evaluates ground-level effort entirely on an immediate cost-to-comfort basis. He shows extremely low resilience and is highly sensitive to time commitments or KPI pressures.",
    dissonance: "CRITICAL DISSONANCE DETECTED (Q9 vs Q3, Q10, Q2): Suresh aspires to be a Plant Manager (Q9 = GC) but is unwilling to invest personal free time for study (Q3 = SO), rejects the stable 4-year retention program in favor of quick lateral salary hops (Q2 = SO), and demands that the company first reduce his floor targets before he attempts to learn (Q10 = SQ). This reveals corporate posturing; he wants the status of leadership but rejects the daily personal sacrifice and accountability that defines an actual RDC Plant Incharge.",
    verdict: "DO NOT ENROLL (NOT READY)",
    talking_points: [
      "Suresh, you want to lead an entire RMC batching plant as a Plant Manager, which requires 24/7 accountability for sudden breakdowns and team performance. Yet, you've stated that managing BITS studies alongside your current KPIs isn't worth the pressure if it takes your free time. How do you plan to handle the relentless pressure of running a plant if a structured academic program is already seen as too high of a personal cost?",
      "You expressed in your survey that the company should structurally lower your workload and targets first before you commit to BTech studies. In operations, we face unpredictable cement shortages, equipment failures, and peak pours where targets cannot be lowered. If you demand a reduced load before demonstrating capability, how will you lead a site crew through real-world plant crises?",
      "RDC is offering a debt-free BITS Pilani degree to secure your career stability. However, you noted that a 4-year commitment is too long compared to job-hopping for small increments. If you're not ready to anchor yourself in an ecosystem investing heavily in you, why should RDC trust you with the long-term capital assets of a major batching plant?"
    ]
  },
  created_at: new Date(Date.now() - 3600000 * 3) // 3 hours ago
});

// Amit Ray (EMPHATIC ENROLL)
submissions.set('mock_02_amit', {
  id: 'mock_02_amit',
  employee_metadata: {
    name: "Amit Ray",
    department: "Quality Control",
    current_plant: "Navi Mumbai Main Plant"
  },
  user_selections: {
    q1: "B", q2: "B", q3: "B", q4: "B", q5: "A",
    q6: "C", q7: "B", q8: "A", q9: "C", q10: "A"
  },
  score_tallies: { GC: 10, SO: 0, SQ: 0 },
  api_response: {
    diagnosis: "Amit is an outstanding Growth Catalyst (GC) with deep internal drive, emotional maturity, and high grit. He approaches professional upskilling with a strong deferred gratification mindset, viewing the 4-year program as a solid foundation to anchor his career. He is highly receptive to change and ready to assume complete team and technical leadership.",
    dissonance: "NO DISSONANCE DETECTED: Amit's career ambitions (Q9 = GC) are fully matched by his ground-level choices. He is ready to invest personal time and balance site KPIs alongside BITS examinations (Q3 = GC), master the data/software tools that will modernize our concrete quality tracking (Q6 = GC), and tackle emergency plant failures proactively (Q8 = GC).",
    verdict: "EMPHATIC ENROLL",
    talking_points: [
      "Amit, your profile shows a strong understanding of RMC operational realities and excellent personal drive. How do you plan to structure your weekly schedule to ensure that BITS exams and Navi Mumbai QC lab targets are both met with equal excellence?",
      "You’ve indicated a strong interest in mastering automation and predictive data software in the concrete lab. How do you see yourself utilizing these new BTech capabilities to improve RDC’s concrete mix consistency and cost-savings over the next few years?",
      "With your target of stepping into a Technical Manager role, you will be expected to mentor junior technicians. How will you use your BITS experience to inspire other diploma holders at your plant to pursue technical upskilling?"
    ]
  },
  created_at: new Date(Date.now() - 3600000 * 2) // 2 hours ago
});

// Vikram Singh (CONDITIONAL ENROLL)
submissions.set('mock_03_vikram', {
  id: 'mock_03_vikram',
  employee_metadata: {
    name: "Vikram Singh",
    department: "Operations",
    current_plant: "Nagpur Plant"
  },
  user_selections: {
    q1: "B", q2: "B", q3: "C", q4: "B", q5: "A",
    q6: "C", q7: "B", q8: "A", q9: "C", q10: "C"
  },
  score_tallies: { GC: 8, SO: 1, SQ: 1 },
  api_response: {
    diagnosis: "Vikram is a high-potential manager who possesses a strong core of operational drive and organizational loyalty. However, he is currently constrained by realistic, addressable anxieties regarding time management under high-pressure plant environments. He views upskilling as a major professional asset but worries about letting his concrete delivery targets slip during intensive exam periods.",
    dissonance: "MINOR SITUATIONAL ANXIETY (Q9 vs Q3, Q10): Vikram has a solid GC profile, but indicates hesitation on balancing site targets with studies without letting performance slip (Q3 = SQ) and leans toward daily on-the-job experience over academic constraints (Q10 = SO). Unlike pure posturing, this represents practical anxiety from a dedicated floor technician who does not want to fail his operational duties.",
    verdict: "CONDITIONAL ENROLL",
    talking_points: [
      "Vikram, you have a very strong track record in Nagpur and want to step up to a Plant Manager level. You expressed concern about how to balance BITS classes with site KPIs. RDC currently has 17 senior officers successfully navigating this exact program; what structured peer mentorship or scheduling support do you need from them to ease this transition?",
      "You indicated a preference for practical on-the-job learning over formal academic programs. BITS Pilani offers work-integrated learning where your daily concrete operations are treated as lab experiments. How can we align your BITS BTech project with your current plant bottlenecks to solve real issues on the ground?",
      "We trust your operational dedication. If we enroll you, what specific communication system will you set up with your Plant Incharge to flag early whenever academic exams clash with heavy delivery schedules, so we can coordinate support?"
    ]
  },
  created_at: new Date(Date.now() - 3600000) // 1 hour ago
});


// Helper to tally raw scores based on question bank options
const calculateTallies = (userSelections) => {
  const tallies = { GC: 0, SO: 0, SQ: 0 };
  if (!questionBank || !questionBank.questions) return tallies;

  for (const question of questionBank.questions) {
    const selectedOptionId = userSelections[question.id];
    if (selectedOptionId) {
      const option = question.options.find(opt => opt.id === selectedOptionId);
      if (option && option.tag && tallies[option.tag] !== undefined) {
        tallies[option.tag]++;
      }
    }
  }
  return tallies;
};

// -- API ENDPOINTS --

// 1. Fetch Question Bank
app.get('/api/questions', (req, res) => {
  res.json(questionBank);
});

// 2. Fetch all submissions
app.get('/api/submissions', (req, res) => {
  const list = Array.from(submissions.values()).sort((a, b) => b.created_at - a.created_at);
  res.json(list);
});

// 3. Fetch single submission
app.get('/api/submissions/:id', (req, res) => {
  const sub = submissions.get(req.params.id);
  if (!sub) return res.status(404).json({ error: "Submission not found" });
  res.json(sub);
});

// 4. Candidate submits survey responses & triggers Gemini evaluation
app.post('/api/submit', async (req, res) => {
  const { employee_metadata, user_selections } = req.body;
  if (!employee_metadata || !user_selections) {
    return res.status(400).json({ error: "Missing metadata or user selections" });
  }

  // 1. Tally raw scores
  const score_tallies = calculateTallies(user_selections);

  // 2. Prepare payload for Gemini
  const payload = {
    employee_metadata,
    user_selections,
    score_tallies
  };

  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  let api_response = null;

  if (apiKey) {
    console.log(`Calling Gemini 3.1 Pro for candidate: ${employee_metadata.name}`);
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ 
        model: "gemini-3.1-pro",
        systemInstruction: systemPrompt 
      });

      const response = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: JSON.stringify(payload) }] }],
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.2
        }
      });

      const resultText = response.response.text();
      const resultObj = JSON.parse(resultText);

      // Extract response structure
      if (resultObj.api_response) {
        api_response = resultObj.api_response;
      } else {
        api_response = resultObj;
      }
      console.log("Evaluation generated successfully via Gemini API.");
    } catch (apiError) {
      console.error("Gemini API call failed, running rule-based fallback:", apiError);
    }
  } else {
    console.warn("⚠️ GEMINI_API_KEY not configured. Falling back to rule-based evaluation! ⚠️");
  }

  // 3. Fallback evaluation logic if Gemini is unconfigured or fails
  if (!api_response) {
    console.log("Executing psychometric rules engine fallback...");
    const isGC = score_tallies.GC >= 7;
    const isSO = score_tallies.SO >= 5;
    const hasDissonance = user_selections.q9 === 'C' && (user_selections.q3 === 'A' || user_selections.q10 === 'B' || user_selections.q2 === 'A');

    let verdict = "CONDITIONAL ENROLL";
    let diagnosis = `${employee_metadata.name} displays a mix of growth drive and operational reservations. They appreciate the long-term BTech asset but worry about current site KPIs and exam loads.`;
    let dissonance = "MINOR SITUATIONAL ANXIETY: The candidate wants to transition to a higher management role but has realistic time-management concerns.";
    let talking_points = [
      `How do you plan to balance your BITS study time alongside your active plant duties?`,
      `What support do you need from the 17 seniors currently navigating the BITS program?`,
      `How will you communicate operational clashes between site targets and exam schedules?`
    ];

    if (hasDissonance || isSO) {
      verdict = "DO NOT ENROLL (NOT READY)";
      diagnosis = `${employee_metadata.name} calculates immediate personal comfort and free time over long-term asset building. They seek premium career outcomes but are unwilling to accept the personal stretch or deferred gratification required.`;
      dissonance = "CRITICAL DISSONANCE DETECTED: Candidate desires a Plant Manager promotion (Q9 = GC) but explicitly refuses BITS Pilani time commitments (Q3 = SO) or demands target reductions first (Q10 = SQ). This indicates posturing rather than genuine readiness.";
      talking_points = [
        `You want to become a Plant Manager, which requires 24/7 site accountability. Yet you stated that BITS studies aren't worth the pressure if it takes your free time. How will you manage plant emergencies if a structured study program is already seen as too high of a cost?`,
        `You requested that targets be lowered before you study. As a manager, how will you lead a site team through crises where targets cannot be lowered?`,
        `If you are hesitant about the 4-year commitment, why should RDC invest sponsored capital in your degree over other more committed candidates?`
      ];
    } else if (isGC && !hasDissonance) {
      verdict = "EMPHATIC ENROLL";
      diagnosis = `${employee_metadata.name} is an outstanding Growth Catalyst with deep internal drive, resilience, and high grit. They show an excellent deferred gratification mindset, viewing the 4-year sponsorship as a premium launchpad.`;
      dissonance = "NO SIGNIFICANT DISSONANCE: Stated career aspirations are backed up by highly accountable operational choices on time management and commitment.";
      talking_points = [
        `How do you plan to schedule your weekly routine to keep plant KPIs and BITS exams at peak performance?`,
        `How will you utilize automation and data tracking tools to optimize mix designs and concrete quality at your plant?`,
        `As a future technical leader, how will you help mentor junior technicians at RDC?`
      ];
    }

    api_response = { diagnosis, dissonance, verdict, talking_points };
  }

  // 4. Save and return submission
  const id = `candidate_${Date.now()}`;
  const submission = {
    id,
    employee_metadata,
    user_selections,
    score_tallies,
    api_response,
    created_at: new Date()
  };

  submissions.set(id, submission);
  res.json(submission);
});

// Serve frontend static files
app.use(express.static(path.join(__dirname, 'public')));

// Fallback to index.html for frontend single page routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
