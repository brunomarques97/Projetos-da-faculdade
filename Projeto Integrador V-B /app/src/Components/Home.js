import './Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import axios from 'axios';

import logo from '../img/logo.png';

const Home = ({ handleShowCart }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = useMemo(() => {
    return new URLSearchParams(location.search);
  }, [location.search]);

  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(parseInt(queryParams.get('page')) || 1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const pageFromUrl = parseInt(queryParams.get('page'));
    if ((!isNaN(pageFromUrl) && pageFromUrl !== currentPage) || (queryParams.get('page') === null && currentPage !== 1)) {
      setCurrentPage(isNaN(pageFromUrl) ? 1 : pageFromUrl);
    }
  }, [location.search, currentPage, queryParams]);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const totalPagesResponse = await axios.get('http://localhost:8080/jogo/numeroPaginas');
        const totalPages = totalPagesResponse.data;
        setTotalPages(totalPages || 1);

        const itemsResponse = await axios.get(`http://localhost:8080/jogo/listarPagina/${currentPage}`);
        setItems(Array.isArray(itemsResponse.data) ? itemsResponse.data : []);
      } catch (error) {
        console.error('Erro ao buscar itens:', error);
        setItems([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [currentPage]);


  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      navigate(`?page=${newPage}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

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
            <img src={logo} alt="Logo" style={{ height: '50px' }} />
          </Link>

          <div className="d-flex">
            <div className="dropdown me-2">
              <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                Category
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li><button className="dropdown-item">All Categories</button></li>
                <li><button className="dropdown-item">Action</button></li>
                <li><button className="dropdown-item">Adventure</button></li>
                <li><button className="dropdown-item">RPG</button></li>
              </ul>
            </div>

            <div className="dropdown">
              <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                Platform
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li><button className="dropdown-item">All Platforms</button></li>
                <li><button className="dropdown-item">PC</button></li>
                <li><button className="dropdown-item">PlayStation</button></li>
                <li><button className="dropdown-item">Xbox</button></li>
              </ul>
            </div>

            <button className="btn btn-info ms-2" onClick={handleShowCart}>Ver Carrinho</button>
          </div>
        </div>
      </header>

      <div className="container" style={{ paddingTop: 'calc(56px + 1.5rem)' }}>
        <h1 className="text-center mb-4">Games</h1>

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-stretch align-items-md-center mb-4">
          <form className="input-group flex-grow-1 me-md-5 mb-3 mb-md-0">
            <span className="input-group-text">&#x1F50D;</span>
            <input type="text" className="form-control" placeholder="Search" />
          </form>

          <div className="dropdown">
            <button className="btn btn-outline-secondary dropdown-toggle w-100" type="button" data-bs-toggle="dropdown">
              Classify
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li><button className="dropdown-item">None</button></li>
              <li><button className="dropdown-item">Name (A-Z)</button></li>
              <li><button className="dropdown-item">Name (Z-A)</button></li>
              <li><button className="dropdown-item">Price (Low to High)</button></li>
              <li><button className="dropdown-item">Price (High to Low)</button></li>
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
                  {item.headerImage || item.image ? (
                    <img
                      src={item.headerImage || item.image}
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
              <button className="page-link" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                Anterior
              </button>
            </li>
            <li className="page-item disabled">
              <span className="page-link">
                Página {currentPage} de {totalPages}
              </span>
            </li>
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                Próxima
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Home;