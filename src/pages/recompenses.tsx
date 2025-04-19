import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import ModernSection from "@/components/ui/ModernSection";
import ModernCard from "@/components/ui/ModernCard";
import ModernButton from "@/components/ui/ModernButton";
import { validerMissionAuto } from "@/lib/missionUtils";
import { showBadgeToast, showXpToast, showMissionToast } from "@/lib/toast-utils";

const citationsFixes = [
  "Ta mission commence dès que tu te lèves.",
  "Ce n'est pas la motivation qui fait l'action, c'est l'action qui crée la motivation.",
  "Un héros ne se compare à personne. Il avance.",
  "Chaque jour est un nouveau départ.",
  "Même une petite victoire est une victoire.",
];

export default function Recompenses() {
  const [citation, setCitation] = useState("");
  const [favori, setFavori] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [badges, setBadges] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("citation-favori");
    const savedBadges = localStorage.getItem("hero-badges");
    if (saved) setFavori(saved);
    if (savedBadges) setBadges(JSON.parse(savedBadges));
    genererFixe();
  }, []);

  useEffect(() => {
    localStorage.setItem("hero-badges", JSON.stringify(badges));
  }, [badges]);

  const genererFixe = () => {
    const alea = Math.floor(Math.random() * citationsFixes.length);
    setCitation(citationsFixes[alea]);
  };

  const debloquerBadge = (id: string) => {
    if (!badges.includes(id)) {
      setBadges((prev) => [...prev, id]);
      showBadgeToast(id);
    }
  };

  const genererIA = async () => {
    setLoading(true);
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message:
          "Donne-moi une citation motivante, inspirante et courte pour un héros moderne. Pas plus de 20 mots.",
      }),
    });
    const data = await res.json();
    setCitation(data.reply);
    setLoading(false);
    debloquerBadge("boost1");
    validerMissionAuto("m3");
    showXpToast(25);
    showMissionToast("m3");
  };

  const enregistrer = () => {
    localStorage.setItem("citation-favori", citation);
    setFavori(citation);
  };

  return (
    <Layout>
      <ModernSection
        title="✨ Boost du Jour"
        description="Découvre ta citation motivante quotidienne"
      >
        <ModernCard
          gradientFrom="from-blue-50"
          gradientTo="to-purple-50"
          className="p-8"
        >
          <blockquote className="text-2xl italic text-blue-600 border-l-4 border-blue-500 pl-6 mb-6">
            {loading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                <span>Chargement...</span>
              </div>
            ) : (
              citation
            )}
          </blockquote>

          <div className="flex flex-wrap gap-4">
            <ModernButton
              variant="secondary"
              onClick={genererFixe}
              className="flex-1"
            >
              <span className="flex items-center space-x-2">
                <span>🔄</span>
                <span>Une autre</span>
              </span>
            </ModernButton>
            <ModernButton
              variant="primary"
              onClick={genererIA}
              disabled={loading}
              className="flex-1"
            >
              <span className="flex items-center space-x-2">
                <span>✨</span>
                <span>Boost IA</span>
              </span>
            </ModernButton>
            <ModernButton
              variant="outline"
              onClick={enregistrer}
              className="flex-1"
            >
              <span className="flex items-center space-x-2">
                <span>❤️</span>
                <span>Sauvegarder</span>
              </span>
            </ModernButton>
          </div>

          {favori && (
            <ModernCard
              gradientFrom="from-pink-50"
              gradientTo="to-rose-50"
              className="mt-6"
            >
              <div className="flex items-center space-x-2">
                <span className="text-2xl">🧠</span>
                <div>
                  <p className="text-sm text-gray-600">Ta citation favorite :</p>
                  <p className="text-lg font-medium text-gray-800">"{favori}"</p>
                </div>
              </div>
            </ModernCard>
          )}
        </ModernCard>
      </ModernSection>
    </Layout>
  );
}