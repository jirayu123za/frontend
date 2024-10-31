// src/hooks/useFetchCartItems.ts
"use client";
import { useQuery } from '@tanstack/react-query';
import { CartItem } from '../store/cartStore';

const fetchCartItems = async (): Promise<CartItem[]> => {
  const response = await fetch('http://localhost:3001/cartItems');
  if (!response.ok) {
    throw new Error('Failed to fetch cart items');
  }
  return response.json();
};

export const useFetchCartItems = () => {
  return useQuery({
    queryKey: ['cartItems'],
    queryFn: fetchCartItems,
  });
};
