"use client";

import { useState } from "react";
import Link from "next/link";

type Vote = "yes" | "no" | null;

interface Prediction {
  id: string;
  question: string;
  category: string;
  deadline: string;
  votes: { yes: number; no: number };
  resolved: boolean;
  correct_answer?: "yes" | "no";
  my_vote?: Vote;
}

const mockPredictions: Prediction[] = [
  {
    id: "1",
    question: "¿Argentina le gana a Brasil este domingo?",
    category: "⚽ Deportes",
    deadline: "Dom 20:00",
    votes: { yes: 9, no: 3 },
    resolved: false,
    my_vote: null,
  },
  {
    id: "2",
    question: "¿El dólar blue pasa los $1500 esta semana?",
    category: "💰 Finanzas",
    deadline: "Vie 23:59",
    votes: { yes: 5, no: 7 },
    resolved: false,
    my_vote: "yes",
  },
  {
    id: "3",
    question: "¿Juan llega tarde al asado del sábado?",
    category: "👥 Personal",
    deadline: "Sáb 14:00",
    votes: { yes: 6, no: 1 },
    resolved: true,
    correct_answer: "yes",
    my_vote: "yes",
  },
  {
    id: "4",
    question: "¿Llueve mañana en CABA?",
    category: "🌦️ Clima",
    deadline: "Mañana 08:00",
    votes: { yes: 4, no: 4 },
    resolved: false,
    my_vote: null,
  },
];

const mockLeaderboard = [
  { name: "Sofi", score: 1240, rank: "Oracle", streak: 7, avatar: "S", isMe: false },
  { name: "Juan", score: 890, rank: "Sharp", streak: 3, avatar: "J", isMe: true },
  { name: "Nico", score: 760, rank: "Sharp", streak: 1, avatar: "N", isMe: false },
  { name: "Marti", score: 540, rank: "Player", streak: 0, avatar: "M", isMe: false },
];

export default function GroupPage({ params }: { params: { id: string } }) {
  const [predictions, setPredictions] = useState<Prediction[]>(mockPredictions);
  const [tab, setTab] = useState<"feed" | "leaderboard">("feed");
  const [showNewPrediction, setShowNewPrediction] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");
  const [newDeadline, setNewDeadline] = useState("");

  function vote(predictionId: string, answer: "yes" | "no") {
    setPredictions((prev) =>
      prev.map((p) => {
        if (p.id !== predictionId || p.resolved) return p;
        const prev_vote = p.my_vote;
        const updated = { ...p, votes: { ...p.votes } };
        // Quitar voto anterior
        if (prev_vote) updated.votes[prev_vote]--;
        // Poner nuevo voto (toggle)
        if (prev_vote !== answer) {
          updated.votes[answer]++;
          updated.my_vote = answer;
        } else {
          updated.my_vote = null;
        }
        return updated;
      })
    );
  }

  function createPrediction() {
    if (!newQuestion.trim()) return;
    const newP: Prediction = {
      id: String(Date.now()),
      question: newQuestion.trim(),
      category: "👥 Personal",
      deadline: newDeadline || "Mañana",
      votes: { yes: 0, no: 0 },
      resolved: false,
      my_vote: null,
    };
    setPredictions((prev) => [newP, ...prev]);
    setNewQuestion("");
    setNewDeadline("");
    setShowNewPrediction(false);
  }

  const pending = predictions.filter((p) => !p.resolved && p.my_vote === null).length;

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
              Los del laburo
            </div>
            <div className="text-xs" style={{ color: "#6b7280" }}>
              8 miembros
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
              className="w-full px-3 py-2 rounded-lg text-sm outline-none mb-2"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "#e8e8ed",
              }}
            />
            <input
              type="text"
              value={newDeadline}
              onChange={(e) => setNewDeadline(e.target.value)}
              placeholder="Deadline (ej: Mañana 20:00)"
              className="w-full px-3 py-2 rounded-lg text-sm outline-none mb-3"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "#e8e8ed",
              }}
            />
            <div className="flex gap-2">
              <button
                onClick={createPrediction}
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
            {predictions.map((p) => {
              const total = p.votes.yes + p.votes.no;
              const yesPercent = total > 0 ? Math.round((p.votes.yes / total) * 100) : 50;

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
                        {p.category} · {p.deadline}
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

                  {/* Barra de resultados */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${yesPercent}%`,
                          background: "linear-gradient(90deg, #7c3aed, #a855f7)",
                        }}
                      />
                    </div>
                    <div className="text-xs" style={{ color: "#6b7280" }}>
                      {total} votos
                    </div>
                  </div>

                  {/* Botones de voto */}
                  {!p.resolved && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => vote(p.id, "yes")}
                        className="flex-1 py-2 rounded-lg text-sm font-medium transition-all"
                        style={{
                          background:
                            p.my_vote === "yes"
                              ? "rgba(139, 92, 246, 0.3)"
                              : "rgba(255,255,255,0.04)",
                          border:
                            p.my_vote === "yes"
                              ? "1px solid rgba(139, 92, 246, 0.5)"
                              : "1px solid rgba(255,255,255,0.06)",
                          color: p.my_vote === "yes" ? "#c4b5fd" : "#9ca3af",
                        }}
                      >
                        Sí {p.my_vote === "yes" ? "✓" : ""} · {p.votes.yes}
                      </button>
                      <button
                        onClick={() => vote(p.id, "no")}
                        className="flex-1 py-2 rounded-lg text-sm font-medium transition-all"
                        style={{
                          background:
                            p.my_vote === "no"
                              ? "rgba(139, 92, 246, 0.3)"
                              : "rgba(255,255,255,0.04)",
                          border:
                            p.my_vote === "no"
                              ? "1px solid rgba(139, 92, 246, 0.5)"
                              : "1px solid rgba(255,255,255,0.06)",
                          color: p.my_vote === "no" ? "#c4b5fd" : "#9ca3af",
                        }}
                      >
                        No {p.my_vote === "no" ? "✓" : ""} · {p.votes.no}
                      </button>
                    </div>
                  )}

                  {p.resolved && (
                    <div className="text-xs" style={{ color: "#4b5563" }}>
                      Resultado: {p.correct_answer === "yes" ? "Sí" : "No"} ·{" "}
                      {p.votes.yes + p.votes.no} votos totales
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
            {mockLeaderboard.map((u, i) => (
              <div
                key={i}
                className="flex items-center gap-4 px-5 py-4"
                style={{
                  background: u.isMe
                    ? "rgba(139, 92, 246, 0.1)"
                    : i === 0
                    ? "rgba(139, 92, 246, 0.05)"
                    : "rgba(255,255,255,0.02)",
                  borderBottom: i < mockLeaderboard.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                  border: u.isMe ? "1px solid rgba(139, 92, 246, 0.2)" : undefined,
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
                  {u.avatar}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold flex items-center gap-2" style={{ color: "#f3f4f6" }}>
                    {u.name}
                    {u.isMe && (
                      <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: "rgba(139, 92, 246, 0.2)", color: "#c4b5fd" }}>
                        vos
                      </span>
                    )}
                  </div>
                  <div className="text-xs" style={{ color: "#6b7280" }}>
                    {u.rank} {u.streak > 0 ? `· 🔥 ${u.streak} racha` : ""}
                  </div>
                </div>
                <div className="text-sm font-bold" style={{ color: "#a78bfa" }}>
                  {u.score.toLocaleString()} pts
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
