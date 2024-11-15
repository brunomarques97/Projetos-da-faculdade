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
      <h1> Cadastro de pets</h1>
    </section>

     <section className='container'>
        <section className='row'>

              <div className='col-6 d-flex'>
                <form>
                  <label>Instituições</label><br/>
                  <input type="text" />
                </form>
              </div>

              <div className='col-6 d-flex'>
                <form>
                  <label>Nome do animal</label><br/>
                  <input type="text" />
                </form>
              </div>

          </section> 
      </section>

      <section className='container'>
        <section className='row'>
          
          <div className="col-6 d-flex">
          <p>Especie</p>
            <form>
              <input type="radio" name='Canino'/>
              <label >Canino</label>
              <input type="radio" name='Canino'/>
              <label >Felino</label>
            </form>
          </div>

          <div className='col-6 d-flex'>
          <p>Tamanho do animal</p>
            <form>
              <input type="radio" name='Canino'/>
              <label >Pequeno</label>
              <input type="radio" name='Canino'/>
              <label >Medio</label>
              <input type="radio" name='Canino'/>
              <label >Grande</label>
            </form>    
          </div>

          </section> 
      </section>

      <section className='container'>
        <section className='row'>

            <div className="col-6 d-flex">
              <form>
                <label htmlFor="image-upload">Selecione uma imagem:</label>
                <input
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {selectedImage && (
                  <div className="image-preview">
                    <div className="image-container">
                      <img src={selectedImage} alt="Imagem selecionada" />
                    </div>
                    <div className="thumbnail">
                      <img src={selectedImage} alt="Thumbnail" />
                    </div>
                  </div>
                )}
              </form>
            </div>

              <div className='col-6 d-flex'>
                <form>
                  <label>Descrição</label><br/>
                  <input type="text" />
                </form>
              </div>

          </section> 
      </section>

      <section className='container'>
        <button>Cadastrar</button>
      </section>

    </section>
  );
}
  
export default Registro;