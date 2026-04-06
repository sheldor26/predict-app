"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: conectar con Supabase auth
    console.log("login", { email, password });
  }

  return (
    <main className="flex flex-col flex-1 items-center justify-center px-6 py-16"
      style={{ background: "linear-gradient(135deg, #1a0533 0%, #0d1b2a 50%, #0a0a0f 100%)" }}>
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <span className="text-3xl">🎰</span>
            <span className="text-2xl font-black"
              style={{
                background: "linear-gradient(90deg, #a78bfa, #f472b6, #fb923c)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
              Predict
            </span>
          </Link>
          <p className="text-sm mt-2" style={{ color: "#6b7280" }}>
            Entrá a tu cuenta
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl p-6"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium" style={{ color: "#9ca3af" }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vos@ejemplo.com"
                required
                className="px-4 py-3 rounded-xl text-sm outline-none transition-all"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "#e8e8ed",
                }}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium" style={{ color: "#9ca3af" }}>
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="px-4 py-3 rounded-xl text-sm outline-none transition-all"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "#e8e8ed",
                }}
              />
            </div>

            <button
              type="submit"
              className="px-4 py-3 rounded-xl font-semibold text-sm transition-all mt-1"
              style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)", color: "white" }}
            >
              Entrar
            </button>
          </form>
        </div>

        <p className="text-center text-sm mt-4" style={{ color: "#4b5563" }}>
          ¿No tenés cuenta?{" "}
          <Link href="/register" className="font-medium" style={{ color: "#a78bfa" }}>
            Registrate gratis
          </Link>
        </p>
      </div>
    </main>
  );
}
