"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, Check, X, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AgeGate() {
  const router = useRouter();
  const [showGate, setShowGate] = React.useState(false);
  const [accessDenied, setAccessDenied] = React.useState(false);

  React.useEffect(() => {
    // Verificar si ya fue verificado
    const isVerified = localStorage.getItem("green-botanics-age-verified");
    if (isVerified !== "true") {
      setShowGate(true);
    }
  }, []);

  const handleConfirm = () => {
    localStorage.setItem("green-botanics-age-verified", "true");
    setShowGate(false);
    router.push("/");
  };

  const handleDeny = () => {
    setAccessDenied(true);
  };

  return (
    <AnimatePresence>
      {showGate && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-2xl px-6"
        >
          {/* Luces de fondo decorativas */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[400px] w-[400px] rounded-full bg-brand/5 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-10 right-10 -z-10 h-[300px] w-[300px] rounded-full bg-purple-exotic/5 blur-[100px] pointer-events-none" />

          <motion.div
            initial={{ scale: 0.95, y: 15 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 15 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="w-full max-w-md bg-[#051610]/95 border border-emerald-500/15 rounded-3xl p-8 text-center shadow-2xl relative overflow-hidden"
          >
            {/* Animación del láser del escáner en el fondo como detalle premium */}
            <div className="absolute inset-x-0 top-0 h-[2px] bg-brand shadow-[0_0_8px_#10b981] animate-pulse pointer-events-none" />

            {!accessDenied ? (
              <div className="space-y-6">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/10 border border-brand/20">
                  <Leaf className="h-7 w-7 text-brand animate-pulse" />
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl font-black text-foreground tracking-tight">
                    Verificación de <span className="text-brand">Edad</span> Obligatoria
                  </h2>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Este sitio contiene productos, flores y derivados de cannabis destinados únicamente para adultos en Colombia. Debes tener al menos 18 años para ingresar.
                  </p>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="outline"
                    onClick={handleDeny}
                    className="flex-1 font-bold h-12 sm:h-10 rounded-xl border-red-500/20 text-red-400 hover:bg-red-950/20 hover:text-red-300 shadow-sm"
                  >
                    <X className="h-4 w-4 mr-2" />
                    <span>Soy menor</span>
                  </Button>
                  <Button
                    variant="primary"
                    onClick={handleConfirm}
                    className="flex-1 font-bold h-12 sm:h-10 rounded-xl shadow-lg shadow-brand/20 text-black"
                  >
                    <Check className="h-4 w-4 mr-2 text-black" />
                    <span>Tengo 18+</span>
                  </Button>
                </div>
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6 py-4"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-950/20 border border-red-500/30">
                  <ShieldAlert className="h-7 w-7 text-red-400 animate-bounce" />
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl font-black text-red-400 tracking-tight">
                    Acceso Restringido
                  </h2>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Lo sentimos, tu acceso ha sido denegado por motivos legales de regulación nacional. Venta exclusiva para mayores de edad en el territorio colombiano.
                  </p>
                </div>

                <div className="pt-4 text-[10px] text-muted-foreground">
                  Ingreso bloqueado por seguridad
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
