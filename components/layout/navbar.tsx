"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf, ShoppingBag, Menu, X, ShieldCheck, Sun, Moon, User as UserIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store/useCartStore";
import { useTheme } from "@/hooks/useTheme";
import { useAuthStore } from "@/lib/store/useAuthStore";

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  const { cart, toggleOpen } = useCartStore();
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, user } = useAuthStore();

  React.useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Flores", href: "/flores" },
    { name: "Extractos", href: "/extractos" },
    { name: "Accesorios", href: "/accesorios" },
    { name: "Bienestar", href: "/bienestar" },
    { name: "Nosotros", href: "/#nosotros" },
  ];

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 flex flex-col",
          isScrolled ? "glass-navbar shadow-xl shadow-black/10" : "bg-transparent"
        )}
      >
        <div className={cn("w-full transition-all duration-300", isScrolled ? "py-4" : "py-6")}>
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 sm:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative hidden sm:flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 border border-brand/20 transition-colors group-hover:bg-brand/20">
              <Leaf className="h-5 w-5 text-brand" />
              <div className="absolute inset-0 -z-10 rounded-xl bg-brand/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="text-lg font-bold tracking-widest text-foreground">
              GREEN <span className="text-brand">BOTANICS</span>
            </span>
          </Link>

          {/* Enlaces Desktop */}
          {!isAuthenticated && (
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-brand relative py-1",
                    pathname === link.href ? "text-brand" : "text-muted-foreground"
                  )}
                >
                  {link.name}
                  {pathname === link.href && (
                    <motion.div
                      layoutId="navbar-underline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand"
                    />
                  )}
                </Link>
              ))}
            </nav>
          )}

          {/* Acciones */}
          <div className="flex items-center space-x-4">
            {/* Indicador +18 / Verificación */}
            <div className="hidden sm:flex items-center space-x-1.5 rounded-full bg-emerald-950/30 border border-emerald-500/20 px-3 py-1 text-xs text-brand font-medium">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Verificado +18</span>
            </div>



            {/* Bandera de Colombia 🇨🇴 */}
            <div className="flex items-center space-x-1.5 px-2 sm:px-2.5 py-1.5 rounded-full border border-emerald-500/10 bg-card-bg hover:border-brand/25 transition-all select-none shrink-0">
              <div className="w-4.5 h-3 flex flex-col rounded-[2px] overflow-hidden border border-white/5 dark:border-white/10 shrink-0">
                <div className="bg-[#FCD116] h-[50%] w-full" />
                <div className="bg-[#003893] h-[25%] w-full" />
                <div className="bg-[#CE1126] h-[25%] w-full" />
              </div>
              <span className="text-[9px] font-black text-foreground tracking-wider hidden sm:inline">CO</span>
            </div>

            {/* Botón Acceso Admin / Registro */}
            <Link
              href={isAuthenticated ? "/admin" : "/admin/register"}
              className={cn(
                "h-10 px-3 sm:px-4 rounded-full border flex items-center justify-center space-x-1.5 cursor-pointer transition-all select-none",
                isAuthenticated
                  ? "border-brand/35 bg-brand/5 hover:bg-brand/10 text-brand shadow-lg shadow-brand/10"
                  : "border-emerald-500/10 hover:border-brand/35 bg-card-bg hover:bg-emerald-950/20 text-foreground"
              )}
              title={isAuthenticated ? `Panel de Admin (${user?.name})` : "Iniciar Sesión / Registro"}
            >
              <UserIcon className="h-4.5 w-4.5" />
              <span className="text-[10px] font-bold tracking-wider hidden sm:inline">
                {isAuthenticated ? "Admin" : "Acceso"}
              </span>
            </Link>

            {/* Botón Carrito */}
            {!isAuthenticated && (
              <Button
                variant="outline"
                size="sm"
                onClick={toggleOpen}
                className="relative h-10 w-10 rounded-full border-emerald-500/10 hover:border-brand/35 bg-card-bg hover:bg-emerald-950/20 p-0 flex items-center justify-center cursor-pointer"
              >
                <ShoppingBag className="h-4.5 w-4.5 text-foreground hover:text-brand transition-colors" />
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand text-[9px] font-bold text-black ring-2 ring-background">
                  {mounted ? cartItemCount : 0}
                </span>
              </Button>
            )}

            {/* Menú Móvil Toggle */}
            {!isAuthenticated && (
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-500/10 bg-card-bg text-foreground hover:bg-emerald-950/15 md:hidden cursor-pointer"
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            )}
          </div>
        </div>
      </div>

        {/* Barra de Advertencia Legal en la parte inferior del Header */}
        {!isMobileMenuOpen && (
          <div className="w-full bg-red-950/45 border-t border-b border-red-500/10 py-1.5 px-6 text-center backdrop-blur-md">
            <div className="max-w-7xl mx-auto flex items-center justify-center space-x-2 text-[8px] sm:text-[9px] font-black text-red-400 tracking-widest uppercase">
              <span className="bg-red-500 text-black text-[7px] font-black px-1.5 py-0.5 rounded-sm select-none shrink-0">
                +18 ADVERTENCIA
              </span>
              <span className="truncate sm:whitespace-normal">PRODUCTO EXCLUSIVO PARA MAYORES DE EDAD. EL CONSUMO DE CANNABIS EN MENORES DE EDAD PUEDE AFECTAR SU DESARROLLO.</span>
            </div>
          </div>
        )}
      </header>

      {/* Menú Móvil Lateral */}
      <AnimatePresence>
        {isMobileMenuOpen && !isAuthenticated && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            />

            {/* Menú Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 z-40 w-72 bg-background border-l border-emerald-500/10 p-6 pt-24 md:hidden flex flex-col justify-between"
            >
              <nav className="flex flex-col space-y-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "text-lg font-medium transition-colors hover:text-brand",
                      pathname === link.href ? "text-brand" : "text-muted-foreground"
                    )}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>

              <div className="space-y-4">
                <div className="flex items-center space-x-2 rounded-2xl bg-emerald-950/20 border border-emerald-500/10 p-4 text-xs text-brand">
                  <ShieldCheck className="h-5 w-5 shrink-0" />
                  <div>
                    <p className="font-semibold">Acceso Exclusivo +18</p>
                    <p className="text-muted-foreground">Productos restringidos por ley.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
