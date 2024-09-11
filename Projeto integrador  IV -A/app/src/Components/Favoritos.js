import './Jogos.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState,useEffect } from 'react';
import Pagination from 'react-bootstrap/Pagination';

import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";

const Favoritos=()=>{
  const location = useLocation();
  const data = location.state?.favorites || "No data provided"; 
 
  const [activePage, setActivePage] = useState(1);
  const [Pages,setPages] = useState(1);
  const itemsPerPage = 20;


  const indexOfLastItem = activePage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const [currentItems, setCurrentItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const isFirstPage = activePage === 1;
  const isLastPage = activePage === Pages;

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(()=> {
    const filtroNome = data.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastItem = activePage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    setCurrentItems(filtroNome.slice(indexOfFirstItem,indexOfLastItem));

    setPages(Math.ceil(filtroNome.length / itemsPerPage));

    const filtered = filtroNome.filter(item => {
      if (selectedCategory === 'Todos') {
        return true;
      }
      return item.genres === selectedCategory;
    });

    setCurrentItems(filtered.slice(indexOfFirstItem,indexOfLastItem));

    setPages(Math.ceil(filtered.length / itemsPerPage));


  }, [searchTerm,activePage,indexOfFirstItem,selectedCategory,data]);
  

  const handleCategoryChange = (event) => {
     
    setSelectedCategory(event.target.value);

  };
  
  const paginate = (pageNumber) => setActivePage(pageNumber); 
   
     return (
      <section className='main'>
        <h1 className='titulo'>Favoritos</h1>
        
        <Link to={`/`}>
          <button className='botao'>X</button>
        </Link>
       
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
                      value={selectedCategory}
                      onChange={handleCategoryChange}
                    >
                      <option value="Todos">Todas as categorias</option>
                      <option value="Action">Action</option>
                      <option value="Adventure">Adventure</option>
                      <option value="Animation & Modeling">Animation & Modeling</option>
                      <option value="Audio Production">Audio Production</option>
                      <option value="Casual">Casual</option>
                      <option value="Design & Illustration">Design & Illustration</option>
                      <option value="Early Access">Early Access</option>
                      <option value="Education">Education</option>
                      <option value="Free to Play">Free to Play</option>
                      <option value="Game Development">Game Development</option>
                      <option value="Gore">Gore</option>
                      <option value="Indie">Indie</option>
                      <option value="Massively Multiplayer">Massively Multiplayer</option>
                      <option value="Photo Editing">Photo Editing</option>
                      <option value="Racing">Racing</option>
                      <option value="RPG">RPG</option>
                      <option value="Sexual Content">Sexual Content</option>
                      <option value="Simulation">Simulation</option>
                      <option value="Software Training">Software Training</option>
                      <option value="Sports">Sports</option>
                      <option value="Strategy">Strategy</option>
                      <option value="Utilities">Utilities</option>
                      <option value="Video Production">Video Production</option>
                      <option value="Violent">Violent</option>
                    </select>
                </div> 
              </div>    
          </section>
        
        <section className='container'>
          <section className='row'>
              {currentItems.map((item) => (

                <div className='card col-12 col-lg-2 col-md-2 col-sm-4 mb-1 '>

                  <Link to={`/item/${item.appID}`} state={{ data }} >
              
                    <div key={item.appID} >
                      <img src={item.headerImage} alt='imagem' className='capa'/>
                      <h2 className='card-title'>{item.name}</h2>
                      <p className='short-descricao'>{item.shortDesc}</p>
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
  
  export default Favoritos;