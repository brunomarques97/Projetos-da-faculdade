import './Home.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState,useEffect } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import { Link } from 'react-router-dom';


const Home=()=>{  
  const [activePage, setActivePage] = useState(1);
  const [Pages,setPages] = useState(1);
  const itemsPerPage = 20;

  const indexOfLastItem = activePage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const [currentItems, setCurrentItems] = useState([]);

  const isFirstPage = activePage === 1;
  const isLastPage = activePage === Pages;

  const [searchTerm, setSearchTerm] = useState('');

  const [data, setData] = useState([]);

  useEffect(() => {
      fetch('http://localhost/pets/dados.php?acao=listar&tabela=dados') 
          .then(response => response.json())
          .then(data => setData(data))
          .catch(error => console.error('Erro:', error));
  }, []);


  useEffect(()=> {

    const filtroCidade = data.filter((item) => {
    if (item.cidade) {
        return item.cidade.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return false; 
});

    const indexOfLastItem = activePage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    setCurrentItems(filtroCidade.slice(indexOfFirstItem,indexOfLastItem));
    setPages(Math.ceil(filtroCidade.length / itemsPerPage));
  
  }, [searchTerm,activePage,indexOfFirstItem,data]);

  
  const paginate = (pageNumber) => setActivePage(pageNumber); 

  return (
    <section className='main' >
       <section className='container banner'>
            <div>
              <input
                className='search'
                type="text"
                placeholder="Search  City..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
              </div>    
          </section>
      <section className='container'>
          <section className='row'>
              {currentItems.map((item) => (
                <div className='card col-12 col-lg-2 col-md-2 col-sm-4 mb-1 '>
                  
                  <Link to={`/Pet/${item.id}`} state={{ data }} >
                    <div >
                      <img src={item.photo} alt='imagem' className='capa' style={{ width: '10em', height: '10em' }}/>
                      <h2 className='card-title'>{item.name}</h2>
                      <p className='short-descricao'>
                       {item.cidade}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
          </section>
        </section>
        <section>
            <Pagination className='d-flex justify-content-center'>
                <Pagination.Prev disabled={isFirstPage} onClick={() => paginate(activePage - 1)}>
                  Previous
                </Pagination.Prev>
               
                {[...Array(Pages)].map((_, index) => {
                      const pageNumber = index + 1;
                  if (Pages > 10) {
                  
                    if (pageNumber === 1 || pageNumber === Pages || (pageNumber >= activePage - 2 && pageNumber <= activePage + 2)) {
                      return (
                        <Pagination.Item
                          key={pageNumber}
                          active={activePage === pageNumber}
                          onClick={() => paginate(pageNumber)}
                        >
                          {pageNumber}
                        </Pagination.Item>
                      );
                    } else if (pageNumber === activePage - 3) {
                      return <Pagination.Item key="ellipsis1">...</Pagination.Item>;
                    } else if (pageNumber === activePage + 3) {
                      return <Pagination.Item key="ellipsis2">...</Pagination.Item>;
                    }
                  } else {
                    return (
                      <Pagination.Item
                        key={pageNumber}
                        active={activePage === pageNumber}
                        onClick={() => paginate(pageNumber)}
                      >
                        {pageNumber}
                      </Pagination.Item>
                    );
                  }
                })}
                
                <Pagination.Next disabled={isLastPage} onClick={() => paginate(activePage + 1)}>
                  Next
                </Pagination.Next>
            </Pagination>
          </section> 
    </section>
  );
}
  
export default Home;