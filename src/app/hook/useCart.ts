// src/hooks/useCart.ts
"use client";
import { useCartStore } from '../../app/store/cartstore';
import { useMemo } from 'react';

export const useCart = () => {
  const items = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  // คำนวณผลรวมตาม Unit_price และ Quantity
  const total = useMemo(() => {
    return items.reduce((acc, item) => acc + item.Unit_price * item.Quantity, 0);
  }, [items]);

  return {
    items,
    addItem,
    removeItem,
    updateQuantity,
    total,
  };
};
