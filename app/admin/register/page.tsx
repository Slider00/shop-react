"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, UserCheck, CreditCard, ArrowRight, ArrowLeft, Camera, FileCheck, CheckCircle2, Lock } from "lucide-react";
import { useAuthStore, User } from "@/lib/store/useAuthStore";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const loginUser = useAuthStore((state) => state.login);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // Redirigir si ya está logueado
  React.useEffect(() => {
    if (isAuthenticated) {
      router.push("/admin");
    }
  }, [isAuthenticated, router]);

  // Pasos de registro: 1 = Datos, 2 = Cédula & Escaneo, 3 = Éxito
  const [step, setStep] = React.useState(1);

  // Datos del formulario
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [cedula, setCedula] = React.useState("");
  const [birthDate, setBirthDate] = React.useState("");
  const [adminCode, setAdminCode] = React.useState("");

  // Estado del escaneo de cédula
  const [isScanning, setIsScanning] = React.useState(false);
  const [scanProgress, setScanProgress] = React.useState(0);
  const [scanCompleted, setScanCompleted] = React.useState(false);
  const [uploadedFile, setUploadedFile] = React.useState<string | null>(null);

  // Errores
  const [ageError, setAgeError] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  // Verificar edad (Mínimo 18 años)
  const validateAge = (dateStr: string): boolean => {
    if (!dateStr) return false;
    const birth = new Date(dateStr);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    if (age < 18) {
      setAgeError("ADVERTENCIA: Venta exclusiva para mayores de 18 años. Tu edad indica que eres menor de edad y el registro ha sido bloqueado por motivos legales.");
      return false;
    }
    setAgeError(null);
    return true;
  };

  const handleNextStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !adminCode) {
      setError("Por favor completa todos los campos.");
      return;
    }
    if (adminCode !== "GREEN_ADMIN_2026") {
      setError("Código de autorización admin incorrecto. No tienes permisos para crear una cuenta de administrador.");
      return;
    }
    setError(null);
    setStep(2);
  };

  // Simulación del escaneo de cédula
  const triggerSimulatedScan = () => {
    if (!cedula || !birthDate) {
      setError("Por favor digita tu cédula y fecha de nacimiento primero.");
      return;
    }
    
    if (!validateAge(birthDate)) {
      return;
    }

    setError(null);
    setIsScanning(true);
    setScanProgress(0);
    setUploadedFile("cedula_colombia_mock.jpg");

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          setScanCompleted(true);
          return 100;
        }
        return prev + 5;
      });
    }, 150);
  };

  const handleRegister = () => {
    if (!name || !email || !password || !cedula || !birthDate || !scanCompleted) {
      setError("Por favor finaliza la validación y el escaneo de tu cédula.");
      return;
    }

    if (!validateAge(birthDate)) {
      return;
    }

    // Crear cuenta con rol admin
    const newUser: User = {
      name,
      email,
      cedula,
      birthDate,
      role: "admin", // Registramos como admin directamente para la prueba técnica
    };

    loginUser(newUser);
    setStep(3);
  };

  return (
    <div className="min-h-[calc(100vh-6rem)] w-full flex items-center justify-center px-6 py-12 relative overflow-hidden z-0">
      {/* Video de Fondo: Cultivo en bucle */}
      <div className="absolute inset-0 -z-20 w-full h-full overflow-hidden">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover scale-105 pointer-events-none select-none opacity-95 dark:opacity-85"
        >
          <source src="/weedgif.mp4" type="video/mp4" />
        </video>
        {/* Capa de vidrio esmerilado para garantizar contraste y elegancia (Más clara y visible) */}
        <div className="absolute inset-0 bg-[#022c22]/30 dark:bg-black/45 backdrop-blur-[3px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/30" />
      </div>

      <Card glow="green" hoverEffect={false} className="w-full max-w-lg mx-auto p-8 sm:p-10 border border-emerald-500/15 bg-card-bg/95 backdrop-blur-2xl rounded-3xl relative">
        
        {/* Cabecera del Registro */}
        <div className="text-center mb-8 space-y-2">
          <div className="inline-flex items-center space-x-1.5 rounded-full bg-emerald-950/20 border border-emerald-500/10 px-3 py-1 text-[10px] text-brand font-bold uppercase tracking-wider">
            <Lock className="h-3 w-3" />
            <span>Módulo de Control de Acceso</span>
          </div>
          <h2 className="text-3xl font-black text-foreground tracking-tight">
            Crear Cuenta de <span className="text-brand">Admin</span>
          </h2>
          <p className="text-xs text-muted-foreground">
            {step === 1 && "Ingresa los datos principales de tu cuenta de administrador."}
            {step === 2 && "Verificación legal de mayoría de edad obligatoria (+18)."}
            {step === 3 && "¡Tu cuenta ha sido creada exitosamente!"}
          </p>
        </div>

        {/* Mensaje de Error General */}
        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-red-950/20 border border-red-500/20 text-xs text-red-400 flex items-center">
            <ShieldAlert className="h-4 w-4 mr-2 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <AnimatePresence mode="wait">
          {/* PASO 1: Datos de cuenta */}
          {step === 1 && (
            <motion.form
              key="step-1"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              onSubmit={handleNextStep1}
              className="space-y-5"
            >
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Nombre Completo</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Julián Castro"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-11 px-4 rounded-full border border-emerald-500/15 bg-black/40 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all shadow-inner"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Correo Electrónico</label>
                <input
                  type="email"
                  required
                  placeholder="admin@greenbotanics.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-11 px-4 rounded-full border border-emerald-500/15 bg-black/40 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all shadow-inner"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Contraseña</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-11 px-4 rounded-full border border-emerald-500/15 bg-black/40 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all shadow-inner"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Código de Autorización Admin</label>
                <input
                  type="password"
                  required
                  placeholder="Ingresa la clave secreta admin"
                  value={adminCode}
                  onChange={(e) => setAdminCode(e.target.value)}
                  className="w-full h-11 px-4 rounded-full border border-emerald-500/15 bg-black/40 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all shadow-inner"
                />
              </div>

              <div className="pt-4 flex justify-between items-center">
                <span className="text-xs text-muted-foreground">
                  ¿Ya tienes cuenta?{" "}
                  <Link href="/admin/login" className="text-brand hover:underline font-bold">
                    Inicia Sesión
                  </Link>
                </span>
                <Button variant="primary" size="md" type="submit" className="font-bold flex items-center">
                  <span>Siguiente</span>
                  <ArrowRight className="h-4 w-4 ml-1.5" />
                </Button>
              </div>
            </motion.form>
          )}

          {/* PASO 2: Verificación de Cédula y Escaneo */}
          {step === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-6"
            >
              {/* Error de Edad */}
              {ageError && (
                <div className="p-4 rounded-2xl bg-red-950/30 border border-red-500/30 text-xs text-red-400 leading-relaxed space-y-1">
                  <div className="flex items-center font-extrabold text-red-300">
                    <ShieldAlert className="h-4 w-4 mr-1.5 shrink-0" />
                    <span>MAYORÍA DE EDAD REQUERIDA</span>
                  </div>
                  <p>{ageError}</p>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Cédula de Ciudadanía</label>
                  <input
                    type="text"
                    placeholder="1000000000"
                    disabled={isScanning || scanCompleted}
                    value={cedula}
                    onChange={(e) => setCedula(e.target.value)}
                    className="w-full h-11 px-4 rounded-full border border-emerald-500/15 bg-black/40 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand disabled:opacity-50 transition-all shadow-inner"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Fecha de Nacimiento</label>
                  <input
                    type="date"
                    disabled={isScanning || scanCompleted}
                    value={birthDate}
                    onChange={(e) => {
                      setBirthDate(e.target.value);
                      validateAge(e.target.value);
                    }}
                    className="w-full h-11 px-4 rounded-full border border-emerald-500/15 bg-black/40 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand disabled:opacity-50 transition-all shadow-inner"
                  />
                </div>
              </div>

              {/* Simulador Interactivo de Escaneo */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">Validación Biométrica / Escaneo de Cédula</label>
                <div 
                  onClick={() => !isScanning && !scanCompleted && triggerSimulatedScan()}
                  className={`relative border-2 border-dashed rounded-3xl p-6 text-center cursor-pointer transition-all ${
                    scanCompleted
                      ? "border-brand/45 bg-brand/5"
                      : isScanning
                      ? "border-emerald-500/40 bg-black/30"
                      : "border-emerald-500/15 hover:border-brand/35 bg-black/40 hover:bg-black/30"
                  }`}
                >
                  {/* Láser de Escaneo */}
                  {isScanning && (
                    <motion.div
                      animate={{ y: [0, 110, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                      className="absolute left-0 right-0 h-0.5 bg-brand shadow-lg shadow-brand/60 z-10"
                    />
                  )}

                  <div className="flex flex-col items-center space-y-3">
                    {scanCompleted ? (
                      <>
                        <CheckCircle2 className="h-10 w-10 text-brand animate-bounce" />
                        <div>
                          <p className="text-sm font-bold text-foreground">Escaneo Biométrico Completado</p>
                          <p className="text-[10px] text-brand font-semibold uppercase tracking-wider mt-1">✓ Cédula validada y verificada (Mayor de edad)</p>
                        </div>
                      </>
                    ) : isScanning ? (
                      <>
                        <Camera className="h-10 w-10 text-brand animate-pulse" />
                        <div className="w-full max-w-[200px] space-y-1">
                          <p className="text-xs font-semibold text-foreground">Escaneando Cédula...</p>
                          <div className="h-1.5 w-full bg-emerald-950/40 rounded-full overflow-hidden border border-emerald-500/10">
                            <div 
                              className="h-full bg-brand rounded-full transition-all duration-150"
                              style={{ width: `${scanProgress}%` }}
                            />
                          </div>
                          <span className="text-[8px] text-muted-foreground block">{scanProgress}% procesado</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <CreditCard className="h-10 w-10 text-muted-foreground group-hover:text-brand transition-colors" />
                        <div>
                          <p className="text-xs font-bold text-foreground">Simular Carga & Validación de ID</p>
                          <p className="text-[10px] text-muted-foreground mt-1 max-w-[240px] mx-auto leading-relaxed">
                            Haz click aquí para iniciar la simulación de escaneo OCR de tu Cédula de Ciudadanía.
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Botones */}
              <div className="pt-4 flex justify-between items-center">
                <Button 
                  variant="outline" 
                  size="md" 
                  onClick={() => setStep(1)} 
                  disabled={isScanning}
                  className="font-bold flex items-center"
                >
                  <ArrowLeft className="h-4 w-4 mr-1.5" />
                  <span>Atrás</span>
                </Button>
                
                <Button 
                  variant="primary" 
                  size="md" 
                  onClick={handleRegister} 
                  disabled={isScanning || !scanCompleted || !!ageError}
                  className="font-bold flex items-center"
                >
                  <span>Registrar Cuenta</span>
                  <UserCheck className="h-4 w-4 ml-1.5" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* PASO 3: Éxito */}
          {step === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-6 space-y-6"
            >
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand/10 border border-brand/20">
                <CheckCircle2 className="h-8 w-8 text-brand" />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-foreground">¡Verificación y Registro Exitoso!</h3>
                <p className="text-xs text-muted-foreground max-w-[280px] mx-auto leading-relaxed">
                  Has sido autenticado como **Administrador**. Ahora tienes permisos para agregar y eliminar productos del catálogo.
                </p>
              </div>

              <div className="pt-4">
                <Button 
                  variant="primary" 
                  size="lg" 
                  onClick={() => router.push("/admin")}
                  className="w-full font-bold"
                >
                  Ir al Panel de Admin
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </Card>
    </div>
  );
}
