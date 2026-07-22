import { ProductGrid } from "@/features/products/components/product-grid";

export const metadata = {
  title: "Extractos & Rosin | Green Botanics",
  description: "Concentrados puros de espectro completo de la más alta pureza y potencia, prensados en frío y libres de solventes.",
};

export default function ExtractosPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8">
      <ProductGrid 
        initialCategory="extractos" 
        title="Extractos & Rosin" 
        hideCategoryTabs={true} 
      />
    </div>
  );
}
