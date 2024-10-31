import { create } from 'zustand';

type Product = {
    product_id: string;
    name: string;
    price: number;
    image_url: string;
    description: string;
    quantity: number;
    category: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
};

type ProductStore = {
    products: Product[];
    setProducts: (products: Product[]) => void;
};

const useProductStore = create<ProductStore>((set) => ({
    products: [],
    setProducts: (products: Product[]) => set({ products }),
}));

export default useProductStore;
