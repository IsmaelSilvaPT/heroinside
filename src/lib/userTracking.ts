import { showXpToast } from "./toast-utils";

export type UserStats = {
  totalMessages: number;
  totalCheckups: number;
  totalBoosts: number;
  totalObjectifs: number;
  lastActive: string;
  streak: number;
  niveau: number;
  xp: number;
};

export type ChatMessage = {
  id: string;
  from: "user" | "bot";
  text: string;
  timestamp: string;
  type: "chat" | "checkup" | "boost";
};

export type UserProfile = {
  nom: string;
  avatar: string;
  dateInscription: string;
  stats: UserStats;
  messages: ChatMessage[];
  badges: string[];
  objectifs: {
    id: string;
    titre: string;
    description: string;
    complete: boolean;
    dateCreation: string;
    dateCompletion?: string;
  }[];
};

// Initialiser le profil utilisateur
export function initUserProfile(): UserProfile {
  const saved = localStorage.getItem("hero-profile");
  if (saved) {
    return JSON.parse(saved);
  }

  const newProfile: UserProfile = {
    nom: "Héros anonyme",
    avatar: "",
    dateInscription: new Date().toISOString(),
    stats: {
      totalMessages: 0,
      totalCheckups: 0,
      totalBoosts: 0,
      totalObjectifs: 0,
      lastActive: new Date().toISOString(),
      streak: 0,
      niveau: 1,
      xp: 0,
    },
    messages: [],
    badges: [],
    objectifs: [],
  };

  saveUserProfile(newProfile);
  return newProfile;
}

// Sauvegarder le profil
export function saveUserProfile(profile: UserProfile) {
  localStorage.setItem("hero-profile", JSON.stringify(profile));
}

// Ajouter un message
export function addMessage(message: Omit<ChatMessage, "id" | "timestamp">) {
  const profile = initUserProfile();
  const newMessage: ChatMessage = {
    ...message,
    id: Math.random().toString(36).substring(7),
    timestamp: new Date().toISOString(),
  };

  profile.messages.push(newMessage);
  profile.stats.totalMessages++;

  if (message.type === "checkup") profile.stats.totalCheckups++;
  if (message.type === "boost") profile.stats.totalBoosts++;

  // Mise à jour du streak et XP
  const lastActive = new Date(profile.stats.lastActive);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays === 1) {
    profile.stats.streak++;
    if (profile.stats.streak === 3) addBadge(profile, "streak3");
    if (profile.stats.streak === 7) addBadge(profile, "streak7");
  } else if (diffDays > 1) {
    profile.stats.streak = 1;
  }

  profile.stats.lastActive = now.toISOString();
  addXP(profile, 10);

  saveUserProfile(profile);
  return profile;
}

// Ajouter de l'XP
export function addXP(profile: UserProfile, amount: number) {
  profile.stats.xp += amount;
  const newNiveau = Math.floor(profile.stats.xp / 100) + 1;
  
  if (newNiveau > profile.stats.niveau) {
    profile.stats.niveau = newNiveau;
    if (newNiveau >= 5) addBadge(profile, "niveau5");
  }

  showXpToast(amount);
  saveUserProfile(profile);
}

// Ajouter un badge
export function addBadge(profile: UserProfile, badgeId: string) {
  if (!profile.badges.includes(badgeId)) {
    profile.badges.push(badgeId);
    saveUserProfile(profile);
  }
}

// Ajouter un objectif
export function addObjectif(titre: string, description: string) {
  const profile = initUserProfile();
  const newObjectif = {
    id: Math.random().toString(36).substring(7),
    titre,
    description,
    complete: false,
    dateCreation: new Date().toISOString(),
  };

  profile.objectifs.push(newObjectif);
  profile.stats.totalObjectifs++;
  saveUserProfile(profile);
  return profile;
}

// Compléter un objectif
export function completeObjectif(objectifId: string) {
  const profile = initUserProfile();
  const objectif = profile.objectifs.find(o => o.id === objectifId);
  
  if (objectif && !objectif.complete) {
    objectif.complete = true;
    objectif.dateCompletion = new Date().toISOString();
    addXP(profile, 50);
    addBadge(profile, "objectif1");
  }

  saveUserProfile(profile);
  return profile;
} 