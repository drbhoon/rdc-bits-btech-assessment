// --- STATE CONFIGURATION ---
let currentView = 'candidate';
let questions = [];
let activeQuestionIndex = 0;
let candidateSelections = {};
let candidateMetadata = { name: '', department: '', current_plant: '' };
let submissions = [];
let selectedSubmissionId = null;

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
  fetchQuestions();
  fetchSubmissions();
});

// --- SPA VIEW ROUTING ---
function switchView(view) {
  currentView = view;
  
  // Update Navigation Active State
  document.getElementById('nav-candidate').classList.toggle('active', view === 'candidate');
  document.getElementById('nav-admin').classList.toggle('active', view === 'admin');
  
  // Toggle Visibility of Sections
  document.getElementById('view-candidate').classList.toggle('active', view === 'candidate');
  document.getElementById('view-admin').classList.toggle('active', view === 'admin');

  if (view === 'admin') {
    fetchSubmissions();
  }
}

// --- API ACTIONS ---

// 1. Fetch questions from the server
async function fetchQuestions() {
  try {
    const response = await fetch('/api/questions');
    const data = await response.json();
    questions = data.questions;
    console.log(`Fetched ${questions.length} questions successfully.`);
  } catch (error) {
    console.error("Error loading questions from API:", error);
  }
}

// 2. Fetch submissions from the server
async function fetchSubmissions() {
  try {
    const response = await fetch('/api/submissions');
    submissions = await response.json();
    renderRoster();
    console.log(`Fetched ${submissions.length} submissions successfully.`);
  } catch (error) {
    console.error("Error loading submissions from API:", error);
  }
}

// 3. Submit responses & trigger AI evaluation
async function submitSurvey() {
  // Show loading indicator on next button
  const nextBtn = document.getElementById('wizard-next-btn');
  nextBtn.disabled = true;
  nextBtn.innerHTML = `Evaluating... <div class="spinner"></div>`;

  const payload = {
    employee_metadata: candidateMetadata,
    user_selections: candidateSelections
  };

  try {
    const response = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    
    if (!response.ok) throw new Error("API submit failed");
    
    const result = await response.json();
    console.log("Submission successful:", result);
    
    // Toggle completion view
    document.getElementById('survey-wizard').classList.add('hidden');
    document.getElementById('survey-complete').classList.remove('hidden');
    
    // Refresh roster
    fetchSubmissions();
  } catch (error) {
    console.error("Error submitting survey:", error);
    alert("There was an error communicating with the psychologist evaluation engine. Please verify your internet connection and API key.");
    nextBtn.disabled = false;
    nextBtn.innerHTML = `Submit Survey`;
  }
}

// --- SURVEY WIZARD CONTROLLER ---

// 1. Start survey after entering metadata
function startSurvey(event) {
  event.preventDefault();
  
  candidateMetadata.name = document.getElementById('candidate-name').value;
  candidateMetadata.department = document.getElementById('candidate-dept').value;
  candidateMetadata.current_plant = document.getElementById('candidate-plant').value;
  
  activeQuestionIndex = 0;
  candidateSelections = {};
  
  // Show Survey Wizard Card
  document.getElementById('candidate-onboarding').classList.add('hidden');
  document.getElementById('survey-wizard').classList.remove('hidden');
  
  renderQuestion();
}

