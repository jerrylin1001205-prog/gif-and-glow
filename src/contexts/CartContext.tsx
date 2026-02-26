import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Emoji } from '@/lib/emojis';

interface CartContextType {
  items: Emoji[];
  addToCart: (emoji: Emoji) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  total: number;
  isInCart: (id: string) => boolean;
}

const CartContext = createContext<CartContextType>({
  items: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  total: 0,
  isInCart: () => false,
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<Emoji[]>([]);

  const addToCart = (emoji: Emoji) => {
    if (!items.find(i => i.id === emoji.id)) {
      setItems([...items, emoji]);
    }
  };

  const removeFromCart = (id: string) => setItems(items.filter(i => i.id !== id));
  const clearCart = () => setItems([]);
  const total = items.reduce((sum, i) => sum + i.price, 0);
  const isInCart = (id: string) => items.some(i => i.id === id);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, total, isInCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
