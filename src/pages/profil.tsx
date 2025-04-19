import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import ModernSection from "@/components/ui/ModernSection";
import ModernCard from "@/components/ui/ModernCard";
import ModernButton from "@/components/ui/ModernButton";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { initUserProfile, addMessage, UserProfile, addXP } from "@/lib/userTracking";
import { motion } from "framer-motion";

const BADGE_LABELS: Record<string, string> = {
  checkup1: "🧠 Premier check-up !",
  boost1: "⚡ Premier boost !",
  objectif1: "🎯 Premier objectif atteint !",
  streak3: "🔥 3 jours de suite !",
  streak7: "🌟 7 jours de suite !",
  niveau5: "🏆 Niveau 5 atteint !",
};

export default function Profil() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [reponseIA, setReponseIA] = useState("");

  useEffect(() => {
    const userProfile = initUserProfile();
    setProfile(userProfile);
  }, []);

  const envoyerCheckup = async () => {
    if (!input.trim() || !profile) return;
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: `Fais une analyse émotionnelle bienveillante de ce message d'un utilisateur : "${input}". Réponds avec empathie, compréhension et un conseil pratique.`,
        }),
      });

      const data = await res.json();
      setReponseIA(data.reply);

      const checkupMessage = {
        from: "user" as const,
        text: input,
        type: "checkup" as const,
      };

      const botMessage = {
        from: "bot" as const,
        text: data.reply,
        type: "checkup" as const,
      };

      const updatedProfile = addMessage(checkupMessage);
      const finalProfile = addMessage(botMessage);
      setProfile(finalProfile);
      addXP(finalProfile, 25);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  if (!profile) return null;

  const xpForNextLevel = (profile.stats.niveau) * 100;
  const xpProgress = (profile.stats.xp % 100);
  const checkupsRecents = profile.messages
    .filter(m => m.type === "checkup" && m.from === "bot")
    .slice(0, 5);

  return (
    <Layout>
      <ModernSection title="👤 Profil du Héros" description="Ton parcours héroïque">
        <div className="space-y-6">
          <ModernCard>
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={profile.avatar || "/avatar.png"} />
                <AvatarFallback>{profile.nom.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Input
                  value={profile.nom}
                  onChange={(e) => {
                    const updatedProfile = { ...profile, nom: e.target.value };
                    setProfile(updatedProfile);
                    localStorage.setItem("hero-profile", JSON.stringify(updatedProfile));
                  }}
                  className="bg-white/50 border-gray-200"
                />
                <Input
                  placeholder="URL de ton avatar (facultatif)"
                  value={profile.avatar}
                  onChange={(e) => {
                    const updatedProfile = { ...profile, avatar: e.target.value };
                    setProfile(updatedProfile);
                    localStorage.setItem("hero-profile", JSON.stringify(updatedProfile));
                  }}
                  className="bg-white/50 border-gray-200 mt-2"
                />
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-600">Niveau {profile.stats.niveau}</span>
                  <span className="text-sm text-gray-600">{xpProgress}/{xpForNextLevel} XP</span>
                </div>
                <Progress value={xpProgress} className="h-3" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="text-2xl text-blue-600 font-bold">{profile.stats.streak}</div>
                  <div className="text-sm text-gray-600">Jours consécutifs</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="text-2xl text-purple-600 font-bold">{profile.stats.totalMessages}</div>
                  <div className="text-sm text-gray-600">Messages échangés</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="text-2xl text-green-600 font-bold">{profile.stats.totalCheckups}</div>
                  <div className="text-sm text-gray-600">Check-ups effectués</div>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4">
                  <div className="text-2xl text-yellow-600 font-bold">{profile.objectifs.filter(o => o.complete).length}</div>
                  <div className="text-sm text-gray-600">Objectifs atteints</div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">🏆 Badges débloqués</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.badges.map((badge) => (
                    <motion.div
                      key={badge}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="bg-gradient-to-br from-blue-50 to-purple-50 px-3 py-1 rounded-full text-sm font-medium text-blue-600 border border-blue-100"
                    >
                      {BADGE_LABELS[badge]}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </ModernCard>

          <Dialog>
            <DialogTrigger asChild>
              <ModernButton variant="primary" className="w-full">
                <span className="flex items-center justify-center space-x-2">
                  <span>🧠</span>
                  <span>Analyser mon moral</span>
                </span>
              </ModernButton>
            </DialogTrigger>
            <DialogContent className="bg-white">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-gray-800">
                  🧠 Check-up émotionnel
                </DialogTitle>
              </DialogHeader>

              <Textarea
                placeholder="Décris en quelques mots comment tu te sens aujourd'hui..."
                className="bg-gray-50 border-gray-200"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />

              <ModernButton
                onClick={envoyerCheckup}
                disabled={loading}
                className="w-full"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Analyse en cours...</span>
                  </div>
                ) : (
                  "Envoyer"
                )}
              </ModernButton>

              {reponseIA && (
                <ModernCard
                  gradientFrom="from-blue-50"
                  gradientTo="to-indigo-50"
                  className="mt-4"
                >
                  <p className="text-gray-700">{reponseIA}</p>
                </ModernCard>
              )}
            </DialogContent>
          </Dialog>

          {checkupsRecents.length > 0 && (
            <ModernCard>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                🗓️ Check-ups récents
              </h3>
              <div className="space-y-4">
                {checkupsRecents.map((msg) => (
                  <div
                    key={msg.id}
                    className="border-l-4 border-blue-500 pl-4 py-2 bg-white/50 rounded-r-lg"
                  >
                    <div className="text-sm font-medium text-blue-600">
                      {new Date(msg.timestamp).toLocaleDateString()}
                    </div>
                    <p className="text-gray-700 mt-1">{msg.text}</p>
                  </div>
                ))}
              </div>
            </ModernCard>
          )}
        </div>
      </ModernSection>
    </Layout>
  );
}