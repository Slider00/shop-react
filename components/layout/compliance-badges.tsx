"use client";

import { motion, Variants } from "framer-motion";
import { Sparkles, Leaf, FlaskConical, Truck, Award } from "lucide-react";
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

  const benefits = [
    {
      icon: <Leaf className="h-6 w-6 text-brand" />,
      title: "Cultivo de Autor",
      subtitle: "100% Orgánico & Cuidado",
      description: "Flores criadas bajo invernaderos con luz solar controlada, libres de pesticidas químicos y cosechadas a mano en su punto óptimo.",
      tag: "Artesanal",
    },
    {
      icon: <Sparkles className="h-6 w-6 text-brand animate-pulse" />,
      title: "Efecto Entourage Real",
      subtitle: "Perfil Completo de Terpenos",
      description: "Nuestros extractos y flores preservan la sinergia natural de cannabinoides para maximizar el bienestar, aroma y potencia.",
      tag: "Pureza Top",
    },
    {
      icon: <FlaskConical className="h-6 w-6 text-purple-exotic" />,
      title: "Análisis Certificado (COA)",
      subtitle: "Transparencia Total en Lotes",
      description: "Cada cosecha cuenta con un reporte químico detallado mediante código QR para verificar la concentración exacta de cannabinoides.",
      tag: "Garantía Lab",
    },
    {
      icon: <Truck className="h-6 w-6 text-gold" />,
      title: "Envío Express Discreto",
      subtitle: "Empaque Hermético Antiolores",
      description: "Despachos en cajas premium sin logotipos ni aromas externos, asegurando absoluta privacidad directo a tu puerta en 24-48 horas.",
      tag: "Delivery VIP",
    },
  ];

  return (
    <section id="beneficios" className="w-full max-w-7xl mx-auto px-6 py-16 sm:px-8 border-t border-emerald-500/10">
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
        <div className="inline-flex items-center space-x-1.5 rounded-full bg-emerald-950/20 border border-emerald-500/10 px-3 py-1 text-[10px] text-brand font-bold uppercase tracking-wider">
          <Award className="h-3.5 w-3.5 text-brand" />
          <span>La Experiencia Premium de Green Botanics</span>
        </div>
        <h2 className="text-2xl font-black text-foreground sm:text-3xl tracking-tight">
          ¿Por Qué Elegir Nuestro <span className="text-brand">Catálogo Boutique</span>?
        </h2>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Nos enfocamos en ofrecer una experiencia de cannabis superior e inigualable en Colombia, combinando ciencia de extracción, curaduría artesanal y máxima discreción.
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {benefits.map((benefit, idx) => (
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
                    {benefit.icon}
                  </div>
                  <span className="text-[9px] font-extrabold tracking-widest text-brand uppercase bg-brand/5 border border-brand/20 rounded-full px-2 py-0.5">
                    {benefit.tag}
                  </span>
                </div>

                {/* Textos */}
                <h3 className="text-md font-bold text-foreground mb-1">{benefit.title}</h3>
                <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider block mb-3">
                  {benefit.subtitle}
                </span>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
