import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react'; // Importe useState
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';

import Home from './Components/Home';
import Jogo from './Components/Jogo';
// import NavBar from './Components/NavBar'; // Remova esta linha
import Carrinho from './Components/Carrinho'; // Mantenha esta importação aqui

function App() {
  const [showCart, setShowCart] = useState(false); // Estado para controlar a visibilidade do carrinho
  const handleCloseCart = () => setShowCart(false);
  const handleShowCart = () => setShowCart(true);

  return (
    <Router>
      <CartProvider>
        {/* Removemos a NavBar. Agora o botão para abrir o carrinho estará nos componentes Home e Jogo */}
        <Routes>
          {/* Passa as funções para Home e Jogo controlarem a exibição do carrinho */}
          <Route path="/" element={<Home handleShowCart={handleShowCart} />} />
          <Route path="/item/:id" element={<Jogo handleShowCart={handleShowCart} />} />
          <Route path="*" element={<h1>404 - Página Não Encontrada</h1>} />
        </Routes>

        {/* O componente Carrinho é renderizado aqui para estar sempre disponível,
            e sua visibilidade é controlada pelos estados showCart e handleCloseCart */}
        <Carrinho show={showCart} handleClose={handleCloseCart} />

        {/* Toast para feedback de adição ao carrinho */}
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
            <div className="toast-body">
              {/* Mensagem será inserida via JavaScript */}
            </div>
          </div>
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;