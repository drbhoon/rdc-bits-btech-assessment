# Antigravity Skill: RDC-BITS Pilani BTech Readiness Diagnostics

## 1. App Configuration
- **ID:** rdc_bits_readiness_assessment
- **Name:** RDC-BITS Pilani BTech Readiness Assessment
- **Version:** 1.0.0
- **Workflow Type:** Psychometric Survey & API Integration
- **Target Roles:** Diploma Holders in Operations / Quality Control (QC)
- **Deployment Mode:** Native Antigravity Skill (Local Workspace Execution)

---

## 2. App State & Variables

This JSON block defines the structural memory of the Antigravity skill, containing state variables, the current candidate's choices, and three preloaded mock profiles for instant leadership demonstration.

```json
{
  "active_candidate_id": "current",
  "employee_metadata": {
    "name": "string",
    "department": "string",
    "current_plant": "string"
  },
  "user_selections": {
    "q1": "string", "q2": "string", "q3": "string", "q4": "string", "q5": "string",
    "q6": "string", "q7": "string", "q8": "string", "q9": "string", "q10": "string"
  },
  "score_tallies": {
    "GC": 0,
    "SO": 0,
    "SQ": 0
  },
  "api_response": {
    "diagnosis": "string",
    "dissonance": "string",
    "verdict": "string",
    "counseling": {
      "accountability_challenge": "string",
      "persuasive_reframe": "string"
    }
  },
  "mock_submissions": [
    {
      "id": "mock_01_suresh",
      "employee_metadata": {
        "name": "Suresh Kumar",
        "department": "Operations",
        "current_plant": "Veerasandra Plant, Bangalore"
      },
      "user_selections": {
        "q1": "A",
        "q2": "A",
        "q3": "A",
        "q4": "A",
        "q5": "B",
        "q6": "A",
        "q7": "A",
        "q8": "C",
        "q9": "C",
        "q10": "B"
      },
      "score_tallies": {
        "GC": 1,
        "SO": 8,
        "SQ": 1
      },
      "api_response": {
        "diagnosis": "Suresh displays a pronounced Short-Term Optimizer (SO) mindset with high entitlement expectations. While expressing a strong desire to transition to a high-responsibility Plant Manager role, he evaluates ground-level effort entirely on an immediate cost-to-comfort basis. He shows extremely low resilience and is highly sensitive to time commitments or KPI pressures.",
        "dissonance": "CRITICAL DISSONANCE DETECTED (Q9 vs Q3, Q10, Q2): Suresh aspires to be a Plant Manager (Q9 = GC) but is unwilling to invest personal free time for study (Q3 = SO), rejects the stable 4-year retention program in favor of quick lateral salary hops (Q2 = SO), and demands that the company first reduce his floor targets before he attempts to learn (Q10 = SQ). This reveals corporate posturing; he wants the status of leadership but rejects the daily personal sacrifice and accountability that defines an actual RDC Plant Incharge.",
        "verdict": "DO NOT ENROLL (NOT READY)",
        "counseling": {
          "accountability_challenge": "Suresh, you state that you want the authority and status of a Plant Manager, yet you refuse to invest a single hour of your personal free time to study and demand that RDC lower your site KPIs before you even attempt to prove your capabilities. In the real world of concrete operations, leadership means rising to meet the pressure, not demanding that the environment shrink to fit your comfort zone. If you cannot hold yourself accountable to a structured academic program designed to elevate you, how can RDC trust you to lead a plant crew through high-stakes operational crises?",
          "persuasive_reframe": "Suresh, let's be absolutely clear: the next four years are going to pass anyway, whether you spend them stagnating in your current role or building a massive professional shield. This BITS Pilani program is a fully subsidized, zero-risk investment in your future that guarantees you graduate debt-free with a world-class engineering degree. Under academic pressure, you won't be left to drown; you have an active network of 17 senior RDC officers in the same program ready to lift you up. This is your shield against career obsolescence—don't let short-term convenience blind you to a lifetime of operational leverage."
        }
      }
    },
    {
      "id": "mock_02_amit",
      "employee_metadata": {
        "name": "Amit Ray",
        "department": "Quality Control",
        "current_plant": "Navi Mumbai Main Plant"
      },
      "user_selections": {
        "q1": "B",
        "q2": "B",
        "q3": "B",
        "q4": "B",
        "q5": "A",
        "q6": "C",
        "q7": "B",
        "q8": "A",
        "q9": "C",
        "q10": "A"
      },
      "score_tallies": {
        "GC": 10,
        "SO": 0,
        "SQ": 0
      },
      "api_response": {
        "diagnosis": "Amit is an outstanding Growth Catalyst (GC) with deep internal drive, emotional maturity, and high grit. He approaches professional upskilling with a strong deferred gratification mindset, viewing the 4-year program as a solid foundation to anchor his career. He is highly receptive to change and ready to assume complete team and technical leadership.",
        "dissonance": "NO DISSONANCE DETECTED: Amit's career ambitions (Q9 = GC) are fully matched by his ground-level choices. He is ready to invest personal time and balance site KPIs alongside BITS examinations (Q3 = GC), master the data/software tools that will modernize our concrete quality tracking (Q6 = GC), and tackle emergency plant failures proactively (Q8 = GC).",
        "verdict": "EMPHATIC ENROLL",
        "counseling": {
          "accountability_challenge": "Amit, your profile displays an exceptional level of accountability and absolute alignment between your career ambitions and your ground-level discipline. The challenge for you now is to guard against complacency and prove that this grit is sustainable over a grueling four-year BITS Pilani journey. The organization is ready to back you fully, but you must constantly hold a mirror to your own limits, push past your comfort zones, and demonstrate the relentless operational stamina required of a future Technical Leader.",
          "persuasive_reframe": "Amit, this BITS Pilani degree is not a burden or an academic chore; it is a premium, fully subsidized professional shield that RDC is placing in your hands to secure your long-term career growth. The 4-year commitment is your zero-risk launchpad to transitioning from a floor technician into a strategic manager, and the time will fly by while you accumulate invaluable capability. By leveraging the deep internal Rishtey of our 17 active senior colleagues already in the program, you will have a ready-made support system to ensure you never sink under academic pressure. Embrace this shield, lead the digital shift in concrete operations, and claim your place as a pillar of RDC's future."
        }
      }
    },
    {
      "id": "mock_03_vikram",
      "employee_metadata": {
        "name": "Vikram Singh",
        "department": "Operations",
        "current_plant": "Nagpur Plant"
      },
      "user_selections": {
        "q1": "B",
        "q2": "B",
        "q3": "C",
        "q4": "B",
        "q5": "A",
        "q6": "C",
        "q7": "B",
        "q8": "A",
        "q9": "C",
        "q10": "C"
      },
      "score_tallies": {
        "GC": 8,
        "SO": 1,
        "SQ": 1
      },
      "api_response": {
        "diagnosis": "Vikram is a high-potential manager who possesses a strong core of operational drive and organizational loyalty. However, he is currently constrained by realistic, addressable anxieties regarding time management under high-pressure plant environments. He views upskilling as a major professional asset but worries about letting his concrete delivery targets slip during intensive exam periods.",
        "dissonance": "MINOR SITUATIONAL ANXIETY (Q9 vs Q3, Q10): Vikram has a solid GC profile, but indicates hesitation on balancing site targets with studies without letting performance slip (Q3 = SQ) and leans toward daily on-the-job experience over academic constraints (Q10 = SO). Unlike pure posturing, this represents practical anxiety from a dedicated floor technician who does not want to fail his operational duties.",
        "verdict": "CONDITIONAL ENROLL",
        "counseling": {
          "accountability_challenge": "Vikram, you have built a stellar reputation on the floor and aspire to step up to a Plant Manager level, yet your hesitation to balance site targets with academic rigor suggests a subtle avoidance of the mental stretch required for high-altitude leadership. True operational ownership means finding a way to make your study commitments work alongside plant KPIs, not allowing anxiety to cap your potential. It is time to stop posturing behind floor-level excuses and prove that you have the managerial capacity to lead under pressure.",
          "persuasive_reframe": "Vikram, your fear of letting concrete delivery targets slip during exams is a highly addressable concern, not a reason to reject a premium, fully subsidized BITS Pilani degree. Think of this 4-year commitment not as a restriction on your time, but as a zero-risk professional shield that protects your future career from stagnation while the company covers all costs. Since our 17 active senior officers are already successfully navigating this exact program, you can directly leverage their shared experience and site coordination strategies so that you never sink under academic load. The time will pass regardless; you want to emerge as a certified BTech operational leader or remain exactly where you are today."
        }
      }
    }
  ]
}
```

