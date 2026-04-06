"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import {
  User,
  Group,
  Prediction,
  VoteAnswer,
  PredictionCategory,
  scoreToRank,
} from "@/lib/types";

// ─── Mock data ────────────────────────────────────────────────────────────────

const INITIAL_USER: User = {
  id: "me",
  username: "juan_predict",
  avatar: "J",
  predict_score: 890,
  rank: "Sharp",
  streak: 3,
  is_pro: false,
};

const INITIAL_GROUPS: Group[] = [
  {
    id: "1",
    name: "Los del laburo",
    code: "LABURO01",
    created_by: "me",
    members: [
      { user_id: "me", username: "juan_predict", avatar: "J", score_in_group: 890, rank: "Sharp", streak: 3 },
      { user_id: "u2", username: "sofi_oracle", avatar: "S", score_in_group: 1240, rank: "Oracle", streak: 7 },
      { user_id: "u3", username: "nico_sharp", avatar: "N", score_in_group: 760, rank: "Sharp", streak: 1 },
      { user_id: "u4", username: "marti_player", avatar: "M", score_in_group: 540, rank: "Player", streak: 0 },
    ],
  },
  {
    id: "2",
    name: "Fútbol friends",
    code: "FUTBOL22",
    created_by: "u2",
    members: [
      { user_id: "me", username: "juan_predict", avatar: "J", score_in_group: 320, rank: "Player", streak: 1 },
      { user_id: "u2", username: "sofi_oracle", avatar: "S", score_in_group: 580, rank: "Sharp", streak: 2 },
    ],
  },
];

const INITIAL_PREDICTIONS: Prediction[] = [
  {
    id: "p1",
    group_id: "1",
    created_by: "u2",
    question: "¿Argentina le gana a Brasil este domingo?",
    category: "sports",
    deadline: "Dom 20:00",
    votes: { yes: 9, no: 3 },
    resolved: false,
    my_vote: null,
  },
  {
    id: "p2",
    group_id: "1",
    created_by: "me",
    question: "¿El dólar blue pasa los $1500 esta semana?",
    category: "finance",
    deadline: "Vie 23:59",
    votes: { yes: 5, no: 7 },
    resolved: false,
    my_vote: "yes",
  },
  {
    id: "p3",
    group_id: "1",
    created_by: "u3",
    question: "¿Juan llega tarde al asado del sábado?",
    category: "personal",
    deadline: "Sáb 14:00",
    votes: { yes: 6, no: 1 },
    resolved: true,
    correct_answer: "yes",
    my_vote: "yes",
  },
  {
    id: "p4",
    group_id: "1",
    created_by: "u4",
    question: "¿Llueve mañana en CABA?",
    category: "climate",
    deadline: "Mañana 08:00",
    votes: { yes: 4, no: 4 },
    resolved: false,
    my_vote: null,
  },
  {
    id: "p5",
    group_id: "2",
    created_by: "u2",
    question: "¿El Real Madrid gana la Champions este año?",
    category: "sports",
    deadline: "Jun 01",
    votes: { yes: 1, no: 1 },
    resolved: false,
    my_vote: null,
  },
];

// ─── Context ──────────────────────────────────────────────────────────────────

interface AppContextValue {
  user: User;
  groups: Group[];
  predictions: Prediction[];

  // Groups
  createGroup: (name: string) => Group;
  joinGroup: (code: string) => Group | null;

  // Predictions
  getPredictionsForGroup: (groupId: string) => Prediction[];
  createPrediction: (groupId: string, question: string, category: PredictionCategory, deadline: string) => void;
  vote: (predictionId: string, answer: VoteAnswer) => void;
  resolve: (predictionId: string, answer: VoteAnswer) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(INITIAL_USER);
  const [groups, setGroups] = useState<Group[]>(INITIAL_GROUPS);
  const [predictions, setPredictions] = useState<Prediction[]>(INITIAL_PREDICTIONS);

  function createGroup(name: string): Group {
    const code = name.toUpperCase().replace(/\s+/g, "").slice(0, 6) + Math.floor(Math.random() * 99);
    const group: Group = {
      id: String(Date.now()),
      name,
      code,
      created_by: user.id,
      members: [
        {
          user_id: user.id,
          username: user.username,
          avatar: user.avatar,
          score_in_group: 0,
          rank: "Rookie",
          streak: 0,
        },
      ],
    };
    setGroups((prev) => [...prev, group]);
    return group;
  }

  function joinGroup(code: string): Group | null {
    const group = groups.find((g) => g.code === code.toUpperCase().trim());
    if (!group) return null;
    const already = group.members.some((m) => m.user_id === user.id);
    if (already) return group;
    setGroups((prev) =>
      prev.map((g) =>
        g.id === group.id
          ? {
              ...g,
              members: [
                ...g.members,
                { user_id: user.id, username: user.username, avatar: user.avatar, score_in_group: 0, rank: "Rookie", streak: 0 },
              ],
            }
          : g
      )
    );
    return group;
  }

  function getPredictionsForGroup(groupId: string): Prediction[] {
    return predictions.filter((p) => p.group_id === groupId);
  }

  function createPrediction(
    groupId: string,
    question: string,
    category: PredictionCategory,
    deadline: string
  ) {
    const p: Prediction = {
      id: String(Date.now()),
      group_id: groupId,
      created_by: user.id,
      question,
      category,
      deadline,
      votes: { yes: 0, no: 0 },
      resolved: false,
      my_vote: null,
    };
    setPredictions((prev) => [p, ...prev]);
  }

  function vote(predictionId: string, answer: VoteAnswer) {
    setPredictions((prev) =>
      prev.map((p) => {
        if (p.id !== predictionId || p.resolved) return p;
        const prev_vote = p.my_vote;
        const updated = { ...p, votes: { ...p.votes } };
        if (prev_vote) updated.votes[prev_vote]--;
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

  function resolve(predictionId: string, answer: VoteAnswer) {
    const prediction = predictions.find((p) => p.id === predictionId);
    if (!prediction) return;

    setPredictions((prev) =>
      prev.map((p) =>
        p.id === predictionId ? { ...p, resolved: true, correct_answer: answer } : p
      )
    );

    // Sumar puntos al usuario si acertó
    if (prediction.my_vote === answer) {
      const total = prediction.votes.yes + prediction.votes.no;
      const myVoteCount = prediction.votes[answer];
      const isContrarian = total > 0 && myVoteCount / total < 0.3;
      const points = isContrarian ? 25 : 10;
      const newScore = user.predict_score + points;
      setUser((u) => ({ ...u, predict_score: newScore, rank: scoreToRank(newScore) }));

      // Actualizar score en el grupo
      setGroups((prev) =>
        prev.map((g) =>
          g.id === prediction.group_id
            ? {
                ...g,
                members: g.members.map((m) =>
                  m.user_id === user.id
                    ? { ...m, score_in_group: m.score_in_group + points }
                    : m
                ),
              }
            : g
        )
      );
    }
  }

  return (
    <AppContext.Provider value={{ user, groups, predictions, createGroup, joinGroup, getPredictionsForGroup, createPrediction, vote, resolve }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}
