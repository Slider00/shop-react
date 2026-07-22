"use client";

import { motion, Variants } from "framer-motion";
import { ShieldCheck, FileCheck, Sprout, FlaskConical, Award } from "lucide-react";
import { Card } from "@/components/ui/card";

export function ComplianceBadges() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } },
  };

  const badges = [
    {
      icon: <FileCheck className="h-6 w-6 text-brand" />,
      title: "Licencias MinJusticia",
      subtitle: "Ministerio de Justicia",
      description: "Operamos bajo licencias vigentes para el cultivo de plantas de cannabis no psicoactivo y la fabricación de derivados.",
      tag: "Decreto 811",
    },
    {
      icon: <Sprout className="h-6 w-6 text-brand" />,
      title: "Registro ICA",
      subtitle: "Sanidad Vegetal",
      description: "Nuestras semillas y cultivos cuentan con registro y evaluación agronómica aprobada por el Instituto Colombiano Agropecuario.",
      tag: "Resolución ICA",
    },
    {
      icon: <FlaskConical className="h-6 w-6 text-purple-exotic" />,
      title: "Certificación COA",
      subtitle: "Límite THC < 1.0%",
      description: "Cada lote es analizado por laboratorios acreditados para asegurar niveles de THC inferiores al 1.0% de acuerdo a la ley colombiana.",
      tag: "100% Legal",
    },
    {
      icon: <Award className="h-6 w-6 text-gold" />,
      title: "Buenas Prácticas",
      subtitle: "BPM / Calidad",
      description: "Procesos de extracción ejecutados bajo estrictos lineamientos de manufactura limpia para asegurar pureza e inocuidad.",
      tag: "Apto INVIMA",
    },
  ];

  return (
    <section id="analisis" className="w-full max-w-7xl mx-auto px-6 py-12 sm:px-8 border-t border-emerald-500/10">
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
        <div className="inline-flex items-center space-x-1.5 rounded-full bg-emerald-950/20 border border-emerald-500/10 px-3 py-1 text-[10px] text-brand font-bold uppercase tracking-wider">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>Garantía y Legalidad en Colombia</span>
        </div>
        <h2 className="text-2xl font-black text-foreground sm:text-3xl tracking-tight">
          Cumplimiento <span className="text-brand">Regulatorio</span> Nacional
        </h2>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Nuestra operación y cadena de valor cumple de forma estricta con el marco legal colombiano establecido para derivados de cáñamo y uso medicinal.
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {badges.map((badge, idx) => (
          <motion.div key={idx} variants={itemVariants}>
            <Card
              glow="none"
              hoverEffect={true}
              className="flex flex-col justify-between h-full p-6 border border-emerald-500/10 dark:border-emerald-500/15 bg-card-bg hover:border-brand/20 transition-all duration-300"
            >
              <div>
                {/* Cabecera de la insignia */}
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 rounded-xl bg-emerald-950/20 border border-emerald-500/10">
                    {badge.icon}
                  </div>
                  <span className="text-[9px] font-extrabold tracking-widest text-brand uppercase bg-brand/5 border border-brand/20 rounded-full px-2 py-0.5">
                    {badge.tag}
                  </span>
                </div>

                {/* Textos */}
                <h3 className="text-md font-bold text-foreground mb-1">{badge.title}</h3>
                <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider block mb-3">
                  {badge.subtitle}
                </span>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {badge.description}
                </p>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
