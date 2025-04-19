import Layout from "@/components/Layout";
import ModernSection from "@/components/ui/ModernSection";
import ModernCard from "@/components/ui/ModernCard";
import ModernGrid from "@/components/ui/ModernGrid";
import ModernButton from "@/components/ui/ModernButton";

export default function Accueil() {
  return (
    <Layout>
      <ModernSection
        title="Bienvenue sur HeroInside 💫"
        description="Ton coach de vie, ton allié mental, ton copilote."
      >
        <ModernCard className="text-center p-8">
          <p className="text-2xl italic text-blue-600 font-medium">
            "Le changement commence toujours par une seule décision."
          </p>
        </ModernCard>

        <ModernGrid cols={2}>
          <ModernCard gradientFrom="from-blue-50" gradientTo="to-purple-50">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">
              Démarre ton parcours
            </h3>
            <p className="text-gray-600 mb-4">
              Commence par définir tes objectifs et construis ton chemin vers le succès.
            </p>
            <ModernButton variant="primary" fullWidth>
              Commencer
            </ModernButton>
          </ModernCard>

          <ModernCard gradientFrom="from-purple-50" gradientTo="to-pink-50">
            <h3 className="text-xl font-semibold text-purple-600 mb-2">
              Suis tes progrès
            </h3>
            <p className="text-gray-600 mb-4">
              Visualise tes accomplissements et célèbre chaque étape de ta transformation.
            </p>
            <ModernButton variant="outline" fullWidth>
              Voir mes progrès
            </ModernButton>
          </ModernCard>
        </ModernGrid>

        <ModernGrid cols={3} className="mt-8">
          <ModernCard gradientFrom="from-green-50" gradientTo="to-teal-50">
            <h3 className="text-lg font-semibold text-green-600 mb-2">
              Citations inspirantes
            </h3>
            <p className="text-gray-600">
              Des mots qui motivent et inspirent ton parcours.
            </p>
          </ModernCard>

          <ModernCard gradientFrom="from-yellow-50" gradientTo="to-orange-50">
            <h3 className="text-lg font-semibold text-yellow-600 mb-2">
              Boosts quotidiens
            </h3>
            <p className="text-gray-600">
              Des défis et des conseils pour chaque jour.
            </p>
          </ModernCard>

          <ModernCard gradientFrom="from-pink-50" gradientTo="to-red-50">
            <h3 className="text-lg font-semibold text-pink-600 mb-2">
              Communauté
            </h3>
            <p className="text-gray-600">
              Partage et échange avec d'autres personnes motivées.
            </p>
          </ModernCard>
        </ModernGrid>
      </ModernSection>
    </Layout>
  );
}
