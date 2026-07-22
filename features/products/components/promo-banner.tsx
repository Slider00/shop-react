"use client";

import * as React from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { mockPromos } from "@/lib/mockData";
import { Button } from "@/components/ui/button";

export function PromoBanner() {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [direction, setDirection] = React.useState(0); // -1: left, 1: right
  const [isHovered, setIsHovered] = React.useState(false);

  React.useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(interval);
  }, [currentSlide, isHovered]);

  const handleNext = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % mockPromos.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + mockPromos.length) % mockPromos.length);
  };

  const handleDotClick = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  const slideVariants: Variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
      transition: {
        x: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
      },
    }),
  };

  const activePromo = mockPromos[currentSlide];

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full overflow-hidden rounded-3xl border border-emerald-500/10 bg-black min-h-[300px] sm:min-h-[360px] flex items-center shadow-2xl"
    >
      {/* Fondo degradado dinámico */}
      <div className={`absolute inset-0 bg-gradient-to-r ${activePromo.gradient} opacity-80 transition-all duration-700 -z-10`} />
      
      {/* Efectos decorativos de resplandor */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -z-10 h-64 w-64 rounded-full bg-brand/10 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 -z-10 h-48 w-48 rounded-full bg-amber-500/10 blur-[80px] pointer-events-none" />

      <div className="w-full px-8 py-12 sm:px-12 md:px-16 flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="flex-1 max-w-2xl overflow-hidden relative min-h-[180px] flex items-center">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentSlide}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="flex flex-col items-start space-y-4"
            >
              {/* Badge */}
              <span className="inline-flex items-center space-x-1.5 rounded-full bg-brand/10 border border-brand/20 px-3 py-1 text-[10px] font-bold text-brand uppercase tracking-wider">
                <Sparkles className="h-3 w-3" />
                <span>{activePromo.badge}</span>
              </span>

              {/* Título principal con realce */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground tracking-tight leading-tight">
                {activePromo.title} <br />
                <span className="text-brand bg-clip-text bg-gradient-to-r from-brand to-emerald-400">
                  {activePromo.highlightText}
                </span>
              </h2>

              {/* Subtítulo / Descripción */}
              <p className="text-sm sm:text-base text-muted-foreground max-w-md leading-relaxed">
                {activePromo.subtitle}
              </p>

              {/* CTA Button */}
              <Button
                variant="primary"
                size="md"
                className="mt-2 font-semibold"
                onClick={() => {
                  window.location.hash = activePromo.link.split("#")[1] || "";
                }}
              >
                {activePromo.ctaText}
              </Button>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Lado derecho: Imagen de publicidad real generada */}
        <div className="hidden md:flex flex-1 items-center justify-end relative h-64">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ scale: 0.9, opacity: 0, rotate: 2 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.9, opacity: 0, rotate: -2 }}
              transition={{ duration: 0.4 }}
              className="relative w-[440px] h-[250px] rounded-3xl border border-emerald-500/15 overflow-hidden shadow-2xl"
            >
              <img
                src={activePromo.image}
                alt={activePromo.title}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              {/* Overlay de gradiente inferior */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
              
              {/* Info superpuesta sutil */}
              <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end text-[10px] font-bold text-foreground">
                <span className="bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-full border border-white/5">
                  Green Botanics
                </span>
                <span className="text-brand bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-full border border-white/5 uppercase tracking-wider">
                  Certificado COA
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Controles de flecha en Desktop */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-card-bg/40 border border-white/5 text-foreground hover:border-brand/30 hover:bg-emerald-950/20 flex items-center justify-center cursor-pointer transition-colors opacity-0 hover:opacity-100 group-hover:opacity-100 hidden sm:flex"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-card-bg/40 border border-white/5 text-foreground hover:border-brand/30 hover:bg-emerald-950/20 flex items-center justify-center cursor-pointer transition-colors opacity-0 hover:opacity-100 group-hover:opacity-100 hidden sm:flex"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Dots indicadores */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {mockPromos.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              currentSlide === index ? "w-6 bg-brand" : "w-2 bg-emerald-500/30 hover:bg-emerald-500/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
