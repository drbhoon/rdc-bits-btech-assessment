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
    q1: "B", q2: "C", q3: "A", q4: "C", q5: "A",
    q6: "B", q7: "B", q8: "C", q9: "C", q10: "B"
  },
  score_tallies: { GC: 1, SO: 8, SQ: 1 },
  api_response: {
    diagnosis: "Suresh displays a pronounced Short-Term Optimizer (SO) mindset with high entitlement expectations. While expressing a strong desire to transition to a high-responsibility Plant Manager role, he evaluates ground-level effort entirely on an immediate cost-to-comfort basis. He shows extremely low resilience and is highly sensitive to time commitments or KPI pressures.",
    dissonance: "CRITICAL DISSONANCE DETECTED (Q9 vs Q3, Q10, Q2): Suresh aspires to be a Plant Manager (Q9 = GC) but is unwilling to invest personal free time for study (Q3 = SO), rejects the stable 4-year retention program in favor of quick lateral salary hops (Q2 = SO), and demands that the company first reduce his floor targets before he attempts to learn (Q10 = SQ). This reveals corporate posturing; he wants the status of leadership but rejects the daily personal sacrifice and accountability that defines an actual RDC Plant Incharge.",
    verdict: "DO NOT ENROLL (NOT READY)",
    counseling: {
      accountability_challenge: "Suresh, we see your strong desire to step into leadership as a Plant Manager and appreciate your ambition to grow within RDC Concrete. However, transitioning from operational execution to running a batching plant requires a profound shift in mindset—it means stepping forward to meet pressure rather than asking the organization to reduce your targets first. True leadership is built on taking active accountability for your own development, even when it requires temporary personal sacrifices like dedicating free time to study. If you truly wish to lead a plant crew in the future, we challenge you to start proving that capability now by embracing this upskilling opportunity.",
      persuasive_reframe: "Suresh, it is completely natural to feel hesitant about committing to a four-year BTech program, especially when you are already managing demanding operational targets. We want you to see this company-sponsored BITS Pilani degree not as an academic restriction on your time, but as a fully funded, zero-risk professional shield that future-proofs your career. The next four years are going to pass regardless of your choice; you can either spend them in your current comfort zone or emerge with a prestigious, debt-free engineering qualification. You will not be navigating this rigorous path alone—you have the active support of 17 senior RDC colleagues already in the program who will guide you every step of the way."
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
    q1: "A", q2: "B", q3: "C", q4: "A", q5: "B",
    q6: "C", q7: "A", q8: "B", q9: "C", q10: "A"
  },
  score_tallies: { GC: 10, SO: 0, SQ: 0 },
  api_response: {
    diagnosis: "Amit is an outstanding Growth Catalyst (GC) with deep internal drive, emotional maturity, and high grit. He approaches professional upskilling with a strong deferred gratification mindset, viewing the 4-year program as a solid foundation to anchor his career. He is highly receptive to change and ready to assume complete team and technical leadership.",
    dissonance: "NO DISSONANCE DETECTED: Amit's career ambitions (Q9 = GC) are fully matched by his ground-level choices. He is ready to invest personal time and balance site KPIs alongside BITS examinations (Q3 = GC), master the data/software tools that will modernize our concrete quality tracking (Q6 = GC), and tackle emergency plant failures proactively (Q8 = GC).",
    verdict: "EMPHATIC ENROLL",
    counseling: {
      accountability_challenge: "Amit, your survey reveals a remarkable level of professional accountability and complete alignment with our goal of elevating you into future technical leadership. We highly value your deep drive and readiness to assume site-level ownership and drive digital concrete quality initiatives. The main path forward for you is to sustain this exceptional operational grit throughout the BITS Pilani program. RDC is ready to back you fully, and we challenge you to step into this opportunity, continue pushing past your comfort zones, and set a stellar upskilling benchmark for the entire QC team.",
      persuasive_reframe: "Amit, while the prospect of balancing intensive study with active QC lab targets is a demanding commitment, we want you to view this BITS BTech as a powerful, company-sponsored professional shield for your career. This is a zero-risk, fully subsidized launchpad that will transition you from a technician to a highly certified strategic manager over the next four years. Time will pass quickly as you accumulate top-tier technical and managerial capabilities. By drawing strength and coordination from the 17 senior RDC officers currently in the program, you will have a resilient support network to ensure you perform at your peak without letting site standards slip."
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
    q1: "A", q2: "B", q3: "B", q4: "A", q5: "B",
    q6: "C", q7: "A", q8: "B", q9: "C", q10: "C"
  },
  score_tallies: { GC: 8, SO: 1, SQ: 1 },
  api_response: {
    diagnosis: "Vikram is a high-potential manager who possesses a strong core of operational drive and organizational loyalty. However, he is currently constrained by realistic, addressable anxieties regarding time management under high-pressure plant environments. He views upskilling as a major professional asset but worries about letting his concrete delivery targets slip during intensive exam periods.",
    dissonance: "MINOR SITUATIONAL ANXIETY (Q9 vs Q3, Q10): Vikram has a solid GC profile, but indicates hesitation on balancing site targets with studies without letting performance slip (Q3 = SQ) and leans toward daily on-the-job experience over academic constraints (Q10 = SO). Unlike pure posturing, this represents practical anxiety from a dedicated floor technician who does not want to fail his operational duties.",
    verdict: "CONDITIONAL ENROLL",
    counseling: {
      accountability_challenge: "Vikram, you have built a fantastic reputation in Nagpur operations, and we strongly believe in your potential to transition into a Plant Manager role. However, stepping into ultimate plant leadership means learning to balance critical on-the-floor delivery targets with the mental stretch of long-term capability building. Your natural hesitation about academic pressure is completely understandable, but operational ownership requires finding ways to integrate development into your weekly routine rather than letting floor stress cap your potential. We challenge you to rise above these immediate anxieties and demonstrate the true managerial capacity we know you possess.",
      persuasive_reframe: "Vikram, your worry about letting concrete delivery schedules clash with examinations shows your deep dedication to your daily operational duties, and we highly respect that. We want to assure you that this 4-year BITS Pilani program is a completely subsidized, zero-risk professional shield designed to elevate—not compromise—your career at RDC. The next four years will pass regardless of your choice; this is your chance to emerge as a certified BTech operational leader with no personal debt. You will not have to juggle this alone—our 17 active senior officers already in the program will serve as a close mentorship circle to help you coordinate schedules and succeed."
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
      accountability_challenge: `${employee_metadata.name}, you have built a fantastic reputation in Nagpur operations, and we strongly believe in your potential to transition into a Plant Manager role. However, stepping into ultimate plant leadership means learning to balance critical on-the-floor delivery targets with the mental stretch of long-term capability building. Your natural hesitation about academic pressure is completely understandable, but operational ownership requires finding ways to integrate development into your weekly routine rather than letting floor stress cap your potential. We challenge you to rise above these immediate anxieties and demonstrate the true managerial capacity we know you possess.`,
      persuasive_reframe: `${employee_metadata.name}, your worry about letting concrete delivery schedules clash with examinations shows your deep dedication to your daily operational duties, and we highly respect that. We want to assure you that this 4-year BITS Pilani program is a completely subsidized, zero-risk professional shield designed to elevate—not compromise—your career at RDC. The next four years will pass regardless of your choice; this is your chance to emerge as a certified BTech operational leader with no personal debt. You will not have to juggle this alone—our 17 active senior officers already in the program will serve as a close mentorship circle to help you coordinate schedules and succeed.`
    };

    if (hasDissonance || isSO) {
      verdict = "DO NOT ENROLL (NOT READY)";
      diagnosis = `${employee_metadata.name} calculates immediate personal comfort and free time over long-term asset building. They seek premium career outcomes but are unwilling to accept the personal stretch or deferred gratification required.`;
      dissonance = "CRITICAL DISSONANCE DETECTED: Candidate desires a Plant Manager promotion (Q9 = GC) but explicitly refuses BITS Pilani time commitments (Q3 = SO) or demands target reductions first (Q10 = SQ). This indicates posturing rather than genuine readiness.";
      counseling = {
        accountability_challenge: `${employee_metadata.name}, we see your strong desire to step into leadership as a Plant Manager and appreciate your ambition to grow within RDC Concrete. However, transitioning from operational execution to running a batching plant requires a profound shift in mindset—it means stepping forward to meet pressure rather than asking the organization to reduce your targets first. True leadership is built on taking active accountability for your own development, even when it requires temporary personal sacrifices like dedicating free time to study. If you truly wish to lead a plant crew in the future, we challenge you to start proving that capability now by embracing this upskilling opportunity.`,
        persuasive_reframe: `${employee_metadata.name}, it is completely natural to feel hesitant about committing to a four-year BTech program, especially when you are already managing demanding operational targets. We want you to see this company-sponsored BITS Pilani degree not as an academic restriction on your time, but as a fully funded, zero-risk professional shield that future-proofs your career. The next four years are going to pass regardless of your choice; you can either spend them in your current comfort zone or emerge with a prestigious, debt-free engineering qualification. You will not be navigating this rigorous path alone—you have the active support of 17 senior RDC colleagues already in the program who will guide you every step of the way.`
      };
    } else if (isGC && !hasDissonance) {
      verdict = "EMPHATIC ENROLL";
      diagnosis = `${employee_metadata.name} is an outstanding Growth Catalyst with deep internal drive, resilience, and high grit. They show an excellent deferred gratification mindset, viewing the 4-year sponsorship as a premium launchpad.`;
      dissonance = "NO SIGNIFICANT DISSONANCE: Stated career aspirations are backed up by highly accountable operational choices on time management and commitment.";
      counseling = {
        accountability_challenge: `${employee_metadata.name}, your survey reveals a remarkable level of professional accountability and complete alignment with our goal of elevating you into future technical leadership. We highly value your deep drive and readiness to assume site-level ownership and drive digital concrete quality initiatives. The main path forward for you is to sustain this exceptional operational grit throughout the BITS Pilani program. RDC is ready to back you fully, and we challenge you to step into this opportunity, continue pushing past your comfort zones, and set a stellar upskilling benchmark for the entire QC team.`,
        persuasive_reframe: `${employee_metadata.name}, while the prospect of balancing intensive study with active QC lab targets is a demanding commitment, we want you to view this BITS BTech as a powerful, company-sponsored professional shield for your career. This is a zero-risk, fully subsidized launchpad that will transition you from a technician to a highly certified strategic manager over the next four years. Time will pass quickly as you accumulate top-tier technical and managerial capabilities. By drawing strength and coordination from the 17 senior RDC officers currently in the program, you will have a resilient support network to ensure you perform at your peak without letting site standards slip.`
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
