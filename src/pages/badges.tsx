import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import ModernSection from "@/components/ui/ModernSection";
import ModernBadge from "@/components/ui/ModernBadge";
import ModernGrid from "@/components/ui/ModernGrid";
import { motion, AnimatePresence } from "framer-motion";

const badges = [
  {
    id: "checkup1",
    icon: "🧠",
    title: "Premier Check-up",
    description: "Complète ton premier check-up émotionnel",
    category: "Émotions",
  },
  {
    id: "boost1",
    icon: "⚡",
    title: "Boost IA",
    description: "Utilise le boost IA pour la première fois",
    category: "Technologie",
  },
  {
    id: "objectif1",
    icon: "🎯",
    title: "Objectif Atteint",
    description: "Atteins ton premier objectif",
    category: "Progression",
  },
  {
    id: "streak3",
    icon: "🔥",
    title: "Streak de 3 jours",
    description: "Utilise l'application pendant 3 jours consécutifs",
    category: "Engagement",
  },
  {
    id: "streak7",
    icon: "🌟",
    title: "Streak de 7 jours",
    description: "Utilise l'application pendant 7 jours consécutifs",
    category: "Engagement",
  },
  {
    id: "niveau5",
    icon: "🏆",
    title: "Niveau 5",
    description: "Atteins le niveau 5",
    category: "Progression",
  },
];

const categories = [...new Set(badges.map((badge) => badge.category))];

export default function Badges() {
  const [unlockedBadges, setUnlockedBadges] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("Tous");

  useEffect(() => {
    const saved = localStorage.getItem("hero-badges");
    if (saved) setUnlockedBadges(JSON.parse(saved));
  }, []);

  const filteredBadges = badges.filter(
    (badge) => selectedCategory === "Tous" || badge.category === selectedCategory
  );

  const unlockedCount = unlockedBadges.length;
  const totalBadges = badges.length;

  return (
    <Layout>
      <ModernSection
        title="🏆 Badges"
        description={`${unlockedCount}/${totalBadges} badges débloqués`}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="flex flex-wrap gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory("Tous")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === "Tous"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Tous
            </motion.button>
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ModernGrid cols={2}>
                {filteredBadges.map((badge) => (
                  <ModernBadge
                    key={badge.id}
                    icon={badge.icon}
                    title={badge.title}
                    description={badge.description}
                    unlocked={unlockedBadges.includes(badge.id)}
                    category={badge.category}
                  />
                ))}
              </ModernGrid>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </ModernSection>
    </Layout>
  );
}