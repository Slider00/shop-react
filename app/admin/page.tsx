"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, LogOut, Package, Tag, ShieldCheck, RefreshCw, BarChart2, PlusCircle, AlertCircle } from "lucide-react";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { useProductStore } from "@/lib/store/useProductStore";
import { Product } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const PRODUCT_IMAGE_PRESETS = [
  { name: "Bud Close-up (Flores)", value: "/promo_harvest.png" },
  { name: "Cultivo Growroom", value: "/promo_cultivo.png" },
  { name: "Envase Rosin (Extractos)", value: "/promo_rosin.png" },
  { name: "Envío Premium (Caja)", value: "/promo_delivery.png" },
];

const CATEGORY_GRADIENTS: Record<string, string> = {
  flores: "from-emerald-600 via-teal-700 to-slate-900",
  extractos: "from-fuchsia-600 via-indigo-800 to-slate-900",
  bienestar: "from-amber-600 via-yellow-750 to-slate-900",
  edibles: "from-orange-400 via-red-500 to-slate-900",
  accesorios: "from-zinc-600 via-zinc-800 to-slate-950",
};

export default function AdminDashboard() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();
  const { products, addProduct, deleteProduct, resetProducts } = useProductStore();

  // Protección de Ruta
  React.useEffect(() => {
    if (!isAuthenticated) {
      router.push("/admin/login");
    }
  }, [isAuthenticated, router]);

  // Formulario de Producto Nuevo
  const [name, setName] = React.useState("");
  const [category, setCategory] = React.useState<"flores" | "extractos" | "edibles" | "accesorios" | "bienestar">("flores");
  const [strainType, setStrainType] = React.useState<"Indica" | "Sativa" | "Híbrido" | "CBD" | "">("");
  const [price, setPrice] = React.useState("");
  const [thc, setThc] = React.useState("");
  const [cbd, setCbd] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [effectsInput, setEffectsInput] = React.useState("");
  const [aromaInput, setAromaInput] = React.useState("");
  const [selectedImages, setSelectedImages] = React.useState<string[]>([PRODUCT_IMAGE_PRESETS[0].value]);
  const [customUploadedImages, setCustomUploadedImages] = React.useState<string[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      // Validar límite de tamaño razonable (menor a 1MB) para no saturar LocalStorage
      if (file.size > 1 * 1024 * 1024) {
        setErrorMsg("ADVERTENCIA: Para almacenamiento en el navegador, las fotos de tu PC/móvil deben pesar menos de 1MB.");
        setTimeout(() => setErrorMsg(null), 5000);
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          const imgUrl = reader.result;
          setCustomUploadedImages((prev) => [imgUrl, ...prev]);
          setSelectedImages((prev) => [imgUrl, ...prev]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // Mensajes de estado
  const [successMsg, setSuccessMsg] = React.useState<string | null>(null);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  if (!isAuthenticated || !user) return null;

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !price || !description) {
      setErrorMsg("Nombre, Precio y Descripción son obligatorios.");
      return;
    }

    const priceNum = parseFloat(price);
    if (isNaN(priceNum) || priceNum <= 0) {
      setErrorMsg("Ingresa un precio numérico válido.");
      return;
    }

    // Procesar tags
    const effects = effectsInput
      ? effectsInput.split(",").map((s) => s.trim()).filter(Boolean)
      : undefined;
    const aroma = aromaInput
      ? aromaInput.split(",").map((s) => s.trim()).filter(Boolean)
      : undefined;

    const imageGradient = CATEGORY_GRADIENTS[category] || "from-emerald-600 via-teal-700 to-slate-900";

    const newProduct: Product = {
      id: Date.now().toString(),
      name,
      category,
      strainType: strainType || undefined,
      thc: thc ? parseFloat(thc) : undefined,
      cbd: cbd ? parseFloat(cbd) : undefined,
      price: priceNum,
      rating: 5.0,
      reviewsCount: 1,
      isNew: true,
      description,
      effects,
      aroma,
      images: selectedImages,
      imageGradient,
    };

    addProduct(newProduct);
    setSuccessMsg("¡Producto creado y publicado en la tienda exitosamente!");
    setErrorMsg(null);

    // Resetear formulario
    setName("");
    setPrice("");
    setThc("");
    setCbd("");
    setDescription("");
    setEffectsInput("");
    setAromaInput("");
    setSelectedImages([PRODUCT_IMAGE_PRESETS[0].value]);
    
    // Auto-ocultar alerta de éxito
    setTimeout(() => setSuccessMsg(null), 4000);
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 space-y-10">
      
      {/* Cabecera / Info del Admin */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-emerald-500/10 pb-8">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <h1 className="text-3xl font-black text-foreground tracking-tight">
              Panel de <span className="text-brand">Administración</span>
            </h1>
            <span className="rounded-full bg-brand/10 border border-brand/20 px-2.5 py-0.5 text-[9px] font-bold text-brand uppercase tracking-wider">
              {user.role}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Sesión iniciada por: <span className="text-foreground font-bold">{user.name}</span> | Cédula: <span className="text-foreground font-semibold">{user.cedula.replace(/(\d{3})\d+(\d{3})/, "$1****$2")}</span> (Verificación Biométrica 🟢)
          </p>
        </div>

        <div className="flex items-center space-x-3 w-full md:w-auto">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={resetProducts}
            className="flex-1 md:flex-none border-emerald-500/10 hover:border-brand/35 text-foreground flex items-center space-x-2 cursor-pointer h-10 px-4 rounded-full"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Restablecer Catálogo</span>
          </Button>

          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleLogout}
            className="flex-1 md:flex-none border-red-500/10 hover:border-red-500/40 text-red-400 hover:text-red-300 bg-red-950/5 flex items-center space-x-2 cursor-pointer h-10 px-4 rounded-full"
          >
            <LogOut className="h-4 w-4" />
            <span>Cerrar Sesión</span>
          </Button>
        </div>
      </div>

      {/* Indicadores / Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card glow="none" className="p-6 border border-emerald-500/10 bg-card-bg">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Total Productos</span>
              <p className="text-3xl font-black text-foreground mt-1">{products.length}</p>
            </div>
            <Package className="h-8 w-8 text-brand/40" />
          </div>
        </Card>

        <Card glow="none" className="p-6 border border-emerald-500/10 bg-card-bg">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Categorías Activas</span>
              <p className="text-3xl font-black text-foreground mt-1">5</p>
            </div>
            <Tag className="h-8 w-8 text-purple-exotic/40" />
          </div>
        </Card>

        <Card glow="none" className="p-6 border border-emerald-500/10 bg-card-bg">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Licencia</span>
              <p className="text-sm font-bold text-brand mt-2 flex items-center">
                <ShieldCheck className="h-4 w-4 mr-1.5 shrink-0" />
                <span>Decreto 811 Vigente</span>
              </p>
            </div>
            <BarChart2 className="h-8 w-8 text-gold/40" />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Formulario Crear Producto (Lado Izquierdo) */}
        <div className="lg:col-span-1 space-y-6">
          <div className="space-y-1">
            <h3 className="text-xl font-black text-foreground tracking-tight flex items-center">
              <PlusCircle className="h-5 w-5 text-brand mr-2" />
              <span>Publicar Nuevo Producto</span>
            </h3>
            <p className="text-xs text-muted-foreground">
              Llena los campos y crea el producto. Se listará de inmediato.
            </p>
          </div>

          <Card glow="green" className="p-6 sm:p-8 border border-emerald-500/15 bg-card-bg/95">
            {successMsg && (
              <div className="mb-6 p-4 rounded-2xl bg-brand/5 border border-brand/35 text-xs text-brand flex items-center">
                <ShieldCheck className="h-4 w-4 mr-2 shrink-0 animate-bounce" />
                <span>{successMsg}</span>
              </div>
            )}

            {errorMsg && (
              <div className="mb-6 p-4 rounded-2xl bg-red-950/20 border border-red-500/20 text-xs text-red-400 flex items-center">
                <AlertCircle className="h-4 w-4 mr-2 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleCreateProduct} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Nombre del Producto *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Amnesia Haze"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-10 px-3.5 rounded-full border border-emerald-500/15 bg-black/40 text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all shadow-inner"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Categoría *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full h-10 px-3.5 rounded-full border border-emerald-500/15 bg-black/40 text-xs text-foreground focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all cursor-pointer shadow-inner"
                  >
                    <option value="flores">Flores</option>
                    <option value="extractos">Extractos</option>
                    <option value="bienestar">Bienestar & Hongos</option>
                    <option value="edibles">Edibles</option>
                    <option value="accesorios">Accesorios</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Tipo Cepa</label>
                  <select
                    value={strainType}
                    onChange={(e) => setStrainType(e.target.value as any)}
                    className="w-full h-10 px-3.5 rounded-full border border-emerald-500/15 bg-black/40 text-xs text-foreground focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all cursor-pointer shadow-inner"
                  >
                    <option value="">Ninguno</option>
                    <option value="Indica">Indica</option>
                    <option value="Sativa">Sativa</option>
                    <option value="Híbrido">Híbrido</option>
                    <option value="CBD">CBD</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1 col-span-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Precio ($) *</label>
                  <input
                    type="text"
                    required
                    placeholder="12.99"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full h-10 px-3.5 rounded-full border border-emerald-500/15 bg-black/40 text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all shadow-inner"
                  />
                </div>

                <div className="space-y-1 col-span-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">THC %</label>
                  <input
                    type="text"
                    placeholder="20"
                    value={thc}
                    onChange={(e) => setThc(e.target.value)}
                    className="w-full h-10 px-3.5 rounded-full border border-emerald-500/15 bg-black/40 text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all shadow-inner"
                  />
                </div>

                <div className="space-y-1 col-span-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">CBD %</label>
                  <input
                    type="text"
                    placeholder="1"
                    value={cbd}
                    onChange={(e) => setCbd(e.target.value)}
                    className="w-full h-10 px-3.5 rounded-full border border-emerald-500/15 bg-black/40 text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all shadow-inner"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Descripción del Producto *</label>
                <textarea
                  required
                  placeholder="Detalles sobre el cultivo, notas organolépticas, etc..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full p-3.5 rounded-2xl border border-emerald-500/15 bg-black/40 text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand resize-none transition-all shadow-inner"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Efectos (separados por coma)</label>
                <input
                  type="text"
                  placeholder="Foco, Energía, Relajación"
                  value={effectsInput}
                  onChange={(e) => setEffectsInput(e.target.value)}
                  className="w-full h-10 px-3.5 rounded-full border border-emerald-500/15 bg-black/40 text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all shadow-inner"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Aromas (separados por coma)</label>
                <input
                  type="text"
                  placeholder="Limón, Pino, Terroso"
                  value={aromaInput}
                  onChange={(e) => setAromaInput(e.target.value)}
                  className="w-full h-10 px-3.5 rounded-full border border-emerald-500/15 bg-black/40 text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all shadow-inner"
                />
              </div>

              {/* Selector de Galería de Imágenes */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
                    Galería de Fotos del Producto
                  </label>
                  {/* Botón para subir desde PC / Móvil */}
                  <label 
                    htmlFor="device-file-upload" 
                    className="text-[9px] font-extrabold text-brand uppercase tracking-wider bg-brand/10 border border-brand/20 hover:border-brand/45 px-2.5 py-1 rounded-full cursor-pointer flex items-center space-x-1 hover:bg-brand/15 transition-all select-none"
                  >
                    <span>Subir desde dispositivo 📱</span>
                    <input 
                      id="device-file-upload"
                      type="file" 
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {/* Fotos subidas personalizadas (PC/Móvil) */}
                  {customUploadedImages.map((imgUrl, index) => {
                    const isSelected = selectedImages.includes(imgUrl);
                    return (
                      <div
                        key={`custom-${index}`}
                        onClick={() => {
                          if (isSelected) {
                            if (selectedImages.length > 1) {
                              setSelectedImages(selectedImages.filter((img) => img !== imgUrl));
                            }
                          } else {
                            setSelectedImages([...selectedImages, imgUrl]);
                          }
                        }}
                        className={`relative h-20 rounded-2xl cursor-pointer overflow-hidden border-2 transition-all duration-300 ${
                          isSelected
                            ? "border-brand scale-[1.02] shadow-lg shadow-brand/10"
                            : "border-emerald-500/10 opacity-55 hover:opacity-100"
                        }`}
                      >
                        <img src={imgUrl} alt="Subida personalizada" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 flex items-end p-2">
                          <span className="text-[8px] font-bold text-white leading-none truncate">
                            Subida {index + 1} {isSelected && "🟢"}
                          </span>
                        </div>
                      </div>
                    );
                  })}

                  {/* Presets predeterminados */}
                  {PRODUCT_IMAGE_PRESETS.map((preset) => {
                    const isSelected = selectedImages.includes(preset.value);
                    return (
                      <div
                        key={preset.name}
                        onClick={() => {
                          if (isSelected) {
                            if (selectedImages.length > 1) {
                              setSelectedImages(selectedImages.filter((img) => img !== preset.value));
                            }
                          } else {
                            setSelectedImages([...selectedImages, preset.value]);
                          }
                        }}
                        className={`relative h-20 rounded-2xl cursor-pointer overflow-hidden border-2 transition-all duration-300 ${
                          isSelected
                            ? "border-brand scale-[1.02] shadow-lg shadow-brand/10"
                            : "border-emerald-500/10 opacity-55 hover:opacity-100"
                        }`}
                      >
                        <img src={preset.value} alt={preset.name} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 flex items-end p-2">
                          <span className="text-[8px] font-bold text-white leading-none truncate">
                            {preset.name} {isSelected && "🟢"}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <Button variant="primary" size="lg" type="submit" className="w-full font-bold flex items-center justify-center space-x-2 mt-4">
                <Plus className="h-4.5 w-4.5 text-black" />
                <span>Publicar Producto</span>
              </Button>
            </form>
          </Card>
        </div>

        {/* Listado de Productos Existentes (Lado Derecho) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-1">
            <h3 className="text-xl font-black text-foreground tracking-tight">
              Listado del Catálogo ({products.length} Productos)
            </h3>
            <p className="text-xs text-muted-foreground">
              Visualiza y gestiona los productos publicados en la tienda en este momento.
            </p>
          </div>

          <Card glow="none" className="border border-emerald-500/10 bg-card-bg/50 backdrop-blur-sm overflow-hidden rounded-3xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-emerald-500/10 bg-emerald-950/20 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    <th className="py-4 px-6">Producto</th>
                    <th className="py-4 px-4">Categoría</th>
                    <th className="py-4 px-4">Precio</th>
                    <th className="py-4 px-4">THC/CBD</th>
                    <th className="py-4 px-4 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-emerald-500/5 text-xs text-foreground/90">
                  {products.map((prod) => (
                    <tr key={prod.id} className="hover:bg-emerald-950/10 transition-colors">
                      <td className="py-4 px-6 flex items-center space-x-3">
                        {/* Miniaturas de color */}
                        <div className={`h-8 w-8 rounded-lg bg-gradient-to-br ${prod.imageGradient} border border-white/10 shrink-0`} />
                        <span className="font-bold text-foreground text-sm">{prod.name}</span>
                      </td>
                      <td className="py-4 px-4 capitalize">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-950/25 border border-emerald-500/10 text-[10px] font-semibold text-muted-foreground">
                          {prod.category}
                        </span>
                      </td>
                      <td className="py-4 px-4 font-extrabold">${prod.price}</td>
                      <td className="py-4 px-4">
                        {prod.thc !== undefined || prod.cbd !== undefined ? (
                          <div className="flex space-x-2 text-[10px]">
                            {prod.thc !== undefined && <span className="text-brand font-bold">T: {prod.thc}%</span>}
                            {prod.cbd !== undefined && <span className="text-purple-exotic font-bold">C: {prod.cbd}%</span>}
                          </div>
                        ) : (
                          <span className="text-muted-foreground text-[10px] font-medium">-</span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-right">
                        <button
                          onClick={() => deleteProduct(prod.id)}
                          className="h-8 w-8 rounded-full border border-red-500/10 hover:border-red-500/40 bg-red-950/5 hover:bg-red-950/20 text-red-400 hover:text-red-300 flex items-center justify-center cursor-pointer transition-all hover:scale-105 inline-flex"
                          title="Eliminar producto"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}

                  {products.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-muted-foreground">
                        No hay productos en el catálogo de la tienda. Haz click en "Restablecer Catálogo" para cargar los predeterminados.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

      </div>

    </div>
  );
}
