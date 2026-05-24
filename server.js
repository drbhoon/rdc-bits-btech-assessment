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
    counseling: {
      accountability_challenge: "Suresh, you state that you want the authority and status of a Plant Manager, yet you refuse to invest a single hour of your personal free time to study and demand that RDC lower your site KPIs before you even attempt to prove your capabilities. In the real world of concrete operations, leadership means rising to meet the pressure, not demanding that the environment shrink to fit your comfort zone. If you cannot hold yourself accountable to a structured academic program designed to elevate you, how can RDC trust you to lead a plant crew through high-stakes operational crises?",
      persuasive_reframe: "Suresh, let's be absolutely clear: the next four years are going to pass anyway, whether you spend them stagnating in your current role or building a massive professional shield. This BITS Pilani program is a fully subsidized, zero-risk investment in your future that guarantees you graduate debt-free with a world-class engineering degree. Under academic pressure, you won't be left to drown; you have an active network of 17 senior RDC officers in the same program ready to lift you up. This is your shield against career obsolescence—don't let short-term convenience blind you to a lifetime of operational leverage."
    }
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
    counseling: {
      accountability_challenge: "Amit, your profile displays an exceptional level of accountability and absolute alignment between your career ambitions and your ground-level discipline. The challenge for you now is to guard against complacency and prove that this grit is sustainable over a grueling four-year BITS Pilani journey. The organization is ready to back you fully, but you must constantly hold a mirror to your own limits, push past your comfort zones, and demonstrate the relentless operational stamina required of a future Technical Leader.",
      persuasive_reframe: "Amit, this BITS Pilani degree is not a burden or an academic chore; it is a premium, fully subsidized professional shield that RDC is placing in your hands to secure your long-term career growth. The 4-year commitment is your zero-risk launchpad to transitioning from a floor technician into a strategic manager, and the time will fly by while you accumulate invaluable capability. By leveraging the deep internal Rishtey of our 17 active senior colleagues already in the program, you will have a ready-made support system to ensure you never sink under academic pressure. Embrace this shield, lead the digital shift in concrete operations, and claim your place as a pillar of RDC's future."
    }
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
    counseling: {
      accountability_challenge: "Vikram, you have built a stellar reputation on the floor and aspire to step up to a Plant Manager level, yet your hesitation to balance site targets with academic rigor suggests a subtle avoidance of the mental stretch required for high-altitude leadership. True operational ownership means finding a way to make your study commitments work alongside plant KPIs, not allowing anxiety to cap your potential. It is time to stop posturing behind floor-level excuses and prove that you have the managerial capacity to lead under pressure.",
      persuasive_reframe: "Vikram, your fear of letting concrete delivery targets slip during exams is a highly addressable concern, not a reason to reject a premium, fully subsidized BITS Pilani degree. Think of this 4-year commitment not as a restriction on your time, but as a zero-risk professional shield that protects your future career from stagnation while the company covers all costs. Since our 17 active senior officers are already successfully navigating this exact program, you can directly leverage their shared experience and site coordination strategies so that you never sink under academic load. The time will pass regardless; you must decide whether you want to emerge as a certified BTech operational leader or remain exactly where you are today."
    }
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

// Middleware to verify admin password
const checkAdminAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    if (token === adminPassword) {
      return next();
    }
  }
  res.status(401).json({ error: "Unauthorized access to diagnostics" });
};

// -- API ENDPOINTS --

// 1. Fetch Question Bank
app.get('/api/questions', (req, res) => {
  res.json(questionBank);
});

// 1.5 Admin Authentication Route
app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
  if (password === adminPassword) {
    res.json({ success: true, token: password });
  } else {
    res.status(401).json({ error: "Invalid password" });
  }
});

// 2. Fetch all submissions (Secured)
app.get('/api/submissions', checkAdminAuth, (req, res) => {
  const list = Array.from(submissions.values()).sort((a, b) => b.created_at - a.created_at);
  res.json(list);
});

