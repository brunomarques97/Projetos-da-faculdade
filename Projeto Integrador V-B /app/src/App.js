import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';

import Home from './Components/Home';
import Jogo from './Components/Jogo';
import Carrinho from './Components/Carrinho';
import AuthForm from './Components/AuthForm';
import RegisterForm from './Components/RegisterForm';
import EditForm from './Components/EditForm';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('jwtToken');
  let isValidToken = false;

  if (token) {
    try {
      const payloadBase64 = token.split('.')[1];
      const decodedPayload = JSON.parse(atob(payloadBase64));

      if (decodedPayload.exp * 1000 > Date.now()) {
        isValidToken = true;
      } else {
        console.warn("Token JWT expirado. Redirecionando para login.");
        localStorage.removeItem('jwtToken');
      }
    } catch (e) {
      console.error("Erro ao decodificar ou validar o token JWT:", e);
      localStorage.removeItem('jwtToken');
    }
  }

  return isValidToken ? children : <Navigate to="/login" />;
};

function App() {
  const [showCart, setShowCart] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <CartProvider>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                handleShowCart={() => setShowCart(true)}
                isLoggedIn={isLoggedIn}
                handleLogout={handleLogout}
              />
            }
          />
          <Route path="/item/:id" element={<Jogo handleShowCart={() => setShowCart(true)} />} />
          <Route
            path="/login"
            element={<AuthForm handleLoginSuccess={handleLoginSuccess} />}
          />
          <Route
            path="/cadastro"
            element={
              <PrivateRoute>
                <RegisterForm isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
              </PrivateRoute>
            }
          />
          <Route
            path="/editar/:id?"
            element={
              <PrivateRoute>
                <EditForm isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<h1>404 - Página Não Encontrada</h1>} />
        </Routes>

        <Carrinho show={showCart} handleClose={() => setShowCart(false)} />

        <div
          className="toast-container position-fixed bottom-0 end-0 p-3"
          style={{ zIndex: 11 }}
        >
          <div
            id="cartToast"
            className="toast bg-success text-white"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div className="toast-header bg-success text-white">
              <strong className="me-auto">Carrinho</strong>
              <small>Agora</small>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="toast"
                aria-label="Close"
              ></button>
            </div>
            <div className="toast-body" />
          </div>
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;