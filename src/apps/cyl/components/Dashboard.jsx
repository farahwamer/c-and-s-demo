import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { allTeams, applicationTeams } from "../data";
import { useCountUp } from "../hooks/useCountUp";
import Toast from "./Toast";

// ─── Brand constants ──────────────────────────────────────────────────────────
const SKILL_COLOR = {
  "Productive Conversations": {
    bg: "rgba(200,148,46,0.12)",
    text: "#C8942E",
    bar: "#C8942E",
  },
  "Credible Information": {
    bg: "rgba(42,123,136,0.12)",
    text: "#2A7B88",
    bar: "#2A7B88",
  },
  Collaborating: {
    bg: "rgba(139,107,61,0.12)",
    text: "#8B6B3D",
    bar: "#8B6B3D",
  },
};

const STATUS_COLOR = {
  Active: { bg: "rgba(74,124,89,0.12)", text: "#4A7C59" },
  "Under Review": { bg: "rgba(200,148,46,0.12)", text: "#C8942E" },
  Completed: { bg: "rgba(107,114,128,0.12)", text: "#6B7280" },
};

// ─── Derived analytics data ───────────────────────────────────────────────────
const SDG_DATA = (() => {
  const counts = {};
  allTeams.forEach((t) => {
    const key = t.sdg_focus.split(" & ")[0].split(",")[0].trim();
    counts[key] = (counts[key] || 0) + 1;
  });
  return Object.entries(counts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
})();

const SKILL_PROGRESS = [
  { skill: "Productive Conversations", color: "#C8942E", value: 67 },
  { skill: "Credible Information", color: "#2A7B88", value: 54 },
  { skill: "Collaborating", color: "#8B6B3D", value: 62 },
];

const SDG_COLORS = [
  "#C8942E",
  "#D4A843",
  "#2A7B88",
  "#8B6B3D",
  "#4A7C59",
  "#6B7280",
];

// ─── Metric card ─────────────────────────────────────────────────────────────
function MetricCard({
  label,
  value,
  prefix = "",
  suffix = "",
  showArrow = false,
  sub,
}) {
  const count = useCountUp(value);
  return (
    <div className="bg-white border border-cs-border rounded-lg p-6 shadow-card flex flex-col gap-1">
      <div className="flex items-start justify-between">
        <span className="text-[28px] font-bold text-cs-charcoal leading-tight">
          {prefix}
          {count.toLocaleString()}
          {suffix}
        </span>
        {showArrow && <span className="text-cs-green text-lg mt-0.5">↑</span>}
      </div>
      <span className="text-sm text-cs-gray font-medium">{label}</span>
      {sub && (
        <span className="text-xs text-cs-gold font-semibold mt-1">{sub}</span>
      )}
    </div>
  );
}

// ─── Shared badges ────────────────────────────────────────────────────────────
function SkillBadge({ skill }) {
  const c = SKILL_COLOR[skill] || { bg: "#eee", text: "#333" };
  return (
    <span
      className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full"
      style={{ backgroundColor: c.bg, color: c.text }}
    >
      {skill}
    </span>
  );
}

function StatusBadge({ status }) {
  const c = STATUS_COLOR[status] || { bg: "#eee", text: "#333" };
  return (
    <span
      className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full"
      style={{ backgroundColor: c.bg, color: c.text }}
    >
      {status}
    </span>
  );
}

// ─── Score bar (detail panel) ─────────────────────────────────────────────────
function ScoreBar({ label, value, color = "#C8942E" }) {
  const pct = Math.round((value / 5) * 100);
  return (
    <div className="mb-3">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-semibold text-cs-charcoal">{label}</span>
        <span className="text-xs font-bold" style={{ color }}>
          {value.toFixed(1)} / 5.0
        </span>
      </div>
      <div className="h-2 rounded-full bg-cs-cream overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}

// ─── Custom bar chart tooltip ─────────────────────────────────────────────────
function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-cs-border rounded-lg shadow-card px-3 py-2 text-sm">
      <p className="font-semibold text-cs-charcoal">{label}</p>
      <p className="text-cs-gold font-bold">{payload[0].value} teams</p>
    </div>
  );
}

// ─── Detail Panel ─────────────────────────────────────────────────────────────
function DetailPanel({ team, onClose }) {
  const navigate = useNavigate();
  return (
    <>
      <div className="fixed inset-0 bg-black/20 z-30" onClick={onClose} />
      <div
        className="fixed top-0 right-0 h-full w-[500px] bg-white shadow-2xl z-40 flex flex-col overflow-hidden"
        style={{ animation: "slideDetailIn 0.28s ease-out" }}
      >
        <div className="flex items-center justify-between px-7 py-5 border-b border-cs-border">
          <div>
            <h2 className="font-playfair text-xl font-bold text-cs-charcoal">
              {team.team_name}
            </h2>
            <p className="text-sm text-cs-gray mt-0.5">{team.location}</p>
          </div>
          <button
            onClick={onClose}
            className="text-cs-gray hover:text-cs-charcoal transition-colors text-xl leading-none"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-7 py-6 space-y-6">
          <div className="flex items-center gap-3 flex-wrap">
            <StatusBadge status={team.status} />
            <SkillBadge skill={team.civic_skill} />
            <span className="text-xs text-cs-gray">{team.sdg_focus}</span>
          </div>
          <div>
            <h3 className="text-xs font-semibold text-cs-gray uppercase tracking-widest mb-2">
              Project
            </h3>
            <p className="text-sm font-semibold text-cs-charcoal leading-snug">
              {team.project_title}
            </p>
          </div>
          <div>
            <h3 className="text-xs font-semibold text-cs-gray uppercase tracking-widest mb-2">
              About
            </h3>
            <p className="text-sm text-cs-charcoal leading-relaxed">
              {team.description}
            </p>
          </div>
          {Array.isArray(team.members) &&
            typeof team.members[0] === "string" && (
              <div>
                <h3 className="text-xs font-semibold text-cs-gray uppercase tracking-widest mb-2">
                  Team Members
                </h3>
                <div className="flex flex-wrap gap-2">
                  {team.members.map((m) => (
                    <span
                      key={m}
                      className="text-xs bg-cs-cream text-cs-charcoal px-2.5 py-1 rounded-full font-medium"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            )}
          {team.budget_breakdown && (
            <div>
              <h3 className="text-xs font-semibold text-cs-gray uppercase tracking-widest mb-2">
                Budget Overview
              </h3>
              <p className="text-sm text-cs-charcoal leading-relaxed">
                {team.budget_breakdown}
              </p>
            </div>
          )}
          {team.ai_scores && (
            <div className="bg-cs-cream border border-cs-border rounded-lg p-5">
              <h3 className="text-xs font-semibold text-cs-gray uppercase tracking-widest mb-4">
                AI Review Scores
              </h3>
              <ScoreBar
                label="Community Impact"
                value={team.ai_scores.community_impact}
                color="#C8942E"
              />
              <ScoreBar
                label="Feasibility"
                value={team.ai_scores.feasibility}
                color="#2A7B88"
              />
              <ScoreBar
                label="Civic Skill Alignment"
                value={team.ai_scores.civic_skill_alignment}
                color="#8B6B3D"
              />
            </div>
          )}
        </div>

        {team.status === "Under Review" && (
          <div className="px-7 py-4 border-t border-cs-border bg-cs-cream">
            <button
              onClick={() => {
                onClose();
                navigate("/cyl/applications", { state: { teamId: team.id } });
              }}
              className="text-sm font-semibold text-cs-gold hover:underline"
            >
              Open Full Application Review →
            </button>
          </div>
        )}
      </div>
      <style>{`@keyframes slideDetailIn { from { transform: translateX(100%); } to { transform: translateX(0); } }`}</style>
    </>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
export default function Dashboard() {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [toast, setToast] = useState(null);

  const pendingApplications = applicationTeams.filter(
    (t) => t.status === "Under Review",
  );

  return (
    <div className="p-8 space-y-7">
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}

      {/* ── Metric cards ── */}
      <div className="grid grid-cols-4 gap-5">
        <MetricCard
          label="Active Participants"
          value={487}
          showArrow
          sub="↑ 12% this quarter"
        />
        <MetricCard label="Teams" value={98} />
        <MetricCard label="States" value={34} />
        <MetricCard label="Total Disbursed" value={612500} prefix="$" />
      </div>

      {/* ── Analytics row ── */}
      <div className="grid grid-cols-3 gap-5">
        {/* Projects by focus area */}
        <div className="col-span-1 bg-white border border-cs-border rounded-lg shadow-card p-6">
          <h2 className="font-playfair text-base font-bold text-cs-charcoal mb-4">
            Projects by Focus Area
          </h2>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart
              data={SDG_DATA}
              margin={{ top: 0, right: 0, left: -28, bottom: 0 }}
            >
              <XAxis
                dataKey="name"
                tick={{
                  fontSize: 10,
                  fill: "#6B7280",
                  fontFamily: '"Source Sans 3", sans-serif',
                }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{
                  fontSize: 10,
                  fill: "#6B7280",
                  fontFamily: '"Source Sans 3", sans-serif',
                }}
                axisLine={false}
                tickLine={false}
                allowDecimals={false}
              />
              <Tooltip
                content={<ChartTooltip />}
                cursor={{ fill: "rgba(200,148,46,0.06)" }}
              />
              <Bar dataKey="value" radius={[3, 3, 0, 0]}>
                {SDG_DATA.map((_, i) => (
                  <Cell key={i} fill={SDG_COLORS[i % SDG_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Civic skill development */}
        <div className="col-span-1 bg-white border border-cs-border rounded-lg shadow-card p-6">
          <h2 className="font-playfair text-base font-bold text-cs-charcoal mb-1">
            Civic Skill Development
          </h2>
          <p className="text-xs text-cs-gray mb-5">
            Proficiency across active cohort
          </p>
          <div className="space-y-4">
            {SKILL_PROGRESS.map(({ skill, color, value }) => (
              <div key={skill}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-sm font-semibold text-cs-charcoal">
                    {skill}
                  </span>
                  <span className="text-sm font-bold" style={{ color }}>
                    {value}%
                  </span>
                </div>
                <div className="h-2 rounded-full bg-cs-cream overflow-hidden">
                  <div
                    className="h-full rounded-full progress-bar-fill"
                    style={{ width: `${value}%`, backgroundColor: color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Program health */}
        <div className="col-span-1 bg-white border border-cs-border rounded-lg shadow-card p-6">
          <h2 className="font-playfair text-base font-bold text-cs-charcoal mb-1">
            Program Health
          </h2>
          <p className="text-xs text-cs-gray mb-5">Q1 2026 snapshot</p>
          <div className="space-y-4">
            {[
              {
                label: "Active teams",
                value: allTeams.filter((t) => t.status === "Active").length,
                total: allTeams.length,
                color: "#4A7C59",
              },
              {
                label: "Under review",
                value: allTeams.filter((t) => t.status === "Under Review")
                  .length,
                total: allTeams.length,
                color: "#C8942E",
              },
              {
                label: "Completed projects",
                value: allTeams.filter((t) => t.status === "Completed").length,
                total: allTeams.length,
                color: "#6B7280",
              },
            ].map(({ label, value, total, color }) => (
              <div key={label}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-sm font-semibold text-cs-charcoal">
                    {label}
                  </span>
                  <span className="text-sm font-bold" style={{ color }}>
                    {value}
                  </span>
                </div>
                <div className="h-2 rounded-full bg-cs-cream overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${Math.round((value / total) * 100)}%`,
                      backgroundColor: color,
                    }}
                  />
                </div>
              </div>
            ))}
            <div className="pt-2 border-t border-cs-border mt-2">
              <div className="flex justify-between text-xs text-cs-gray">
                <span>Avg. team size</span>
                <span className="font-bold text-cs-charcoal">4.6 members</span>
              </div>
              <div className="flex justify-between text-xs text-cs-gray mt-1.5">
                <span>Avg. funding per team</span>
                <span className="font-bold text-cs-charcoal">$5,434</span>
              </div>
              <div className="flex justify-between text-xs text-cs-gray mt-1.5">
                <span>Applications pending</span>
                <span className="font-bold text-cs-gold">3 to review</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Applications to review ── */}
      <div className="bg-white border border-cs-border rounded-lg shadow-card overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-cs-border">
          <div>
            <h2 className="font-playfair text-lg font-bold text-cs-charcoal">
              Applications to Review
            </h2>
            <p className="text-xs text-cs-gray mt-0.5">
              {pendingApplications.length} pending your decision
            </p>
          </div>
          <Link
            to="/cyl/applications"
            className="text-sm font-semibold text-cs-gold hover:underline whitespace-nowrap"
          >
            Open review queue →
          </Link>
        </div>
        {pendingApplications.length === 0 ? (
          <div className="py-12 text-center text-cs-gray text-sm">
            No applications pending review.
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-cs-cream border-b border-cs-border">
              <tr>
                {[
                  "Team Name",
                  "Location",
                  "Project",
                  "Civic Skill",
                  "Avg AI Score",
                  "",
                ].map((h) => (
                  <th
                    key={h}
                    className="text-left text-xs font-semibold text-cs-gray uppercase tracking-wider py-3 px-4"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pendingApplications.map((team, i) => {
                const scores = team.ai_scores;
                const avg = scores
                  ? (
                      (scores.community_impact +
                        scores.feasibility +
                        scores.civic_skill_alignment) /
                      3
                    ).toFixed(1)
                  : null;
                return (
                  <tr
                    key={team.id}
                    className={`border-b border-cs-border last:border-0 ${i % 2 === 0 ? "bg-white" : "bg-cs-cream/40"}`}
                  >
                    <td className="py-3.5 px-4 text-sm font-semibold text-cs-charcoal">
                      {team.team_name}
                    </td>
                    <td className="py-3.5 px-4 text-sm text-cs-gray">
                      {team.location}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className="text-sm text-cs-charcoal max-w-[220px] block truncate"
                        title={team.project_title}
                      >
                        {team.project_title}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <SkillBadge skill={team.civic_skill} />
                    </td>
                    <td className="py-3.5 px-4">
                      {avg && (
                        <span
                          className="text-sm font-bold"
                          style={{
                            color: parseFloat(avg) >= 4 ? "#4A7C59" : "#C8942E",
                          }}
                        >
                          {avg} / 5.0
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        to="/cyl/applications"
                        state={{ teamId: team.id }}
                        className="text-xs font-semibold text-cs-gold hover:underline whitespace-nowrap"
                      >
                        Review →
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* ── Recent teams preview ── */}
      <div className="bg-white border border-cs-border rounded-lg shadow-card overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-cs-border">
          <div>
            <h2 className="font-playfair text-lg font-bold text-cs-charcoal">
              Recent Teams
            </h2>
            <p className="text-xs text-cs-gray mt-0.5">
              Latest additions to the cohort
            </p>
          </div>
          <Link
            to="/cyl/teams"
            className="text-sm font-semibold text-cs-gold hover:underline whitespace-nowrap"
          >
            View all {allTeams.length} teams →
          </Link>
        </div>
        <table className="w-full">
          <thead className="bg-cs-cream border-b border-cs-border">
            <tr>
              {[
                "Team Name",
                "Location",
                "Project",
                "Status",
                "Civic Skill",
              ].map((h) => (
                <th
                  key={h}
                  className="text-left text-xs font-semibold text-cs-gray uppercase tracking-wider py-3 px-4"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {allTeams.slice(0, 5).map((team, i) => (
              <tr
                key={team.id}
                onClick={() => setSelectedTeam(team)}
                className={`border-b border-cs-border last:border-0 cursor-pointer transition-colors duration-150 hover:bg-amber-50 ${i % 2 === 0 ? "bg-white" : "bg-cs-cream/40"}`}
              >
                <td className="py-3.5 px-4 text-sm font-semibold text-cs-charcoal">
                  {team.team_name}
                </td>
                <td className="py-3.5 px-4 text-sm text-cs-gray">
                  {team.location}
                </td>
                <td className="py-3.5 px-4">
                  <span
                    className="text-sm text-cs-charcoal max-w-[220px] block truncate"
                    title={team.project_title}
                  >
                    {team.project_title}
                  </span>
                </td>
                <td className="py-3.5 px-4">
                  <StatusBadge status={team.status} />
                </td>
                <td className="py-3.5 px-4">
                  <SkillBadge skill={team.civic_skill} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedTeam && (
        <DetailPanel
          team={selectedTeam}
          onClose={() => setSelectedTeam(null)}
        />
      )}
    </div>
  );
}
