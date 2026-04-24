import { useState, useEffect, useRef } from "react";

// ============================================================================
// FONT INJECTION + THEME SYSTEM
// ============================================================================
const FontStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Inter:wght@400;500&display=swap');
    * { box-sizing: border-box; }

    /* ── Base design tokens (Theme B — Modern Dark, default) ── */
    :root {
      --font-display: 'Space Grotesk', system-ui, sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
      --font-body: 'Inter', system-ui, sans-serif;
      --lo-bg:          #08090b;
      --lo-surface:     #0f1014;
      --lo-card:        #111318;
      --lo-card-alt:    #161b26;
      --lo-text:        #e4e4e7;
      --lo-text-muted:  #71717a;
      --lo-text-hint:   #3f4147;
      --lo-border:      #1e2028;
      --lo-border-alt:  #27272a;
      --lo-accent:      #60a5fa;
      --lo-accent-dim:  rgba(96,165,250,0.1);
    }

    /* ── Theme A — Clean & Minimal (light) ── */
    [data-theme="a"] {
      --lo-bg:          #f8f9fa;
      --lo-surface:     #ffffff;
      --lo-card:        #f1f3f4;
      --lo-card-alt:    #e8eaed;
      --lo-text:        #111827;
      --lo-text-muted:  #6b7280;
      --lo-text-hint:   #9ca3af;
      --lo-border:      #e5e7eb;
      --lo-border-alt:  #d1d5db;
      --lo-accent:      #2563eb;
      --lo-accent-dim:  rgba(37,99,235,0.08);
    }
    [data-theme="a"] body { background: #f8f9fa; }
    [data-theme="a"] .bg-zinc-950 { background-color: #f8f9fa !important; }
    [data-theme="a"] .bg-zinc-900 { background-color: #f1f3f4 !important; }
    [data-theme="a"] .bg-zinc-800 { background-color: #e8eaed !important; }
    [data-theme="a"] .border-zinc-800 { border-color: #e5e7eb !important; }
    [data-theme="a"] .border-zinc-700 { border-color: #d1d5db !important; }
    [data-theme="a"] .text-zinc-100 { color: #111827 !important; }
    [data-theme="a"] .text-zinc-200 { color: #1f2937 !important; }
    [data-theme="a"] .text-zinc-300 { color: #374151 !important; }
    [data-theme="a"] .text-zinc-400 { color: #6b7280 !important; }
    [data-theme="a"] .text-zinc-500 { color: #9ca3af !important; }
    [data-theme="a"] .text-zinc-600 { color: #9ca3af !important; }
    [data-theme="a"] .text-zinc-700 { color: #d1d5db !important; }
    [data-theme="a"] input, [data-theme="a"] textarea, [data-theme="a"] select {
      color: #111827 !important; background-color: #f1f3f4 !important; border-color: #d1d5db !important;
    }
    [data-theme="a"] .scrollbar-thin::-webkit-scrollbar-thumb { background: #d1d5db; }

    /* ── Theme C — Warm & Personal (stone dark) ── */
    [data-theme="c"] {
      --lo-bg:          #1c1917;
      --lo-surface:     #201e1b;
      --lo-card:        #231f1d;
      --lo-card-alt:    #2a2623;
      --lo-text:        #e7e5e4;
      --lo-text-muted:  #a8a29e;
      --lo-text-hint:   #78716c;
      --lo-border:      #292524;
      --lo-border-alt:  #3d3835;
      --lo-accent:      #f59e0b;
      --lo-accent-dim:  rgba(245,158,11,0.1);
    }
    [data-theme="c"] body { background: #1c1917; }
    [data-theme="c"] .bg-zinc-950 { background-color: #1a1714 !important; }
    [data-theme="c"] .bg-zinc-900 { background-color: #231f1d !important; }
    [data-theme="c"] .bg-zinc-800 { background-color: #292524 !important; }
    [data-theme="c"] .border-zinc-800 { border-color: #3d3835 !important; }
    [data-theme="c"] .border-zinc-700 { border-color: #57534e !important; }
    [data-theme="c"] .text-zinc-100 { color: #e7e5e4 !important; }
    [data-theme="c"] .text-zinc-200 { color: #d6d3d1 !important; }
    [data-theme="c"] .text-zinc-300 { color: #c4b5b0 !important; }
    [data-theme="c"] .text-zinc-400 { color: #a8a29e !important; }
    [data-theme="c"] .text-zinc-500 { color: #78716c !important; }
    [data-theme="c"] .text-zinc-600 { color: #57534e !important; }
    [data-theme="c"] .text-zinc-700 { color: #44403c !important; }
    [data-theme="c"] input, [data-theme="c"] textarea, [data-theme="c"] select {
      color: #e7e5e4 !important; background-color: #231f1d !important; border-color: #3d3835 !important;
    }
    [data-theme="c"] .scrollbar-thin::-webkit-scrollbar-thumb { background: #3d3835; }

    body { background: var(--lo-bg); margin: 0; transition: background 0.2s; }
    .font-display { font-family: var(--font-display); }
    .font-mono { font-family: var(--font-mono); }
    .font-body { font-family: var(--font-body); }
    .scrollbar-thin::-webkit-scrollbar { width: 4px; }
    .scrollbar-thin::-webkit-scrollbar-track { background: transparent; }
    .scrollbar-thin::-webkit-scrollbar-thumb { background: #27272a; border-radius: 4px; }
    @keyframes pulse-slow { 0%,100% { opacity: 1 } 50% { opacity: 0.5 } }
    .pulse-slow { animation: pulse-slow 2s ease-in-out infinite; }
    @keyframes slide-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
    .slide-in { animation: slide-in 0.2s ease-out; }
  `}</style>
);

// ============================================================================
// DESIGN TOKENS
// ============================================================================
const AGENT = {
  orchestrator:          { label: "Orchestrator",   dot: "#60a5fa", border: "#1d4ed8", badge: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  health:                { label: "Health",          dot: "#34d399", border: "#059669", badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  financial:             { label: "Financial",       dot: "#fbbf24", border: "#d97706", badge: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
  "workcover-legal":     { label: "Legal",           dot: "#a78bfa", border: "#7c3aed", badge: "bg-violet-500/10 text-violet-400 border-violet-500/20" },
  "life-admin":          { label: "Life Admin",      dot: "#22d3ee", border: "#0891b2", badge: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20" },
  "business-ideas":      { label: "Ideas",           dot: "#fb7185", border: "#e11d48", badge: "bg-rose-500/10 text-rose-400 border-rose-500/20" },
  "business-ops":        { label: "Business Ops",    dot: "#fb923c", border: "#ea580c", badge: "bg-orange-500/10 text-orange-400 border-orange-500/20" },
  "projects-tech":       { label: "Projects",        dot: "#38bdf8", border: "#0284c7", badge: "bg-sky-500/10 text-sky-400 border-sky-500/20" },
  writing:               { label: "Writing",         dot: "#818cf8", border: "#4f46e5", badge: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20" },
  "research-librarian":  { label: "Research",        dot: "#94a3b8", border: "#64748b", badge: "bg-slate-500/10 text-slate-400 border-slate-500/20" },
  uni:                   { label: "Study",           dot: "#c084fc", border: "#9333ea", badge: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
  work:                  { label: "Career",          dot: "#86efac", border: "#16a34a", badge: "bg-green-500/10 text-green-400 border-green-500/20" },
  // User-defined custom agent slots — labels updated from user profile after setup
  "custom-1":            { label: "Custom 1",        dot: "#f472b6", border: "#db2777", badge: "bg-pink-500/10 text-pink-400 border-pink-500/20" },
  "custom-2":            { label: "Custom 2",        dot: "#fb923c", border: "#ea580c", badge: "bg-orange-500/10 text-orange-400 border-orange-500/20" },
  "custom-3":            { label: "Custom 3",        dot: "#a3e635", border: "#65a30d", badge: "bg-lime-500/10 text-lime-400 border-lime-500/20" },
};

const MODEL_TIER = {
  haiku:  { label: "Haiku",  style: "text-zinc-500 border-zinc-700" },
  sonnet: { label: "Sonnet", style: "text-blue-400/70 border-blue-700/40" },
  opus:   { label: "Opus",   style: "text-amber-400/80 border-amber-700/50" },
};

function tokenPoolState(pct) {
  if (pct >= 100) return { label: "LIMIT", bar: "bg-red-500",    text: "text-red-400",    bg: "bg-red-500/10" };
  if (pct >= 90)  return { label: "CRITICAL", bar: "bg-orange-500", text: "text-orange-400", bg: "bg-orange-500/10" };
  if (pct >= 75)  return { label: "ECONOMY", bar: "bg-amber-500",  text: "text-amber-400",  bg: "bg-amber-500/10" };
  return           { label: "NORMAL",  bar: "bg-emerald-500", text: "text-emerald-400", bg: "bg-emerald-500/10" };
}

// ============================================================================
// MOCK DATA
// ============================================================================
const MOCK_BRIEF = [
  {
    agent: "orchestrator", model: "sonnet",
    title: "Today's Overview",
    summary: "Moderate load day. Three active flags. Health capacity at 6/10 — schedule-constrained but functional. Priority window: 09:00–12:00.",
    items: [
      { type: "flag", text: "Fair Go Finance payment overdue — financial agent flagged", priority: "high" },
      { type: "action", text: "Draft response to WorkCover IME letter — workcover-legal agent queued" },
      { type: "note", text: "UniSQ enrolment deadline is 18 April — 27 days" },
    ],
    expanded: false,
  },
  {
    agent: "health", model: "sonnet",
    title: "Health & Capacity",
    summary: "Capacity level 6/10. Venlafaxine 225mg stable. Mirtazapine 15mg last taken last night. Sleep: 6h. Morning energy: moderate. Recommended load: 3–4 priority items maximum.",
    items: [
      { type: "action", text: "Medication check-in due — 9:00 PM" },
      { type: "note", text: "PIRS functional capacity consistent with yesterday" },
    ],
    expanded: false,
  },
  {
    agent: "financial", model: "haiku",
    title: "Financial",
    summary: "Fair Go Finance $847 overdue. ANZ direct debit scheduled Friday. ClearScore check pending — no new defaults flagged this week.",
    items: [
      { type: "flag", text: "Fair Go Finance — contact hardship line before Friday", priority: "high" },
      { type: "action", text: "Prepare ANZ transaction reconciliation" },
    ],
    expanded: false,
  },
  {
    agent: "workcover-legal", model: "sonnet",
    title: "WorkCover / Legal",
    summary: "IME letter from Sonic Health received 18 March. Response window closes 28 March — 6 days. UWU rep contacted, awaiting callback.",
    items: [
      { type: "flag", text: "IME response deadline 28 March — 6 days", priority: "critical" },
      { type: "action", text: "Follow up UWU rep re: IME strategy call" },
    ],
    expanded: false,
  },
];

const MOCK_AGENTS = Object.entries(AGENT).map(([id, cfg], i) => ({
  id, ...cfg,
  lastActive: i < 4 ? `${i + 1}h ago` : i < 7 ? `${i - 2}d ago` : "7d+",
  nextTask: i === 0 ? "Morning briefing 7:30 AM" : i === 1 ? "Medication reminder 9 PM" : i === 2 ? "Financial check Mon 9 AM" : null,
  flags: i === 3 ? 2 : i === 2 ? 1 : 0,
  status: i < 5 ? "active" : i < 8 ? "idle" : "dormant",
}));

const MOCK_MESSAGES = [
  { role: "user", text: "What's my Fair Go Finance situation and what should I do today?" },
  { role: "assistant", agent: "financial", model: "sonnet", text: "Your Fair Go Finance account has an overdue balance of $847.20 as of this morning. The account is not yet in collections — you are still in the direct contact window.\n\nI recommend calling their hardship line before Friday when your ANZ direct debit processes. Hardship arrangements typically freeze interest and set a reduced payment schedule. You have a strong case: WorkCover claim active, Centrelink income, documented medical condition.\n\nWant me to draft the hardship letter now?", disclaimer: "This is not financial advice. For significant financial decisions, consider speaking with a qualified financial counsellor." },
  { role: "user", text: "Yes please draft it" },
];

const ONBOARDING_DOMAINS = [
  { id: "health",              label: "Health & Wellbeing",  desc: "Medications, capacity, mental health, appointments", weight: 3, icon: "🫀" },
  { id: "financial",           label: "Money & Credit",      desc: "Bills, debt, credit repair, budget", weight: 2, icon: "💳" },
  { id: "workcover-legal",     label: "Legal & Claims",      desc: "Workers compensation, disputes, legal matters", weight: 3, icon: "⚖️" },
  { id: "life-admin",          label: "Life Admin",          desc: "Calendar, emails, tasks, scheduling", weight: 1, icon: "📋" },
  { id: "business-ideas",      label: "Business Ideas",      desc: "New ventures, ideation, opportunity research", weight: 2, icon: "🚀" },
  { id: "business-ops",        label: "Business Operations", desc: "Inventory, income, suppliers, side businesses", weight: 2, icon: "🏪" },
  { id: "projects-tech",       label: "Projects & Tech",     desc: "Software projects, sprints, platform ops", weight: 2, icon: "💻" },
  { id: "writing",             label: "Writing & Content",   desc: "Articles, blog posts, essays, editing", weight: 1, icon: "✍️" },
  { id: "research-librarian",  label: "Research Library",    desc: "Document search, knowledge synthesis", weight: 1, icon: "📚" },
  { id: "uni",                 label: "Study & University",  desc: "Courses, assignments, academic planning", weight: 2, icon: "🎓" },
  { id: "work",                label: "Career & Work",       desc: "Job search, applications, career planning", weight: 1, icon: "💼" },
];

const SCHEDULED_TASKS_MENU = [
  { id: "morning-briefing", label: "Morning Briefing", time: "7:30 AM daily", tokens: "3–6K", desc: "Calendar, flags, focus suggestion" },
  { id: "evening-checkin", label: "Evening Check-in", time: "8:00 PM daily", tokens: "2–4K", desc: "What got done, mood, tomorrow's plan" },
  { id: "medication-reminder", label: "Medication Reminder", time: "7AM + 9PM", tokens: "500", desc: "Simple medication check-in" },
  { id: "financial-check", label: "Financial Check", time: "Mon 9:00 AM", tokens: "1.5–2K", desc: "Upcoming debits, pending payments" },
  { id: "weekly-review", label: "Weekly Review", time: "Sun 6:00 PM", tokens: "8–15K", desc: "Wins, slippage, next week priorities" },
];

// ============================================================================
// ONBOARDING PROFILES
// Profile data mirrored from src/onboarding/profiles.ts.
// Domain IDs must match ONBOARDING_DOMAINS ids above.
// ============================================================================
const ONBOARDING_PROFILES = [
  {
    id: "life-in-recovery",
    name: "Life in Recovery",
    tagline: "Injury, illness, or mental health recovery — and everything that comes with it.",
    description: "You're dealing with a WorkCover claim, NDIS application, mental health condition, or long-term illness — and the financial and legal complexity that comes with it.",
    icon: "🫀",
    accentColor: "#fb7185",        // rose-400
    accentBg: "rgba(251,113,133,0.08)",
    accentBorder: "#fb7185",
    domains: ["health", "financial", "workcover-legal", "life-admin"],
    domainLabels: ["Health", "Financial", "Legal", "Life Admin"],
    scheduledTaskIds: ["morning-briefing", "financial-check", "weekly-review"],
    taskCadence: "5 tasks — daily, 2× weekly, fortnightly, monthly",
    whoIsThisFor: [
      "Managing a WorkCover, NDIS, or TPD claim",
      "Living with mental health conditions or chronic illness",
      "Financial hardship from reduced work capacity",
      "Juggling medical, legal, and daily life on limited energy",
    ],
    whatYouGet: [
      "4 agents pre-activated: Health, Financial, Legal, Life Admin",
      "Daily morning capacity check-in",
      "Weekly claim review (Mon) + financial check (Sun)",
      "Fortnightly PIRS functional assessments",
      "Monthly cross-domain progress reflection",
    ],
    healthHints: { enablePIRS: true, enableCDP: true, enableCapacity: true },
  },
  // Future profiles registered here: solo-builder, career-transition, student
];

// ============================================================================
// THEME CONSTANTS  (used by wizard + App)
// ============================================================================
const THEME_KEY = 'lifeos_theme';
const THEME_LABELS = { a: 'Clean light', b: 'Dark precise', c: 'Warm dark' };
const THEME_META = {
  b: { name: 'Dark precise', desc: 'Clean dark surfaces, blue accent.', bg: '#0d0e11', surface: '#13151a', border: '#1e2028', accent: '#60a5fa', text: '#e4e4e7', muted: '#52525b', checkColor: '#000' },
  a: { name: 'Clean light',  desc: 'White surfaces, high contrast, minimal chrome.', bg: '#f8f9fa', surface: '#ffffff', border: '#e5e7eb', accent: '#2563eb', text: '#111827', muted: '#9ca3af', checkColor: '#fff' },
  c: { name: 'Warm dark',    desc: 'Stone tones, amber accent. Comfortable for long sessions.', bg: '#1c1917', surface: '#201e1b', border: '#2a2420', accent: '#f59e0b', text: '#e7e5e4', muted: '#78716c', checkColor: '#000' },
};

// ============================================================================
// API CLIENT
// ============================================================================
const API_BASE = (typeof window !== 'undefined' && window.LIFEOS_API_URL) || 'http://localhost:3000';

// onUnauthorized is an optional callback fired when the server returns 401.
// The App component passes setScreen("onboard") so the user is immediately
// routed back to Setup to re-enter their server token.
async function apiCall(endpoint, options = {}, apiToken, onUnauthorized = null) {
  const headers = {
    'Content-Type': 'application/json',
    ...(apiToken ? { 'Authorization': `Bearer ${apiToken}` } : {}),
    ...(options.headers || {}),
  };
  const res = await fetch(`${API_BASE}${endpoint}`, { ...options, headers });
  const json = await res.json().catch(() => ({ success: false, error: `HTTP ${res.status}` }));

  // 401 — token invalid or missing. Fire callback so the App can route to Setup.
  if (res.status === 401) {
    if (onUnauthorized) onUnauthorized();
    const err = Object.assign(new Error('Server token invalid or expired — please re-enter it in Setup.'), { status: 401 });
    throw err;
  }

  if (!res.ok || !json.success) {
    const err = Object.assign(new Error(json?.error || `HTTP ${res.status}`), { status: res.status });
    throw err;
  }
  return json;
}

function isRateLimitError(err) { return err && err.status === 429; }
function isUnauthorizedError(err) { return err && err.status === 401; }
function isNoApiKeyError(err) { return err && (err.status === 402 || (err.message && err.message.startsWith('NO_API_KEY'))); }

function rateLimitMessage(context) {
  if (context === 'health') return "I need a moment to gather my thoughts — please try again shortly.";
  return "Taking a moment — please try again shortly.";
}

// ============================================================================
// SHARED COMPONENTS
// ============================================================================
function AgentBadge({ agentId, size = "sm" }) {
  const cfg = AGENT[agentId] || { label: agentId, badge: "bg-zinc-800 text-zinc-400 border-zinc-700", dot: "#6b7280" };
  return (
    <span className={`inline-flex items-center gap-1.5 border rounded px-1.5 py-0.5 font-mono ${size === "xs" ? "text-xs" : "text-xs"} ${cfg.badge}`}>
      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: cfg.dot }} />
      {cfg.label}
    </span>
  );
}

function ModelBadge({ model }) {
  const cfg = MODEL_TIER[model] || MODEL_TIER.haiku;
  return (
    <span className={`inline-flex items-center border rounded px-1.5 py-0.5 font-mono text-xs ${cfg.style}`}>
      {cfg.label}
    </span>
  );
}

function TokenPoolBar({ used, total, compact = false }) {
  const pct = Math.min(100, Math.round((used / total) * 100));
  const state = tokenPoolState(pct);
  return (
    <div className={compact ? "flex items-center gap-2" : "space-y-1"}>
      {!compact && (
        <div className="flex justify-between items-center">
          <span className="font-mono text-xs text-zinc-500">Token Pool</span>
          <span className={`font-mono text-xs font-medium ${state.text}`}>{state.label} — {pct}%</span>
        </div>
      )}
      <div className="relative h-1 bg-zinc-800 rounded-full overflow-hidden" style={compact ? { width: 80 } : {}}>
        <div className={`h-full rounded-full transition-all ${state.bar}`} style={{ width: `${pct}%` }} />
      </div>
      {compact && <span className={`font-mono text-xs ${state.text}`}>{pct}%</span>}
    </div>
  );
}

function Flag({ priority, children }) {
  const colors = {
    critical: "border-red-500/50 bg-red-500/5 text-red-300",
    high: "border-amber-500/50 bg-amber-500/5 text-amber-300",
    medium: "border-blue-500/30 bg-blue-500/5 text-blue-300",
  };
  const labels = { critical: "CRITICAL", high: "HIGH", medium: "MED" };
  return (
    <div className={`flex items-start gap-2 border rounded p-2 text-sm ${colors[priority] || colors.medium}`}>
      <span className="font-mono text-xs font-bold flex-shrink-0 mt-0.5">{labels[priority] || "FLAG"}</span>
      <span>{children}</span>
    </div>
  );
}

function Spinner() {
  return <div className="w-4 h-4 border-2 border-zinc-700 border-t-blue-400 rounded-full" style={{ animation: "spin 0.8s linear infinite" }} />;
}

function EmptyState({ icon, title, desc }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="text-4xl mb-3">{icon}</div>
      <div className="font-display text-zinc-300 font-medium mb-1">{title}</div>
      <div className="text-zinc-500 text-sm max-w-xs">{desc}</div>
    </div>
  );
}

// ============================================================================
// SCREEN 1 — DAILY BRIEF
// ============================================================================
// ============================================================================
// PROFILE PICKER
// Pre-wizard screen. Shows profile cards + "Build my own" option.
// onSelect(profile) — user chose a profile
// onCustom()        — user wants the manual wizard path
// ============================================================================
function ProfilePicker({ onSelect, onCustom }) {
  const [hovered, setHovered] = useState(null);
  const [expanded, setExpanded] = useState(null);

  return (
    <div className="max-w-lg mx-auto font-body slide-in">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="font-display text-zinc-100 text-xl font-semibold mb-2">How would you describe your situation?</div>
        <div className="text-zinc-500 text-sm">Choose a starting point — you can customise everything after setup.</div>
      </div>

      {/* Profile cards */}
      <div className="space-y-3 mb-4">
        {ONBOARDING_PROFILES.map(p => {
          const isExpanded = expanded === p.id;
          return (
            <div
              key={p.id}
              style={{
                border: `1px solid ${hovered === p.id ? p.accentBorder : "#27272a"}`,
                background: hovered === p.id ? p.accentBg : "#0f1014",
                transition: "border-color 0.15s, background 0.15s",
              }}
              className="rounded-xl overflow-hidden"
            >
              {/* Card header — always visible */}
              <div
                className="p-4 cursor-pointer"
                onMouseEnter={() => setHovered(p.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => setExpanded(isExpanded ? null : p.id)}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <span className="text-2xl flex-shrink-0 mt-0.5">{p.icon}</span>
                    <div className="min-w-0">
                      <div className="font-display text-zinc-100 text-sm font-semibold">{p.name}</div>
                      <div className="text-zinc-400 text-xs mt-0.5 leading-relaxed">{p.tagline}</div>
                      {/* Domain pills */}
                      <div className="flex flex-wrap gap-1 mt-2">
                        {p.domainLabels.map(label => (
                          <span key={label} className="px-2 py-0.5 rounded-full text-xs font-mono" style={{ background: "rgba(255,255,255,0.05)", color: "#71717a" }}>
                            {label}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* Task cadence + expand chevron */}
                  <div className="flex-shrink-0 text-right">
                    <div className="font-mono text-xs text-zinc-600">{p.taskCadence}</div>
                    <div className="font-mono text-xs text-zinc-700 mt-1">{isExpanded ? "▲ less" : "▼ more"}</div>
                  </div>
                </div>
              </div>

              {/* Expanded detail */}
              {isExpanded && (
                <div className="px-4 pb-4 border-t border-zinc-800/50 pt-3 space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="font-mono text-xs text-zinc-600 mb-1.5">WHO THIS IS FOR</div>
                      <ul className="space-y-1">
                        {p.whoIsThisFor.map((item, i) => (
                          <li key={i} className="text-xs text-zinc-400 flex items-start gap-1.5">
                            <span className="text-zinc-700 flex-shrink-0 mt-0.5">·</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="font-mono text-xs text-zinc-600 mb-1.5">WHAT YOU GET</div>
                      <ul className="space-y-1">
                        {p.whatYouGet.map((item, i) => (
                          <li key={i} className="text-xs text-zinc-400 flex items-start gap-1.5">
                            <span style={{ color: p.accentColor }} className="flex-shrink-0 mt-0.5">✓</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <button
                    onClick={() => onSelect(p)}
                    className="w-full py-2.5 rounded-lg text-sm font-medium font-display transition-colors"
                    style={{ background: p.accentColor, color: "#fff" }}
                    onMouseEnter={e => e.currentTarget.style.opacity = "0.9"}
                    onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                  >
                    Start with {p.name} →
                  </button>
                </div>
              )}

              {/* Quick-select button when not expanded */}
              {!isExpanded && (
                <div
                  className="px-4 pb-3"
                  onMouseEnter={() => setHovered(p.id)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <button
                    onClick={() => onSelect(p)}
                    className="px-4 py-1.5 rounded-lg text-xs font-medium font-mono transition-all"
                    style={{ background: "rgba(255,255,255,0.04)", color: "#a1a1aa", border: "1px solid #27272a" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = p.accentBorder; e.currentTarget.style.color = p.accentColor; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "#27272a"; e.currentTarget.style.color = "#a1a1aa"; }}
                  >
                    Select →
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Build my own */}
      <button
        onClick={onCustom}
        className="w-full p-4 rounded-xl border border-zinc-800 text-left hover:border-zinc-700 transition-colors"
        style={{ background: "transparent" }}
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="font-display text-zinc-300 text-sm font-medium">⚙  Build my own</div>
            <div className="text-zinc-600 text-xs mt-0.5">Choose domains and tasks manually</div>
          </div>
          <span className="font-mono text-xs text-zinc-700">→</span>
        </div>
      </button>
    </div>
  );
}

function DailyBrief({ tokenUsed, tokenTotal, apiToken, onUnauthorized }) {
  const [sections, setSections] = useState(MOCK_BRIEF);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [briefError, setBriefError] = useState(null);

  const today = new Date();
  const dateStr = today.toLocaleDateString('en-AU', { weekday: 'long', day: 'numeric', month: 'long' });
  const timeStr = today.toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit', timeZoneName: 'short' }).replace(':00', '');

  function toggle(i) {
    setSections(s => s.map((x, j) => j === i ? { ...x, expanded: !x.expanded } : x));
  }

  async function refresh() {
    setRefreshing(true);
    setBriefError(null);
    try {
      const json = await apiCall('/api/briefing?sel=3', {}, apiToken, onUnauthorized);
      if (json.data) {
        // Replace the orchestrator section with live briefing data
        const liveText = typeof json.data === 'string' ? json.data : JSON.stringify(json.data);
        setSections(s => s.map((sec, i) =>
          i === 0 ? { ...sec, summary: liveText.slice(0, 300), expanded: true } : sec
        ));
      }
    } catch (err) {
      setBriefError(isUnauthorizedError(err)
        ? 'Server token invalid — redirecting to Setup…'
        : isRateLimitError(err)
        ? rateLimitMessage('orchestrator')
        : !apiToken ? 'Enter your server token in Setup to connect to your LifeOS backend.'
        : 'Could not refresh — is the backend running?');
    } finally {
      setRefreshing(false);
    }
  }

  const allFlags = sections.flatMap(s => s.items.filter(i => i.type === "flag"));
  const allActions = sections.flatMap(s => s.items.filter(i => i.type === "action"));

  return (
    <div className="max-w-2xl mx-auto space-y-4 font-body">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="font-display text-zinc-100 font-semibold text-lg">{dateStr}</div>
          <div className="font-mono text-zinc-500 text-xs">Daily Brief · {timeStr}</div>
        </div>
        <button
          onClick={refresh}
          className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded text-xs text-zinc-400 hover:text-zinc-200 hover:border-zinc-600 transition-colors"
        >
          {refreshing ? <Spinner /> : <span>↻</span>} Refresh
        </button>
      </div>

      {briefError && (
        <div className="bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-xs text-zinc-400 italic">
          {briefError}
        </div>
      )}

      {/* Token pool */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-3">
        <TokenPoolBar used={tokenUsed} total={tokenTotal} />
      </div>

      {/* Critical flags summary */}
      {allFlags.filter(f => f.priority === "critical").length > 0 && (
        <div className="slide-in space-y-2">
          <div className="font-mono text-xs text-red-400 uppercase tracking-wider">Requires Attention</div>
          {allFlags.filter(f => f.priority === "critical").map((f, i) => (
            <Flag key={i} priority="critical">{f.text}</Flag>
          ))}
        </div>
      )}

      {/* High flags */}
      {allFlags.filter(f => f.priority === "high").length > 0 && (
        <div className="slide-in space-y-2">
          <div className="font-mono text-xs text-amber-400 uppercase tracking-wider">High Priority</div>
          {allFlags.filter(f => f.priority === "high").map((f, i) => (
            <Flag key={i} priority="high">{f.text}</Flag>
          ))}
        </div>
      )}

      {/* Today's actions */}
      {allActions.length > 0 && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 space-y-2">
          <div className="font-mono text-xs text-zinc-500 uppercase tracking-wider mb-3">Today's Actions</div>
          {allActions.map((a, i) => (
            <div key={i} className="flex items-start gap-2.5 text-sm text-zinc-300">
              <span className="text-zinc-600 mt-0.5 flex-shrink-0">›</span>
              {a.text}
            </div>
          ))}
        </div>
      )}

      {/* Agent sections */}
      <div className="space-y-2">
        <div className="font-mono text-xs text-zinc-500 uppercase tracking-wider">By Domain</div>
        {loading ? (
          <div className="flex justify-center py-8"><Spinner /></div>
        ) : sections.length === 0 ? (
          <EmptyState icon="📋" title="No briefing sections" desc="Your agents haven't produced any briefing content yet." />
        ) : (
          sections.map((section, i) => (
            <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden slide-in" style={{ borderLeftColor: AGENT[section.agent]?.dot, borderLeftWidth: 2 }}>
              <button
                className="w-full flex items-start justify-between p-4 text-left"
                onClick={() => toggle(i)}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <AgentBadge agentId={section.agent} />
                    <ModelBadge model={section.model} />
                  </div>
                  <div className="font-display text-zinc-200 font-medium text-sm">{section.title}</div>
                  <div className="text-zinc-400 text-sm mt-1 leading-relaxed">{section.summary}</div>
                </div>
                <span className="text-zinc-600 ml-3 flex-shrink-0 text-sm">{section.expanded ? "▲" : "▼"}</span>
              </button>
              {section.expanded && (
                <div className="border-t border-zinc-800 px-4 pb-4 pt-3 space-y-2 slide-in">
                  {section.items.map((item, j) => (
                    item.type === "flag" ? (
                      <Flag key={j} priority={item.priority || "medium"}>{item.text}</Flag>
                    ) : (
                      <div key={j} className="flex items-start gap-2 text-sm text-zinc-400">
                        <span className="text-zinc-600 flex-shrink-0 mt-0.5">{item.type === "action" ? "→" : "·"}</span>
                        {item.text}
                      </div>
                    )
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// ============================================================================
// SCREEN 2 — CONVERSATION
// ============================================================================
function Conversation({ tokenUsed, tokenTotal, apiToken, onUnauthorized }) {
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [activeAgent, setActiveAgent] = useState("orchestrator");
  const [economyMode, setEconomyMode] = useState(false);
  const bottomRef = useRef(null);
  const pct = Math.round((tokenUsed / tokenTotal) * 100);

  useEffect(() => {
    if (pct >= 75) setEconomyMode(true);
  }, [pct]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, sending]);

  async function send() {
    if (!input.trim() || sending) return;
    const userMsg = { role: "user", text: input };
    const sentInput = input;
    setMessages(m => [...m, userMsg]);
    setInput("");
    setSending(true);
    try {
      const targetAgent = economyMode ? "life-admin" : activeAgent;
      const json = await apiCall(`/api/agent/${targetAgent}`, {
        method: 'POST',
        body: JSON.stringify({ message: sentInput }),
      }, apiToken, onUnauthorized);
      const responseText = json.data?.response || "Response received but empty — check the backend logs.";
      setMessages(m => [...m, {
        role: "assistant",
        agent: targetAgent,
        model: economyMode ? "haiku" : "sonnet",
        text: responseText,
      }]);
    } catch (err) {
      const isHealth = activeAgent === "health";
      const errText = isUnauthorizedError(err)
        ? 'Server token invalid — redirecting to Setup to re-enter it…'
        : isNoApiKeyError(err)
        ? 'No Anthropic API key set — go to Settings → Usage tab to enter your sk-ant-… key, then try again.'
        : isRateLimitError(err)
        ? rateLimitMessage(isHealth ? 'health' : 'general')
        : !apiToken
          ? "No server token set — go to Setup → Preferences to connect to your backend."
          : `Could not reach agent: ${err.message}`;
      setMessages(m => [...m, {
        role: "assistant",
        agent: activeAgent,
        model: "sonnet",
        text: errText,
        isError: true,
      }]);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto font-body">
      {/* Agent header */}
      <div className="flex items-center justify-between py-3 border-b border-zinc-800 mb-2">
        <div className="flex items-center gap-2 flex-wrap">
          <AgentBadge agentId={activeAgent} />
          <select
            value={activeAgent}
            onChange={e => setActiveAgent(e.target.value)}
            className="bg-zinc-900 border border-zinc-800 rounded px-1.5 py-0.5 text-xs text-zinc-500 font-mono outline-none focus:border-zinc-600"
          >
            {Object.entries(AGENT).map(([id, cfg]) => (
              <option key={id} value={id}>{cfg.label}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          {economyMode && (
            <span className="font-mono text-xs text-amber-400 border border-amber-500/30 rounded px-1.5 py-0.5">ECONOMY</span>
          )}
          <TokenPoolBar used={tokenUsed} total={tokenTotal} compact />
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto scrollbar-thin space-y-4 py-2 pr-1">
        {messages.length === 0 ? (
          <EmptyState icon="💬" title="Start a conversation" desc="Ask your agents anything. They'll route to the right domain automatically." />
        ) : (
          messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} slide-in`}>
              {msg.role === "user" ? (
                <div className="max-w-sm bg-zinc-800 rounded-2xl rounded-tr-sm px-4 py-2.5 text-sm text-zinc-200">
                  {msg.text}
                </div>
              ) : (
                <div className="max-w-lg space-y-2">
                  <div className="flex items-center gap-2 px-1">
                    <AgentBadge agentId={msg.agent} size="xs" />
                    <ModelBadge model={msg.model} />
                  </div>
                  <div className="bg-zinc-900 border border-zinc-800 rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-zinc-300 leading-relaxed whitespace-pre-line" style={{ borderLeftColor: AGENT[msg.agent]?.dot, borderLeftWidth: 2 }}>
                    {msg.text}
                  </div>
                  {msg.disclaimer && (
                    <div className="px-1 text-xs text-zinc-600 italic">
                      ⚠ {msg.disclaimer}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}
        {sending && (
          <div className="flex justify-start slide-in">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-3 flex items-center gap-2">
              <Spinner />
              <span className="text-xs text-zinc-500 font-mono">financial · sonnet</span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="pt-3 border-t border-zinc-800">
        {economyMode && (
          <div className="text-xs text-amber-400/80 font-mono mb-2">
            Economy mode: routing via Haiku · complex queries use Sonnet
          </div>
        )}
        <div className="flex gap-2">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && !e.shiftKey && send()}
            placeholder={economyMode ? "Economy mode active — concise queries preferred" : "Ask your agents anything…"}
            className="flex-1 bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-zinc-200 placeholder-zinc-600 outline-none focus:border-zinc-500 transition-colors"
          />
          <button
            onClick={send}
            disabled={!input.trim() || sending}
            className="px-4 py-2.5 bg-blue-600 text-white text-sm rounded-xl disabled:opacity-40 hover:bg-blue-500 transition-colors"
          >
            {sending ? <Spinner /> : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// SCREEN 3 — ONBOARDING WIZARD
// ============================================================================
function OnboardingWizard({ onComplete, theme, setTheme }) {
  // step -2 = style picker; step -1 = profile picker; step 0 = domains (skipped when profile applied); steps 1-4 = wizard
  const [step, setStep] = useState(-2);
  const [appliedProfile, setAppliedProfile] = useState(null);
  const [selectedDomains, setSelectedDomains] = useState(new Set(["health", "financial", "life-admin"]));
  const [profile, setProfile] = useState({ name: "", timezone: "Australia/Brisbane", conditions: "", persona: "balanced" });
  const [scheduledTasks, setScheduledTasks] = useState(new Set(["morning-briefing"]));
  const [apiKey, setApiKey] = useState("");
  const [authToken, setAuthToken] = useState("");
  const [consents, setConsents] = useState({ apiDisclosure: false, notAProfessionalService: false, medicalDisclaimer: false });
  const [completing, setCompleting] = useState(false);
  const [done, setDone] = useState(false);
  // Custom agent slots — up to 3 user-defined agents
  const [customAgents, setCustomAgents] = useState([
    { slotId: "custom-1", name: "", focus: "" },
    { slotId: "custom-2", name: "", focus: "" },
    { slotId: "custom-3", name: "", focus: "" },
  ]);

  const consentsComplete = consents.apiDisclosure && consents.notAProfessionalService && consents.medicalDisclaimer;

  // When a profile is applied, skip the Domains step — show Context first
  const STEPS = appliedProfile
    ? ["Context", "Custom Agents", "Automation", "Preferences"]
    : ["Domains", "Context", "Custom Agents", "Automation", "Preferences"];

  // Map logical step index to STEPS array index for progress bar
  // With profile: step 1→0, 2→1, 3→2, 4→3
  // Without profile: step 0→0, 1→1, 2→2, 3→3, 4→4
  const progressIndex = appliedProfile ? step - 1 : step;

  function applyProfile(p) {
    setAppliedProfile(p);
    setSelectedDomains(new Set(p.domains));
    setScheduledTasks(new Set(p.scheduledTaskIds));
    // Pre-set persona to supportive for recovery profile
    if (p.healthHints?.enableCapacity) setProfile(prev => ({ ...prev, persona: "supportive" }));
    setStep(1); // skip Domains step
  }

  function goBack() {
    if (step === -1) {
      // Back from profile picker → return to style picker
      setStep(-2);
    } else if (step === 1 && appliedProfile) {
      // Back from first wizard step when profile was used → return to profile picker
      setStep(-1);
    } else {
      setStep(s => Math.max(0, s - 1));
    }
  }

  const maxStep = appliedProfile ? 4 : 4; // last step is always 4
  const totalWeight = [...selectedDomains].reduce((sum, id) => {
    const d = ONBOARDING_DOMAINS.find(x => x.id === id);
    return sum + (d?.weight || 0);
  }, 0);
  const MAX_WEIGHT = 10;

  function toggleDomain(id) {
    setSelectedDomains(s => {
      const n = new Set(s);
      if (n.has(id)) { n.delete(id); } else {
        const d = ONBOARDING_DOMAINS.find(x => x.id === id);
        if (totalWeight + (d?.weight || 0) <= MAX_WEIGHT) n.add(id);
      }
      return n;
    });
  }

  async function complete() {
    if (!consentsComplete) return;
    setCompleting(true);

    // If the user entered an API key, POST it to the backend before navigating away.
    // Non-blocking: a failure here doesn't abort setup — the key can be re-entered in Settings.
    if (apiKey.trim() && authToken.trim()) {
      try {
        await apiCall('/api/setup/anthropic-key', {
          method: 'POST',
          body: JSON.stringify({ apiKey: apiKey.trim() }),
        }, authToken);
      } catch {
        // Silently continue — user can update the key from Settings
      }
    }

    setCompleting(false);
    setDone(true);
    if (onComplete) onComplete(authToken, apiKey.trim(), customAgents.filter(ca => ca.name.trim()));
  }

  if (done) {
    return (
      <div className="max-w-md mx-auto flex flex-col items-center justify-center py-16 text-center space-y-4 slide-in font-body">
        <div className="text-5xl">✓</div>
        <div className="font-display text-zinc-100 text-xl font-semibold">LifeOS is ready</div>
        <div className="text-zinc-400 text-sm">Your agents are configured. Your morning briefing will arrive at 7:30 AM.</div>
        <button className="mt-4 px-6 py-2.5 bg-blue-600 text-white text-sm rounded-xl font-medium hover:bg-blue-500 transition-colors">
          Go to Dashboard
        </button>
      </div>
    );
  }

  // Style picker screen (step -2) — first screen every new user sees
  if (step === -2) {
    const currentTheme = theme || 'b';
    return (
      <div className="max-w-lg mx-auto font-body slide-in">
        <div className="mb-8 text-center">
          <div className="font-display text-zinc-100 text-xl font-semibold mb-2">Choose your style</div>
          <div className="text-zinc-500 text-sm">Pick the look that suits you — you can change it any time from the theme button.</div>
        </div>

        <div className="space-y-3 mb-6">
          {['b', 'a', 'c'].map(id => {
            const m = THEME_META[id];
            const isSelected = currentTheme === id;
            return (
              <div
                key={id}
                onClick={() => setTheme && setTheme(id)}
                style={{
                  border: `1px solid ${isSelected ? m.accent : 'var(--lo-border-alt)'}`,
                  background: isSelected ? `color-mix(in srgb, ${m.accent} 8%, transparent)` : 'var(--lo-card)',
                  borderRadius: 12,
                  padding: '14px 16px',
                  cursor: 'pointer',
                  transition: 'border-color 0.15s, background 0.15s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                }}
              >
                {/* Mini UI preview */}
                <div style={{ width: 112, height: 66, borderRadius: 7, background: m.bg, border: `1px solid ${m.border}`, overflow: 'hidden', flexShrink: 0 }}>
                  <div style={{ height: 18, background: m.surface, borderBottom: `1px solid ${m.border}`, display: 'flex', alignItems: 'center', padding: '0 7px', gap: 5 }}>
                    <div style={{ width: 22, height: 3, background: m.text, borderRadius: 2, opacity: 0.85 }} />
                    <div style={{ width: 14, height: 3, background: m.muted, borderRadius: 2, opacity: 0.4 }} />
                  </div>
                  <div style={{ padding: '5px 7px', display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <div style={{ display: 'flex', gap: 4 }}>
                      <div style={{ flex: 1, height: 13, background: m.surface, border: `1px solid ${m.border}`, borderRadius: 3 }} />
                      <div style={{ flex: 1, height: 13, background: m.surface, border: `1px solid ${m.accent}`, borderRadius: 3 }} />
                    </div>
                    <div style={{ width: 36, height: 7, background: m.accent, borderRadius: 3, marginTop: 2 }} />
                  </div>
                </div>

                {/* Label */}
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                    <span className="font-display" style={{ fontSize: 14, fontWeight: 600, color: 'var(--lo-text)' }}>{m.name}</span>
                    {isSelected && (
                      <span style={{ fontSize: 10, background: m.accent, color: m.checkColor, padding: '1px 7px', borderRadius: 20, fontFamily: 'var(--font-mono)' }}>
                        active
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--lo-text-muted)', lineHeight: 1.5 }}>{m.desc}</div>
                </div>

                {/* Radio circle */}
                <div style={{
                  width: 20, height: 20, borderRadius: '50%',
                  border: `2px solid ${isSelected ? m.accent : 'var(--lo-border-alt)'}`,
                  background: isSelected ? m.accent : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, transition: 'all 0.15s',
                }}>
                  {isSelected && <span style={{ fontSize: 10, color: m.checkColor, lineHeight: 1 }}>✓</span>}
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={() => setStep(-1)}
          className="w-full py-3 rounded-xl font-display font-medium text-sm transition-colors"
          style={{ background: 'var(--lo-accent)', color: (currentTheme === 'b' || currentTheme === 'c') ? '#000' : '#fff' }}
        >
          Continue →
        </button>
        <div className="text-center mt-3">
          <span className="text-zinc-600 text-xs">You can change this later from the theme button in the top bar.</span>
        </div>
      </div>
    );
  }

  // Profile picker screen (step -1)
  if (step === -1) {
    return (
      <ProfilePicker
        onSelect={applyProfile}
        onCustom={() => setStep(0)}
      />
    );
  }

  return (
    <div className="max-w-lg mx-auto font-body">
      {/* Applied profile badge */}
      {appliedProfile && (
        <div className="flex items-center gap-2 mb-5 px-3 py-2 rounded-lg border" style={{ borderColor: appliedProfile.accentBorder, background: appliedProfile.accentBg }}>
          <span className="text-base">{appliedProfile.icon}</span>
          <div className="flex-1 min-w-0">
            <span className="font-display text-xs font-medium" style={{ color: appliedProfile.accentColor }}>{appliedProfile.name}</span>
            <span className="text-zinc-500 text-xs ml-2">profile applied — domains pre-configured</span>
          </div>
          <button
            onClick={() => { setAppliedProfile(null); setStep(-1); }}
            className="font-mono text-xs text-zinc-600 hover:text-zinc-400 flex-shrink-0"
            title="Change profile"
          >
            change
          </button>
        </div>
      )}

      {/* Progress */}
      <div className="flex items-center gap-2 mb-8">
        {STEPS.map((s, i) => (
          <div key={i} className="flex items-center gap-2 flex-1">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono flex-shrink-0 ${i < progressIndex ? "bg-blue-600 text-white" : i === progressIndex ? "border border-blue-500 text-blue-400" : "border border-zinc-700 text-zinc-600"}`}>
              {i < progressIndex ? "✓" : i + 1}
            </div>
            <div className={`text-xs font-mono ${i === progressIndex ? "text-zinc-300" : i < progressIndex ? "text-zinc-500" : "text-zinc-700"}`}>{s}</div>
            {i < STEPS.length - 1 && <div className={`flex-1 h-px ${i < progressIndex ? "bg-zinc-700" : "bg-zinc-800"}`} />}
          </div>
        ))}
      </div>

      {/* Step content */}
      <div className="slide-in">

        {step === 0 && (
          <div className="space-y-4">
            <div>
              <div className="font-display text-zinc-100 text-base font-semibold mb-1">Which areas of life do you want help with?</div>
              <div className="text-zinc-500 text-sm">Select what's active right now. You can change this later.</div>
            </div>
            {/* Weight meter */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-3 space-y-1">
              <div className="flex justify-between font-mono text-xs text-zinc-500">
                <span>Complexity budget</span>
                <span className={totalWeight > 8 ? "text-amber-400" : "text-zinc-400"}>{totalWeight}/{MAX_WEIGHT}</span>
              </div>
              <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all ${totalWeight > 8 ? "bg-amber-500" : "bg-blue-500"}`} style={{ width: `${(totalWeight / MAX_WEIGHT) * 100}%` }} />
              </div>
              <div className="text-zinc-600 text-xs">Higher complexity = more context loaded per session</div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {ONBOARDING_DOMAINS.map(d => {
                const selected = selectedDomains.has(d.id);
                const wouldExceed = !selected && totalWeight + d.weight > MAX_WEIGHT;
                return (
                  <button
                    key={d.id}
                    onClick={() => toggleDomain(d.id)}
                    disabled={wouldExceed}
                    className={`p-3 rounded-lg border text-left transition-all ${selected ? "bg-blue-600/10 border-blue-500/50 text-zinc-200" : wouldExceed ? "border-zinc-800 text-zinc-700 cursor-not-allowed" : "border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-300"}`}
                  >
                    <div className="text-lg mb-1">{d.icon}</div>
                    <div className="font-display text-xs font-medium">{d.label}</div>
                    <div className="text-xs text-zinc-600 mt-0.5">{d.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <div>
              <div className="font-display text-zinc-100 text-base font-semibold mb-1">Tell your agents about you</div>
              <div className="text-zinc-500 text-sm">This stays private. Used to personalise agent tone and capacity awareness.</div>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block font-mono text-xs text-zinc-500 mb-1">First name</label>
                <input value={profile.name} onChange={e => setProfile(p => ({...p, name: e.target.value}))} placeholder="Matthew" className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-200 placeholder-zinc-600 outline-none focus:border-zinc-500" />
              </div>
              <div>
                <label className="block font-mono text-xs text-zinc-500 mb-1">Timezone</label>
                <select value={profile.timezone} onChange={e => setProfile(p => ({...p, timezone: e.target.value}))} className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-200 outline-none focus:border-zinc-500">
                  <option value="Australia/Brisbane">AEST — Brisbane/QLD (UTC+10)</option>
                  <option value="Australia/Sydney">AEDT — Sydney/NSW (UTC+11)</option>
                  <option value="Australia/Melbourne">AEDT — Melbourne (UTC+11)</option>
                  <option value="Australia/Perth">AWST — Perth (UTC+8)</option>
                </select>
              </div>
              <div>
                <label className="block font-mono text-xs text-zinc-500 mb-1">Health conditions affecting daily capacity <span className="text-zinc-700">(optional)</span></label>
                <input value={profile.conditions} onChange={e => setProfile(p => ({...p, conditions: e.target.value}))} placeholder="e.g. ADHD, depression, chronic pain" className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-200 placeholder-zinc-600 outline-none focus:border-zinc-500" />
                <div className="text-xs text-zinc-600 mt-1">Used only to calibrate tone and load recommendations</div>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div>
              <div className="font-display text-zinc-100 text-base font-semibold mb-1">Custom agents <span className="text-zinc-600 font-normal text-sm">(optional)</span></div>
              <div className="text-zinc-500 text-sm">Need an agent for something specific? Name it and describe its focus. Leave blank to skip.</div>
            </div>
            {customAgents.map((ca, i) => (
              <div key={ca.slotId} className="bg-zinc-900 border border-zinc-800 rounded-lg p-3 space-y-2">
                <div className="font-mono text-xs text-zinc-600">Custom Agent {i + 1}</div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-mono text-xs text-zinc-500 mb-1">Name</label>
                    <input
                      value={ca.name}
                      onChange={e => setCustomAgents(arr => arr.map((x, j) => j === i ? {...x, name: e.target.value} : x))}
                      placeholder="e.g. My Consulting Practice"
                      className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-200 placeholder-zinc-700 outline-none focus:border-zinc-500"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-xs text-zinc-500 mb-1">Focus</label>
                    <input
                      value={ca.focus}
                      onChange={e => setCustomAgents(arr => arr.map((x, j) => j === i ? {...x, focus: e.target.value} : x))}
                      placeholder="e.g. Client projects, invoices, pipeline"
                      className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-200 placeholder-zinc-700 outline-none focus:border-zinc-500"
                    />
                  </div>
                </div>
              </div>
            ))}
            <div className="text-xs text-zinc-600">Custom agents use the same privacy model as standard agents. Focus descriptions are included in the system prompt.</div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div>
              <div className="font-display text-zinc-100 text-base font-semibold mb-1">Automation</div>
              <div className="text-zinc-500 text-sm">Select which tasks run automatically. Each consumes tokens from your pool.</div>
            </div>
            <div className="space-y-2">
              {SCHEDULED_TASKS_MENU.map(t => {
                const selected = scheduledTasks.has(t.id);
                return (
                  <div
                    key={t.id}
                    onClick={() => setScheduledTasks(s => { const n = new Set(s); if (n.has(t.id)) n.delete(t.id); else n.add(t.id); return n; })}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${selected ? "bg-blue-600/10 border-blue-500/40" : "border-zinc-800 hover:border-zinc-700"}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className={`w-3 h-3 rounded-sm border flex-shrink-0 ${selected ? "bg-blue-500 border-blue-500" : "border-zinc-600"}`} />
                          <span className="font-display text-sm text-zinc-200 font-medium">{t.label}</span>
                        </div>
                        <div className="text-xs text-zinc-500 mt-1 ml-5">{t.desc}</div>
                      </div>
                      <div className="text-right ml-3 flex-shrink-0">
                        <div className="font-mono text-xs text-zinc-400">{t.time}</div>
                        <div className="font-mono text-xs text-zinc-600 mt-0.5">~{t.tokens} tokens</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <div>
              <div className="font-display text-zinc-100 text-base font-semibold mb-1">Preferences</div>
              <div className="text-zinc-500 text-sm">How should your agents communicate with you?</div>
            </div>
            <div>
              <label className="block font-mono text-xs text-zinc-500 mb-2">Agent tone</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "supportive", label: "Supportive", desc: "Gentle, affirming" },
                  { id: "balanced", label: "Balanced", desc: "Honest but kind" },
                  { id: "direct", label: "Direct", desc: "Calls things out" },
                ].map(opt => (
                  <button key={opt.id} onClick={() => setProfile(p => ({...p, persona: opt.id}))} className={`p-3 rounded-lg border text-left transition-all ${profile.persona === opt.id ? "bg-blue-600/10 border-blue-500/40 text-zinc-200" : "border-zinc-800 text-zinc-500 hover:border-zinc-700"}`}>
                    <div className="text-sm font-display font-medium">{opt.label}</div>
                    <div className="text-xs text-zinc-600 mt-0.5">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block font-mono text-xs text-zinc-500 mb-1">
                Anthropic API key
                <span className="text-zinc-700 ml-1">(required to activate agents)</span>
              </label>
              <input
                type="password"
                value={apiKey}
                onChange={e => setApiKey(e.target.value)}
                placeholder="sk-ant-…"
                className={`w-full bg-zinc-900 border rounded-lg px-3 py-2 text-sm text-zinc-400 font-mono placeholder-zinc-700 outline-none focus:border-zinc-500 ${
                  apiKey && !apiKey.startsWith('sk-ant-') ? 'border-amber-500/60' : 'border-zinc-700'
                }`}
              />
              {apiKey && !apiKey.startsWith('sk-ant-') && (
                <div className="font-mono text-xs text-amber-500 mt-1">Key must start with sk-ant-</div>
              )}
              {apiKey && apiKey.startsWith('sk-ant-') && (
                <div className="font-mono text-xs text-emerald-500 mt-1">✓ Key format looks correct</div>
              )}
              {!apiKey && (
                <div className="text-xs text-zinc-600 mt-1">
                  Get your key at <span className="text-zinc-500">console.anthropic.com</span> — stored on your server only, never transmitted elsewhere.
                </div>
              )}
            </div>

            <div>
              <label className="block font-mono text-xs text-zinc-500 mb-1">LifeOS server token <span className="text-zinc-700">(from backend .env)</span></label>
              <input type="password" value={authToken} onChange={e => setAuthToken(e.target.value)} placeholder="LIFEOS_API_SECRET value…" className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-400 font-mono placeholder-zinc-700 outline-none focus:border-zinc-500" />
              <div className="text-xs text-zinc-600 mt-1">Required to connect the UI to your running LifeOS backend.</div>
            </div>

            {/* Required consents */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-3 space-y-3">
              <div className="font-mono text-xs text-zinc-500 mb-1">Before you launch — required</div>
              {[
                { id: 'apiDisclosure', label: 'I understand my health, financial, and legal data is transmitted to the Anthropic Claude API to generate AI responses.' },
                { id: 'notAProfessionalService', label: 'LifeOS is not a medical, legal, or financial advisory service. I will consult qualified professionals for important decisions.' },
                { id: 'medicalDisclaimer', label: 'LifeOS does not provide clinical care, diagnosis, or crisis intervention. I will contact emergency services in a crisis.' },
              ].map(({ id, label }) => (
                <label key={id} className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consents[id] || false}
                    onChange={e => setConsents(c => ({ ...c, [id]: e.target.checked }))}
                    className="mt-0.5 flex-shrink-0 accent-blue-500"
                  />
                  <span className="text-xs text-zinc-400 leading-relaxed">{label}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <button
          onClick={goBack}
          className={`px-4 py-2 text-sm text-zinc-400 hover:text-zinc-200 transition-colors ${(step === 0 && !appliedProfile) ? "invisible" : ""}`}
        >
          ← Back
        </button>
        {step < maxStep ? (
          <button onClick={() => setStep(s => s + 1)} className="px-5 py-2 bg-blue-600 text-white text-sm rounded-xl hover:bg-blue-500 transition-colors">
            Continue →
          </button>
        ) : (
          <div className="flex flex-col items-end gap-1.5">
            {step === maxStep && !consentsComplete && (
              <div className="font-mono text-xs text-amber-500/80">Check all three boxes above to continue</div>
            )}
            <button onClick={complete} disabled={completing || (step === maxStep && !consentsComplete)} className="flex items-center gap-2 px-5 py-2 bg-emerald-600 text-white text-sm rounded-xl hover:bg-emerald-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
              {completing ? <><Spinner /> Setting up…</> : "Launch LifeOS →"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// SCREEN 4 — DASHBOARD
// ============================================================================
function Dashboard({ tokenUsed, tokenTotal }) {
  const [agentView, setAgentView] = useState("all");

  const filteredAgents = agentView === "all" ? MOCK_AGENTS : MOCK_AGENTS.filter(a => a.status === agentView);

  return (
    <div className="max-w-2xl mx-auto space-y-5 font-body">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <div className="font-display text-zinc-100 font-semibold">Dashboard</div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-zinc-600">Sun 22 Mar · 07:31</span>
          <button className="px-3 py-1.5 bg-blue-600/20 border border-blue-500/30 text-blue-400 text-xs rounded-lg hover:bg-blue-600/30 transition-colors font-mono">
            + Quick note
          </button>
        </div>
      </div>

      {/* Token pool card */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="font-mono text-xs text-zinc-500 mb-0.5">Core Plan · March 2026</div>
            <div className="font-display text-zinc-200 font-medium">Token Pool</div>
          </div>
          <div className={`font-mono text-xs px-2 py-1 rounded ${tokenPoolState(Math.round((tokenUsed/tokenTotal)*100)).bg} ${tokenPoolState(Math.round((tokenUsed/tokenTotal)*100)).text}`}>
            {tokenPoolState(Math.round((tokenUsed/tokenTotal)*100)).label}
          </div>
        </div>
        <TokenPoolBar used={tokenUsed} total={tokenTotal} />
        <div className="flex justify-between mt-2 font-mono text-xs text-zinc-600">
          <span>{(tokenUsed / 1000).toFixed(0)}K used</span>
          <span>{((tokenTotal - tokenUsed) / 1000).toFixed(0)}K remaining</span>
          <span>{tokenTotal / 1000}K total</span>
        </div>
      </div>

      {/* Active flags summary */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Critical", count: 1, color: "text-red-400", border: "border-red-500/20 bg-red-500/5" },
          { label: "High", count: 2, color: "text-amber-400", border: "border-amber-500/20 bg-amber-500/5" },
          { label: "Actions", count: 4, color: "text-blue-400", border: "border-blue-500/20 bg-blue-500/5" },
        ].map(({ label, count, color, border }) => (
          <div key={label} className={`rounded-xl border p-3 text-center ${border}`}>
            <div className={`font-display text-2xl font-bold ${color}`}>{count}</div>
            <div className="font-mono text-xs text-zinc-500 mt-0.5">{label}</div>
          </div>
        ))}
      </div>

      {/* Agent cards */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="font-mono text-xs text-zinc-500 uppercase tracking-wider">Agents</div>
          <div className="flex gap-1">
            {["all", "active", "idle"].map(v => (
              <button key={v} onClick={() => setAgentView(v)} className={`font-mono text-xs px-2 py-1 rounded transition-colors ${agentView === v ? "bg-zinc-800 text-zinc-200" : "text-zinc-600 hover:text-zinc-400"}`}>
                {v}
              </button>
            ))}
          </div>
        </div>

        {filteredAgents.length === 0 ? (
          <EmptyState icon="🤖" title="No agents in this view" desc="Switch to 'all' to see all configured agents." />
        ) : (
          <div className="grid grid-cols-2 gap-2">
            {filteredAgents.map(agent => (
              <div key={agent.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-3 hover:border-zinc-700 transition-colors" style={{ borderTopColor: agent.dot, borderTopWidth: 2 }}>
                <div className="flex items-start justify-between mb-2">
                  <AgentBadge agentId={agent.id} />
                  {agent.flags > 0 && (
                    <span className="font-mono text-xs bg-red-500/10 text-red-400 border border-red-500/20 rounded px-1.5">{agent.flags}</span>
                  )}
                </div>
                <div className="font-mono text-xs text-zinc-600 mb-1">Last: {agent.lastActive}</div>
                {agent.nextTask ? (
                  <div className="text-xs text-zinc-400 leading-tight">{agent.nextTask}</div>
                ) : (
                  <div className="text-xs text-zinc-700">No scheduled tasks</div>
                )}
                <div className="flex gap-1.5 mt-3">
                  <button className="flex-1 text-xs py-1 bg-zinc-800 text-zinc-400 rounded hover:bg-zinc-700 hover:text-zinc-200 transition-colors font-mono">Chat</button>
                  <button className="flex-1 text-xs py-1 bg-zinc-800 text-zinc-400 rounded hover:bg-zinc-700 hover:text-zinc-200 transition-colors font-mono">Brief</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// SCREEN 5 — SETTINGS
// ============================================================================
function Settings({ tokenUsed, tokenTotal, apiToken, onTokenUpdate, onApiKeyUpdate }) {
  const [activeTab, setActiveTab] = useState("plan");
  const [cancelling, setCancelling] = useState(false);
  const [newToken, setNewToken] = useState("");
  const [tokenSaved, setTokenSaved] = useState(false);
  const [newApiKey, setNewApiKey] = useState("");
  const [apiKeySaving, setApiKeySaving] = useState(false);
  const [apiKeySaved, setApiKeySaved] = useState(false);
  const [apiKeyError, setApiKeyError] = useState("");

  function saveToken() {
    if (!newToken.trim()) return;
    onTokenUpdate(newToken.trim());
    setNewToken("");
    setTokenSaved(true);
    setTimeout(() => setTokenSaved(false), 3000);
  }

  const TABS = ["plan", "agents", "schedules", "usage", "data"];

  async function saveApiKey() {
    const key = newApiKey.trim();
    if (!key || !key.startsWith('sk-ant-')) {
      setApiKeyError('Key must start with sk-ant-');
      return;
    }
    setApiKeyError("");
    setApiKeySaving(true);
    try {
      await apiCall('/api/setup/anthropic-key', {
        method: 'POST',
        body: JSON.stringify({ apiKey: key }),
      }, apiToken);
      setNewApiKey("");
      setApiKeySaved(true);
      if (onApiKeyUpdate) onApiKeyUpdate(key);
      setTimeout(() => setApiKeySaved(false), 3000);
    } catch (err) {
      setApiKeyError(err.message || 'Failed to update key — is the server running?');
    } finally {
      setApiKeySaving(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto font-body">
      <div className="font-display text-zinc-100 font-semibold mb-5">Settings</div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-zinc-800 mb-5">
        {TABS.map(t => (
          <button key={t} onClick={() => setActiveTab(t)} className={`font-mono text-xs px-3 py-2 capitalize border-b-2 transition-colors ${activeTab === t ? "border-blue-500 text-zinc-200" : "border-transparent text-zinc-600 hover:text-zinc-400"}`}>
            {t}
          </button>
        ))}
      </div>

      {/* Plan tab */}
      {activeTab === "plan" && (
        <div className="space-y-4 slide-in">
          <div className="bg-zinc-900 border border-blue-500/20 rounded-xl p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="font-mono text-xs text-zinc-500">Current plan</div>
                <div className="font-display text-zinc-100 font-semibold text-lg mt-0.5">Core</div>
                <div className="font-mono text-zinc-400 text-sm">$59/month · 6M tokens · 12 agents</div>
              </div>
              <div className="font-mono text-xs text-blue-400 border border-blue-500/30 rounded px-2 py-1">ACTIVE</div>
            </div>
            <div className="border-t border-zinc-800 pt-3 flex gap-2">
              <button className="flex-1 text-sm py-2 bg-blue-600/10 border border-blue-500/30 text-blue-400 rounded-lg hover:bg-blue-600/20 transition-colors">Upgrade to Pro</button>
              <button className="px-3 py-2 text-sm text-zinc-600 hover:text-zinc-400 transition-colors">Pause</button>
            </div>
          </div>

          {/* Server token re-entry */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-display text-zinc-200 text-sm font-medium">Server token</div>
                <div className="font-mono text-xs text-zinc-600 mt-0.5">
                  {apiToken ? '● Connected' : '○ Not connected'}
                </div>
              </div>
              {tokenSaved && (
                <span className="font-mono text-xs text-emerald-400">✓ Token updated</span>
              )}
            </div>
            <div className="flex gap-2">
              <input
                type="password"
                value={newToken}
                onChange={e => setNewToken(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && saveToken()}
                placeholder="Paste new LIFEOS_API_SECRET…"
                className="flex-1 bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-300 font-mono placeholder-zinc-700 outline-none focus:border-zinc-500"
              />
              <button
                onClick={saveToken}
                disabled={!newToken.trim()}
                className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Save
              </button>
            </div>
            <div className="text-xs text-zinc-700">
              Use this if your session expired or the server was restarted with a new token.
            </div>
          </div>

          {/* Cancel flow */}
          {!cancelling ? (
            <button onClick={() => setCancelling(true)} className="text-xs text-zinc-700 hover:text-zinc-500 transition-colors">
              Cancel subscription
            </button>
          ) : (
            <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-4 slide-in space-y-3">
              <div className="font-display text-zinc-200 font-medium">Before you go</div>
              <div className="text-sm text-zinc-400">Your state data, journal, and agent configurations are yours. You can export everything before cancelling.</div>
              <div className="grid grid-cols-2 gap-2">
                <button className="py-2 text-sm border border-zinc-700 text-zinc-400 rounded-lg hover:border-zinc-600 hover:text-zinc-200 transition-colors">Export my data</button>
                <button className="py-2 text-sm border border-amber-500/30 text-amber-400 rounded-lg hover:bg-amber-500/5 transition-colors">Downgrade to Trial</button>
              </div>
              <button className="w-full py-2 text-sm bg-red-600/10 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-600/20 transition-colors">
                Confirm cancellation
              </button>
              <button onClick={() => setCancelling(false)} className="w-full text-xs text-zinc-600 hover:text-zinc-400 transition-colors">Never mind</button>
            </div>
          )}
        </div>
      )}

      {/* Agents tab */}
      {activeTab === "agents" && (
        <div className="space-y-2 slide-in">
          <div className="text-xs text-zinc-600 mb-3">12 agent slots · Core plan</div>
          {MOCK_AGENTS.slice(0, 8).map(a => (
            <div key={a.id} className="flex items-center justify-between p-3 bg-zinc-900 border border-zinc-800 rounded-lg">
              <AgentBadge agentId={a.id} />
              <div className="flex items-center gap-2">
                <span className={`font-mono text-xs ${a.status === "active" ? "text-emerald-400" : "text-zinc-600"}`}>{a.status}</span>
                <button className="font-mono text-xs text-zinc-600 hover:text-zinc-400 transition-colors">Configure</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Schedules tab */}
      {activeTab === "schedules" && (
        <div className="space-y-2 slide-in">
          {SCHEDULED_TASKS_MENU.map(t => (
            <div key={t.id} className="flex items-start justify-between p-3 bg-zinc-900 border border-zinc-800 rounded-lg">
              <div>
                <div className="font-display text-sm text-zinc-200 font-medium">{t.label}</div>
                <div className="font-mono text-xs text-zinc-500 mt-0.5">{t.time} · ~{t.tokens} tokens</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-4 bg-emerald-600 rounded-full relative cursor-pointer flex-shrink-0">
                  <div className="w-3 h-3 bg-white rounded-full absolute right-0.5 top-0.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Usage tab */}
      {activeTab === "usage" && (
        <div className="space-y-4 slide-in">
          <TokenPoolBar used={tokenUsed} total={tokenTotal} />
          <div className="space-y-1">
            {[
              { agent: "health", pct: 22 },
              { agent: "financial", pct: 18 },
              { agent: "orchestrator", pct: 35 },
              { agent: "workcover-legal", pct: 12 },
              { agent: "life-admin", pct: 8 },
            ].map(({ agent, pct }) => (
              <div key={agent} className="flex items-center gap-3 text-xs">
                <AgentBadge agentId={agent} />
                <div className="flex-1 h-1 bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${pct}%`, background: AGENT[agent]?.dot }} />
                </div>
                <span className="font-mono text-zinc-500 w-8 text-right">{pct}%</span>
              </div>
            ))}
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-display text-zinc-200 text-sm font-medium">Anthropic API key</div>
                <div className="font-mono text-xs text-zinc-600 mt-0.5">Agents won't respond without a valid key</div>
              </div>
              {apiKeySaved && <span className="font-mono text-xs text-emerald-400">✓ Key updated</span>}
            </div>
            <div className="flex gap-2">
              <input
                type="password"
                value={newApiKey}
                onChange={e => { setNewApiKey(e.target.value); setApiKeyError(""); }}
                onKeyDown={e => e.key === 'Enter' && saveApiKey()}
                placeholder="Paste new sk-ant-… key"
                className={`flex-1 bg-zinc-950 border rounded-lg px-3 py-2 text-sm text-zinc-300 font-mono placeholder-zinc-700 outline-none focus:border-zinc-500 ${
                  apiKeyError ? 'border-red-500/50' : 'border-zinc-700'
                }`}
              />
              <button
                onClick={saveApiKey}
                disabled={apiKeySaving || !newApiKey.trim()}
                className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {apiKeySaving ? '…' : 'Save'}
              </button>
            </div>
            {apiKeyError && <div className="font-mono text-xs text-red-400">{apiKeyError}</div>}
            <div className="text-xs text-zinc-700">Key is sent to your backend server and stored locally. Not transmitted to Anthropic until an agent is activated.</div>
          </div>
        </div>
      )}

      {/* Data tab */}
      {activeTab === "data" && (
        <div className="space-y-3 slide-in">
          <div className="text-sm text-zinc-400">Your data belongs to you. All agent state, journal entries, and conversation history are exportable at any time.</div>
          {[
            { label: "Export agent state", desc: "JSON — all domains, capacity, wins, disputes", icon: "↓" },
            { label: "Export journal", desc: "JSON — all entries and flags", icon: "↓" },
            { label: "Export conversation history", desc: "JSON — all session transcripts", icon: "↓" },
          ].map(({ label, desc, icon }) => (
            <button key={label} className="w-full flex items-center justify-between p-3 bg-zinc-900 border border-zinc-800 rounded-lg hover:border-zinc-700 transition-colors text-left">
              <div>
                <div className="font-display text-sm text-zinc-200 font-medium">{label}</div>
                <div className="font-mono text-xs text-zinc-500 mt-0.5">{desc}</div>
              </div>
              <span className="text-zinc-500">{icon}</span>
            </button>
          ))}
          <div className="text-xs text-zinc-700 pt-2">Data stored encrypted at rest. Privacy tier A (health, financial, legal) encrypted with user key derivation.</div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// NAVIGATION & ROOT
// ============================================================================
const NAV_ITEMS = [
  { id: "brief",   label: "Brief",    icon: "◈" },
  { id: "chat",    label: "Chat",     icon: "◎" },
  { id: "onboard", label: "Setup",    icon: "◇" },
  { id: "dash",    label: "Overview", icon: "▦" },
  { id: "settings",label: "Settings", icon: "⊞" },
];

const SESSION_TOKEN_KEY = 'lifeos_server_token';
// THEME_KEY and THEME_LABELS are defined earlier (near API_BASE)

export default function App() {
  const [screen, setScreen] = useState(() => {
    try { return sessionStorage.getItem(SESSION_TOKEN_KEY) ? "brief" : "onboard"; }
    catch { return "onboard"; }
  });
  const [tokenUsed] = useState(1420000);
  const [tokenTotal] = useState(6000000);
  const [apiToken, setApiToken] = useState(() => {
    try { return sessionStorage.getItem(SESSION_TOKEN_KEY) || ""; }
    catch { return ""; }
  });
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem(THEME_KEY) || 'b'; }
    catch { return 'b'; }
  });
  const [showThemePicker, setShowThemePicker] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem(THEME_KEY, theme); } catch {}
  }, [theme]);

  function persistToken(token) {
    setApiToken(token);
    try { sessionStorage.setItem(SESSION_TOKEN_KEY, token); } catch {}
  }

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: "var(--lo-bg)", minHeight: "100vh", color: "var(--lo-text)", transition: "background 0.2s, color 0.2s" }}>
      <FontStyle />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      {/* Top bar */}
      <div style={{ background: "var(--lo-surface)", borderBottom: "1px solid var(--lo-border)", position: "sticky", top: 0, zIndex: 50, transition: "background 0.2s, border-color 0.2s" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 16px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 48 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span className="font-display" style={{ fontSize: 14, fontWeight: 700, color: "var(--lo-text)", letterSpacing: "-0.02em" }}>LifeOS</span>
            <span className="font-mono" style={{ fontSize: 10, color: "var(--lo-text-hint)", borderLeft: "1px solid var(--lo-border-alt)", paddingLeft: 12 }}>v4.0 · trial</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <TokenPoolBar used={tokenUsed} total={tokenTotal} compact />
            {/* Theme switcher */}
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setShowThemePicker(p => !p)}
                title={`Theme: ${THEME_LABELS[theme]}`}
                style={{
                  display: "flex", alignItems: "center", gap: 5, padding: "4px 8px",
                  background: "var(--lo-card)", border: "1px solid var(--lo-border)",
                  borderRadius: 6, cursor: "pointer", color: "var(--lo-text-muted)",
                  fontSize: 10, fontFamily: "var(--font-mono)", letterSpacing: "0.04em",
                  transition: "border-color 0.15s",
                }}
              >
                <span style={{ color: "var(--lo-accent)", fontSize: 8 }}>◆</span>
                {theme.toUpperCase()}
              </button>
              {showThemePicker && (
                <div style={{
                  position: "absolute", right: 0, top: "calc(100% + 8px)",
                  background: "var(--lo-surface)", border: "1px solid var(--lo-border)",
                  borderRadius: 10, padding: 6, display: "flex", flexDirection: "column", gap: 2, zIndex: 100,
                  minWidth: 110, boxShadow: "0 4px 24px rgba(0,0,0,0.25)",
                }}>
                  {["a","b","c"].map(t => (
                    <button
                      key={t}
                      onClick={() => { setTheme(t); setShowThemePicker(false); }}
                      style={{
                        display: "flex", alignItems: "center", gap: 8, padding: "6px 10px",
                        borderRadius: 6, border: "none", cursor: "pointer", textAlign: "left",
                        background: theme === t ? "var(--lo-accent-dim)" : "transparent",
                        color: theme === t ? "var(--lo-accent)" : "var(--lo-text-muted)",
                        fontSize: 12, fontFamily: "var(--font-body)",
                        transition: "background 0.1s, color 0.1s",
                      }}
                    >
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, fontWeight: 500 }}>{t.toUpperCase()}</span>
                      <span>{THEME_LABELS[t]}</span>
                      {theme === t && <span style={{ marginLeft: "auto", fontSize: 8 }}>✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "24px 16px 80px" }}>
        {screen === "brief"    && <DailyBrief tokenUsed={tokenUsed} tokenTotal={tokenTotal} apiToken={apiToken} onUnauthorized={() => setScreen("onboard")} />}
        {screen === "chat"     && <Conversation tokenUsed={tokenUsed} tokenTotal={tokenTotal} apiToken={apiToken} onUnauthorized={() => setScreen("onboard")} />}
        {screen === "onboard"  && <OnboardingWizard theme={theme} setTheme={setTheme} onComplete={(token, _anthropicKey, _customAgents) => { persistToken(token); setScreen("brief"); }} />}
        {screen === "dash"     && <Dashboard tokenUsed={tokenUsed} tokenTotal={tokenTotal} />}
        {screen === "settings" && <Settings tokenUsed={tokenUsed} tokenTotal={tokenTotal} apiToken={apiToken} onTokenUpdate={token => persistToken(token)} onApiKeyUpdate={() => {}} />}
      </div>

      {/* Bottom nav */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "var(--lo-surface)", borderTop: "1px solid var(--lo-border)", zIndex: 50, transition: "background 0.2s, border-color 0.2s" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", display: "flex" }}>
          {NAV_ITEMS.map(({ id, label, icon }) => (
            <button
              key={id}
              onClick={() => setScreen(id)}
              style={{
                flex: 1, display: "flex", flexDirection: "column", alignItems: "center",
                padding: "10px 0", gap: 3, border: "none", background: "transparent",
                cursor: "pointer", color: screen === id ? "var(--lo-accent)" : "var(--lo-text-hint)",
                borderTop: `2px solid ${screen === id ? "var(--lo-accent)" : "transparent"}`,
                transition: "color 0.15s, border-color 0.15s",
              }}
            >
              <span style={{ fontSize: 16, fontFamily: "system-ui" }}>{icon}</span>
              <span style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.02em" }}>{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
