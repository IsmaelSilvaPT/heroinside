import { useEffect, useState } from "react";
import Layout from "@/components/Layout";

const citationsFixes = [
  "Tu n'as pas besoin d'aller vite. Tu dois juste continuer.",
  "Le succès est la somme de petits efforts répétés jour après jour.",
  "Sois le héros de ta propre histoire.",
  "Tu es plus fort que tu ne le crois.",
  "Chaque jour est une nouvelle chance de tout changer.",
  "Ta réalité est le reflet de tes pensées dominantes.",
  "Le vrai courage, c’est d’avancer quand tu as peur.",
];

export default function Citations() {
  const [citation, setCitation] = useState("");
  const [loading, setLoading] = useState(false);

  const genererNouvelle = async () => {
    setLoading(true);
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "Donne-moi une citation ou un mantra puissant pour démarrer la journée avec force et sérénité.",
      }),
    });
    const data = await res.json();
    setCitation(data.reply);
    setLoading(false);
  };

  const citationFixeAleatoire = () => {
    const index = Math.floor(Math.random() * citationsFixes.length);
    setCitation(citationsFixes[index]);
  };

  useEffect(() => {
    citationFixeAleatoire();
  }, []);

  return (
    <Layout>
      <div className="max-w-xl mx-auto p-6 space-y-6 text-center">
        <h1 className="text-2xl font-bold">✨ Citation du Jour</h1>

        <blockquote className="text-xl italic text-blue-700 border-l-4 border-blue-500 pl-4">
          {loading ? "Chargement..." : citation}
        </blockquote>

        <div className="flex justify-center gap-4">
          <button
            onClick={citationFixeAleatoire}
            className="bg-gray-300 text-sm px-4 py-2 rounded hover:bg-gray-400"
            disabled={loading}
          >
            Une autre
          </button>
          <button
            onClick={genererNouvelle}
            className="bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700"
            disabled={loading}
          >
            💬 Citation IA
          </button>
        </div>
      </div>
    </Layout>
  );
}
