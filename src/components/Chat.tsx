import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ModernSection from "@/components/ui/ModernSection";
import ModernCard from "@/components/ui/ModernCard";
import ModernButton from "@/components/ui/ModernButton";
import { initUserProfile, addMessage, UserProfile, ChatMessage } from "@/lib/userTracking";

export default function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const userProfile = initUserProfile();
    setProfile(userProfile);
    setMessages(userProfile.messages.filter(m => m.type === "chat"));
  }, []);

  const sendMessage = async () => {
    if (!input.trim() || !profile) return;
    setError(null);

    const userMessage: Omit<ChatMessage, "id" | "timestamp"> = {
      from: "user",
      text: input,
      type: "chat",
    };

    const updatedProfile = addMessage(userMessage);
    setProfile(updatedProfile);
    setMessages(updatedProfile.messages.filter(m => m.type === "chat"));
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      if (!res.ok) {
        throw new Error(`Erreur ${res.status}: ${res.statusText}`);
      }

      const data = await res.json();
      const botMessage: Omit<ChatMessage, "id" | "timestamp"> = {
        from: "bot",
        text: data.reply,
        type: "chat",
      };

      const finalProfile = addMessage(botMessage);
      setProfile(finalProfile);
      setMessages(finalProfile.messages.filter(m => m.type === "chat"));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
      const errorMessage: Omit<ChatMessage, "id" | "timestamp"> = {
        from: "bot",
        text: "Oups ! Erreur de communication avec ton coach. Réessaye.",
        type: "chat",
      };
      const errorProfile = addMessage(errorMessage);
      setProfile(errorProfile);
      setMessages(errorProfile.messages.filter(m => m.type === "chat"));
    }

    setLoading(false);
  };

  if (!profile) return null;

  return (
    <ModernSection
      title="🧠 Chat avec ton Coach IA"
      description={`${profile.stats.totalMessages} messages échangés - Niveau ${profile.stats.niveau}`}
    >
      <div className="space-y-4">
        <ModernCard
          gradientFrom="from-blue-50"
          gradientTo="to-indigo-50"
          className="h-[60vh] overflow-hidden flex flex-col"
        >
          <div className="flex-1 overflow-y-auto space-y-4 p-4">
            <AnimatePresence>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`p-4 rounded-xl max-w-[80%] ${
                    msg.from === "user"
                      ? "bg-blue-100 self-end ml-auto"
                      : "bg-gray-100 self-start mr-auto"
                  }`}
                >
                  <p className="text-gray-800">{msg.text}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-gray-400 flex items-center gap-2"
              >
                <div className="w-4 h-4 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
                Coach HeroInside réfléchit...
              </motion.div>
            )}
          </div>

          <div className="p-4 border-t border-gray-200">
            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                {error}
              </div>
            )}
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                className="flex-1 border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Dis quelque chose à ton coach..."
              />
              <ModernButton
                onClick={sendMessage}
                disabled={loading}
                className="px-6"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Envoi...</span>
                  </div>
                ) : (
                  "Envoyer"
                )}
              </ModernButton>
            </div>
          </div>
        </ModernCard>
      </div>
    </ModernSection>
  );
}
