import { useState } from 'react';
import { LoginForm } from '@/components/auth/LoginForm';
import { SignUpForm } from '@/components/auth/SignUpForm';
import { Button } from '@/components/ui/button';
import ModernCard from '@/components/ui/ModernCard';
import ModernSection from '@/components/ui/ModernSection';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center p-4">
      <ModernSection className="max-w-md w-full">
        <ModernCard>
          <div className="p-6">
            <h1 className="text-2xl font-bold text-center mb-6">
              {isLogin ? 'Connexion' : 'Inscription'}
            </h1>
            
            {isLogin ? <LoginForm /> : <SignUpForm />}
            
            <div className="mt-4 text-center">
              <Button
                variant="ghost"
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm"
              >
                {isLogin
                  ? "Pas encore de compte ? S'inscrire"
                  : 'Déjà un compte ? Se connecter'}
              </Button>
            </div>
          </div>
        </ModernCard>
      </ModernSection>
    </div>
  );
} 