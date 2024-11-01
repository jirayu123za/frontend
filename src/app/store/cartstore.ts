// src/store/cartStore.ts
import { create } from 'zustand';

export type CartItem = {
  CaI_id: string;
  Ca_id: string;
  P_id: string;
  P_name: string;
  P_description: string;
  Unit_price: number;
  Quantity: number;
  imageUrl: string;
};

type CartStore = {
  items: CartItem[];
  setItems: (items: CartItem[]) => void;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  getTotal: () => number;
};

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  setItems: (items) => set({ items }),
  addItem: (item) =>
    set((state) => ({
      items: [...state.items, item],
    })),
  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.CaI_id !== id),
    })),
  updateQuantity: (id, quantity) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.CaI_id === id ? { ...item, Quantity: quantity } : item
      ),
    })),
  getTotal: () =>
    get().items.reduce((total, item) => total + item.Unit_price * item.Quantity, 0),
}));