---

## 3. Native Markdown User Interface Layout

This section outlines the UI templates rendered directly by the Antigravity markdown renderer.

### A. Candidate Survey Mode
Renders an interactive, step-by-step psychometric questionnaire inside the terminal/document.

```markdown
# RDC Concrete — BTech Readiness Survey
*Company-Sponsored BITS Pilani BTech Degree Program (Operations & QC)*

---

### [Step 1 of 2] Candidate Profile
- **Candidate Name:** `[ Input Name ]`
- **Department:** `( ) Operations  /  ( ) Quality Control`
- **Current Plant Location:** `[ Input Plant Location ]`

---

### [Step 2 of 2] Psychometric Scenarios
*(Please select the choice that represents your genuine outlook. Your responses will be evaluated by an AI Industrial Psychologist.)*

- **Q1: Qualification Upgrade Path**
  - [ ] A) I will pursue it privately from an easier university, paying out of my own salary, so I face an easy degree with no company retention commitment. (SO)
  - [ ] B) I will leverage RDC’s sponsorship to earn a premium, globally recognized BTech from BITS Pilani completely debt-free, accepting the retention commitment as a launchpad. (GC)
  - [ ] C) I haven't calculated the long-term career cost of choosing an easier, less recognized degree over a premium one. (SQ)

`... [ Questions Q2 through Q10 rendered sequentially from bit-btech-questions.json ] ...`
```

