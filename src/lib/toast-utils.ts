import { toast } from "sonner";

export function showMissionToast(id: string) {
  const labels: Record<string, string> = {
    m1: "Bravo pour ton check-up émotionnel !",
    m2: "Objectif ajouté, continue comme ça 💪",
    m3: "Tu as lu un boost IA, bien joué !",
  };
  toast.success(labels[id] || "Mission accomplie !");
}

export function showXpToast(xp: number) {
  toast(`+${xp} XP gagnés`, {
    description: "Tu progresses comme un héros 💥",
  });
}

export function showBadgeToast(id: string) {
  const labels: Record<string, string> = {
    checkup1: "💡 Premier Check-up !",
    objectif1: "🎯 Premier Objectif !",
    boost1: "⚡ Boost lu !",
  };
  toast.success(`Badge débloqué : ${labels[id] || id}`);
}
