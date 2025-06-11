import './Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
// import Carrinho from './Carrinho'; // Remova esta importação, pois o Carrinho é renderizado no App.js

const Home = ({ handleShowCart }) => { // Recebe handleShowCart como prop
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(parseInt(queryParams.get('page')) || 1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  // const [showCart, setShowCart] = useState(false); // Remova este estado, pois é gerenciado no App.js
  const limit = 25; 
  
  useEffect(() => {
    const pageFromUrl = parseInt(queryParams.get('page'));
    if ((!isNaN(pageFromUrl) && pageFromUrl !== currentPage) || (queryParams.get('page') === null && currentPage !== 1)) {
      setCurrentPage(isNaN(pageFromUrl) ? 1 : pageFromUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const params = {
          page: currentPage,
          limit: limit,
        };
        
        const response = await axios.get('http://localhost:3001/api/items', { params });
        
        setItems(response.data.items);
        setTotalPages(response.data.totalPages);
        setLoading(false);

      } catch (error) {
        console.error('Erro ao buscar itens:', error);
        setLoading(false);
      }
    };

    fetchItems();
  }, [currentPage, limit]); 

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      navigate(`?page=${newPage}`); 
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // const handleCloseCart = () => setShowCart(false); // Remova esta função
  // const handleShowCart = () => setShowCart(true); // Remova esta função, agora recebida via prop

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <header className="navbar navbar-light bg-light border-bottom fixed-top">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <img src="/path/to/your/logo.png" alt="Sua Logo" style={{ height: '38px' }} />
          </Link>

          <div className="d-flex">
            <div className="dropdown me-2">
              <button className="btn btn-outline-secondary dropdown-toggle" type="button" id="categoryDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                Category
              </button>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="categoryDropdown">
                <li><button className="dropdown-item" type="button">All Categories</button></li>
                <li><button className="dropdown-item" type="button">Action</button></li>
                <li><button className="dropdown-item" type="button">Adventure</button></li>
                <li><button className="dropdown-item" type="button">RPG</button></li>
              </ul>
            </div>
            <div className="dropdown">
              <button className="btn btn-outline-secondary dropdown-toggle" type="button" id="platformDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                Platform
              </button>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="platformDropdown">
                <li><button className="dropdown-item" type="button">All Platforms</button></li>
                <li><button className="dropdown-item" type="button">PC</button></li>
                <li><button className="dropdown-item" type="button">PlayStation</button></li>
                <li><button className="dropdown-item" type="button">Xbox</button></li>
              </ul>
            </div>
            {/* Botão para abrir o carrinho no Home */}
            <button className="btn btn-info ms-2" onClick={handleShowCart}>Ver Carrinho</button>
          </div>
        </div>
      </header>

      <div className="container" style={{ paddingTop: 'calc(56px + 1.5rem)' }}>
        <h1 className="text-center mb-4">Games {currentPage > 1 ? `- Página ${currentPage}` : ''}</h1>

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-stretch align-items-md-center mb-4">
          <form className="input-group flex-grow-1 me-md-5 mb-3 mb-md-0">
            <span className="input-group-text" id="search-addon-main">
              &#x1F50D;
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="search"
              aria-label="Search"
              aria-describedby="search-addon-main"
            />
          </form>

          <div className="dropdown">
            <button className="btn btn-outline-secondary dropdown-toggle w-100" type="button" id="classifyDropdown" data-bs-toggle="dropdown" aria-expanded="false">
              Classify
            </button>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="classifyDropdown">
              <li><button className="dropdown-item" type="button">None</button></li>
              <li><button className="dropdown-item" type="button">Name (A-Z)</button></li>
              <li><button className="dropdown-item" type="button">Name (Z-A)</button></li>
              <li><button className="dropdown-item" type="button">Price (Low to High)</button></li>
              <li><button className="dropdown-item" type="button">Price (High to Low)</button></li>
            </ul>
          </div>
        </div>

        {items.length === 0 ? (
          <p>Nenhum item encontrado.</p>
        ) : (
          <section className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-3 mb-4">
            {items.map((item) => (
              <div key={item.id} className="col">
                <Link to={`/item/${item.id}`} className="card h-100 text-decoration-none text-dark">
                  {item.header_image || item.image ? (
                    <img
                      src={item.header_image || item.image}
                      alt={item.name || 'Item'}
                      className="card-img-top"
                      style={{ height: '180px', objectFit: 'cover' }}
                    />
                  ) : (
                    <div className="d-flex justify-content-center align-items-center bg-light" style={{ height: '180px' }}>
                       <span className="text-muted">No Image</span>
                    </div>
                  )}
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{item.name || item.nome || 'Item sem nome'}</h5>
                    <p className="card-text mt-auto">R$ {item.price ? item.price.toFixed(2) : 'N/A'}</p>
                  </div>
                </Link>
              </div>
            ))}
          </section>
        )}

        <nav aria-label="Navegação de página">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                aria-disabled={currentPage === 1 ? 'true' : 'false'}
              >
                Anterior
              </button>
            </li>
            <li className="page-item disabled">
              <span className="page-link">
                Página {currentPage} de {totalPages}
              </span>
            </li>
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-disabled={currentPage === totalPages ? 'true' : 'false'}
              >
                Próxima
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* O componente Carrinho não é mais renderizado aqui, é renderizado no App.js */}
    </>
  );
};
  
export default Home;