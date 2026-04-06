export type Rank = "Rookie" | "Player" | "Sharp" | "Oracle" | "Propheta";

export interface User {
  id: string;
  username: string;
  avatar: string;
  predict_score: number;
  rank: Rank;
  streak: number;
  is_pro: boolean;
}

export interface Group {
  id: string;
  name: string;
  code: string;
  created_by: string;
  members: GroupMember[];
}

export interface GroupMember {
  user_id: string;
  username: string;
  avatar: string;
  score_in_group: number;
  rank: Rank;
  streak: number;
}

export type VoteAnswer = "yes" | "no";
export type PredictionCategory = "sports" | "climate" | "finance" | "culture" | "personal" | "world";

export interface Prediction {
  id: string;
  group_id: string;
  created_by: string;
  question: string;
  category: PredictionCategory;
  deadline: string;
  resolved: boolean;
  correct_answer?: VoteAnswer;
  votes: { yes: number; no: number };
  my_vote?: VoteAnswer | null;
}

export const CATEGORY_LABELS: Record<PredictionCategory, string> = {
  sports: "⚽ Deportes",
  climate: "🌦️ Clima",
  finance: "💰 Finanzas",
  culture: "🎬 Cultura",
  personal: "👥 Personal",
  world: "🌍 Mundo",
};

export function scoreToRank(score: number): Rank {
  if (score >= 5000) return "Propheta";
  if (score >= 2000) return "Oracle";
  if (score >= 1000) return "Sharp";
  if (score >= 300) return "Player";
  return "Rookie";
}
