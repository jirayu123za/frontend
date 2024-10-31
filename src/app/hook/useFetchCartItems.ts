// src/hooks/useFetchCartItems.ts
"use client";
import { useQuery } from '@tanstack/react-query';
import { CartItem } from '../store/cartStore';

const fetchCartItems = async (): Promise<CartItem[]> => {
  try {
    const response = await fetch('http://localhost:3001/cartItems');
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data || []; // คืนค่าเป็นอาร์เรย์ว่างถ้าข้อมูลเป็น null
  } catch (error) {
    console.error('Failed to fetch cart items:', error);
    return []; // คืนค่าเป็นอาร์เรย์ว่างในกรณีที่เกิดข้อผิดพลาด
  }
};

export const useFetchCartItems = () => {
  return useQuery({
    queryKey: ['cartItems'],
    queryFn: fetchCartItems,
  });
};
