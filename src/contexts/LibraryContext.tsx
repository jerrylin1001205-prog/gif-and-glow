import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface LibraryItem {
  id: string;
  name: string;
  emoji: string;
  type: 'standard' | 'word' | 'gif' | 'animated' | 'sound';
  color?: string;
  fontFamily?: string;
  fontSize?: number;
  animation?: string;
  addedAt: number;
}

interface LibraryContextType {
  items: LibraryItem[];
  addItem: (item: Omit<LibraryItem, 'id' | 'addedAt'>) => void;
  removeItem: (id: string) => void;
  updateItem: (id: string, updates: Partial<LibraryItem>) => void;
}

const LibraryContext = createContext<LibraryContextType>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  updateItem: () => {},
});

export const LibraryProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<LibraryItem[]>(() => {
    const saved = localStorage.getItem('emojiverse-library');
    return saved ? JSON.parse(saved) : [];
  });

  const save = (newItems: LibraryItem[]) => {
    setItems(newItems);
    localStorage.setItem('emojiverse-library', JSON.stringify(newItems));
  };

  const addItem = (item: Omit<LibraryItem, 'id' | 'addedAt'>) => {
    const newItem: LibraryItem = { ...item, id: crypto.randomUUID(), addedAt: Date.now() };
    save([newItem, ...items]);
  };

  const removeItem = (id: string) => save(items.filter(i => i.id !== id));

  const updateItem = (id: string, updates: Partial<LibraryItem>) => {
    save(items.map(i => i.id === id ? { ...i, ...updates } : i));
  };

  return (
    <LibraryContext.Provider value={{ items, addItem, removeItem, updateItem }}>
      {children}
    </LibraryContext.Provider>
  );
};

export const useLibrary = () => useContext(LibraryContext);
