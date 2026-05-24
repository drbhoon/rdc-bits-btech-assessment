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
        "q1": "B",
        "q2": "C",
        "q3": "A",
        "q4": "C",
        "q5": "A",
        "q6": "B",
        "q7": "B",
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
          "accountability_challenge": "Suresh, we see your strong desire to step into leadership as a Plant Manager and appreciate your ambition to grow within RDC Concrete. However, transitioning from operational execution to running a batching plant requires a profound shift in mindset—it means stepping forward to meet pressure rather than asking the organization to reduce your targets first. True leadership is built on taking active accountability for your own development, even when it requires temporary personal sacrifices like dedicating free time to study. If you truly wish to lead a plant crew in the future, we challenge you to start proving that capability now by embracing this upskilling opportunity.",
          "persuasive_reframe": "Suresh, it is completely natural to feel hesitant about committing to a four-year BTech program, especially when you are already managing demanding operational targets. We want you to see this company-sponsored BITS Pilani degree not as an academic restriction on your time, but as a fully funded, zero-risk professional shield that future-proofs your career. The next four years are going to pass regardless of your choice; you can either spend them in your current comfort zone or emerge with a prestigious, debt-free engineering qualification. You will not be navigating this rigorous path alone—you have the active support of 17 senior RDC colleagues already in the program who will guide you every step of the way."
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
        "q1": "A",
        "q2": "B",
        "q3": "C",
        "q4": "A",
        "q5": "B",
        "q6": "C",
        "q7": "A",
        "q8": "B",
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
          "accountability_challenge": "Amit, your survey reveals a remarkable level of professional accountability and complete alignment with our goal of elevating you into future technical leadership. We highly value your deep drive and readiness to assume site-level ownership and drive digital concrete quality initiatives. The main path forward for you is to sustain this exceptional operational grit throughout the BITS Pilani program. RDC is ready to back you fully, and we challenge you to step into this opportunity, continue pushing past your comfort zones, and set a stellar upskilling benchmark for the entire QC team.",
          "persuasive_reframe": "Amit, while the prospect of balancing intensive study with active QC lab targets is a demanding commitment, we want you to view this BITS BTech as a powerful, company-sponsored professional shield for your career. This is a zero-risk, fully subsidized launchpad that will transition you from a technician to a highly certified strategic manager over the next four years. Time will pass quickly as you accumulate top-tier technical and managerial capabilities. By drawing strength and coordination from the 17 senior RDC officers currently in the program, you will have a resilient support network to ensure you perform at your peak without letting site standards slip."
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
        "q1": "A",
        "q2": "B",
        "q3": "B",
        "q4": "A",
        "q5": "B",
        "q6": "C",
        "q7": "A",
        "q8": "B",
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
          "accountability_challenge": "Vikram, you have built a fantastic reputation in Nagpur operations, and we strongly believe in your potential to transition into a Plant Manager role. However, stepping into ultimate plant leadership means learning to balance critical on-the-floor delivery targets with the mental stretch of long-term capability building. Your natural hesitation about academic pressure is completely understandable, but operational ownership requires finding ways to integrate development into your weekly routine rather than letting floor stress cap your potential. We challenge you to rise above these immediate anxieties and demonstrate the true managerial capacity we know you possess.",
          "persuasive_reframe": "Vikram, your worry about letting concrete delivery schedules clash with examinations shows your deep dedication to your daily operational duties, and we highly respect that. We want to assure you that this 4-year BITS Pilani program is a completely subsidized, zero-risk professional shield designed to elevate—not compromise—your career at RDC. The next four years will pass regardless of your choice; this is your chance to emerge as a certified BTech operational leader with no personal debt. You will not have to juggle this alone—our 17 active senior officers already in the program will serve as a close mentorship circle to help you coordinate schedules and succeed."
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

### 🗣️ Expert Advice
*(Constructive coaching advice and career reframing tailored for you by our Industrial Psychologist)*

#### A) THE PATH TO GROWTH (Empathetic Accountability)
> `state.api_response.counseling.accountability_challenge`

#### B) THE BITS SHIELD (Empathetic Reframe)
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