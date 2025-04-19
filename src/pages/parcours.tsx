import { useState } from "react";
import Layout from "@/components/Layout";

type Domaine = {
  id: string;
  nom: string;
  niveau: number; // entre 0 et 100
};

export default function Parcours() {
  const [domaines, setDomaines] = useState<Domaine[]>([
    { id: "sante", nom: "Santé & Énergie", niveau: 50 },
    { id: "mental", nom: "Mental & Émotions", niveau: 60 },
    { id: "relations", nom: "Relations", niveau: 40 },
    { id: "finances", nom: "Finances", niveau: 30 },
    { id: "sens", nom: "Sens & Mission", niveau: 20 },
  ]);

  const [loading, setLoading] = useState<string | null>(null);
  const [reponsesIA, setReponsesIA] = useState<Record<string, string>>({});

  const coacher = async (domaine: Domaine) => {
    setLoading(domaine.id);
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: `Je veux progresser dans le domaine "${domaine.nom}". Donne-moi un conseil puissant et motivant pour ce pilier de vie.`,
      }),
    });
    const data = await res.json();
    setReponsesIA((prev) => ({ ...prev, [domaine.id]: data.reply }));
    setLoading(null);
  };

  return (
    <Layout>
      <div className="max-w-xl mx-auto p-4 space-y-6">
        <h1 className="text-2xl font-bold text-center">📈 Parcours de Vie</h1>

        {domaines.map((d) => (
          <div key={d.id} className="border p-4 rounded shadow bg-white space-y-2">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">{d.nom}</h2>
              <span className="text-sm text-gray-600">{d.niveau}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-blue-500 h-3 rounded-full"
                style={{ width: `${d.niveau}%` }}
              />
            </div>
            <button
              onClick={() => coacher(d)}
              disabled={loading === d.id}
              className="text-blue-600 text-sm underline disabled:opacity-50"
            >
              {loading === d.id ? "Chargement..." : "🔥 Conseil IA"}
            </button>
            {reponsesIA[d.id] && (
              <p className="text-sm text-gray-600 mt-2 border-l-4 border-blue-400 pl-2 italic">
                {reponsesIA[d.id]}
              </p>
            )}
          </div>
        ))}
      </div>
    </Layout>
  );
}
