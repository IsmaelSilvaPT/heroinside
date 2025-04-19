import Link from "next/link";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

const links = [
  { label: "Accueil", icon: "🏠", path: "/" },
  { label: "Chat", icon: "🧠", path: "/chat" },
  { label: "Objectifs", icon: "🎯", path: "/objectifs" },
  { label: "Parcours", icon: "📈", path: "/parcours" },
  { label: "Boosts", icon: "⚡", path: "/boosts" },
  { label: "Citations", icon: "✨", path: "/citations" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <main className="pb-24">{children}</main>
      <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-gray-100 shadow-lg flex justify-around items-center h-20 z-50">
        {links.map((link) => (
          <Link
            key={link.path}
            href={link.path}
            className={`flex flex-col items-center justify-center w-full h-full transition-all duration-300 ${
              router.pathname === link.path ? "text-blue-600" : "text-gray-400"
            }`}
          >
            <motion.span
              className="text-2xl"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {link.icon}
            </motion.span>
            <span className="text-xs mt-1">{link.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
