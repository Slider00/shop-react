"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Star, SlidersHorizontal, Plus, ShieldCheck, Flame, Info, ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "@/lib/mockData";
import { useProductStore } from "@/lib/store/useProductStore";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store/useCartStore";
import { ProductModal } from "./product-modal";

export interface ProductGridProps {
  initialCategory?: string;
  hideCategoryTabs?: boolean;
  title?: string;
}

export function ProductGrid({
  initialCategory = "todos",
  hideCategoryTabs = false,
  title,
}: ProductGridProps = {}) {
  const products = useProductStore((state) => state.products);
  const addItem = useCartStore((state) => state.addItem);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState<string>(initialCategory);
  const [selectedStrain, setSelectedStrain] = React.useState<string>("todos");
  const [sortBy, setSortBy] = React.useState<string>("default");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);

  // Reset de página al cambiar filtros
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, selectedStrain, sortBy]);

  const categories = [
    { id: "todos", name: "Todos" },
    { id: "flores", name: "Flores (Flores)" },
    { id: "extractos", name: "Extractos (Rosin)" },
    { id: "edibles", name: "Edibles (Gummies)" },
    { id: "accesorios", name: "Accesorios" },
    { id: "bienestar", name: "Bienestar & Hongos" },
  ];

  const strainTypes = [
    { id: "todos", name: "Todos los Tipos" },
    { id: "Indica", name: "Indica" },
    { id: "Sativa", name: "Sativa" },
    { id: "Híbrido", name: "Híbrido" },
    { id: "CBD", name: "Solo CBD" },
  ];

  // Lógica de Filtrado y Búsqueda
  const filteredProducts = React.useMemo(() => {
    return products
      .filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesCategory = selectedCategory === "todos" || product.category === selectedCategory;
        
        const matchesStrain = selectedStrain === "todos" || 
          (product.strainType && product.strainType === selectedStrain);

        return matchesSearch && matchesCategory && matchesStrain;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        return 0; // default (recomendados)
      });
  }, [searchQuery, selectedCategory, selectedStrain, sortBy]);

  // Paginación
  const ITEMS_PER_PAGE = 6;
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = React.useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  return (
    <section id="productos" className="w-full max-w-7xl mx-auto px-6 py-16 sm:px-8 space-y-10">
      {/* Encabezado del Catálogo */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-emerald-500/10 pb-8">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl">
            {title ? (
              <>
                {title.split(" ")[0]} <span className="text-brand">{title.split(" ").slice(1).join(" ")}</span>
              </>
            ) : (
              <>
                Catálogo <span className="text-brand">Exclusivo</span>
              </>
            )}
          </h2>
          <p className="text-sm text-muted-foreground mt-2 max-w-md">
            Explora nuestra selección premium. Todos los productos de THC requieren acreditación de mayoría de edad.
          </p>
        </div>

        {/* Buscador Integrado */}
        <div className="relative w-full md:max-w-xs group">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-brand transition-colors" />
          <input
            type="text"
            placeholder="Buscar cepa o accesorio..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 pl-10 pr-4 rounded-full border border-emerald-500/25 dark:border-emerald-500/40 bg-black/20 dark:bg-black/60 text-sm text-foreground placeholder:text-muted-foreground/80 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all shadow-inner"
          />
        </div>
      </div>

      {/* Controles de Filtrado */}
      <div className="flex flex-col gap-6">
        {/* Fila 1: Pestañas de Categoría Principal */}
        {!hideCategoryTabs && (
          <div className="flex flex-wrap gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setSelectedCategory(category.id);
                  // Reset de cepa si no es la categoría de flores
                  if (category.id !== "flores" && category.id !== "todos") {
                    setSelectedStrain("todos");
                  }
                }}
                className={`px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 border cursor-pointer ${
                  selectedCategory === category.id
                    ? "bg-brand text-black border-brand shadow-lg shadow-brand/15 font-bold"
                    : "bg-card-bg text-muted-foreground border-emerald-500/5 hover:border-emerald-500/25 hover:text-foreground"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        )}

        {/* Fila 2: Sub-Filtros para Flores (Cepa / Clasificación) */}
        {(selectedCategory === "flores" || selectedCategory === "todos") && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-card-bg border border-emerald-500/15 dark:border-emerald-500/25 shadow-lg shadow-black/10 backdrop-blur-md"
          >
            {/* Tipo de Cepa */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mr-2 flex items-center">
                <SlidersHorizontal className="h-3 w-3 mr-1" /> Tipo Cepa:
              </span>
              {strainTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedStrain(type.id)}
                  className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                    selectedStrain === type.id
                      ? "bg-brand/10 text-brand border-brand/35 shadow-lg shadow-brand/5"
                      : "bg-transparent text-muted-foreground border-emerald-500/10 dark:border-white/10 hover:border-brand/30 hover:text-foreground"
                  }`}
                >
                  {type.name}
                </button>
              ))}
            </div>

            {/* Ordenar */}
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Ordenar por:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-card-bg border border-emerald-500/15 dark:border-emerald-500/30 text-muted-foreground text-xs font-bold rounded-lg px-3 py-1.5 focus:outline-none focus:border-brand cursor-pointer"
              >
                <option value="default">Recomendados</option>
                <option value="price-asc">Precio: Bajo a Alto</option>
                <option value="price-desc">Precio: Alto a Bajo</option>
                <option value="rating">Calidad (Estrellas)</option>
              </select>
            </div>
          </motion.div>
        )}
      </div>

      {/* Resultados de la Grilla de Productos */}
      <div className="relative min-h-[400px]">
        <AnimatePresence mode="popLayout">
          {paginatedProducts.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {paginatedProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card 
                    glow={product.isBestSeller ? "gold" : "none"} 
                    className="h-full flex flex-col justify-between cursor-pointer hover:scale-[1.01] hover:border-brand/35 transition-all duration-300"
                    onClick={() => setSelectedProduct(product)}
                  >
                    <CardContent className="space-y-4">
                      {/* Portada del Producto */}
                      <div className="relative w-full h-44 rounded-2xl bg-slate-950 flex items-center justify-center p-6 overflow-hidden border border-white/5 group-hover:scale-[1.02] transition-transform duration-500">
                        {/* Renderizado de imagen real o gradiente fallback */}
                        {product.images && product.images.length > 0 ? (
                          <img 
                            src={product.images[0]} 
                            alt={product.name}
                            className="absolute inset-0 w-full h-full object-cover opacity-80"
                          />
                        ) : (
                          <div className={`absolute inset-0 bg-gradient-to-br ${product.imageGradient}`} />
                        )}

                        {/* Efecto de humo/partículas en el hover */}
                        <div className="absolute inset-0 bg-black/35 mix-blend-overlay group-hover:bg-black/10 transition-colors" />
                        
                        {/* Simulación del empaque del producto */}
                        <div className="relative text-center select-none bg-black/60 backdrop-blur-md rounded-2xl px-5 py-4 border border-white/10 max-w-[80%] shadow-2xl">
                          <h4 className="text-sm font-black tracking-widest uppercase text-foreground leading-tight">{product.name}</h4>
                          <span className="text-[8px] font-bold text-brand uppercase mt-1 block tracking-widest">{product.category}</span>
                        </div>

                        {/* Badges Flotantes */}
                        {product.isBestSeller && (
                          <span className="absolute top-3 left-3 rounded-full bg-gold/90 text-black px-2.5 py-0.5 text-[8px] font-extrabold uppercase tracking-wider shadow-lg shadow-gold/20">
                            Top Seller
                          </span>
                        )}
                        {product.isNew && (
                          <span className="absolute top-3 left-3 rounded-full bg-brand/95 text-black px-2.5 py-0.5 text-[8px] font-extrabold uppercase tracking-wider shadow-lg shadow-brand/20">
                            Nuevo Lote
                          </span>
                        )}

                        {/* Indicador THC/CBD */}
                        {(product.thc !== undefined || product.cbd !== undefined) && (
                          <div className="absolute bottom-3 right-3 rounded-xl bg-black/60 border border-white/10 px-2 py-1 flex space-x-2 text-[9px] font-bold backdrop-blur-sm">
                            {product.thc !== undefined && product.thc > 0 && (
                              <span className="text-brand">THC {product.thc}%</span>
                            )}
                            {product.cbd !== undefined && product.cbd > 0 && (
                              <span className="text-purple-exotic">CBD {product.cbd}%</span>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Info Detallada */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-semibold text-muted-foreground uppercase">
                            {product.strainType ? `${product.strainType}` : `${product.category}`}
                          </span>
                          <div className="flex items-center text-xs text-gold font-bold">
                            <Star className="h-3 w-3 fill-gold text-gold mr-1" />
                            <span>{product.rating}</span>
                            <span className="text-muted-foreground text-[10px] font-medium ml-1">({product.reviewsCount})</span>
                          </div>
                        </div>

                        <h3 className="text-lg font-bold text-foreground truncate">{product.name}</h3>
                        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed h-8">
                          {product.description}
                        </p>
                      </div>

                      {/* Etiquetas de efectos */}
                      {product.effects && product.effects.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {product.effects.slice(0, 2).map((effect) => (
                            <span key={effect} className="rounded-full bg-emerald-950/20 border border-emerald-500/10 px-2 py-0.5 text-[9px] font-bold text-emerald-300">
                              {effect}
                            </span>
                          ))}
                        </div>
                      )}
                    </CardContent>

                    {/* Fila de Compra */}
                    <div className="mt-6 border-t border-emerald-500/5 pt-4 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-muted-foreground block uppercase font-medium">
                          {product.category === "flores" ? "Precio por gramo" : "Precio unitario"}
                        </span>
                        <span className="text-xl font-extrabold text-foreground">
                          ${product.price}
                          <span className="text-xs font-semibold text-muted-foreground">
                            {product.category === "flores" ? " / g" : ""}
                          </span>
                        </span>
                      </div>

                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          addItem(product);
                        }}
                        className="h-10 w-10 rounded-full p-0 flex items-center justify-center cursor-pointer border-emerald-500/15"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            /* Estado Vacío */
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-20 text-center space-y-4"
            >
              <Info className="h-10 w-10 text-emerald-500/30" />
              <div className="space-y-1">
                <h4 className="text-lg font-bold text-foreground">No encontramos productos</h4>
                <p className="text-xs text-muted-foreground max-w-xs">
                  Intenta modificando tu término de búsqueda o seleccionando otra categoría.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Paginación */}
        {totalPages > 1 && (
          <div className="flex flex-wrap items-center justify-center gap-4 mt-16 pt-8 border-t border-emerald-500/10">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="h-10 px-4 rounded-full cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed border-emerald-500/10 hover:border-brand/30 text-foreground flex items-center"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              <span>Anterior</span>
            </Button>

            <div className="flex items-center space-x-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`h-10 w-10 rounded-full text-xs font-bold transition-all cursor-pointer border ${
                    currentPage === page
                      ? "bg-brand text-black border-brand shadow-lg shadow-brand/15"
                      : "bg-card-bg text-muted-foreground border-emerald-500/5 hover:border-brand/35 hover:text-foreground"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              className="h-10 px-4 rounded-full cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed border-emerald-500/10 hover:border-brand/30 text-foreground flex items-center"
            >
              <span>Siguiente</span>
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        )}
      </div>

      {/* Modal de Vista Rápida del Producto */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductModal 
            product={selectedProduct} 
            onClose={() => setSelectedProduct(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
}
