import { ProductGrid } from "@/features/products/components/product-grid";

export const metadata = {
  title: "Flores Premium | Green Botanics",
  description: "Nuestra colección exclusiva de flores de THC y CBD cultivadas artesanalmente con perfiles terpénicos sobresalientes y certificación de laboratorio.",
};

export default function FloresPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8">
      <ProductGrid 
        initialCategory="flores" 
        title="Flores Premium" 
        hideCategoryTabs={true} 
      />
    </div>
  );
}
