import './Pet.css';

import { useLocation } from "react-router-dom";
import { useParams, useNavigate  } from 'react-router-dom';

const Pet=()=>{  
  const location = useLocation();
  const data = location.state?.data || "No data provided";

  const { id } = useParams();
  const navigate = useNavigate();
  const item = data.find((item) => item.id === (id));


  return (
    <section className='main'>

      <section className="container d-flex botao" >
          <button onClick={() => navigate(-1)} >return</button>
      </section> 
      
      <section className='container borda'>
        <section className='row'>

              <div className='col-8 d-flex '>
                  <img src={item.photo} alt='photo'/>
                  
                  <section className='m-3'>
                    <h1 className='title-pet'>{item.name}</h1>
                    <p>{item.Raca_primaria} - {item.Cidade}</p>
                  </section>
                  
              </div>
          </section> 
      </section>

      <section className='borda'>

      <section className='container '>
        <section className='row'>

          <div className='item col-12 col-md-6'>
              <h3>Animal size:</h3>
              <p>{item.size}</p>
          </div>

              <div className='item col-12 col-md-6'>
              <h3>Age of animal:</h3>
              <p>{item.age}</p>
          </div>

          </section> 
      </section>

      <section className='container'>
        <section className='row'>

          <div className='item col-12 col-md-6 '>
              <h3>Hair size:</h3>
              <p>{item.coat}</p>
          </div>

          <div className='item col-12 col-md-6 '>
              <h3>Animal genus:</h3>
              <p>{item.gender}</p>
          </div>

          </section> 
      </section>

      <section className='container'>
        <section className='row'>

          <div className=' item col-12 col-md-6 '>
              <h3>Contact:</h3>
              <div>
                <h6>E-mail:</h6>
                <p>{item.Email}</p>
              </div>
              <div>
                <h6>Number:</h6>
                <p>{item.Numero ? item.Numero : 'Telephone number not provided'}</p>
              </div>
          </div>

          <div className='item col-12 col-md-6 '>
              <h3>Type of animal:</h3>
              <p>{item.type}</p>
          </div>

          </section> 
      </section>

    </section>
                    
    </section>
            
  );
}
  
export default Pet;