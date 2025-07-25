"use client";

import { Header } from "@/components/Header";
import { Dashboard } from "@/components/Dashboard";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export default function Home() {
  const { user, loading } = useAuth();

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 md:py-12">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-16 w-16 animate-spin text-primary" />
            </div>
          ) : user ? (
            <Dashboard />
          ) : (
            <div className="text-center animate-fadeIn py-16">
              <h1 className="text-5xl font-bold tracking-tight font-headline bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                Welcome to Realtime Relay
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
                Your dashboard for live data streams, powered by Firebase. Sign in to see the magic happen.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Button asChild size="lg" className="rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground hover:scale-105 hover:shadow-lg transition-all duration-300">
                  <Link href="/auth">
                    Get Started
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
