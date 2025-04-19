import { useState } from "react";
import Layout from "@/components/Layout";

const options = [
  { label: "😞 Je doute", prompt: "Je doute de moi. Donne-moi un boost mental puissant." },
  { label: "🥱 Je procrastine", prompt: "J’ai besoin d’un coup de pied pour me remettre à l’action." },
  { label: "💔 Je me sens seul", prompt: "Je me sens seul, donne-moi un message d’espoir et de réconfort." },
  { label: "🔥 Je veux réussir", prompt: "Je veux réussir, mais j’ai besoin d’un message motivant." },
  { label: "😰 J’ai peur de l’échec", prompt: "J’ai peur d’échouer. Motive-moi à avancer malgré ça." },
  { label: "💪 Je veux exploser mes limites", prompt: "Boost-moi pour dépasser mes limites et tout donner." },
];

export default function Boosts() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const envoyerBoost = async (prompt: string) => {
    setLoading(true);
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: prompt }),
    });

    const data = await res.json();
    setMessage(data.reply);
    setLoading(false);
  };

  return (
    <Layout>
      <div className="max-w-xl mx-auto p-4 space-y-6">
        <h1 className="text-2xl font-bold text-center">⚡ Boosts Instantanés</h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {options.map((option) => (
            <button
              key={option.label}
              onClick={() => envoyerBoost(option.prompt)}
              className="bg-purple-600 text-white text-sm rounded p-2 shadow hover:bg-purple-700"
              disabled={loading}
            >
              {option.label}
            </button>
          ))}
        </div>

        {loading && <p className="text-center text-sm text-gray-500">Envoi en cours...</p>}

        {message && (
          <div className="bg-white p-4 border-l-4 border-purple-500 rounded shadow mt-4 text-sm italic text-gray-700">
            {message}
          </div>
        )}
      </div>
    </Layout>
  );
}
