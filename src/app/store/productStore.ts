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
    currentPage: number;
    totalPages: number;
    setProducts: (products: Product[]) => void;
    setCurrentPage: (page: number) => void;
    setTotalPages: (pages: number) => void;
};

const useProductStore = create<ProductStore>((set) => ({
    products: [],
    currentPage: 1,
    totalPages: 0,
    setProducts: (products: Product[]) => set({ products }),
    setCurrentPage: (page: number) => set({ currentPage: page }),
    setTotalPages: (pages: number) => set({ totalPages: pages }),
}));

export default useProductStore;
