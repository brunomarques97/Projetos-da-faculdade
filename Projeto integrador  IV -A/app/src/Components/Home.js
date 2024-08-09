import './Home.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState,useEffect } from 'react';
import Pagination from 'react-bootstrap/Pagination';

import data from '../data/games.json';


const Home=({jogo})=>{
 

  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 200;

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const indexOfLastItem = activePage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const [currentItems, setCurrentItems] = useState([]);

  const isFirstPage = activePage === 1;
  const isLastPage = activePage === totalPages;

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(()=> {

    const filtro = data.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastItem = activePage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    setCurrentItems(filtro.slice(indexOfFirstItem,indexOfLastItem));
  }, [searchTerm,activePage,indexOfFirstItem]);

  
  const handleCategoryChange = (event) => {
     
    console.log(event.target.value);

  };
  
  const paginate = (pageNumber) => setActivePage(pageNumber); 

  console.log(currentItems)
  
    return (
      <section className='main'>
        <h1>Games</h1>
        <section className='container banner'>
            <div>
              <input
                className='search'
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
              </div>
              <div>
                <div className="mb-3">
                    <select
                      id="categorySelect"
                      className="form-select"
                      onChange={handleCategoryChange}
                    >
                      <option value="">Todas as categorias</option>
                      <option value="Categoria A">Categoria A</option>
                      <option value="Categoria B">Categoria B</option>
                      <option value="Categoria C">Categoria C</option>
                    </select>
                </div> 
              </div>    
          </section>
        
        <section className='container'>
          <section className='row'>
              {currentItems.map((item) => (
                
                    <div 
                      className='card col-12 col-lg-2 col-md-2 col-sm-4 mb-1 '
                      onClick={jogo}
                    >
                      <img src={item.headerImage} alt='imagem' className='capa'/>
                      <h2 className='card-title'>{item.name}</h2>
                      <p className='short-descricao'>{item.shortDesc}</p>
                    </div>        
              ))}
          </section>
        </section>
        <section>

            <Pagination className='d-flex justify-content-center'>
                <Pagination.Prev disabled={isFirstPage} onClick={() => paginate(activePage - 1)}>
                  Previous
                </Pagination.Prev>
                {[...Array(totalPages)].map((_, index) => (
                  <Pagination.Item
                    key={index + 1}
                    active={activePage === index + 1}
                    onClick={() => paginate(index + 1)}
                  >
                    {index + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next disabled={isLastPage} onClick={() => paginate(activePage + 1)}>
                  Next
                </Pagination.Next>
            </Pagination>
          </section>
      </section>
    );
  }
  
  export default Home;