import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CartStore, ProductSnapshot, OrderSummary } from "@/types/cart";

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      lastOrder: null,

      addToCart: (product: ProductSnapshot, size: string) => {
        const { items } = get();
        const existingItem = items.find(
          (item) => item.product.id === product.id && item.size === size
        );

        if (existingItem) {
          set({
            items: items.map((item) =>
              item.product.id === product.id && item.size === size
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({
            items: [...items, { product, size, quantity: 1 }],
          });
        }
      },

      removeFromCart: (productId: string, size: string) => {
        set({
          items: get().items.filter(
            (item) => !(item.product.id === productId && item.size === size)
          ),
        });
      },

      incrementQuantity: (productId: string, size: string) => {
        set({
          items: get().items.map((item) =>
            item.product.id === productId && item.size === size
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        });
      },

      decrementQuantity: (productId: string, size: string) => {
        const { items } = get();
        const item = items.find(
          (item) => item.product.id === productId && item.size === size
        );

        if (item && item.quantity > 1) {
          set({
            items: items.map((item) =>
              item.product.id === productId && item.size === size
                ? { ...item, quantity: item.quantity - 1 }
                : item
            ),
          });
        } else {
          // Se a quantidade for 1 e decrementar, remove do carrinho
          get().removeFromCart(productId, size);
        }
      },

      clearCart: () => set({ items: [] }),

      setLastOrder: (order: OrderSummary) => set({ lastOrder: order }),
    }),
    {
      name: "aether-cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// Selectors
export const selectCartItems = (state: CartStore) => state.items;

export const selectCartSubtotal = (state: CartStore): number =>
  state.items.reduce((total, item) => total + item.product.price * item.quantity, 0);

export const selectCartTotalItems = (state: CartStore): number =>
  state.items.reduce((total, item) => total + item.quantity, 0);

export const selectCartTotal = (state: CartStore): number =>
  selectCartSubtotal(state);

export const selectCartItemQuantity =
  (productId: string, size: string) =>
  (state: CartStore): number =>
    state.items.find(
      (item) => item.product.id === productId && item.size === size
    )?.quantity ?? 0;
