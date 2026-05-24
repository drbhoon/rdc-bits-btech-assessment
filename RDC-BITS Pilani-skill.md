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
    "talking_points": []
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
        "talking_points": [
          "Suresh, you want to lead an entire RMC batching plant as a Plant Manager, which requires 24/7 accountability for sudden breakdowns and team performance. Yet, you've stated that managing BITS studies alongside your current KPIs isn't worth the pressure if it takes your free time. How do you plan to handle the relentless pressure of running a plant if a structured academic program is already seen as too high of a personal cost?",
          "You expressed in your survey that the company should structurally lower your workload and targets first before you commit to BTech studies. In operations, we face unpredictable cement shortages, equipment failures, and peak pours where targets cannot be lowered. If you demand a reduced load before demonstrating capability, how will you lead a site crew through real-world plant crises?",
          "RDC is offering a debt-free BITS Pilani degree to secure your career stability. However, you noted that a 4-year commitment is too long compared to job-hopping for small increments. If you're not ready to anchor yourself in an ecosystem investing heavily in you, why should RDC trust you with the long-term capital assets of a major batching plant?"
        ]
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
        "talking_points": [
          "Amit, your profile shows a strong understanding of RMC operational realities and excellent personal drive. How do you plan to structure your weekly schedule to ensure that BITS exams and Navi Mumbai QC lab targets are both met with equal excellence?",
          "You’ve indicated a strong interest in mastering automation and predictive data software in the concrete lab. How do you see yourself utilizing these new BTech capabilities to improve RDC’s concrete mix consistency and cost-savings over the next few years?",
          "With your target of stepping into a Technical Manager role, you will be expected to mentor junior technicians. How will you use your BITS experience to inspire other diploma holders at your plant to pursue technical upskilling?"
        ]
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
        "talking_points": [
          "Vikram, you have a very strong track record in Nagpur and want to step up to a Plant Manager level. You expressed concern about how to balance BITS classes with site KPIs. RDC currently has 17 senior officers successfully navigating this exact program; what structured peer mentorship or scheduling support do you need from them to ease this transition?",
          "You indicated a preference for practical on-the-job learning over formal academic programs. BITS Pilani offers work-integrated learning where your daily concrete operations are treated as lab experiments. How can we align your BITS BTech project with your current plant bottlenecks to solve real issues on the ground?",
          "We trust your operational dedication. If we enroll you, what specific communication system will you set up with your Plant Incharge to flag early whenever academic exams clash with heavy delivery schedules, so we can coordinate support?"
        ]
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

### 🗣️ TAILORED COUNSELING SCRIPT FOR LEADERSHIP
*(Use these targeted questions during tomorrow's 1-on-1 meeting to cut through defensive corporate posturing)*

1. ❓ **`state.api_response.talking_points[0]`**
2. ❓ **`state.api_response.talking_points[1]`**
3. ❓ **`state.api_response.talking_points[2]`**
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
          "api_response.talking_points": "response.api_response.talking_points"
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