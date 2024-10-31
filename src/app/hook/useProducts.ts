import axios from 'axios';
import useProductStore from '../store/productStore';
import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';

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

interface PaginatedResponse {
    products: {
        current_page: number;
        data: ProductData[];
        last_page: number;
    };
}


const fetchProducts = async (page: number): Promise<PaginatedResponse> => {
    const response = await axios.get(`api/products?page=${page}`);
    return response.data;
};

export const useProducts = () => {
    const { products, setProducts, currentPage, setCurrentPage, setTotalPages } = useProductStore();

    const options = {
        queryKey: ['products', currentPage],
        queryFn: () => fetchProducts(currentPage),
        keepPreviousData: true,
        onSuccess: (data: PaginatedResponse) => {
            console.log("Fetched data:", data);
            setProducts(data.products.data);
            setTotalPages(data.products.last_page);
        },
    } as UseQueryOptions<PaginatedResponse>;

    const query: UseQueryResult<PaginatedResponse> = useQuery(options);

    return {
        ...query,
        products,
        currentPage,
        setCurrentPage,
        totalPages: useProductStore((state) => state.totalPages),
    };
};
