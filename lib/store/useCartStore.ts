import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/lib/mockData";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  cart: CartItem[];
  isOpen: boolean;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleOpen: () => void;
  setOpen: (open: boolean) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      isOpen: false,
      
      addItem: (product: Product) =>
        set((state) => {
          const existingItemIndex = state.cart.findIndex(
            (item) => item.product.id === product.id
          );

          if (existingItemIndex > -1) {
            const updatedCart = [...state.cart];
            updatedCart[existingItemIndex].quantity += 1;
            return { cart: updatedCart, isOpen: true }; // Abre el carrito automáticamente al añadir
          }

          return { cart: [...state.cart, { product, quantity: 1 }], isOpen: true };
        }),

      removeItem: (productId: string) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.product.id !== productId),
        })),

      updateQuantity: (productId: string, quantity: number) =>
        set((state) => {
          if (quantity <= 0) {
            return { cart: state.cart.filter((item) => item.product.id !== productId) };
          }
          return {
            cart: state.cart.map((item) =>
              item.product.id === productId ? { ...item, quantity } : item
            ),
          };
        }),

      clearCart: () => set({ cart: [] }),
      
      toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
      
      setOpen: (open: boolean) => set({ isOpen: open }),
    }),
    {
      name: "green-botanics-cart", // Nombre en localStorage
      partialize: (state) => ({ cart: state.cart }), // Solo persistir el carrito, no el estado del drawer (isOpen)
    }
  )
);
