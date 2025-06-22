import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';

import Home from './Components/Home';
import Jogo from './Components/Jogo';
import Carrinho from './Components/Carrinho';
import AuthForm from './Components/AuthForm';
import RegisterForm from './Components/RegisterForm';
import EditForm from './Components/EditForm';

function App() {
  const [showCart, setShowCart] = useState(false);

  return (
    <Router>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Home handleShowCart={() => setShowCart(true)} />} />
          <Route path="/item/:id" element={<Jogo handleShowCart={() => setShowCart(true)} />} />
          <Route path="/login" element={<AuthForm />} />
          <Route path="/cadastro" element={<RegisterForm />} />
          <Route path="/editar" element={<EditForm />} />
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