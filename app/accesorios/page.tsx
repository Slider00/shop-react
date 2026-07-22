import { ProductGrid } from "@/features/products/components/product-grid";

export const metadata = {
  title: "Accesorios & Vaporizadores | Green Botanics",
  description: "Accesorios de diseño y vaporizadores seleccionados para asegurar la mejor experiencia de consumo.",
};

export default function AccesoriosPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8">
      <ProductGrid 
        initialCategory="accesorios" 
        title="Accesorios & Vaporizadores" 
        hideCategoryTabs={true} 
      />
    </div>
  );
}
