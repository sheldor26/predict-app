import Link from "next/link";

const features = [
  {
    icon: "🎯",
    title: "Predecí cualquier cosa",
    desc: "Deportes, clima, finanzas, política, o si tu amigo llega tarde al asado. Todo vale.",
  },
  {
    icon: "👥",
    title: "Jugá con tu grupo",
    desc: "Cada grupo es tu arena privada. Tu leaderboard, tus predicciones, tu reputación.",
  },
  {
    icon: "🏆",
    title: "Apostá tu reputación",
    desc: "Sin plata real. Puntos, rankings y el honor de ser el mejor predictor del grupo.",
  },
  {
    icon: "⚡",
    title: "Resultados en tiempo real",
    desc: "Rankings actualizados al instante. Cada acierto te sube, cada fallo... no te baja.",
  },
];

const predictions = [
  { q: "¿Argentina le gana a Brasil?", votes: 142, category: "⚽ Deportes", resolved: true, correct: true },
  { q: "¿El dólar blue pasa los $1500 esta semana?", votes: 89, category: "💰 Finanzas", resolved: false },
  { q: "¿Juan llega tarde al asado?", votes: 7, category: "👥 Personal", resolved: true, correct: false },
  { q: "¿Llueve mañana en CABA?", votes: 34, category: "🌦️ Clima", resolved: false },
];

const ranks = [
  { name: "Sofi", score: 2840, rank: "Oracle", streak: 7, avatar: "S" },
  { name: "Nico", score: 2210, rank: "Sharp", streak: 3, avatar: "N" },
  { name: "Marti", score: 1890, rank: "Sharp", streak: 1, avatar: "M" },
];

export default function Home() {
  return (
    <main className="flex flex-col">
      {/* Hero */}
      <section
        style={{
          background: "linear-gradient(135deg, #1a0533 0%, #0d1b2a 50%, #0a0a0f 100%)",
          borderBottom: "1px solid rgba(139, 92, 246, 0.15)",
        }}
        className="px-6 py-20 text-center"
      >
        <div className="max-w-2xl mx-auto">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-6"
            style={{
              background: "rgba(139, 92, 246, 0.15)",
              border: "1px solid rgba(139, 92, 246, 0.3)",
              color: "#c4b5fd",
            }}
          >
            🎰 Ahora en beta privada
          </div>

          <h1
            className="text-5xl font-black mb-4 leading-tight"
            style={{
              background: "linear-gradient(90deg, #a78bfa, #f472b6, #fb923c)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Apostá tu reputación
          </h1>

          <p className="text-lg mb-8 leading-relaxed" style={{ color: "#9ca3af" }}>
            El juego social donde predecís{" "}
            <strong style={{ color: "#e8e8ed" }}>cualquier cosa</strong> con tu grupo de amigos.
            Sin plata. Pura reputación.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/register"
              className="px-6 py-3 rounded-xl font-semibold text-sm transition-all"
              style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)", color: "white" }}
            >
              Empezar gratis →
            </Link>
            <Link
              href="/login"
              className="px-6 py-3 rounded-xl font-semibold text-sm transition-all"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#e8e8ed",
              }}
            >
              Ya tengo cuenta
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-16" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10" style={{ color: "#f3f4f6" }}>
            ¿Cómo funciona?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((f, i) => (
              <div
                key={i}
                className="rounded-xl p-5"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div className="text-2xl mb-3">{f.icon}</div>
                <h3 className="font-semibold mb-1" style={{ color: "#f3f4f6" }}>
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#6b7280" }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo — predicciones */}
      <section className="px-6 py-16" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-2" style={{ color: "#f3f4f6" }}>
            Predicciones en vivo
          </h2>
          <p className="text-sm mb-8" style={{ color: "#6b7280" }}>
            Así se ve tu feed
          </p>

          <div className="flex flex-col gap-3">
            {predictions.map((p, i) => (
              <div
                key={i}
                className="rounded-xl p-4 flex items-center justify-between gap-4"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div className="flex-1 min-w-0">
                  <div className="text-xs mb-1" style={{ color: "#6b7280" }}>
                    {p.category}
                  </div>
                  <div className="text-sm font-medium truncate" style={{ color: "#e8e8ed" }}>
                    {p.q}
                  </div>
                  <div className="text-xs mt-1" style={{ color: "#4b5563" }}>
                    {p.votes} votos
                  </div>
                </div>
                {p.resolved ? (
                  <div
                    className="text-xs font-semibold px-2 py-1 rounded-full flex-shrink-0"
                    style={{
                      background: p.correct ? "rgba(34, 197, 94, 0.15)" : "rgba(239, 68, 68, 0.15)",
                      color: p.correct ? "#4ade80" : "#f87171",
                    }}
                  >
                    {p.correct ? "✓ Acertaste" : "✗ Fallaste"}
                  </div>
                ) : (
                  <div
                    className="text-xs font-semibold px-2 py-1 rounded-full flex-shrink-0"
                    style={{ background: "rgba(139, 92, 246, 0.15)", color: "#c4b5fd" }}
                  >
                    Votar
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo — leaderboard */}
      <section className="px-6 py-16" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-2" style={{ color: "#f3f4f6" }}>
            Leaderboard del grupo
          </h2>
          <p className="text-sm mb-8" style={{ color: "#6b7280" }}>
            ¿Quién predice mejor?
          </p>

          <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
            {ranks.map((r, i) => (
              <div
                key={i}
                className="flex items-center gap-4 px-5 py-4"
                style={{
                  background: i === 0 ? "rgba(139, 92, 246, 0.08)" : "rgba(255,255,255,0.02)",
                  borderBottom: i < ranks.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                }}
              >
                <div
                  className="text-lg font-black w-6 text-center"
                  style={{ color: i === 0 ? "#a78bfa" : "#4b5563" }}
                >
                  {i + 1}
                </div>
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)", color: "white" }}
                >
                  {r.avatar}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold" style={{ color: "#f3f4f6" }}>
                    {r.name}
                  </div>
                  <div className="text-xs" style={{ color: "#6b7280" }}>
                    {r.rank} · 🔥 {r.streak} racha
                  </div>
                </div>
                <div className="text-sm font-bold" style={{ color: "#a78bfa" }}>
                  {r.score.toLocaleString()} pts
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="px-6 py-20 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-3xl font-black mb-4" style={{ color: "#f3f4f6" }}>
            ¿Listo para demostrar que sos el mejor?
          </h2>
          <p className="text-sm mb-8" style={{ color: "#6b7280" }}>
            Creá tu grupo, invitá a tus amigos y empezá a predecir.
          </p>
          <Link
            href="/register"
            className="inline-block px-8 py-4 rounded-xl font-bold text-sm transition-all"
            style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)", color: "white" }}
          >
            Empezar gratis →
          </Link>
        </div>
      </section>
    </main>
  );
}
