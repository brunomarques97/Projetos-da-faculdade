import React, { createContext, useState, useContext, useEffect } from 'react';
import * as bootstrap from 'bootstrap';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const localData = localStorage.getItem('cartItems');
      return localData ? JSON.parse(localData) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    } catch {}
  }, [cartItems]);

  const addToCart = (game) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(item => item.id === game.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === game.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...game, price: game.price || 0, quantity: 1 }];
      }
    });

    const toastEl = document.getElementById('cartToast');
    if (toastEl) {
      const toastBody = toastEl.querySelector('.toast-body');
      if (toastBody) {
        toastBody.textContent = `${game.name} foi adicionado ao carrinho!`;
      }
      const toast = new bootstrap.Toast(toastEl, { delay: 3000 });
      toast.show();
    }
  };

  const removeFromCart = (gameId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== gameId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    cartCount: cartItems.reduce((total, item) => total + item.quantity, 0),
    cartTotal: cartItems.reduce((total, item) => total + (item.price || 0) * item.quantity, 0)
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};