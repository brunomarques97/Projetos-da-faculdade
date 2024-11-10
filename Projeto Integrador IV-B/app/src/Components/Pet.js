import './Pet.css';

import { useLocation } from "react-router-dom";
import { useParams, useNavigate  } from 'react-router-dom';

const Pet=()=>{  
  const location = useLocation();
  const data = location.state?.data || "No data provided";

  const { id } = useParams();
  const navigate = useNavigate();
  const item = data.find((item) => item.id === parseInt(id));

  console.log(item)

  return (
    <section className='main'>

      <section className="container">
          <button onClick={() => navigate(-1)} className='botao'>Voltar</button>
      </section> 
      
      <section className='container'>
        <section className='row'>

              <div className='col-6'>
                  <img src={item.photo} alt='photo'/>
                  <section>
                    <h1 className='titulo'>{item.name}</h1>
                    <p>{item.Raca_primaria} - {item.cidade}</p>
                  </section>
                  
              </div>
          </section> 
      </section>

      <section className='container'>
        <section className='row'>

          <div className='col-6'>
              <h3>Tamanho do animal:</h3>
              <p>{item.size}</p>
          </div>

          <div className='col-6'>
              <h3>Idade do animal:</h3>
              <p>{item.age}</p>
          </div>

          </section> 
      </section>

      <section className='container'>
        <section className='row'>

          <div className='col-6'>
              <h3>Tamanho do pelo:</h3>
              <p>nao tem</p>
          </div>

          <div className='col-6'>
              <h3>Genero do animal:</h3>
              <p>{item.gender}</p>
          </div>

          </section> 
      </section>

      <section className='container'>
        <section className='row'>

          <div className='col-6'>
              <h3>Contato:</h3>
              <div>
                <h6>E-mail:</h6>
                <p>{item.email}</p>
              </div>
              <div>
                <h6>Numero:</h6>
                <p>{item.telefone ? item.telefone : 'Telefone não informado'}</p>
              </div>
          </div>

          <div className='col-6'>
              <h3>Tipo de animal:</h3>
              <p>{item.type}</p>
          </div>

          </section> 
      </section>

                    
    </section>
            
  );
}
  
export default Pet;