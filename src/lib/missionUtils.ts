// lib/missionUtils.ts

type Mission = {
    id: string;
    titre: string;
    xp: number;
    complete: boolean;
  };
  
  // Chargement des missions depuis le localStorage
  export function getMissions(): Mission[] {
    if (typeof window === "undefined") return [];
    const saved = localStorage.getItem("hero-missions");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Erreur de parsing missions :", e);
      }
    }
    return [];
  }
  
  // Sauvegarde des missions
  export function saveMissions(missions: Mission[]) {
    localStorage.setItem("hero-missions", JSON.stringify(missions));
  }
  
  // Fonction principale appelée dans les autres pages
  export function validerMissionAuto(missionId: string) {
    const missions = getMissions();
    const index = missions.findIndex((m) => m.id === missionId);
    if (index !== -1 && !missions[index].complete) {
      missions[index].complete = true;
      saveMissions(missions);
  
      // Gagner les XP
      const currentXp = parseInt(localStorage.getItem("hero-xp") || "0", 10);
      const newXp = currentXp + missions[index].xp;
      localStorage.setItem("hero-xp", newXp.toString());
  
      // Optionnel : feedback
      console.log(`✅ Mission "${missions[index].titre}" validée ! +${missions[index].xp} XP`);
  
      // Tu peux ici déclencher un toast ou une animation si tu veux !
    }
  }
  