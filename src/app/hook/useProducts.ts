import axios from 'axios';
import useProductStore from '../store/productStore';
import { useQuery } from '@tanstack/react-query';

axios.defaults.baseURL = 'http://localhost:8000';

interface ProductData {
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
}

const fetchProducts = async (): Promise<ProductData[]> => {
    try {
        const response = await axios.get(`api/products`);
        return response.data.products || [];
    } catch (error) {
        console.error('Failed to fetch products:', error);
        return [];
    }
};

export const useProducts = () => {
    return useQuery<ProductData[]>({
        queryKey: ['products'],
        queryFn: fetchProducts,
    });
};