### B. Admin / Leadership Diagnostic View
Displays the psychometric assessment of the active or selected candidate in a high-fidelity industrial psychology layout.

```markdown
# 📊 BITS Pilani BTech Readiness Diagnostics
## EXECUTIVE ASSESSMENT REPORT — RDC CONCRETE LEADERSHIP

| CANDIDATE METADATA | |
| :--- | :--- |
| **Name:** | `state.employee_metadata.name` |
| **Department:** | `state.employee_metadata.department` |
| **Current Plant:** | `state.employee_metadata.current_plant` |

---

### 📈 ARCHETYPE PROFILE ANALYSIS
- **Growth Catalyst (GC):** `state.score_tallies.GC / 10` `[■■■■■■□□□□]` (High Accountability, Tech-Adaptive)
- **Short-Term Optimizer (SO):** `state.score_tallies.SO / 10` `[■□□□□□□□□□]` (Transactional, Comfort-Focus)
- **Status-Quo Complacent (SQ):** `state.score_tallies.SQ / 10` `[■□□□□□□□□□]` (Reactive, External Locus)

---

### 🧠 CORE PSYCHOLOGICAL DIAGNOSIS
> `state.api_response.diagnosis`

---

### 🔍 COGNITIVE DISSONANCE & BLIND SPOTS
> `state.api_response.dissonance`

---

### 🎯 THE REASONED VERDICT
> ### **`state.api_response.verdict`**

---

### 🗣️ DYNAMIC MOTIVATIONAL COUNSELING ENGINES
*(AI Counseling Interventions Profile — Direct ready-to-deliver coaching advice)*

#### A) THE ACCOUNTABILITY CHALLENGE (Confronting the Posturing)
> `state.api_response.counseling.accountability_challenge`

#### B) THE PERSUASIVE REFRAME (Motivating them to Enroll)
> `state.api_response.counseling.persuasive_reframe`
```

---

## 4. Execution Pipeline & Gemini API Integration Block

This block configures the Antigravity engine workflow. The scoring is calculated via the Gemini AI model, passing the aggregated selections, and loading the instruction set from `system_prompt.txt`.

```json
{
  "execution_pipeline": {
    "step_01_aggregate_tallies": {
      "action": "calculate_raw_scores",
      "instruction": "Tally the GC, SO, and SQ options chosen by the candidate from bit-btech-questions.json and update state.score_tallies."
    },
    "step_02_invoke_evaluation_engine": {
      "action": "gemini_api_call",
      "config": {
        "model": "gemini-3.1-pro",
        "system_instruction_file": "./system_prompt.txt",
        "temperature": 0.2,
        "input_payload": {
          "employee_metadata": "state.employee_metadata",
          "user_selections": "state.user_selections",
          "score_tallies": "state.score_tallies"
        },
        "response_mapping": {
          "api_response.diagnosis": "response.api_response.diagnosis",
          "api_response.dissonance": "response.api_response.dissonance",
          "api_response.verdict": "response.api_response.verdict",
          "api_response.counseling.accountability_challenge": "response.api_response.counseling.accountability_challenge",
          "api_response.counseling.persuasive_reframe": "response.api_response.counseling.persuasive_reframe"
        }
      }
    },
    "step_03_render_executive_dashboard": {
      "action": "render_view",
      "template": "Admin / Leadership Diagnostic View"
    }
  }
}
```