import './Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import logo from '../img/logo.png';

const Home = ({ handleShowCart }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = useMemo(() => new URLSearchParams(location.search), [location.search]);

  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(parseInt(queryParams.get('page')) || 1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const [categoria, setCategoria] = useState(queryParams.get('categoria') || 'All');
  const [plataforma, setPlataforma] = useState(queryParams.get('plataforma') || 'All');
  const [orderBy, setOrderBy] = useState(queryParams.get('orderBy') || 'name');
  const [orderDirection, setOrderDirection] = useState(queryParams.get('orderDirection') || 'asc');
  const [search, setSearch] = useState(queryParams.get('search') || '');

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const params = {
          page: currentPage,
          category: categoria,
          platform: plataforma,
          search,
          orderBy,
          orderDirection,
        };

        const response = await axios.get('http://localhost:8080/jogo/filtrar', { params });
        const { jogos, totalPages } = response.data;

        setItems(jogos || []);
        setTotalPages(totalPages || 1);
      } catch (error) {
        setItems([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [currentPage, categoria, plataforma, search, orderBy, orderDirection]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      navigate(`?page=${newPage}&categoria=${categoria}&plataforma=${plataforma}&orderBy=${orderBy}&orderDirection=${orderDirection}&search=${search}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    navigate(`?page=1&categoria=${categoria}&plataforma=${plataforma}&orderBy=${orderBy}&orderDirection=${orderDirection}&search=${search}`);
  };

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
                {['All', 'Action', 'Adventure', 'Strategy', 'RPG', 'Simulation', 'Casual', 'Indie', 'Sports', 'Racing', 'Massively Multiplayer', 'Early Access', 'Free to Play', 'Utilities', 'Design & Illustration', 'Animation & Modeling', 'Web Publishing', 'Audio Production', 'Video Production', 'Software Training', 'Education', 'Photo Editing'].map((cat) => (
                  <li key={cat}>
                    <button className="dropdown-item" onClick={() => {
                      setCategoria(cat);
                      setCurrentPage(1);
                      navigate(`?page=1&categoria=${cat}&plataforma=${plataforma}&orderBy=${orderBy}&orderDirection=${orderDirection}&search=${search}`);
                    }}>
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="dropdown">
              <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                Platform
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                {['All', 'PC', 'Mac', 'Linux'].map((plat) => (
                  <li key={plat}>
                    <button className="dropdown-item" onClick={() => {
                      setPlataforma(plat);
                      setCurrentPage(1);
                      navigate(`?page=1&categoria=${categoria}&plataforma=${plat}&orderBy=${orderBy}&orderDirection=${orderDirection}&search=${search}`);
                    }}>
                      {plat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <button className="btn btn-info ms-2" onClick={handleShowCart}>Ver Carrinho</button>
          </div>
        </div>
      </header>

      <div className="container" style={{ paddingTop: 'calc(56px + 1.5rem)' }}>
        <h1 className="text-center mb-4">Games</h1>

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-stretch align-items-md-center mb-4">
          <form className="input-group flex-grow-1 me-md-5 mb-3 mb-md-0" onSubmit={handleSearchSubmit}>
            <span className="input-group-text">&#x1F50D;</span>
            <input
              type="text"
              className="form-control"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="btn btn-outline-secondary" type="submit">Buscar</button>
          </form>

          <div className="dropdown">
            <button className="btn btn-outline-secondary dropdown-toggle w-100" type="button" data-bs-toggle="dropdown">
              Classify
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              {[
                { label: 'None', orderByVal: 'name', orderDirectionVal: 'asc' },
                { label: 'Name (A-Z)', orderByVal: 'name', orderDirectionVal: 'asc' },
                { label: 'Name (Z-A)', orderByVal: 'name', orderDirectionVal: 'desc' },
                { label: 'Release Date (Oldest)', orderByVal: 'release_date', orderDirectionVal: 'asc' },
                { label: 'Release Date (Newest)', orderByVal: 'release_date', orderDirectionVal: 'desc' },
              ].map(({ label, orderByVal, orderDirectionVal }) => (
                <li key={label}>
                  <button className="dropdown-item" onClick={() => {
                    setOrderBy(orderByVal);
                    setOrderDirection(orderDirectionVal);
                    setCurrentPage(1);
                    navigate(`?page=1&categoria=${categoria}&plataforma=${plataforma}&orderBy=${orderByVal}&orderDirection=${orderDirectionVal}&search=${search}`);
                  }}>
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {loading ? (
          <p className="text-center">Carregando itens...</p>
        ) : items.length === 0 ? (
          <p className="text-center">Nenhum item encontrado.</p>
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