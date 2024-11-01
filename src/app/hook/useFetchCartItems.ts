"use client";
import { useQuery } from '@tanstack/react-query';
import { CartItem } from '../store/cartStore';
import axios from 'axios';
import { useSession } from "next-auth/react";
import { CustomSession } from "../hook/useAuth";

const fetchCartItems = async (token: string): Promise<CartItem[]> => {
  try {
    const response = await axios.get('http://localhost:8000/api/cart/items', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data.cart.items.map((item: { cart_item_id: any; cart_id: any; product_id: any; product: { name: any; image_url: any; }; unit_price: any; quantity: any; }) => ({
      CaI_id: item.cart_item_id,
      Ca_id: item.cart_id,
      P_id: item.product_id,
      P_name: item.product.name,
      Unit_price: item.unit_price,
      Quantity: item.quantity,
      color: 'Default Color',  // Add color if available
      size: 'Default Size',     // Add size if available
      imageUrl: item.product.image_url,
    }));
  } catch (error) {
    console.error('Failed to fetch cart items:', error);
    return [];
  }
};


export const useFetchCartItems = () => {
  const { data: session } = useSession();
  const customSession = session as CustomSession | null;
  const token = customSession?.user?.token ?? '';

  return useQuery({
    queryKey: ['cartItems'],
    queryFn: () => fetchCartItems(token),
    enabled: !!token, // Only run the query if token is available
  });
};
