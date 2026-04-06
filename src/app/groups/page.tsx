"use client";

import { useState } from "react";
import Link from "next/link";

const mockGroups = [
  { id: "1", name: "Los del laburo", members: 8, myScore: 1240, myRank: 2, pending: 3 },
  { id: "2", name: "Fútbol friends", members: 12, myScore: 890, myRank: 5, pending: 1 },
  { id: "3", name: "Familia", members: 5, myScore: 320, myRank: 1, pending: 0 },
];

export default function GroupsPage() {
  const [showCreate, setShowCreate] = useState(false);
  const [showJoin, setShowJoin] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [inviteCode, setInviteCode] = useState("");

  return (
    <main className="flex flex-col min-h-screen" style={{ background: "#0a0a0f" }}>
      {/* Header */}
      <div
        className="px-6 py-5"
        style={{
          background: "linear-gradient(135deg, #1a0533 0%, #0d1b2a 100%)",
          borderBottom: "1px solid rgba(139, 92, 246, 0.15)",
        }}
      >
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl">🎰</span>
            <span
              className="text-lg font-black"
              style={{
                background: "linear-gradient(90deg, #a78bfa, #f472b6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Predict
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
              style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)", color: "white" }}
            >
              J
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 px-6 py-6 max-w-2xl mx-auto w-full">
        {/* Título + acciones */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold" style={{ color: "#f3f4f6" }}>
            Mis grupos
          </h1>
          <div className="flex gap-2">
            <button
              onClick={() => { setShowJoin(true); setShowCreate(false); }}
              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "#9ca3af",
              }}
            >
              Unirse
            </button>
            <button
              onClick={() => { setShowCreate(true); setShowJoin(false); }}
              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
              style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)", color: "white" }}
            >
              + Crear grupo
            </button>
          </div>
        </div>

        {/* Crear grupo */}
        {showCreate && (
          <div
            className="rounded-xl p-5 mb-4"
            style={{ background: "rgba(139, 92, 246, 0.08)", border: "1px solid rgba(139, 92, 246, 0.2)" }}
          >
            <h3 className="text-sm font-semibold mb-3" style={{ color: "#c4b5fd" }}>
              Nuevo grupo
            </h3>
            <div className="flex gap-2">
              <input
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder="Nombre del grupo"
                className="flex-1 px-3 py-2 rounded-lg text-sm outline-none"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "#e8e8ed",
                }}
              />
              <button
                className="px-4 py-2 rounded-lg text-sm font-medium"
                style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)", color: "white" }}
                onClick={() => { setShowCreate(false); setGroupName(""); }}
              >
                Crear
              </button>
            </div>
          </div>
        )}

        {/* Unirse a grupo */}
        {showJoin && (
          <div
            className="rounded-xl p-5 mb-4"
            style={{ background: "rgba(139, 92, 246, 0.08)", border: "1px solid rgba(139, 92, 246, 0.2)" }}
          >
            <h3 className="text-sm font-semibold mb-3" style={{ color: "#c4b5fd" }}>
              Unirse con código
            </h3>
            <div className="flex gap-2">
              <input
                type="text"
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                placeholder="CÓDIGO"
                maxLength={8}
                className="flex-1 px-3 py-2 rounded-lg text-sm outline-none font-mono tracking-widest"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "#e8e8ed",
                }}
              />
              <button
                className="px-4 py-2 rounded-lg text-sm font-medium"
                style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)", color: "white" }}
                onClick={() => { setShowJoin(false); setInviteCode(""); }}
              >
                Unirse
              </button>
            </div>
          </div>
        )}

        {/* Lista de grupos */}
        <div className="flex flex-col gap-3">
          {mockGroups.map((g) => (
            <Link
              key={g.id}
              href={`/groups/${g.id}`}
              className="rounded-xl p-4 flex items-center gap-4 transition-all"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
                textDecoration: "none",
              }}
            >
              {/* Avatar */}
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center text-lg font-bold flex-shrink-0"
                style={{ background: "rgba(139, 92, 246, 0.15)", color: "#a78bfa" }}
              >
                {g.name.charAt(0)}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm" style={{ color: "#f3f4f6" }}>
                  {g.name}
                </div>
                <div className="text-xs mt-0.5" style={{ color: "#6b7280" }}>
                  {g.members} miembros · #{g.myRank} en ranking
                </div>
              </div>

              {/* Score + pending */}
              <div className="flex flex-col items-end gap-1 flex-shrink-0">
                <div className="text-sm font-bold" style={{ color: "#a78bfa" }}>
                  {g.myScore.toLocaleString()} pts
                </div>
                {g.pending > 0 && (
                  <div
                    className="text-xs font-semibold px-2 py-0.5 rounded-full"
                    style={{ background: "rgba(251, 146, 60, 0.2)", color: "#fb923c" }}
                  >
                    {g.pending} pendiente{g.pending > 1 ? "s" : ""}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>

        {mockGroups.length === 0 && (
          <div className="text-center py-16" style={{ color: "#4b5563" }}>
            <div className="text-4xl mb-3">👥</div>
            <p className="text-sm">No estás en ningún grupo todavía.</p>
            <p className="text-sm">Creá uno o unite con un código.</p>
          </div>
        )}
      </div>
    </main>
  );
}