// 2. Render current question card
function renderQuestion() {
  if (questions.length === 0) return;
  const question = questions[activeQuestionIndex];
  
  // Update Progress Bar
  const progressPercent = ((activeQuestionIndex + 1) / questions.length) * 100;
  document.getElementById('wizard-progress-fill').style.width = `${progressPercent}%`;
  document.getElementById('wizard-progress-text').innerText = `Question ${activeQuestionIndex + 1} of ${questions.length}`;
  
  // Render Scenario details
  document.getElementById('question-badge').innerText = `Scenario ${activeQuestionIndex + 1}`;
  document.getElementById('question-scenario').innerText = question.scenario;
  
  // Render Option cards
  const list = document.getElementById('options-list');
  list.innerHTML = '';
  
  question.options.forEach(option => {
    const isSelected = candidateSelections[question.id] === option.id;
    const card = document.createElement('div');
    card.className = `option-card ${isSelected ? 'selected' : ''}`;
    card.onclick = () => selectOption(question.id, option.id);
    
    card.innerHTML = `
      <div class="option-radio"></div>
      <div class="option-text">${option.text}</div>
    `;
    list.appendChild(card);
  });
  
  // Manage Footer Navigation Buttons
  document.getElementById('wizard-prev-btn').disabled = activeQuestionIndex === 0;
  
  const nextBtn = document.getElementById('wizard-next-btn');
  const hasSelection = !!candidateSelections[question.id];
  nextBtn.disabled = !hasSelection;
  
  if (activeQuestionIndex === questions.length - 1) {
    nextBtn.innerHTML = `Submit Survey <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polyline points="22 2 15 22 11 13 2 9 22 2"/></svg>`;
  } else {
    nextBtn.innerHTML = `Next <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`;
  }
}

// 3. Selection Event
function selectOption(questionId, optionId) {
  candidateSelections[questionId] = optionId;
  renderQuestion();
}

// 4. Back navigation
function prevQuestion() {
  if (activeQuestionIndex > 0) {
    activeQuestionIndex--;
    renderQuestion();
  }
}

// 5. Forward navigation & submit trigger
function nextQuestion() {
  const currentQuestion = questions[activeQuestionIndex];
  if (!candidateSelections[currentQuestion.id]) return;
  
  if (activeQuestionIndex < questions.length - 1) {
    activeQuestionIndex++;
    renderQuestion();
  } else {
    submitSurvey();
  }
}

// 6. Complete screen redirect
function resetCandidatePortal() {
  document.getElementById('candidate-name').value = '';
  document.getElementById('candidate-dept').value = '';
  document.getElementById('candidate-plant').value = '';
  
  document.getElementById('survey-complete').classList.add('hidden');
  document.getElementById('candidate-onboarding').classList.remove('hidden');
}

// --- ADMIN LEADERBOARD & ROSTER ---

