import { useEffect } from "react";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
import AuthGuard from "@/components/AuthGuard";
import { isAuthenticated, refreshToken } from "@/lib/auth";
import "@/styles/globals.css";

const publicRoutes = ["/login", "/register"];

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isPublicRoute = publicRoutes.includes(router.pathname);

  useEffect(() => {
    const checkAuth = async () => {
      if (!isPublicRoute && !isAuthenticated()) {
        router.push("/login");
      } else if (isAuthenticated()) {
        await refreshToken();
      }
    };

    checkAuth();
  }, [router, isPublicRoute]);

  if (isPublicRoute) {
    return <Component {...pageProps} />;
  }

  return (
    <Layout>
      <AuthGuard>
        <Component {...pageProps} />
      </AuthGuard>
    </Layout>
  );
}
