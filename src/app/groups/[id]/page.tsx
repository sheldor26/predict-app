"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { PredictionCategory, CATEGORY_LABELS } from "@/lib/types";

export default function GroupPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { user, groups, getPredictionsForGroup, createPrediction, vote, resolve } = useApp();

  const group = groups.find((g) => g.id === id);
  const predictions = getPredictionsForGroup(id);

  const [tab, setTab] = useState<"feed" | "leaderboard">("feed");
  const [showNewPrediction, setShowNewPrediction] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");
  const [newDeadline, setNewDeadline] = useState("");
  const [newCategory, setNewCategory] = useState<PredictionCategory>("personal");

  if (!group) {
    return (
      <main className="flex flex-col min-h-screen items-center justify-center" style={{ background: "#0a0a0f" }}>
        <p style={{ color: "#6b7280" }}>Grupo no encontrado.</p>
        <Link href="/groups" className="mt-4 text-sm" style={{ color: "#a78bfa" }}>
          ← Volver a grupos
        </Link>
      </main>
    );
  }

  const pending = predictions.filter((p) => !p.resolved && p.my_vote === null).length;
  const leaderboard = [...group.members].sort((a, b) => b.score_in_group - a.score_in_group);

  function handleCreate() {
    if (!newQuestion.trim()) return;
    createPrediction(id, newQuestion.trim(), newCategory, newDeadline || "Mañana");
    setNewQuestion("");
    setNewDeadline("");
    setNewCategory("personal");
    setShowNewPrediction(false);
  }

  return (
    <main className="flex flex-col min-h-screen" style={{ background: "#0a0a0f" }}>
      {/* Header */}
      <div
        className="px-6 py-4"
        style={{
          background: "linear-gradient(135deg, #1a0533 0%, #0d1b2a 100%)",
          borderBottom: "1px solid rgba(139, 92, 246, 0.15)",
        }}
      >
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <Link href="/groups" className="text-sm" style={{ color: "#6b7280" }}>
            ← Grupos
          </Link>
          <div className="flex-1">
            <div className="font-bold" style={{ color: "#f3f4f6" }}>
              {group.name}
            </div>
            <div className="text-xs" style={{ color: "#6b7280" }}>
              {group.members.length} miembros
              {pending > 0 && (
                <span
                  className="ml-2 px-1.5 py-0.5 rounded font-semibold"
                  style={{ background: "rgba(251, 146, 60, 0.2)", color: "#fb923c" }}
                >
                  {pending} sin votar
                </span>
              )}
            </div>
          </div>
          <button
            onClick={() => setShowNewPrediction(true)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium"
            style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)", color: "white" }}
          >
            + Predecir
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div
        className="px-6"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(10,10,15,0.95)" }}
      >
        <div className="max-w-2xl mx-auto flex gap-1 py-2">
          {(["feed", "leaderboard"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="px-4 py-1.5 rounded-lg text-sm font-medium transition-all"
              style={{
                background: tab === t ? "rgba(139, 92, 246, 0.2)" : "transparent",
                border: tab === t ? "1px solid rgba(139, 92, 246, 0.4)" : "1px solid transparent",
                color: tab === t ? "#c4b5fd" : "#6b7280",
              }}
            >
              {t === "feed" ? "📋 Predicciones" : "🏆 Ranking"}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 px-6 py-4 max-w-2xl mx-auto w-full">
        {/* Nueva predicción */}
        {showNewPrediction && (
          <div
            className="rounded-xl p-4 mb-4"
            style={{ background: "rgba(139, 92, 246, 0.08)", border: "1px solid rgba(139, 92, 246, 0.2)" }}
          >
            <h3 className="text-sm font-semibold mb-3" style={{ color: "#c4b5fd" }}>
              Nueva predicción
            </h3>
            <input
              type="text"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              placeholder="¿Qué vas a predecir?"
              autoFocus
              className="w-full px-3 py-2 rounded-lg text-sm outline-none mb-2"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "#e8e8ed",
              }}
            />
            <div className="flex gap-2 mb-2">
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as PredictionCategory)}
                className="flex-1 px-3 py-2 rounded-lg text-sm outline-none"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "#e8e8ed",
                }}
              >
                {(Object.entries(CATEGORY_LABELS) as [PredictionCategory, string][]).map(([val, label]) => (
                  <option key={val} value={val} style={{ background: "#1a0533" }}>
                    {label}
                  </option>
                ))}
              </select>
              <input
                type="text"
                value={newDeadline}
                onChange={(e) => setNewDeadline(e.target.value)}
                placeholder="Deadline (ej: Vie 20:00)"
                className="flex-1 px-3 py-2 rounded-lg text-sm outline-none"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "#e8e8ed",
                }}
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleCreate}
                className="flex-1 py-2 rounded-lg text-sm font-medium"
                style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)", color: "white" }}
              >
                Publicar
              </button>
              <button
                onClick={() => setShowNewPrediction(false)}
                className="px-4 py-2 rounded-lg text-sm"
                style={{ background: "rgba(255,255,255,0.05)", color: "#6b7280" }}
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        {/* Feed */}
        {tab === "feed" && (
          <div className="flex flex-col gap-3">
            {predictions.length === 0 && (
              <div className="text-center py-16" style={{ color: "#4b5563" }}>
                <div className="text-4xl mb-3">🔮</div>
                <p className="text-sm">No hay predicciones todavía.</p>
                <p className="text-sm">¡Sé el primero en predecir algo!</p>
              </div>
            )}
            {predictions.map((p) => {
              const total = p.votes.yes + p.votes.no;
              const yesPercent = total > 0 ? Math.round((p.votes.yes / total) * 100) : 50;
              const isCreator = p.created_by === user.id;

              return (
                <div
                  key={p.id}
                  className="rounded-xl p-4"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: p.resolved
                      ? "1px solid rgba(255,255,255,0.04)"
                      : p.my_vote
                      ? "1px solid rgba(139, 92, 246, 0.2)"
                      : "1px solid rgba(255,255,255,0.06)",
                    opacity: p.resolved ? 0.75 : 1,
                  }}
                >
                  {/* Top row */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex-1">
                      <div className="text-xs mb-1" style={{ color: "#6b7280" }}>
                        {CATEGORY_LABELS[p.category]} · {p.deadline}
                      </div>
                      <div className="text-sm font-medium leading-snug" style={{ color: "#e8e8ed" }}>
                        {p.question}
                      </div>
                    </div>
                    {p.resolved && (
                      <div
                        className="text-xs font-semibold px-2 py-1 rounded-full flex-shrink-0"
                        style={{
                          background:
                            p.my_vote === p.correct_answer
                              ? "rgba(34, 197, 94, 0.15)"
                              : "rgba(239, 68, 68, 0.15)",
                          color: p.my_vote === p.correct_answer ? "#4ade80" : "#f87171",
                        }}
                      >
                        {p.my_vote === p.correct_answer ? "✓ +10 pts" : "✗ Miss"}
                      </div>
                    )}
                  </div>

                  {/* Barra */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${yesPercent}%`, background: "linear-gradient(90deg, #7c3aed, #a855f7)" }}
                      />
                    </div>
                    <div className="text-xs" style={{ color: "#6b7280" }}>
                      {total} votos
                    </div>
                  </div>

                  {/* Botones voto */}
                  {!p.resolved && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => vote(p.id, "yes")}
                        className="flex-1 py-2 rounded-lg text-sm font-medium transition-all"
                        style={{
                          background: p.my_vote === "yes" ? "rgba(139, 92, 246, 0.3)" : "rgba(255,255,255,0.04)",
                          border: p.my_vote === "yes" ? "1px solid rgba(139, 92, 246, 0.5)" : "1px solid rgba(255,255,255,0.06)",
                          color: p.my_vote === "yes" ? "#c4b5fd" : "#9ca3af",
                        }}
                      >
                        Sí {p.my_vote === "yes" ? "✓" : ""} · {p.votes.yes}
                      </button>
                      <button
                        onClick={() => vote(p.id, "no")}
                        className="flex-1 py-2 rounded-lg text-sm font-medium transition-all"
                        style={{
                          background: p.my_vote === "no" ? "rgba(139, 92, 246, 0.3)" : "rgba(255,255,255,0.04)",
                          border: p.my_vote === "no" ? "1px solid rgba(139, 92, 246, 0.5)" : "1px solid rgba(255,255,255,0.06)",
                          color: p.my_vote === "no" ? "#c4b5fd" : "#9ca3af",
                        }}
                      >
                        No {p.my_vote === "no" ? "✓" : ""} · {p.votes.no}
                      </button>
                      {isCreator && (
                        <div className="flex gap-1">
                          <button
                            onClick={() => resolve(p.id, "yes")}
                            className="px-3 py-2 rounded-lg text-xs font-medium"
                            style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)", color: "#4ade80" }}
                          >
                            ✓ Sí
                          </button>
                          <button
                            onClick={() => resolve(p.id, "no")}
                            className="px-3 py-2 rounded-lg text-xs font-medium"
                            style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#f87171" }}
                          >
                            ✗ No
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {p.resolved && (
                    <div className="text-xs" style={{ color: "#4b5563" }}>
                      Resultado: {p.correct_answer === "yes" ? "Sí" : "No"} · {total} votos totales
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Leaderboard */}
        {tab === "leaderboard" && (
          <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
            {leaderboard.map((m, i) => (
              <div
                key={m.user_id}
                className="flex items-center gap-4 px-5 py-4"
                style={{
                  background: m.user_id === user.id
                    ? "rgba(139, 92, 246, 0.1)"
                    : i === 0
                    ? "rgba(139, 92, 246, 0.05)"
                    : "rgba(255,255,255,0.02)",
                  borderBottom: i < leaderboard.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                  border: m.user_id === user.id ? "1px solid rgba(139, 92, 246, 0.2)" : undefined,
                }}
              >
                <div
                  className="text-base font-black w-6 text-center"
                  style={{ color: i === 0 ? "#a78bfa" : "#4b5563" }}
                >
                  {i + 1}
                </div>
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)", color: "white" }}
                >
                  {m.avatar}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold flex items-center gap-2" style={{ color: "#f3f4f6" }}>
                    {m.username}
                    {m.user_id === user.id && (
                      <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: "rgba(139, 92, 246, 0.2)", color: "#c4b5fd" }}>
                        vos
                      </span>
                    )}
                  </div>
                  <div className="text-xs" style={{ color: "#6b7280" }}>
                    {m.rank}{m.streak > 0 ? ` · 🔥 ${m.streak} racha` : ""}
                  </div>
                </div>
                <div className="text-sm font-bold" style={{ color: "#a78bfa" }}>
                  {m.score_in_group.toLocaleString()} pts
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