// 1. Render left roster list
function renderRoster() {
  const list = document.getElementById('roster-list');
  list.innerHTML = '';
  
  document.getElementById('roster-count').innerText = `${submissions.length} Submissions Loaded`;
  
  if (submissions.length === 0) {
    list.innerHTML = `<div class="intro-text" style="padding-top:20px;">No assessments submitted yet.</div>`;
    return;
  }
  
  submissions.forEach(sub => {
    const item = document.createElement('div');
    const isActive = sub.id === selectedSubmissionId;
    item.className = `roster-item ${isActive ? 'active' : ''}`;
    item.onclick = () => selectSubmission(sub.id);
    
    // Map dot color based on verdict
    let dotClass = 'dot-conditional';
    if (sub.api_response.verdict.includes('EMPHATIC')) dotClass = 'dot-emphatic';
    if (sub.api_response.verdict.includes('NOT READY')) dotClass = 'dot-dne';
    
    const dateStr = new Date(sub.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    
    item.innerHTML = `
      <div class="roster-item-header">
        <span class="roster-name">${sub.employee_metadata.name}</span>
        <div class="roster-verdict-dot ${dotClass}"></div>
      </div>
      <div class="roster-item-body">
        <span>${sub.employee_metadata.department}</span>
        <span>${dateStr}</span>
      </div>
      <div class="roster-tallies">
        <span class="tally-pill tally-gc">GC: ${sub.score_tallies.GC}</span>
        <span class="tally-pill tally-so">SO: ${sub.score_tallies.SO}</span>
        <span class="tally-pill tally-sq">SQ: ${sub.score_tallies.SQ}</span>
      </div>
    `;
    list.appendChild(item);
  });
}

// 2. Select Roster item
function selectSubmission(id) {
  selectedSubmissionId = id;
  
  // Highlight active item
  const items = document.querySelectorAll('.roster-item');
  items.forEach((item, index) => {
    const sub = submissions[index];
    item.classList.toggle('active', sub && sub.id === id);
  });
  
  // Render report
  renderReport();
}

// 3. Render Right Panel Report
function renderReport() {
  const sub = submissions.find(s => s.id === selectedSubmissionId);
  
  const emptyState = document.getElementById('report-empty-state');
  const reportContainer = document.getElementById('report-container');
  
  if (!sub) {
    emptyState.classList.remove('hidden');
    reportContainer.classList.add('hidden');
    return;
  }
  
  emptyState.classList.add('hidden');
  reportContainer.classList.remove('hidden');
  
  // Profile Info
  document.getElementById('rep-dept').innerText = sub.employee_metadata.department;
  document.getElementById('rep-name').innerText = sub.employee_metadata.name;
  document.getElementById('rep-plant').innerText = sub.employee_metadata.current_plant;
  
  // Verdict Badge
  const verdictBtn = document.getElementById('rep-verdict');
  verdictBtn.innerText = sub.api_response.verdict;
  
  verdictBtn.className = 'verdict-badge'; // Reset
  if (sub.api_response.verdict.includes('EMPHATIC')) verdictBtn.classList.add('verdict-emphatic');
  if (sub.api_response.verdict.includes('CONDITIONAL')) verdictBtn.classList.add('verdict-conditional');
  if (sub.api_response.verdict.includes('NOT READY')) verdictBtn.classList.add('verdict-dne');
  
  // Archetype Bars
  const total = 10;
  const gcPct = (sub.score_tallies.GC / total) * 100;
  const soPct = (sub.score_tallies.SO / total) * 100;
  const sqPct = (sub.score_tallies.SQ / total) * 100;
  
  document.getElementById('bar-val-gc').innerText = `${sub.score_tallies.GC} / 10`;
  document.getElementById('bar-fill-gc').style.width = `${gcPct}%`;
  
  document.getElementById('bar-val-so').innerText = `${sub.score_tallies.SO} / 10`;
  document.getElementById('bar-fill-so').style.width = `${soPct}%`;
  
  document.getElementById('bar-val-sq').innerText = `${sub.score_tallies.SQ} / 10`;
  document.getElementById('bar-fill-sq').style.width = `${sqPct}%`;
  
  // Text Analysis
  document.getElementById('rep-diagnosis').innerText = sub.api_response.diagnosis;
  document.getElementById('rep-dissonance').innerText = sub.api_response.dissonance;
  
  // Customize dissonance card left-border based on severity
  const dissonanceCard = document.querySelector('.dissonance-card');
  if (sub.api_response.verdict.includes('NOT READY')) {
    dissonanceCard.style.borderLeftColor = 'var(--color-rose)';
    dissonanceCard.style.background = 'rgba(239, 68, 68, 0.02)';
  } else if (sub.api_response.verdict.includes('CONDITIONAL')) {
    dissonanceCard.style.borderLeftColor = 'var(--color-amber)';
    dissonanceCard.style.background = 'rgba(245, 158, 11, 0.02)';
  } else {
    dissonanceCard.style.borderLeftColor = 'var(--color-emerald)';
    dissonanceCard.style.background = 'rgba(16, 185, 129, 0.02)';
  }
  
  // Counseling Talking Points
  const scriptList = document.getElementById('rep-script-list');
  scriptList.innerHTML = '';
  
  sub.api_response.talking_points.forEach((point, idx) => {
    const item = document.createElement('div');
    item.className = 'script-item fade-in';
    item.innerHTML = `
      <div class="script-num">Q${idx + 1}</div>
      <div class="script-text">${point}</div>
    `;
    scriptList.appendChild(item);
  });
}
