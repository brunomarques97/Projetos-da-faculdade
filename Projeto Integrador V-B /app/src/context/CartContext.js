import React, { createContext, useState, useContext, useEffect } from 'react';
import * as bootstrap from 'bootstrap'; // Corrigido: Importando bootstrap

// 1. Criação do Contexto
export const CartContext = createContext();

// 2. Criação do Provedor do Contexto
export const CartProvider = ({ children }) => {
    // Estado para gerenciar os itens no carrinho.
    // Tenta carregar do localStorage para persistência.
    const [cartItems, setCartItems] = useState(() => {
        try {
            const localData = localStorage.getItem('cartItems');
            return localData ? JSON.parse(localData) : [];
        } catch (error) {
            console.error("Erro ao carregar carrinho do localStorage:", error);
            return [];
        }
    });

    // Salva os itens do carrinho no localStorage sempre que eles mudam.
    useEffect(() => {
        try {
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
        } catch (error) {
            console.error("Erro ao salvar carrinho no localStorage:", error);
        }
    }, [cartItems]);

    // Função para adicionar um item ao carrinho
    const addToCart = (game) => {
        const existingItem = cartItems.find(item => item.id === game.id);

        if (existingItem) {
            setCartItems(cartItems.map(item =>
                item.id === game.id ? { ...item, quantity: item.quantity + 1 } : item
            ));
        } else {
            // Garante que o objeto game tenha um 'price' válido para o carrinho
            setCartItems([...cartItems, { ...game, price: game.price || 0, quantity: 1 }]);
        }
        // Feedback visual para o usuário
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

    // Função para remover um item do carrinho
    const removeFromCart = (gameId) => {
        setCartItems(cartItems.filter(item => item.id !== gameId));
    };

    // Função para limpar o carrinho
    const clearCart = () => {
        setCartItems([]);
    };

    // Objeto que será exposto pelo contexto.
    const contextValue = {
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        cartCount: cartItems.reduce((acc, item) => acc + item.quantity, 0),
        cartTotal: cartItems.reduce((acc, item) => acc + ((item.price || 0) * item.quantity), 0) // Garante que price seja numérico
    };

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
};

// Hook personalizado para facilitar o consumo do contexto
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};