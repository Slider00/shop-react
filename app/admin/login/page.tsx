"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ShieldAlert, LogIn, Lock, ArrowRight } from "lucide-react";
import { useAuthStore, User } from "@/lib/store/useAuthStore";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const loginUser = useAuthStore((state) => state.login);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // Redirigir si ya está logueado
  React.useEffect(() => {
    if (isAuthenticated) {
      router.push("/admin");
    }
  }, [isAuthenticated, router]);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Por favor ingresa tu correo y contraseña.");
      return;
    }

    // Para fines prácticos de prueba, permitimos iniciar sesión con cualquier credencial válida
    // o con una por defecto si no se han registrado.
    const defaultUser: User = {
      name: "Julián Castro",
      email: email,
      cedula: "1020304050",
      birthDate: "1995-05-15",
      role: "admin",
    };

    loginUser(defaultUser);
    router.push("/admin");
  };

  return (
    <div className="min-h-[calc(100vh-6rem)] w-full flex items-center justify-center px-6 py-12 relative overflow-hidden z-0">
      {/* Video de Fondo: Cultivo en bucle */}
      <div className="absolute inset-0 -z-20 w-full h-full overflow-hidden">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover scale-105 pointer-events-none select-none opacity-95 dark:opacity-85"
        >
          <source src="/weedgif.mp4" type="video/mp4" />
        </video>
        {/* Capa de vidrio esmerilado para garantizar contraste y elegancia (Más clara y visible) */}
        <div className="absolute inset-0 bg-[#022c22]/30 dark:bg-black/45 backdrop-blur-[3px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/30" />
      </div>

      <Card glow="green" hoverEffect={false} className="w-full max-w-md mx-auto p-8 sm:p-10 border border-emerald-500/15 bg-card-bg/95 backdrop-blur-2xl rounded-3xl">
        
        {/* Cabecera */}
        <div className="text-center mb-8 space-y-2">
          <div className="inline-flex items-center space-x-1.5 rounded-full bg-emerald-950/20 border border-emerald-500/10 px-3 py-1 text-[10px] text-brand font-bold uppercase tracking-wider">
            <Lock className="h-3 w-3" />
            <span>Módulo de Control de Acceso</span>
          </div>
          <h2 className="text-3xl font-black text-foreground tracking-tight">
            Iniciar Sesión <span className="text-brand">Admin</span>
          </h2>
          <p className="text-xs text-muted-foreground">
            Ingresa al portal de administración para gestionar el catálogo.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-red-950/20 border border-red-500/20 text-xs text-red-400 flex items-center">
            <ShieldAlert className="h-4 w-4 mr-2 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Correo Electrónico</label>
            <input
              type="email"
              required
              placeholder="admin@greenbotanics.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-11 px-4 rounded-full border border-emerald-500/15 bg-black/40 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all shadow-inner"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Contraseña</label>
            <input
              type="password"
              required
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-11 px-4 rounded-full border border-emerald-500/15 bg-black/40 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all shadow-inner"
            />
          </div>

          <Button variant="primary" size="lg" type="submit" className="w-full font-bold flex items-center justify-center space-x-2 mt-6">
            <LogIn className="h-4 w-4" />
            <span>Iniciar Sesión</span>
          </Button>

          <div className="text-center pt-4">
            <span className="text-xs text-muted-foreground">
              ¿No tienes una cuenta de administrador?{" "}
              <Link href="/admin/register" className="text-brand hover:underline font-bold">
                Regístrate Aquí
              </Link>
            </span>
          </div>
        </form>

      </Card>
    </div>
  );
}
