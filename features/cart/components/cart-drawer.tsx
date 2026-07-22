"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2, ShoppingBag, Truck, ArrowRight } from "lucide-react";
import { useCartStore } from "@/lib/store/useCartStore";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CartDrawer() {
  const { cart, isOpen, setOpen, updateQuantity, removeItem, clearCart } = useCartStore();

  // Deshabilitar scroll del body cuando el drawer esté abierto
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Cálculos de totales
  const subtotal = React.useMemo(() => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }, [cart]);

  const FREE_SHIPPING_THRESHOLD = 75;
  const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 4.99;
  const total = subtotal + shippingCost;
  
  const freeShippingProgress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remainingForFreeShipping = FREE_SHIPPING_THRESHOLD - subtotal;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Translúcido con desenfoque */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Panel Deslizable Lateral */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full sm:w-[440px] bg-background border-l border-emerald-500/10 flex flex-col shadow-2xl"
          >
            {/* Header del Drawer */}
            <div className="p-6 border-b border-emerald-500/10 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="h-5 w-5 text-brand" />
                <h3 className="text-lg font-black uppercase text-foreground">Tu Carrito</h3>
                <span className="rounded-full bg-brand/10 border border-brand/20 px-2.5 py-0.5 text-xs text-brand font-bold">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              </div>
              <div className="flex items-center space-x-4">
                {cart.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="text-xs text-muted-foreground hover:text-red-400 font-semibold cursor-pointer"
                  >
                    Vaciar
                  </button>
                )}
                <button
                  onClick={() => setOpen(false)}
                  className="h-9 w-9 rounded-full border border-emerald-500/10 bg-card-bg text-foreground hover:bg-emerald-950/15 flex items-center justify-center cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Envío gratis progress bar */}
            {cart.length > 0 && (
              <div className="bg-emerald-950/10 border-b border-emerald-500/5 p-6 space-y-3">
                <div className="flex items-center space-x-2 text-xs font-semibold">
                  <Truck className="h-4 w-4 text-brand" />
                  {subtotal >= FREE_SHIPPING_THRESHOLD ? (
                    <span className="text-brand">¡Felicidades! Tienes envío gratis asegurado.</span>
                  ) : (
                    <span className="text-muted-foreground">
                      Te faltan <span className="text-brand">${remainingForFreeShipping.toFixed(2)}</span> para obtener envío gratis.
                    </span>
                  )}
                </div>
                <div className="h-1.5 w-full bg-emerald-950 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${freeShippingProgress}%` }}
                    className="h-full bg-brand rounded-full"
                  />
                </div>
              </div>
            )}

            {/* Listado de items del carrito */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <AnimatePresence mode="popLayout">
                {cart.length > 0 ? (
                  cart.map((item) => (
                    <motion.div
                      key={item.product.id}
                      layout
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex items-center justify-between gap-4 border-b border-emerald-500/5 pb-4 last:border-b-0"
                    >
                      {/* Miniatura visual del producto */}
                      <div className={`h-16 w-16 rounded-xl bg-gradient-to-br ${item.product.imageGradient} border border-white/5 flex items-center justify-center font-bold text-[9px] text-white p-1 text-center shrink-0`}>
                        <span className="truncate max-w-full font-black uppercase leading-tight bg-black/40 backdrop-blur-sm px-1.5 py-1 rounded-lg">
                          {item.product.name}
                        </span>
                      </div>

                      {/* Info & Nombre */}
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] text-brand font-bold uppercase tracking-wider">
                          {item.product.strainType || item.product.category}
                        </span>
                        <h4 className="text-sm font-bold text-foreground truncate">{item.product.name}</h4>
                        <span className="text-xs text-muted-foreground mt-1 block font-semibold">
                          ${item.product.price}
                        </span>
                      </div>

                      {/* Controles de cantidad */}
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center rounded-full bg-emerald-950/20 border border-emerald-500/10 h-8">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="h-8 w-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground cursor-pointer"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="text-xs font-bold text-foreground w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="h-8 w-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground cursor-pointer"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>

                        {/* Eliminar */}
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="h-8 w-8 rounded-full border border-emerald-500/5 hover:border-red-500/20 bg-card-bg/50 text-muted-foreground hover:text-red-400 flex items-center justify-center cursor-pointer transition-colors"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  /* Estado Vacío */
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-20">
                    <div className="h-16 w-16 rounded-full bg-emerald-950/20 border border-emerald-500/10 flex items-center justify-center text-emerald-400/40">
                      <ShoppingBag className="h-6 w-6" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-base font-bold text-foreground">Tu carrito está vacío</h4>
                      <p className="text-xs text-muted-foreground max-w-xs">
                        Agrega flores de alta calidad y extractos de nuestra boutique para comenzar tu compra.
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setOpen(false)}
                      className="mt-4 border-brand/20 hover:border-brand/45"
                    >
                      Seguir Explorando
                    </Button>
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer con cálculo de precios */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-emerald-500/10 bg-emerald-950/5 space-y-6">
                <div className="space-y-2 text-sm font-semibold">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Costo de Envío</span>
                    <span>{shippingCost === 0 ? <span className="text-brand font-bold uppercase">Gratis</span> : `$${shippingCost.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-base font-black text-foreground border-t border-emerald-500/5 pt-3">
                    <span>Total Estimado</span>
                    <span className="text-brand text-lg">${total.toFixed(2)}</span>
                  </div>
                </div>

                <Link href="/checkout" onClick={() => setOpen(false)} className="w-full block">
                  <Button variant="primary" size="lg" className="w-full font-bold">
                    <span>Proceder al Checkout</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
