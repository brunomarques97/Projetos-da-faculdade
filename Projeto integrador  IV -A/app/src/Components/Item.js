import './Item.css';

import { useParams, useNavigate  } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import { useState,useEffect } from 'react';

import data from '../data/games.json'

const Item=()=>{
  const { id } = useParams();
  const navigate = useNavigate();
  const item = data.find((item) => item.appID === parseInt(id));

  const screenshots = Array.isArray(item.screenshots)
  ? item.screenshots
  : typeof item.screenshots === 'string'
  ? item.screenshots.split(',')
  : [];

  const [mostrarWindows, setmostrarWindows] = useState(true);
  const [mostrarLinux, setmostrarLinux] = useState(true);
  const [mostrarMac, setmostrarMac] = useState(true);

  useEffect(() => {
    setmostrarWindows(item.supportWindows);
    setmostrarLinux(item.supportLinux);
    setmostrarMac(item.supportMac);
  }, [item]);

 
    
  console.log(item)


    return (
        <section className="container">
          <button onClick={() => navigate(-1)}>Voltar</button>
          <section >
            <h1 className='titulo'>{item.name}</h1>

          <section className='container'>
            <section className='row'>

            <div className='col-6'>
                  <Carousel >
                    <Carousel.Item >
                      <video
                        className="d-block w-100"
                        src={item.movies}
                        alt="First slide"
                        controls
                        autoPlay
                        muted
                        onEnded={true}
                      />
                    </Carousel.Item>

                      {screenshots.map((image, index) => (
                        <Carousel.Item key={index}>
                          <img
                            className="d-block w-100"
                            src={image}
                            alt={`Screenshot ${index + 1}`}
                          />
                        </Carousel.Item>
                      ))}

                  </Carousel>
              </div>

              <div className='col-6 informacoes'>
                <div>
                  <div>
                    <h2>game information</h2>
                  </div>
                  <div>
                    <h6>Supported Platforms</h6>
                    {mostrarWindows && <p>Windows</p>}
                    {mostrarLinux && <p>Linux</p>}
                    {mostrarMac && <p>Mac</p>}
                  </div>
                  <div>
                    <h6>Supported languages</h6>
                    <p>{item.languages}</p>
                  </div>
                </div>
              </div>
              <div className='col-12'>
                  <p>{item.longDesc}</p>
              </div>
              <div className='col-12'>
                  <h2>Comments</h2>
                  <input></input>
              </div>
              
            </section>          
          </section>

            
          </section>
            
        </section>

    );
  }
  
  export default Item;