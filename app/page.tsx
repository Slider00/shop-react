"use client";

import { motion, Variants } from "framer-motion";
import { ArrowRight, Shield, Award, Droplet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PromoBanner } from "@/features/products/components/promo-banner";
import { ProductGrid } from "@/features/products/components/product-grid";
import { CartDrawer } from "@/features/cart/components/cart-drawer";
import { ComplianceBadges } from "@/components/layout/compliance-badges";
import { useCartStore } from "@/lib/store/useCartStore";
import { useProductStore } from "@/lib/store/useProductStore";

export default function Home() {
  const products = useProductStore((state) => state.products);
  const addItem = useCartStore((state) => state.addItem);
  const featuredProduct = products[0];
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
  };

  return (
    <div className="flex flex-col w-full">
      {/* 1. SECCIÓN HERO */}
      <div className="relative flex flex-col items-center justify-center px-6 py-12 md:py-24 sm:px-8 overflow-hidden min-h-[calc(100vh-6rem)]">
        {/* Imagen de fondo del cultivo de THC */}
        <div className="absolute inset-0 -z-20 pointer-events-none select-none overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-[0.09] dark:opacity-[0.18]"
            style={{ backgroundImage: "url('/promo_cultivo.png')" }}
          />
          {/* Degradado para fundir la imagen con el fondo del sitio */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/60 to-background" />
        </div>

        {/* Elementos Decorativos de Fondo */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[500px] w-[500px] rounded-full bg-brand/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 -z-10 h-[300px] w-[300px] rounded-full bg-purple-exotic/5 blur-[100px] pointer-events-none" />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto flex max-w-7xl flex-col lg:flex-row items-center justify-between gap-16 w-full"
        >
          {/* Lado Izquierdo: Textos y CTAs */}
          <div className="flex flex-col flex-1 text-center lg:text-left space-y-8 max-w-2xl">
            <motion.div variants={itemVariants} className="inline-flex self-center lg:self-start items-center space-x-2 rounded-full bg-emerald-950/30 border border-emerald-500/10 px-4 py-1.5 text-xs text-brand font-medium tracking-wide uppercase">
              <span className="flex h-2 w-2 rounded-full bg-brand animate-pulse" />
              <span>Colección Cosecha Verano 2026</span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl font-extrabold tracking-tight sm:text-6xl text-foreground leading-[1.1]"
            >
              Curaduría <span className="text-brand">Premium</span> de Cannabis y Flores
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-muted-foreground leading-relaxed"
            >
              Selección artesanal de cepas exóticas ricas en terpenos, extractos puros y accesorios de diseño. Cada lote es analizado en laboratorio para garantizar máxima potencia, pureza y legalidad. Exclusivo para adultos.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <Button
                variant="primary"
                size="lg"
                className="w-full sm:w-auto font-semibold"
                onClick={() => {
                  const el = document.getElementById("productos");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <span>Explorar Catálogo</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
                onClick={() => {
                  window.open("/#analisis", "_self");
                }}
              >
                Ver Certificados (COA)
              </Button>
            </motion.div>

            {/* Características rápidas */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-4 border-t border-emerald-500/10 pt-8"
            >
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                <Shield className="h-5 w-5 text-brand mb-2" />
                <h5 className="text-xs font-semibold text-foreground uppercase tracking-wider">100% Legal</h5>
                <p className="text-[10px] text-muted-foreground mt-0.5">Normativa vigente</p>
              </div>
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                <Award className="h-5 w-5 text-gold mb-2" />
                <h5 className="text-xs font-semibold text-foreground uppercase tracking-wider">Top Shelf</h5>
                <p className="text-[10px] text-muted-foreground mt-0.5">Flores seleccionadas</p>
              </div>
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                <Droplet className="h-5 w-5 text-purple-exotic mb-2" />
                <h5 className="text-xs font-semibold text-foreground uppercase tracking-wider">Pureza</h5>
                <p className="text-[10px] text-muted-foreground mt-0.5">Sin pesticidas</p>
              </div>
            </motion.div>
          </div>

          {/* Lado Derecho: Tarjeta Holográfica Interactiva */}
          <motion.div
            variants={itemVariants}
            className="flex-1 flex justify-center items-center w-full max-w-md lg:max-w-none"
          >
            <div className="relative w-full md:aspect-square max-w-[400px] h-auto">
              {/* Círculo luminoso de fondo */}
              <div className="absolute inset-0 bg-gradient-to-tr from-brand/20 to-purple-exotic/20 rounded-full blur-2xl animate-pulse-slow" />

              {/* Tarjeta flotante interactiva */}
              <Card
                glow="green"
                className="relative md:absolute md:inset-0 flex flex-col justify-between p-6 sm:p-8 border border-emerald-500/15 select-none animate-float group"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <span className="rounded-full bg-emerald-500/10 border border-emerald-500/25 px-3 py-1 text-[10px] font-bold text-brand uppercase tracking-wider">
                      {featuredProduct?.strainType || featuredProduct?.category || "Premium"}
                    </span>
                    <span className="text-[10px] font-semibold text-gold tracking-widest uppercase">
                      Premium Cut
                    </span>
                  </div>

                  <h3 className="text-3xl font-extrabold text-foreground group-hover:text-brand transition-colors duration-300">
                    {featuredProduct?.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed line-clamp-3">
                    {featuredProduct?.description}
                  </p>

                  {/* Perfil de Cannabinoides */}
                  <div className="grid grid-cols-2 gap-4 mt-8">
                    <div className="rounded-2xl bg-emerald-950/20 border border-emerald-500/10 p-3 text-center">
                      <span className="text-[10px] text-muted-foreground block uppercase font-medium">THC</span>
                      <span className="text-lg font-black text-brand">
                        {featuredProduct?.thc !== undefined ? `${featuredProduct.thc}%` : "0.0%"}
                      </span>
                    </div>
                    <div className="rounded-2xl bg-emerald-950/20 border border-emerald-500/10 p-3 text-center">
                      <span className="text-[10px] text-muted-foreground block uppercase font-medium">CBD</span>
                      <span className="text-lg font-black text-purple-exotic">
                        {featuredProduct?.cbd !== undefined ? `${featuredProduct.cbd}%` : "0.0%"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Botón de acción rápida en la tarjeta */}
                <div className="mt-8 border-t border-emerald-500/5 pt-6 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] text-muted-foreground block uppercase">Precio estimado</span>
                    <span className="text-xl font-bold text-foreground">${featuredProduct?.price} / g</span>
                  </div>
                  <div
                    onClick={() => featuredProduct && addItem(featuredProduct)}
                    className="h-10 w-10 rounded-full bg-brand flex items-center justify-center text-black font-bold shadow-lg shadow-brand/20 cursor-pointer hover:bg-brand-hover hover:scale-105 transition-all"
                  >
                    +
                  </div>
                </div>
              </Card>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* 1.5. SELLOS Y CERTIFICACIONES REGULATORIAS (COLOMBIA) */}
      <ComplianceBadges />

      {/* 2. BANNER PUBLICITARIO / SLIDER PROMOCIONAL */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 py-8">
        <PromoBanner />
      </div>

      {/* 3. CATÁLOGO DE PRODUCTOS (FILTROS Y GRILLA) */}
      <ProductGrid />

      {/* Carrito Lateral Desplegable */}
      <CartDrawer />
    </div>
  );
}