// 3. Fetch single submission (Secured)
app.get('/api/submissions/:id', checkAdminAuth, (req, res) => {
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
    let counseling = {
      accountability_challenge: `${employee_metadata.name}, you have built a solid foundation at RDC and clearly want to step into higher plant leadership, yet your hesitation to balance site targets with BITS studies reveals a fear of the operational stretch required for premium growth. True managerial competence means proving you can handle site KPIs and academic rigor concurrently, rather than waiting for ideal circumstances. Hold a mirror to your own doubts, stop letting comfort dictate your bounds, and challenge yourself to step up to this caliber of operational ownership.`,
      persuasive_reframe: `${employee_metadata.name}, this BITS Pilani program is not a restriction or an academic burden; it is a premium, fully subsidized, zero-risk professional shield that secures your career for years to come. The time over the next 4 years will pass regardless of what you choose; you can either spend it in your current comfort zone or emerge as a certified BTech operational leader. Since 17 of our own senior officers are already successfully navigating this exact program, you will have an immediate, powerful network of Rishtey to ensure you never sink under academic pressure. Embrace this shield, leverage your seniors, and step up.`
    };

    if (hasDissonance || isSO) {
      verdict = "DO NOT ENROLL (NOT READY)";
      diagnosis = `${employee_metadata.name} calculates immediate personal comfort and free time over long-term asset building. They seek premium career outcomes but are unwilling to accept the personal stretch or deferred gratification required.`;
      dissonance = "CRITICAL DISSONANCE DETECTED: Candidate desires a Plant Manager promotion (Q9 = GC) but explicitly refuses BITS Pilani time commitments (Q3 = SO) or demands target reductions first (Q10 = SQ). This indicates posturing rather than genuine readiness.";
      counseling = {
        accountability_challenge: `${employee_metadata.name}, you are posturing for a high-status promotion to Plant Manager, yet your survey choices show you are unwilling to invest personal free time for study and demand that the organization first lower your KPIs. True operational leadership demands extreme accountability and sacrifice during crises, not demanding that the business conform to your comfort zone. It is time to face the cognitive dissonance between your senior aspirations and your ground-level resistance, and prove you have the resilience to stretch.`,
        persuasive_reframe: `${employee_metadata.name}, let's look at the facts: the next four years are going to pass anyway, and you will either be in the exact same spot or holding a debt-free, heavily subsidized BITS Pilani degree. This is a zero-risk professional shield that RDC is offering to completely future-proof your career, backed by 17 active senior colleagues who are already managing this exact workload and are ready to guide you. Demanding target reductions or dodging the commitment because of time fears is a self-sabotaging response to a life-changing upskilling opportunity. Leverage the internal Rishtey, face the academic challenge head-on, and build your shield.`
      };
    } else if (isGC && !hasDissonance) {
      verdict = "EMPHATIC ENROLL";
      diagnosis = `${employee_metadata.name} is an outstanding Growth Catalyst with deep internal drive, resilience, and high grit. They show an excellent deferred gratification mindset, viewing the 4-year sponsorship as a premium launchpad.`;
      dissonance = "NO SIGNIFICANT DISSONANCE: Stated career aspirations are backed up by highly accountable operational choices on time management and commitment.";
      counseling = {
        accountability_challenge: `${employee_metadata.name}, your survey profile reveals an outstanding Growth Catalyst mindset and absolute alignment between your career goals and your personal discipline. The challenge for you now is to guard against complacency and sustain this high accountability over a demanding 4-year academic journey. The company is backing you completely, and it is now your job to set the benchmark for floor-level resilience and lead by example.`,
        persuasive_reframe: `${employee_metadata.name}, this sponsored BITS Pilani BTech degree is a premium, zero-risk professional shield that RDC is presenting to lock in your long-term operational career. The next 4 years will pass anyway, and this program ensures you spend them accumulating top-tier strategic and technical capability at absolutely zero personal cost. You have a powerful advantage in our 17 active senior officers already in the program; by leveraging their shared experience, you will always stay ahead of the academic curve. Step into this leadership shield with absolute confidence.`
      };
    }

    api_response = { diagnosis, dissonance, verdict, counseling };
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
