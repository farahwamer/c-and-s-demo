import { useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { allTeams } from "../data";

// ─── Brand constants ──────────────────────────────────────────────────────────
const SKILL_COLOR = {
  "Productive Conversations": { bg: "rgba(200,148,46,0.12)", text: "#C8942E" },
  "Credible Information": { bg: "rgba(42,123,136,0.12)", text: "#2A7B88" },
  Collaborating: { bg: "rgba(139,107,61,0.12)", text: "#8B6B3D" },
};

const STATUS_COLOR = {
  Active: { bg: "rgba(74,124,89,0.12)", text: "#4A7C59" },
  "Under Review": { bg: "rgba(200,148,46,0.12)", text: "#C8942E" },
  Completed: { bg: "rgba(107,114,128,0.12)", text: "#6B7280" },
};

const ALL_STATES = [
  "All",
  ...Array.from(new Set(allTeams.map((t) => t.state))).sort(),
];
const ALL_STATUSES = ["All", "Active", "Under Review", "Completed"];
const ALL_SKILLS = [
  "All",
  "Collaborating",
  "Credible Information",
  "Productive Conversations",
];

// ─── Badges ───────────────────────────────────────────────────────────────────
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

// ─── Score bar ────────────────────────────────────────────────────────────────
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

// ─── Sort icon ────────────────────────────────────────────────────────────────
function SortIcon({ column, sortCol, sortDir }) {
  if (sortCol !== column) return <span className="text-cs-border ml-1">↕</span>;
  return (
    <span className="text-cs-gold ml-1">{sortDir === "asc" ? "↑" : "↓"}</span>
  );
}

// ─── Filter select ────────────────────────────────────────────────────────────
function FilterSelect({ label, value, onChange, options }) {
  return (
    <div className="flex items-center gap-2">
      <label className="text-xs font-semibold text-cs-gray uppercase tracking-wide">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="text-sm font-medium text-cs-charcoal border border-cs-border rounded-md px-3 py-1.5 bg-white focus:outline-none focus:border-cs-gold cursor-pointer hover:border-cs-gold transition-colors"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
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

// ─── Teams page ───────────────────────────────────────────────────────────────
export default function Teams() {
  const [statusFilter, setStatusFilter] = useState("All");
  const [stateFilter, setStateFilter] = useState("All");
  const [skillFilter, setSkillFilter] = useState("All");
  const [sortCol, setSortCol] = useState(null);
  const [sortDir, setSortDir] = useState("asc");
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [tableKey, setTableKey] = useState(0);

  const applyFilter = useCallback(
    (setter) => (val) => {
      setter(val);
      setTableKey((k) => k + 1);
    },
    [],
  );

  const handleSort = (col) => {
    if (sortCol === col) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortCol(col);
      setSortDir("asc");
    }
    setTableKey((k) => k + 1);
  };

  const filtered = useMemo(() => {
    let rows = allTeams.filter((t) => {
      if (statusFilter !== "All" && t.status !== statusFilter) return false;
      if (stateFilter !== "All" && t.state !== stateFilter) return false;
      if (skillFilter !== "All" && t.civic_skill !== skillFilter) return false;
      return true;
    });
    if (sortCol) {
      rows = [...rows].sort((a, b) => {
        let av = a[sortCol],
          bv = b[sortCol];
        if (typeof av === "string") av = av.toLowerCase();
        if (typeof bv === "string") bv = bv.toLowerCase();
        if (av < bv) return sortDir === "asc" ? -1 : 1;
        if (av > bv) return sortDir === "asc" ? 1 : -1;
        return 0;
      });
    }
    return rows;
  }, [statusFilter, stateFilter, skillFilter, sortCol, sortDir]);

  const TH = ({ col, label }) => (
    <th
      className="text-left text-xs font-semibold text-cs-gray uppercase tracking-wider py-3 px-4 cursor-pointer select-none hover:text-cs-gold transition-colors"
      onClick={() => handleSort(col)}
    >
      {label}
      <SortIcon column={col} sortCol={sortCol} sortDir={sortDir} />
    </th>
  );

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-playfair text-2xl font-bold text-cs-charcoal">
          All Teams
        </h1>
        <p className="text-sm text-cs-gray mt-0.5">
          Browse and filter all {allTeams.length} teams in the cohort
        </p>
      </div>

      {/* Filterable table */}
      <div className="bg-white border border-cs-border rounded-lg shadow-card overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-cs-border">
          <p className="text-sm text-cs-gray">{filtered.length} teams shown</p>
          <div className="flex items-center gap-4">
            <FilterSelect
              label="Status"
              value={statusFilter}
              onChange={applyFilter(setStatusFilter)}
              options={ALL_STATUSES}
            />
            <FilterSelect
              label="State"
              value={stateFilter}
              onChange={applyFilter(setStateFilter)}
              options={ALL_STATES}
            />
            <FilterSelect
              label="Skill"
              value={skillFilter}
              onChange={applyFilter(setSkillFilter)}
              options={ALL_SKILLS}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full" key={tableKey}>
            <thead className="bg-cs-cream border-b border-cs-border">
              <tr>
                <TH col="team_name" label="Team Name" />
                <TH col="location" label="Location" />
                <TH col="project_title" label="Project" />
                <TH col="sdg_focus" label="SDG Focus" />
                <TH col="status" label="Status" />
                <TH col="funding_amount" label="Funding" />
                <TH col="civic_skill" label="Civic Skill" />
              </tr>
            </thead>
            <tbody className="table-fade">
              {filtered.map((team, i) => (
                <tr
                  key={team.id}
                  className={`border-b border-cs-border last:border-0 cursor-pointer transition-colors duration-150 hover:bg-amber-50 ${i % 2 === 0 ? "bg-white" : "bg-cs-cream/40"}`}
                  onClick={() => setSelectedTeam(team)}
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
                  <td className="py-3.5 px-4 text-sm text-cs-gray">
                    {team.sdg_focus}
                  </td>
                  <td className="py-3.5 px-4">
                    <StatusBadge status={team.status} />
                  </td>
                  <td className="py-3.5 px-4 text-sm font-bold text-cs-charcoal">
                    ${team.funding_amount.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4">
                    <SkillBadge skill={team.civic_skill} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="py-16 text-center text-cs-gray text-sm">
            No teams match the selected filters.
          </div>
        )}
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
