'use client';

import React, { createContext, useContext, useState } from 'react';

export interface CartItem {
  id: string;
  title: string;
  price: string;
  color?: string;
  size?: string;
  image: string;
  quantity: number;
}

export interface ProductForSize {
  id: string;
  title: string;
  price: string;
  color?: string;
  image: string;
  sizes?: string[];
}

interface ShopContextType {
  // Cart state
  cartItems: CartItem[];
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  subtotal: number;
  formattedSubtotal: string;
  cartCount: number;

  // Subscription sidebar state
  isSubscriptionOpen: boolean;
  openSubscription: () => void;
  closeSubscription: () => void;

  // Select Size sidebar state
  isSelectSizeOpen: boolean;
  selectedProductForSize: ProductForSize | null;
  openSelectSize: (product: ProductForSize) => void;
  closeSelectSize: () => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

// Initial demo item in bag as seen in screenshot
const INITIAL_CART_ITEMS: CartItem[] = [
  {
    id: 'cart-1',
    title: 'Charlie Quilted Drawstring Shoulder Bag',
    price: '£595',
    color: 'Light Cream',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=400&q=80',
    quantity: 1,
  },
];

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>(INITIAL_CART_ITEMS);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSubscriptionOpen, setIsSubscriptionOpen] = useState(false);
  const [isSelectSizeOpen, setIsSelectSizeOpen] = useState(false);
  const [selectedProductForSize, setSelectedProductForSize] = useState<ProductForSize | null>(null);

  const openCart = () => {
    setIsSubscriptionOpen(false);
    setIsSelectSizeOpen(false);
    setIsCartOpen(true);
  };

  const closeCart = () => setIsCartOpen(false);

  const openSubscription = () => {
    setIsCartOpen(false);
    setIsSelectSizeOpen(false);
    setIsSubscriptionOpen(true);
  };

  const closeSubscription = () => setIsSubscriptionOpen(false);

  const openSelectSize = (product: ProductForSize) => {
    setSelectedProductForSize(product);
    setIsCartOpen(false);
    setIsSubscriptionOpen(false);
    setIsSelectSizeOpen(true);
  };

  const closeSelectSize = () => {
    setIsSelectSizeOpen(false);
  };

  const addToCart = (newItem: CartItem) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.id === newItem.id && item.size === newItem.size && item.color === newItem.color
      );
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += newItem.quantity || 1;
        return updated;
      }
      return [newItem, ...prev];
    });
    // Open cart drawer after adding item
    openCart();
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item))
    );
  };

  // Calculate numeric subtotal
  const subtotal = cartItems.reduce((acc, item) => {
    const numericPrice = parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0;
    return acc + numericPrice * item.quantity;
  }, 0);

  const formattedSubtotal = `£${subtotal.toFixed(2)}`;

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <ShopContext.Provider
      value={{
        cartItems,
        isCartOpen,
        openCart,
        closeCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        subtotal,
        formattedSubtotal,
        cartCount,

        isSubscriptionOpen,
        openSubscription,
        closeSubscription,

        isSelectSizeOpen,
        selectedProductForSize,
        openSelectSize,
        closeSelectSize,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
}
