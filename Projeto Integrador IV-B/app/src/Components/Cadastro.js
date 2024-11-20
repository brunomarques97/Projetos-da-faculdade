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
          <div className='col-1'></div>
              <div className='col-5 d-flex'>
                <form>
                  <label>Instituição</label><br/>
                  <input type="text" />
                </form>
              </div>

              <div className='col-5 d-flex'>
                <form>
                  <label>Nome do animal</label><br/>
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
          <label>Especie</label>
            <form>
              <div class="opcoes_lista">

              <div class="col-2 d-inline-flex">
                
                  <input type="radio" name='Canino'/>
                  <label>Canino</label>
                
              </div> 
              
              <div class="col-2 d-inline-flex">
                <input type="radio" name='Canino'/>
                <label>Felino</label>
              </div>
              
              </div>

            </form>
          </div>

          <div className='col-5'>
          <label>Tamanho do animal</label>
            <form>
              <div class="opcoes_lista">

                <div class="col-2 d-inline-flex">
                  <input type="radio" name='Canino'/>
                  <label >Pequeno</label>
                </div>
              
              <div class="col-2 d-inline-flex">
                <input type="radio" name='Canino'/>
                <label >Medio</label>
              </div>
              
              <div class="col-2 d-inline-flex">
                <input type="radio" name='Canino'/>
                <label >Grande</label>
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
              <label htmlFor="image-upload">Selecione uma imagem:</label>
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
                  <label>Descrição</label><br/>

                  <textarea class="descricao" name="descrição" form="textarea" placeholder="Digite algo aqui"></textarea>

                </form>
              </div>
            <div className='col-1'></div>
          </section> 
      </section>

      <section className='container d-flex botao1'>
        <button>Cadastrar</button>
      </section>

    </section>
  );
}
  
export default Registro;