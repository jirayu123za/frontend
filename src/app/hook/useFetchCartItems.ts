// src/hooks/useFetchCartItems.ts
"use client";
import { useQuery } from '@tanstack/react-query';
import { CartItem } from '../store/cartStore';
import axios from 'axios';

const fetchCartItems = async (): Promise<CartItem[]> => {
  try {
    const response = await axios.get('http://localhost:8000/api/cart/items', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
    );
    return response.data.cart.items || [];
  } catch (error) {
    console.error('Failed to fetch cart items:', error);
    return [];
  }
};

export const useFetchCartItems = () => {
  return useQuery({
    queryKey: ['cartItems'],
    queryFn: fetchCartItems,
  });
};
