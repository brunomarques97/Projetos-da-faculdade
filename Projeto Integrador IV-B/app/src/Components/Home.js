import './Home.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import Pagination from 'react-bootstrap/Pagination';
import React, { useEffect, useState } from "react";

import data from '../data/pets.json'

const Home=()=>{  
  const [loading, setLoading] = useState(true);

  const [activePage, setActivePage] = useState(1);
  const [Pages,setPages] = useState(1);
  const itemsPerPage = 20;


  const indexOfLastItem = activePage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const [currentItems, setCurrentItems] = useState([]);

  const isFirstPage = activePage === 1;
  const isLastPage = activePage === Pages;

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
  
        setCurrentItems(data.slice(indexOfFirstItem,indexOfLastItem));
        setPages(Math.ceil(data.length / itemsPerPage));
        
  }, [activePage,indexOfFirstItem]);

 
  const paginate = (pageNumber) => setActivePage(pageNumber);

  console.log(currentItems)


    return (
      <section className='main'>
             
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
                    >
                      <option value="Todos">Todas as categorias</option>
                      
                    </select>
                </div> 
              </div>    
          </section>
        
        <section className='container'>
          <section className='row'>
              {currentItems.map((item) => (

                <div className='card col-12 col-lg-2 col-md-2 col-sm-4 mb-1 '>
              
                    <div key={item.id} >
                      <img src={item.photo} alt='imagem' className='capa'/>
                      <h2 className='card-title'>{item.name}</h2>
                      <p className='short-descricao'>{item.description}</p>
                    </div>
 
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
    )
   
  }
  
  export default Home;