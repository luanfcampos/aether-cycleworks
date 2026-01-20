export type ProductSnapshot = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  price: number;
  image: string;
};

export type CartItem = {
  product: ProductSnapshot;
  size: string;
  quantity: number;
};

export type OrderSummary = {
  orderId: string;
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  total: number;
};

export interface CartState {
  items: CartItem[];
  lastOrder: OrderSummary | null;
}

export interface CartActions {
  addToCart: (product: ProductSnapshot, size: string) => void;
  removeFromCart: (productId: string, size: string) => void;
  incrementQuantity: (productId: string, size: string) => void;
  decrementQuantity: (productId: string, size: string) => void;
  clearCart: () => void;
  setLastOrder: (order: OrderSummary) => void;
}

export type CartStore = CartState & CartActions;
