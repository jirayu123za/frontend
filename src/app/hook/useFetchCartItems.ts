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
    return response.data.cart.items || [];
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
