import React, { useState } from "react";
import NavBar from "../components/NavBar.jsx";
import SkillTag from "../components/SkillTag.jsx";
import Avatar from "../components/Avatar.jsx";
import Modal from "../components/Modal.jsx";
import {
  civicActions,
  programs,
  peers,
  skillProgress,
  skillColors,
} from "../data.js";

export default function HomeFeed({ userPrefs }) {
  const city = userPrefs?.location || "Phoenix, AZ";
  const [actionModal, setActionModal] = useState(null);
  const [peerModal, setPeerModal] = useState(null);
  const [programModal, setProgramModal] = useState(null);

  const featuredActions = civicActions.slice(0, 3);
  const suggestedPeers = peers.slice(0, 3);

  return (
    <div
      className="min-h-screen page-enter"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <NavBar />

      <div className="max-w-7xl mx-auto px-8 py-10">
        {/* Greeting */}
        <div className="mb-8">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-1"
            style={{
              color: "#C8942E",
              fontFamily: '"Source Sans 3", system-ui, sans-serif',
            }}
          >
            Personalized for you
          </p>
          <h1 className="font-serif text-4xl" style={{ color: "#1A1A1A" }}>
            Your civic actions in {city}
          </h1>
          <p
            className="mt-2 text-base"
            style={{
              color: "#6B7280",
              fontFamily: '"Source Sans 3", system-ui, sans-serif',
            }}
          >
            Recommended based on your interests — updated weekly.
          </p>
        </div>

        {/* Main + Sidebar layout */}
        <div className="flex gap-8">
          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Action cards row */}
            <div className="grid grid-cols-3 gap-5 mb-12">
              {featuredActions.map((action, i) => (
                <ActionCard
                  key={action.id}
                  action={action}
                  onClick={() => setActionModal(action)}
                  delay={i * 60}
                />
              ))}
            </div>

            {/* Civic Skills */}
            <div
              className="rounded-xl p-8 mb-8"
              style={{
                backgroundColor: "#FAF7F2",
                border: "1px solid #E8E4DF",
              }}
            >
              <h2
                className="font-serif text-2xl mb-1"
                style={{ color: "#1A1A1A" }}
              >
                Your Civic Skills
              </h2>
              <p
                className="text-sm mb-6"
                style={{
                  color: "#6B7280",
                  fontFamily: '"Source Sans 3", system-ui, sans-serif',
                }}
              >
                Skills earned through actions, projects, and programs.
              </p>
              <div className="flex flex-col gap-5">
                {skillProgress.map((s) => (
                  <SkillBar
                    key={s.skill}
                    skill={s.skill}
                    percent={s.percent}
                    color={s.color}
                  />
                ))}
              </div>
            </div>

            {/* Programs */}
            <div id="programs-section">
              <h2
                className="font-serif text-2xl mb-1"
                style={{ color: "#1A1A1A" }}
              >
                Programs for You
              </h2>
              <p
                className="text-sm mb-5"
                style={{
                  color: "#6B7280",
                  fontFamily: '"Source Sans 3", system-ui, sans-serif',
                }}
              >
                Longer-term opportunities that match your interests and skill
                level.
              </p>
              <div className="grid grid-cols-2 gap-5">
                {programs.map((prog) => (
                  <ProgramCard
                    key={prog.id}
                    program={prog}
                    onClick={() => setProgramModal(prog)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-72 flex-shrink-0">
            {/* Suggested Peers */}
            <div
              className="rounded-xl p-6 mb-6"
              style={{
                border: "1px solid #E8E4DF",
                backgroundColor: "#FFFFFF",
              }}
            >
              <h3
                className="font-semibold text-base mb-4"
                style={{
                  color: "#1A1A1A",
                  fontFamily: '"Source Sans 3", system-ui, sans-serif',
                }}
              >
                Suggested Peers
              </h3>
              <div className="flex flex-col gap-4">
                {suggestedPeers.map((peer, i) => (
                  <SidebarPeerCard
                    key={peer.id}
                    peer={peer}
                    index={i}
                    onClick={() => setPeerModal(peer)}
                  />
                ))}
              </div>
              <button
                onClick={() => (window.location.href = "/youth/peers")}
                className="w-full mt-4 py-2 text-sm font-semibold rounded-lg"
                style={{
                  border: "1px solid #C8942E",
                  color: "#C8942E",
                  backgroundColor: "transparent",
                  fontFamily: '"Source Sans 3", system-ui, sans-serif',
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "rgba(200,148,46,0.06)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                Find More Peers →
              </button>
            </div>

            {/* Quick stats */}
            <div
              className="rounded-xl p-6"
              style={{
                backgroundColor: "#FAF7F2",
                border: "1px solid #E8E4DF",
              }}
            >
              <h3
                className="font-semibold text-base mb-4"
                style={{
                  color: "#1A1A1A",
                  fontFamily: '"Source Sans 3", system-ui, sans-serif',
                }}
              >
                Your Activity
              </h3>
              <div className="flex flex-col gap-3">
                {[
                  { label: "Actions completed", value: "3" },
                  { label: "Skills in progress", value: "3" },
                  { label: "Peers connected", value: "7" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="flex justify-between items-center"
                  >
                    <span
                      className="text-sm"
                      style={{
                        color: "#6B7280",
                        fontFamily: '"Source Sans 3", system-ui, sans-serif',
                      }}
                    >
                      {stat.label}
                    </span>
                    <span
                      className="text-base font-bold"
                      style={{
                        color: "#1A1A1A",
                        fontFamily: '"Source Sans 3", system-ui, sans-serif',
                      }}
                    >
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {actionModal && (
        <Modal onClose={() => setActionModal(null)}>
          <ActionModal action={actionModal} />
        </Modal>
      )}
      {peerModal && (
        <Modal onClose={() => setPeerModal(null)}>
          <PeerModal
            peer={peerModal}
            index={peers.findIndex((p) => p.id === peerModal.id)}
          />
        </Modal>
      )}
      {programModal && (
        <Modal onClose={() => setProgramModal(null)}>
          <ProgramModal program={programModal} />
        </Modal>
      )}
    </div>
  );
}

function ActionCard({ action, onClick, delay }) {
  const colors = skillColors[action.skill] || {
    text: "#6B7280",
    bgLight: "rgba(107,114,128,0.12)",
  };

  return (
    <button
      onClick={onClick}
      className="text-left rounded-xl p-6 group"
      style={{
        border: "1px solid #E8E4DF",
        backgroundColor: "#FFFFFF",
        cursor: "pointer",
        display: "block",
        width: "100%",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.08)";
        e.currentTarget.style.borderColor = "#D4A843";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.borderColor = "#E8E4DF";
      }}
    >
      <div className="mb-3">
        <SkillTag skill={action.skill} />
      </div>
      <h3
        className="font-semibold text-base leading-snug mb-2"
        style={{
          color: "#1A1A1A",
          fontFamily: '"Source Sans 3", system-ui, sans-serif',
        }}
      >
        {action.title}
      </h3>
      <p
        className="text-sm leading-relaxed mb-4"
        style={{
          color: "#6B7280",
          fontFamily: '"Source Sans 3", system-ui, sans-serif',
        }}
      >
        {action.description}
      </p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="text-xs" style={{ color: "#9CA3AF" }}>
            📍
          </span>
          <span
            className="text-xs font-semibold"
            style={{
              color: "#9CA3AF",
              fontFamily: '"Source Sans 3", system-ui, sans-serif',
            }}
          >
            {action.location}
          </span>
        </div>
        <span
          className="text-xs font-semibold"
          style={{ color: "#C8942E", fontFamily: '"Source Sans 3", system-ui, sans-serif' }}
        >
          Learn more →
        </span>
      </div>
    </button>
  );
}

function SkillBar({ skill, percent, color }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span
          className="text-sm font-semibold"
          style={{
            color: "#1A1A1A",
            fontFamily: '"Source Sans 3", system-ui, sans-serif',
          }}
        >
          {skill}
        </span>
        <span
          className="text-sm font-bold"
          style={{
            color: color,
            fontFamily: '"Source Sans 3", system-ui, sans-serif',
          }}
        >
          {percent}%
        </span>
      </div>
      <div
        className="w-full rounded-full"
        style={{ height: "8px", backgroundColor: "#E8E4DF" }}
      >
        <div
          className="h-full rounded-full"
          style={{
            width: `${percent}%`,
            backgroundColor: color,
            transition: "width 1s ease-out",
          }}
        />
      </div>
    </div>
  );
}

function SidebarPeerCard({ peer, index, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-start gap-3 text-left w-full group"
      style={{
        cursor: "pointer",
        background: "none",
        border: "none",
        padding: 0,
      }}
    >
      <Avatar name={peer.name} size={36} index={index} />
      <div className="min-w-0">
        <p
          className="text-sm font-semibold leading-tight"
          style={{
            color: "#1A1A1A",
            fontFamily: '"Source Sans 3", system-ui, sans-serif',
          }}
        >
          {peer.name}
          <span
            className="ml-1 font-normal"
            style={{ color: "#9CA3AF", fontSize: "12px" }}
          >
            · {peer.location}
          </span>
        </p>
        <p
          className="text-xs mt-0.5 leading-tight"
          style={{
            color: "#6B7280",
            fontFamily: '"Source Sans 3", system-ui, sans-serif',
          }}
        >
          {peer.project}
        </p>
      </div>
    </button>
  );
}

function ProgramCard({ program, onClick }) {
  const statusColor =
    program.status === "Applications Open" ? "#4A7C59" : "#C8942E";
  const statusBg =
    program.status === "Applications Open"
      ? "rgba(74,124,89,0.1)"
      : "rgba(200,148,46,0.1)";

  return (
    <div
      className="rounded-xl p-6"
      style={{ border: "1px solid #E8E4DF", backgroundColor: "#FFFFFF" }}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3
          className="font-semibold text-base leading-snug"
          style={{
            color: "#1A1A1A",
            fontFamily: '"Source Sans 3", system-ui, sans-serif',
          }}
        >
          {program.name}
        </h3>
        <span
          className="flex-shrink-0 text-xs font-semibold"
          style={{
            color: statusColor,
            backgroundColor: statusBg,
            borderRadius: "999px",
            padding: "3px 10px",
            fontSize: "11px",
            fontFamily: '"Source Sans 3", system-ui, sans-serif',
          }}
        >
          {program.status}
        </span>
      </div>
      <p
        className="text-sm leading-relaxed mb-4"
        style={{
          color: "#6B7280",
          fontFamily: '"Source Sans 3", system-ui, sans-serif',
        }}
      >
        {program.description}
      </p>
      <div className="flex items-center justify-between">
        <span
          className="text-xs"
          style={{
            color: "#9CA3AF",
            fontFamily: '"Source Sans 3", system-ui, sans-serif',
          }}
        >
          Deadline: {program.deadline}
        </span>
        <button
          onClick={onClick}
          className="text-sm font-semibold"
          style={{
            color: "#C8942E",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontFamily: '"Source Sans 3", system-ui, sans-serif',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#D4A843";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#C8942E";
          }}
        >
          Learn More →
        </button>
      </div>
    </div>
  );
}

// Modal content components

function ActionModal({ action }) {
  return (
    <div>
      <div className="mb-4">
        <SkillTag skill={action.skill} />
      </div>
      <h2 className="font-serif text-3xl mb-1" style={{ color: "#1A1A1A" }}>
        {action.title}
      </h2>
      <p
        className="text-sm mb-6"
        style={{
          color: "#9CA3AF",
          fontFamily: '"Source Sans 3", system-ui, sans-serif',
        }}
      >
        📍 {action.location}
      </p>
      <p
        className="text-base leading-relaxed mb-6"
        style={{
          color: "#3D3025",
          fontFamily: '"Source Sans 3", system-ui, sans-serif',
        }}
      >
        {action.detail}
      </p>
      <div
        className="flex gap-4 mb-6"
        style={{ borderTop: "1px solid #E8E4DF", paddingTop: "20px" }}
      >
        {action.commitment && (
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-1"
              style={{
                color: "#9CA3AF",
                fontFamily: '"Source Sans 3", system-ui, sans-serif',
              }}
            >
              Time commitment
            </p>
            <p
              className="text-sm font-semibold"
              style={{
                color: "#1A1A1A",
                fontFamily: '"Source Sans 3", system-ui, sans-serif',
              }}
            >
              {action.commitment}
            </p>
          </div>
        )}
        {action.format && (
          <div style={{ borderLeft: "1px solid #E8E4DF", paddingLeft: "16px" }}>
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-1"
              style={{
                color: "#9CA3AF",
                fontFamily: '"Source Sans 3", system-ui, sans-serif',
              }}
            >
              Format
            </p>
            <p
              className="text-sm font-semibold"
              style={{
                color: "#1A1A1A",
                fontFamily: '"Source Sans 3", system-ui, sans-serif',
              }}
            >
              {action.format}
            </p>
          </div>
        )}
      </div>
      <button
        className="w-full py-3 text-base font-semibold text-white rounded-lg"
        style={{
          backgroundColor: "#C8942E",
          fontFamily: '"Source Sans 3", system-ui, sans-serif',
          cursor: "pointer",
          border: "none",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#D4A843";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#C8942E";
        }}
      >
        Add to My Civic Portfolio
      </button>
    </div>
  );
}

function PeerModal({ peer, index }) {
  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Avatar name={peer.name} size={56} index={index} />
        <div>
          <h2 className="font-serif text-2xl" style={{ color: "#1A1A1A" }}>
            {peer.name}
          </h2>
          <p
            className="text-sm"
            style={{
              color: "#6B7280",
              fontFamily: '"Source Sans 3", system-ui, sans-serif',
            }}
          >
            Age {peer.age} · {peer.location}
          </p>
        </div>
      </div>
      <div className="mb-4">
        <SkillTag skill={peer.skill} />
      </div>
      <h3
        className="font-semibold text-base mb-2"
        style={{
          color: "#1A1A1A",
          fontFamily: '"Source Sans 3", system-ui, sans-serif',
        }}
      >
        {peer.project}
      </h3>
      <p
        className="text-base leading-relaxed mb-6"
        style={{
          color: "#3D3025",
          fontFamily: '"Source Sans 3", system-ui, sans-serif',
        }}
      >
        {peer.bio}
      </p>
      <div className="relative">
        <button
          className="w-full py-3 text-base font-semibold rounded-lg"
          style={{
            backgroundColor: "#F3F4F6",
            color: "#9CA3AF",
            fontFamily: '"Source Sans 3", system-ui, sans-serif',
            cursor: "not-allowed",
            border: "none",
          }}
          title="Available at launch"
        >
          Connect with {peer.name.split(" ")[0]} — Available at launch
        </button>
      </div>
    </div>
  );
}

function ProgramModal({ program }) {
  const statusColor =
    program.status === "Applications Open" ? "#4A7C59" : "#C8942E";
  const statusBg =
    program.status === "Applications Open"
      ? "rgba(74,124,89,0.1)"
      : "rgba(200,148,46,0.1)";

  return (
    <div>
      <div className="flex items-start justify-between gap-4 mb-4">
        <h2 className="font-serif text-3xl" style={{ color: "#1A1A1A" }}>
          {program.name}
        </h2>
        <span
          className="flex-shrink-0 text-xs font-semibold mt-2"
          style={{
            color: statusColor,
            backgroundColor: statusBg,
            borderRadius: "999px",
            padding: "4px 12px",
            fontFamily: '"Source Sans 3", system-ui, sans-serif',
          }}
        >
          {program.status}
        </span>
      </div>
      <p
        className="text-sm mb-6"
        style={{
          color: "#9CA3AF",
          fontFamily: '"Source Sans 3", system-ui, sans-serif',
        }}
      >
        Deadline: {program.deadline}
      </p>
      <p
        className="text-base leading-relaxed mb-6"
        style={{
          color: "#3D3025",
          fontFamily: '"Source Sans 3", system-ui, sans-serif',
        }}
      >
        {program.detail}
      </p>
      <button
        className="w-full py-3 text-base font-semibold text-white rounded-lg"
        style={{
          backgroundColor: "#C8942E",
          fontFamily: '"Source Sans 3", system-ui, sans-serif',
          cursor: "pointer",
          border: "none",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#D4A843";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#C8942E";
        }}
      >
        {program.status === "Applications Open"
          ? "Start Application"
          : "Get Notified When Open"}
      </button>
    </div>
  );
}
