import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import ModernSection from "@/components/ui/ModernSection";
import ModernCard from "@/components/ui/ModernCard";
import ModernGrid from "@/components/ui/ModernGrid";
import ModernButton from "@/components/ui/ModernButton";
import { CheckCircle, Circle } from "lucide-react";
import { validerMissionAuto } from "@/lib/missionUtils";

const missionsJour = [
  { id: "m1", titre: "Faire un check-up émotionnel", xp: 25, icon: "🧘" },
  { id: "m2", titre: "Ajouter un objectif", xp: 25, icon: "🎯" },
  { id: "m3", titre: "Lire un boost IA", xp: 25, icon: "⚡" },
];

export default function Missions() {
  const [faites, setFaites] = useState<string[]>([]);
  const [xp, setXp] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("missions-faites");
    const savedXp = localStorage.getItem("hero-xp");
    if (saved) setFaites(JSON.parse(saved));
    if (savedXp) setXp(parseInt(savedXp, 10));
  }, []);

  useEffect(() => {
    localStorage.setItem("missions-faites", JSON.stringify(faites));
    localStorage.setItem("hero-xp", xp.toString());
  }, [faites, xp]);

  const validerMission = (id: string, xpGain: number) => {
    if (!faites.includes(id)) {
      setFaites((prev) => [...prev, id]);
      setXp((prev) => prev + xpGain);
      validerMissionAuto(id);
    }
  };

  return (
    <Layout>
      <ModernSection
        title="🎯 Missions du jour"
        description="Accomplis tes missions quotidiennes pour progresser dans ton parcours"
      >
        <ModernGrid cols={2}>
          {missionsJour.map((m) => {
            const faite = faites.includes(m.id);
            return (
              <ModernCard
                key={m.id}
                gradientFrom={faite ? "from-green-50" : "from-blue-50"}
                gradientTo={faite ? "to-emerald-50" : "to-purple-50"}
                className={`transition-all duration-300 ${
                  faite ? "border-green-200" : "border-gray-100"
                }`}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <span className="text-3xl">{m.icon}</span>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {m.titre}
                      </h3>
                      <p className="text-sm text-gray-500">+{m.xp} XP</p>
                    </div>
                  </div>
                  <ModernButton
                    variant={faite ? "secondary" : "primary"}
                    onClick={() => validerMission(m.id, m.xp)}
                    disabled={faite}
                    className="!p-2"
                  >
                    {faite ? <CheckCircle size={24} /> : <Circle size={24} />}
                  </ModernButton>
                </div>
              </ModernCard>
            );
          })}
        </ModernGrid>

        <ModernCard
          gradientFrom="from-indigo-50"
          gradientTo="to-violet-50"
          className="mt-8 text-center"
        >
          <div className="flex items-center justify-center space-x-2">
            <span className="text-2xl">✨</span>
            <p className="text-lg font-medium text-gray-700">
              XP total gagné :{" "}
              <span className="text-indigo-600 font-bold">{xp}</span>
            </p>
          </div>
        </ModernCard>
      </ModernSection>
    </Layout>
  );
}
