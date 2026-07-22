import { ProductGrid } from "@/features/products/components/product-grid";

export const metadata = {
  title: "Bienestar & Hongos Adaptógenos | Green Botanics",
  description: "Descubre nuestra selección premium de adaptógenos, extracto de Melena de León orgánico, Reishi y hongos funcionales para la salud cerebral y claridad mental.",
};

export default function BienestarPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8">
      <ProductGrid 
        initialCategory="bienestar" 
        title="Bienestar & Hongos" 
        hideCategoryTabs={true} 
      />
    </div>
  );
}
