"use client";

import Link from "next/link";
import { Leaf } from "lucide-react";
import { useAuthStore } from "@/lib/store/useAuthStore";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return (
      <footer className="w-full bg-background border-t border-emerald-500/10 py-6 mt-auto">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="flex items-center space-x-2">
            <Leaf className="h-4 w-4 text-brand animate-pulse" />
            <span className="font-bold tracking-widest text-foreground">
              GREEN <span className="text-brand">BOTANICS</span>
            </span>
            <span className="text-[9px] font-extrabold text-brand bg-brand/5 border border-brand/20 rounded-full px-2 py-0.5 uppercase tracking-wide">
              Admin Portal
            </span>
          </div>
          <p>© {currentYear} Green Botanics. Todos los derechos reservados.</p>
        </div>
      </footer>
    );
  }

  return (
    <footer className="w-full bg-background border-t border-emerald-500/10 mt-auto">
      <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Columna Marca */}
            <div className="space-y-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand/10 border border-brand/20">
                  <Leaf className="h-4 w-4 text-brand" />
                </div>
                <span className="text-md font-bold tracking-widest text-foreground">
                  GREEN <span className="text-brand">BOTANICS</span>
                </span>
              </Link>
              <p className="text-xs text-muted-foreground leading-5">
                Boutique exclusiva de flores y extractos de cáñamo premium. Curaduría artesanal con los más altos estándares de calidad y legalidad.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">Productos</h4>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li><Link href="/flores" className="hover:text-brand transition-colors">Flores Premium (Buds)</Link></li>
                <li><Link href="/extractos" className="hover:text-brand transition-colors">Extractos & Rosin</Link></li>
                <li><Link href="/bienestar" className="hover:text-brand transition-colors">Bienestar & Hongos</Link></li>
                <li><Link href="/#edibles" className="hover:text-brand transition-colors">Edibles Cuidado</Link></li>
                <li><Link href="/accesorios" className="hover:text-brand transition-colors">Vaporizadores & Accesorios</Link></li>
              </ul>
            </div>

            {/* Columna Información */}
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">Información</h4>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li><Link href="/#nosotros" className="hover:text-brand transition-colors">Sobre Nosotros</Link></li>
                <li><Link href="/#cultivo" className="hover:text-brand transition-colors">Método de Cultivo</Link></li>
                <li><Link href="/#analisis" className="hover:text-brand transition-colors">Análisis de Laboratorio (COA)</Link></li>
                <li><Link href="/#soporte" className="hover:text-brand transition-colors">Contacto & Soporte</Link></li>
              </ul>
            </div>

            {/* Columna Legal */}
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">Legal</h4>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li><Link href="/#terminos" className="hover:text-brand transition-colors">Términos de Servicio</Link></li>
                <li><Link href="/#privacidad" className="hover:text-brand transition-colors">Política de Privacidad</Link></li>
                <li><Link href="/#envios" className="hover:text-brand transition-colors">Políticas de Envío</Link></li>
                <li><Link href="/#responsabilidad" className="hover:text-brand transition-colors">Exención de Responsabilidad</Link></li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-emerald-500/5 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground gap-4">
            <p>© {currentYear} Green Botanics. Todos los derechos reservados.</p>
            <div className="flex space-x-6">
              <span>Diseño Premium 2026</span>
            </div>
          </div>
        </div>
    </footer>
  );
}
