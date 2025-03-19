import './Cadastro.css';

import React, { useState } from 'react';

const Registro=()=>{ 
  
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];   

    const reader = new FileReader();

    reader.onload = () => {
      setSelectedImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  return (
    <section className='main'>

    <section className='container'> 
      <h1>Pet registration</h1>
    </section>
    <section className='area'>
     <section className='container '>
        <section className='row'>
          <div className='col-1'></div>
              <div className='col-5 d-flex'>
                <form>
                  <label>Institution</label><br/>
                  <input type="text" />
                </form>
              </div>

              <div className='col-5 d-flex'>
                <form>
                  <label>Animal name</label><br/>
                  <input type="text" />
                </form>
              </div>
          <div className='col-1'></div>

          </section> 
      </section>

      <section className='container'>
        <section className='row'>
          <div className='col-1'></div>
          
          <div className="col-5">
          <label>Species</label>
            <form>
              <div class="opcoes_lista">

              <div class="col-2 d-inline-flex">
                
                  <input type="radio" name='Canino'/>
                  <label>Canine</label>
                
              </div> 
              
              <div class="col-2 d-inline-flex">
                <input type="radio" name='Canino'/>
                <label>Feline</label>
              </div>
              
              </div>

            </form>
          </div>

          <div className='col-5'>
          <label>Animal size</label>
            <form>
              <div class="opcoes_lista">

                <div class="col-2 d-inline-flex">
                  <input type="radio" name='Canino'/>
                  <label >Small</label>
                </div>
              
              <div class="col-2 d-inline-flex">
                <input type="radio" name='Canino'/>
                <label >Half</label>
              </div>
              
              <div class="col-2 d-inline-flex">
                <input type="radio" name='Canino'/>
                <label >Big</label>
              </div>
              
              </div>
              
            </form>    
          </div>
          <div className='col-1'></div>
          </section> 
      </section>

      <section className='container'>
        <section className='row'>
          <div className='col-1'></div>
            <div className="col-5">
              <label htmlFor="image-upload">Select an image:</label>
              <form>
                
                <input
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {selectedImage && (
                  <div className="image-preview">
                    <div className="image-container">
                      <img src={selectedImage} alt="Imagem selecionada" class="imagem"/>
                    </div>
                  </div>
                )}  
              </form>
            </div>

              <div className='col-5 d-flex'>
                <form id="textarea">
                  <label>Description</label><br/>

                  <textarea class="descricao" name="descrição" form="textarea" placeholder="Type something here"></textarea>

                </form>
              </div>
            <div className='col-1'></div>
          </section> 
      </section>

      <section className='container d-flex botao1'>
        <button>Register</button>
      </section>
    </section>
    </section>
  );
}
  
export default Registro;