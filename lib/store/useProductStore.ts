import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product, mockProducts } from "../mockData";

interface ProductState {
  products: Product[];
  addProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  resetProducts: () => void;
}

export const useProductStore = create<ProductState>()(
  persist(
    (set) => ({
      products: mockProducts,
      addProduct: (product) =>
        set((state) => ({ products: [product, ...state.products] })),
      deleteProduct: (id) =>
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        })),
      resetProducts: () => set({ products: mockProducts }),
    }),
    {
      name: "green-botanics-products",
    }
  )
);
