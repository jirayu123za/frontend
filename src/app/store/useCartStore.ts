import { create } from 'zustand';

interface CartItem {
    cart_item_id: string;
    product_id: string;
    quantity: number;
    unit_price: number;
}

interface CartState {
    items: CartItem[];
    total_quantity: number;
    total_price: number;
    addItem: (item: CartItem) => void;
    setCart: (cartData: { items: CartItem[], total_quantity: number, total_price: number }) => void;
}

export const useCartStore = create<CartState>((set) => ({
    items: [],
    total_quantity: 0,
    total_price: 0,

    addItem: (item) => set((state) => {
        const existingItemIndex = state.items.findIndex(i => i.product_id === item.product_id);

        if (existingItemIndex !== -1) {
            const updatedItems = [...state.items];
            updatedItems[existingItemIndex].quantity += item.quantity;
            return {
                items: updatedItems,
                total_quantity: state.total_quantity + item.quantity,
                total_price: state.total_price + item.quantity * item.unit_price,
            };
        }

        return {
            items: [...state.items, item],
            total_quantity: state.total_quantity + item.quantity,
            total_price: state.total_price + item.quantity * item.unit_price,
        };
    }),

    setCart: (cartData) => set({
        items: cartData.items,
        total_quantity: cartData.total_quantity,
        total_price: cartData.total_price,
    }),
}));
