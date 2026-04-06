"use client";

import { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";

export default function GroupsPage() {
  const { user, groups, createGroup, joinGroup } = useApp();
  const [showCreate, setShowCreate] = useState(false);
  const [showJoin, setShowJoin] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [joinError, setJoinError] = useState("");

  const myGroups = groups.filter((g) => g.members.some((m) => m.user_id === user.id));

  function handleCreate() {
    if (!groupName.trim()) return;
    const group = createGroup(groupName.trim());
    setGroupName("");
    setShowCreate(false);
    window.location.href = `/groups/${group.id}`;
  }

  function handleJoin() {
    if (!inviteCode.trim()) return;
    const group = joinGroup(inviteCode.trim());
    if (!group) {
      setJoinError("Código inválido. Revisá y volvé a intentar.");
      return;
    }
    setInviteCode("");
    setJoinError("");
    setShowJoin(false);
    window.location.href = `/groups/${group.id}`;
  }

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
          <Link href="/profile" className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
              style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)", color: "white" }}
            >
              {user.avatar}
            </div>
          </Link>
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
                onKeyDown={(e) => e.key === "Enter" && handleCreate()}
                placeholder="Nombre del grupo"
                autoFocus
                className="flex-1 px-3 py-2 rounded-lg text-sm outline-none"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "#e8e8ed",
                }}
              />
              <button
                onClick={handleCreate}
                className="px-4 py-2 rounded-lg text-sm font-medium"
                style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)", color: "white" }}
              >
                Crear
              </button>
              <button
                onClick={() => { setShowCreate(false); setGroupName(""); }}
                className="px-3 py-2 rounded-lg text-sm"
                style={{ background: "rgba(255,255,255,0.05)", color: "#6b7280" }}
              >
                ✕
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
                onChange={(e) => { setInviteCode(e.target.value.toUpperCase()); setJoinError(""); }}
                onKeyDown={(e) => e.key === "Enter" && handleJoin()}
                placeholder="CÓDIGO"
                maxLength={10}
                autoFocus
                className="flex-1 px-3 py-2 rounded-lg text-sm outline-none font-mono tracking-widest"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "#e8e8ed",
                }}
              />
              <button
                onClick={handleJoin}
                className="px-4 py-2 rounded-lg text-sm font-medium"
                style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)", color: "white" }}
              >
                Unirse
              </button>
              <button
                onClick={() => { setShowJoin(false); setInviteCode(""); setJoinError(""); }}
                className="px-3 py-2 rounded-lg text-sm"
                style={{ background: "rgba(255,255,255,0.05)", color: "#6b7280" }}
              >
                ✕
              </button>
            </div>
            {joinError && (
              <p className="text-xs mt-2" style={{ color: "#f87171" }}>{joinError}</p>
            )}
            <p className="text-xs mt-2" style={{ color: "#4b5563" }}>
              Probá con: LABURO01 o FUTBOL22
            </p>
          </div>
        )}

        {/* Lista de grupos */}
        <div className="flex flex-col gap-3">
          {myGroups.map((g) => {
            const me = g.members.find((m) => m.user_id === user.id);
            const myRank = [...g.members]
              .sort((a, b) => b.score_in_group - a.score_in_group)
              .findIndex((m) => m.user_id === user.id) + 1;

            return (
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
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-lg font-bold flex-shrink-0"
                  style={{ background: "rgba(139, 92, 246, 0.15)", color: "#a78bfa" }}
                >
                  {g.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm" style={{ color: "#f3f4f6" }}>
                    {g.name}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: "#6b7280" }}>
                    {g.members.length} miembros · #{myRank} en ranking
                  </div>
                </div>
                <div className="text-sm font-bold flex-shrink-0" style={{ color: "#a78bfa" }}>
                  {(me?.score_in_group ?? 0).toLocaleString()} pts
                </div>
              </Link>
            );
          })}
        </div>

        {myGroups.length === 0 && (
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
