"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ShieldCheck, CheckCircle2, Truck, CreditCard, Sparkles } from "lucide-react";
import { useCartStore } from "@/lib/store/useCartStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart, setOpen } = useCartStore();
  const [mounted, setMounted] = React.useState(false);
  
  // Estados del Formulario
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    ageVerified: false,
    paymentMethod: "delivery",
  });
  
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [orderId, setOrderId] = React.useState("");

  React.useEffect(() => {
    setMounted(true);
    // Cerrar el drawer del carrito cuando se entra a checkout
    setOpen(false);
  }, [setOpen]);

  // Redireccionar si el carrito está vacío (una vez montado el cliente)
  React.useEffect(() => {
    if (mounted && cart.length === 0 && !isSuccess) {
      router.push("/");
    }
  }, [mounted, cart, router, isSuccess]);

  // Cálculos de precios
  const subtotal = React.useMemo(() => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }, [cart]);

  const FREE_SHIPPING_THRESHOLD = 75;
  const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 4.99;
  const total = subtotal + shippingCost;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePaymentSelect = (method: string) => {
    setFormData((prev) => ({ ...prev, paymentMethod: method }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.ageVerified) {
      alert("Debes confirmar que eres mayor de 18 años para comprar en esta tienda.");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simular llamada a API
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setOrderId(`GB-${Math.floor(100000 + Math.random() * 900000)}`);
      clearCart();
    }, 2000);
  };

  if (!mounted) return null;

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-12 sm:px-8 space-y-8 flex-1 flex flex-col justify-center">
      {/* Botón de Retorno */}
      <div className="flex items-center">
        <Link
          href="/"
          className="inline-flex items-center text-sm font-semibold text-muted-foreground hover:text-brand transition-colors group"
        >
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Volver a la tienda
        </Link>
      </div>

      <AnimatePresence mode="wait">
        {!isSuccess ? (
          <motion.div
            key="checkout-form"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
          >
            {/* Columna Izquierda: Formulario de Pago */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h1 className="text-3xl font-black tracking-tight text-foreground uppercase">
                  Finalizar <span className="text-brand">Compra</span>
                </h1>
                <p className="text-sm text-muted-foreground mt-2">
                  Completa los datos de envío y selecciona tu método de pago. Todos los pedidos son enviados en empaques discretos.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Datos de Envío */}
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-foreground border-b border-emerald-500/10 pb-2">
                    1. Datos de Entrega
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-muted-foreground uppercase">Nombre Completo</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full h-11 px-4 rounded-xl border border-emerald-500/10 bg-card-bg text-sm text-foreground focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all"
                        placeholder="Ej. Julian Perez"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-muted-foreground uppercase">Correo Electrónico</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full h-11 px-4 rounded-xl border border-emerald-500/10 bg-card-bg text-sm text-foreground focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all"
                        placeholder="ejemplo@correo.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-muted-foreground uppercase">Dirección de Envío</label>
                      <input
                        type="text"
                        name="address"
                        required
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full h-11 px-4 rounded-xl border border-emerald-500/10 bg-card-bg text-sm text-foreground focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all"
                        placeholder="Calle, Número, Apto"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-muted-foreground uppercase">Teléfono de Contacto</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full h-11 px-4 rounded-xl border border-emerald-500/10 bg-card-bg text-sm text-foreground focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all"
                        placeholder="+57 300 000 0000"
                      />
                    </div>
                  </div>
                </div>

                {/* Métodos de Pago */}
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-foreground border-b border-emerald-500/10 pb-2">
                    2. Método de Pago
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Pago Contra Entrega */}
                    <div
                      onClick={() => handlePaymentSelect("delivery")}
                      className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start space-x-3 bg-card-bg ${
                        formData.paymentMethod === "delivery"
                          ? "border-brand shadow-lg shadow-brand/5"
                          : "border-emerald-500/10 hover:border-emerald-500/25"
                      }`}
                    >
                      <div className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 ${
                        formData.paymentMethod === "delivery" ? "bg-brand/20 text-brand" : "bg-emerald-950/20 text-muted-foreground"
                      }`}>
                        <Truck className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-foreground">Pago Contra Entrega</h4>
                        <p className="text-[10px] text-muted-foreground mt-0.5">Pagas en efectivo o tarjeta al recibir en tu dirección.</p>
                      </div>
                    </div>

                    {/* Pago Seguro en Línea */}
                    <div
                      onClick={() => handlePaymentSelect("online")}
                      className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start space-x-3 bg-card-bg ${
                        formData.paymentMethod === "online"
                          ? "border-brand shadow-lg shadow-brand/5"
                          : "border-emerald-500/10 hover:border-emerald-500/25"
                      }`}
                    >
                      <div className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 ${
                        formData.paymentMethod === "online" ? "bg-brand/20 text-brand" : "bg-emerald-950/20 text-muted-foreground"
                      }`}>
                        <CreditCard className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-foreground">Pago Seguro (Wompi)</h4>
                        <p className="text-[10px] text-muted-foreground mt-0.5">Tarjetas de crédito, débito PSE o transferencia bancaria.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Declaración de Edad Obligatoria */}
                <div className="p-4 rounded-2xl bg-emerald-950/15 border border-emerald-500/10 flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="ageVerified"
                    name="ageVerified"
                    required
                    checked={formData.ageVerified}
                    onChange={handleInputChange}
                    className="mt-1 h-4.5 w-4.5 rounded border-emerald-500/20 text-brand focus:ring-brand bg-card-bg cursor-pointer"
                  />
                  <label htmlFor="ageVerified" className="text-xs text-brand font-medium leading-relaxed cursor-pointer select-none">
                    Declaro bajo juramento que soy mayor de 18 años, y autorizo el tratamiento de mis datos personales para validar la legalidad y entrega discreta de productos con contenido herbal / THC.
                  </label>
                </div>

                {/* Botón de Confirmación */}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  isLoading={isSubmitting}
                  className="w-full font-black text-sm uppercase tracking-wider h-13"
                >
                  <ShieldCheck className="mr-2 h-5 w-5" />
                  <span>Confirmar Pedido (${total.toFixed(2)})</span>
                </Button>
              </form>
            </div>

            {/* Columna Derecha: Resumen de Compra */}
            <div className="lg:col-span-5">
              <Card className="sticky top-28 border border-emerald-500/10" hoverEffect={false}>
                <CardHeader>
                  <CardTitle className="text-md uppercase font-bold tracking-wider text-muted-foreground">
                    Resumen del Pedido
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Lista de productos */}
                  <div className="max-h-72 overflow-y-auto space-y-4 pr-1">
                    {cart.map((item) => (
                      <div key={item.product.id} className="flex items-center justify-between gap-4">
                        <div className={`h-11 w-11 rounded-lg bg-gradient-to-br ${item.product.imageGradient} shrink-0 border border-white/5 flex items-center justify-center font-bold text-[7px] text-white p-1 text-center`}>
                          <span className="truncate max-w-full font-extrabold uppercase bg-black/40 px-1 py-0.5 rounded">
                            {item.product.name.split(" ")[0]}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-foreground truncate">{item.product.name}</h4>
                          <span className="text-[10px] text-muted-foreground">
                            Cant: {item.quantity}
                          </span>
                        </div>
                        <span className="text-xs font-bold text-foreground">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Cálculos de costos */}
                  <div className="space-y-2 border-t border-emerald-500/10 pt-4 text-xs font-semibold">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Envío Discreto</span>
                      <span>
                        {shippingCost === 0 ? (
                          <span className="text-brand uppercase font-bold">Gratis</span>
                        ) : (
                          `$${shippingCost.toFixed(2)}`
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm font-black text-foreground border-t border-emerald-500/5 pt-3">
                      <span>Total Neto</span>
                      <span className="text-brand text-base">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        ) : (
          /* Pantalla de Éxito */
          <motion.div
            key="success-screen"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-xl mx-auto text-center space-y-8 py-16 px-6 glass rounded-3xl border border-brand/20 glow-green"
          >
            <div className="flex justify-center">
              <div className="relative">
                <CheckCircle2 className="h-20 w-20 text-brand animate-pulse-slow" />
                <Sparkles className="absolute -top-1 -right-1 h-6 w-6 text-gold animate-bounce" />
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="text-3xl font-black text-foreground uppercase tracking-tight">
                ¡Pedido <span className="text-brand">Confirmado</span>!
              </h2>
              <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-950/40 border border-brand/35 text-xs text-brand font-bold tracking-wide">
                Código: {orderId}
              </span>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto leading-relaxed pt-2">
                Hemos registrado tu orden y comenzaremos a preparar tu paquete. Te enviaremos un correo con los detalles del rastreo para tu tranquilidad.
              </p>
            </div>

            {/* Recuadro de Envío Seguro */}
            <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/10 text-left text-xs max-w-sm mx-auto space-y-2">
              <div className="flex items-center space-x-2 font-bold text-brand uppercase tracking-wider">
                <Truck className="h-4 w-4" />
                <span>Empaque 100% Hermético</span>
              </div>
              <p className="text-[10px] text-muted-foreground leading-normal">
                Tu entrega llegará en una caja de cartón negra minimalista sellada al vacío, sin logotipos visibles de cannabis ni olor externo, garantizando absoluta privacidad.
              </p>
            </div>

            <div className="pt-4 max-w-xs mx-auto">
              <Link href="/">
                <Button variant="primary" size="md" className="w-full font-bold">
                  Volver a la Tienda
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
