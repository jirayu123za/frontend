"use client";
import { useMutation } from '@tanstack/react-query';
import { CartItem, useCartStore } from '../store/cartStore';
import { useMemo } from 'react';
import axios from 'axios';

export const useCart = () => {
  const items = useCartStore((state) => state.items || []);
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  const total = useMemo(() => {
    return items.reduce((acc, item) => acc + (item?.Unit_price || 0) * (item?.Quantity || 0), 0);
  }, [items]);

  return {
    items,
    addItem,
    removeItem,
    updateQuantity,
    total,
  };
};

const addToCart = async ({ productId, quantity, token }: { productId: string; quantity: number; token: string }) => {
  const response = await axios.post(
    'http://localhost:8000/api/cart/add',
    {
      product_id: productId,
      quantity: quantity,
    },
    {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
};

export const useAddToCart = (token: string) => {
  const addItem = useCartStore((state) => state.addItem);

  return useMutation<any, Error, { productId: string; quantity: number }>({
    mutationFn: ({ productId, quantity }: { productId: string; quantity: number }) => addToCart({ productId, quantity, token }),
    onSuccess: (data) => {
      data.cart.items.forEach((item: CartItem) => addItem(item));
      console.log('Product added to cart:', data);
    },
    onError: (error) => {
      console.error('Failed to add product to cart:', error);
    },
  });
};