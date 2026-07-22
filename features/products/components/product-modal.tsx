"use client";

import * as React from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Plus, Minus, ShoppingBag, Star, Flame, Award, Heart } from "lucide-react";
import { Product } from "@/lib/mockData";
import { useCartStore } from "@/lib/store/useCartStore";
import { Button } from "@/components/ui/button";

export interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

// Fallback de imágenes de alta resolución según categoría
const categoryImages: Record<string, string[]> = {
  flores: ["/promo_harvest.png", "/promo_cultivo.png", "/promo_delivery.png"],
  extractos: ["/promo_rosin.png", "/promo_delivery.png", "/promo_harvest.png"],
  bienestar: ["/promo_cultivo.png", "/promo_harvest.png", "/promo_delivery.png"],
  edibles: ["/promo_rosin.png", "/promo_delivery.png"],
  accesorios: ["/promo_delivery.png", "/promo_rosin.png"],
};

export function ProductModal({ product, onClose }: ProductModalProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const [quantity, setQuantity] = React.useState(1);

  // Bloquear scroll al abrir
  React.useEffect(() => {
    if (product) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [product]);

  // Obtener imágenes reales o fallback
  const images = product.images || categoryImages[product.category] || ["/promo_harvest.png"];

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleAddToCart = () => {
    // Añadir N cantidad de veces
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    onClose();
  };

  const backdropVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { type: "spring" as const, stiffness: 300, damping: 25 } 
    },
    exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.2 } }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
        />

        {/* Modal Content */}
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="relative w-full max-w-4xl rounded-3xl bg-card-bg border border-emerald-500/15 overflow-hidden shadow-2xl backdrop-blur-2xl flex flex-col md:flex-row z-10 text-foreground"
        >
          {/* Lado Izquierdo: Galería Multimedia */}
          <div className="flex-1 bg-black/40 relative flex flex-col justify-center min-h-[300px] md:min-h-[450px]">
            {/* Tag en la imagen */}
            <div className="absolute top-4 left-4 z-10 flex gap-2">
              {product.isBestSeller && (
                <span className="rounded-full bg-amber-500/10 border border-amber-500/30 px-3 py-1 text-[9px] font-extrabold text-gold uppercase tracking-wider">
                  Más Vendido
                </span>
              )}
              {product.isNew && (
                <span className="rounded-full bg-brand/10 border border-brand/35 px-3 py-1 text-[9px] font-extrabold text-brand uppercase tracking-wider">
                  Nuevo Lote
                </span>
              )}
            </div>

            {/* Slider de imágenes */}
            <div className="relative flex-1 flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={images[currentImageIndex]}
                  alt={`${product.name} - slide ${currentImageIndex}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full object-cover aspect-video md:aspect-auto"
                />
              </AnimatePresence>

              {/* Degradado para fundir */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

              {/* Controles del Slider */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/50 hover:bg-brand/20 border border-white/5 hover:border-brand/40 text-foreground flex items-center justify-center cursor-pointer transition-all hover:scale-105"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/50 hover:bg-brand/20 border border-white/5 hover:border-brand/40 text-foreground flex items-center justify-center cursor-pointer transition-all hover:scale-105"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>

            {/* Miniaturas de selección inferiores */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center space-x-2 bg-black/40 px-3 py-1.5 rounded-full border border-white/5 backdrop-blur-sm">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex(index);
                    }}
                    className={`h-2.5 w-2.5 rounded-full transition-all cursor-pointer ${
                      currentImageIndex === index ? "bg-brand w-5" : "bg-muted-foreground/50 hover:bg-foreground"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Lado Derecho: Información detallada */}
          <div className="flex-1 p-6 md:p-8 flex flex-col justify-between overflow-y-auto max-h-[500px] md:max-h-none">
            {/* Botón Cerrar */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 h-10 w-10 rounded-full bg-card-bg border border-emerald-500/10 hover:border-brand/35 text-muted-foreground hover:text-foreground flex items-center justify-center cursor-pointer transition-colors z-20 shadow-lg"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="space-y-6">
              {/* Categoría / Cepa */}
              <div className="flex flex-wrap gap-2 items-center">
                {product.strainType && (
                  <span className="rounded-full bg-emerald-500/10 border border-emerald-500/25 px-3 py-1 text-[10px] font-bold text-brand uppercase tracking-wider">
                    {product.strainType}
                  </span>
                )}
                <span className="text-[10px] font-bold uppercase text-gold tracking-widest bg-emerald-950/20 px-3 py-1 rounded-full border border-emerald-500/5">
                  {product.category}
                </span>
                <div className="flex items-center text-xs text-gold ml-auto">
                  <Star className="h-4 w-4 fill-gold text-gold mr-1" />
                  <span className="font-bold">{product.rating}</span>
                  <span className="text-muted-foreground ml-1">({product.reviewsCount})</span>
                </div>
              </div>

              {/* Título y Descripción completa */}
              <div>
                <h2 className="text-3xl font-black text-foreground tracking-tight leading-none">
                  {product.name}
                </h2>
                <div className="mt-4 prose prose-invert">
                  <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                    {product.description}
                  </p>
                </div>
              </div>

              {/* Perfil Técnico de Laboratorio */}
              {(product.thc !== undefined || product.cbd !== undefined) && (
                <div className="space-y-3">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground block">
                    Perfil Químico (Laboratorio):
                  </span>
                  <div className="grid grid-cols-2 gap-4">
                    {product.thc !== undefined && (
                      <div className="rounded-2xl bg-emerald-950/15 border border-emerald-500/10 p-3 text-center">
                        <span className="text-[9px] text-muted-foreground block uppercase font-bold tracking-wider">THC</span>
                        <span className="text-md font-black text-brand">{product.thc}%</span>
                      </div>
                    )}
                    {product.cbd !== undefined && (
                      <div className="rounded-2xl bg-emerald-950/15 border border-emerald-500/10 p-3 text-center">
                        <span className="text-[9px] text-muted-foreground block uppercase font-bold tracking-wider">CBD</span>
                        <span className="text-md font-black text-purple-exotic">{product.cbd}%</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Efectos y Aromas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-emerald-500/5 pt-4">
                {product.effects && product.effects.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground block">Efectos:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {product.effects.map((effect, idx) => (
                        <span key={idx} className="text-[9px] font-bold bg-brand/5 border border-brand/20 text-brand px-2 py-0.5 rounded-full">
                          {effect}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {product.aroma && product.aroma.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground block">Aroma / Sabor:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {product.aroma.map((ar, idx) => (
                        <span key={idx} className="text-[9px] font-bold bg-white/5 border border-white/10 text-foreground/80 px-2 py-0.5 rounded-full">
                          {ar}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Fila de Compra y Selector de Cantidad */}
            <div className="mt-8 border-t border-emerald-500/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-[10px] text-muted-foreground block uppercase font-bold tracking-wider">Precio Unitario</span>
                <span className="text-2xl font-black text-foreground">
                  ${product.price} <span className="text-xs text-muted-foreground font-normal">/ g</span>
                </span>
              </div>

              <div className="flex items-center space-x-4 w-full sm:w-auto justify-end">
                {/* Selector de cantidad */}
                <div className="flex items-center border border-emerald-500/15 rounded-full p-1 bg-black/10 shrink-0">
                  <button
                    onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                    className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-emerald-950/20 text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="w-8 text-center text-sm font-bold">{quantity}</span>
                  <button
                    onClick={() => setQuantity((prev) => prev + 1)}
                    className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-emerald-950/20 text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>

                {/* Botón Carrito */}
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleAddToCart}
                  className="font-bold flex-1 sm:flex-none flex items-center justify-center space-x-2 px-6"
                >
                  <ShoppingBag className="h-4 w-4" />
                  <span>Añadir</span>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
  );
}
