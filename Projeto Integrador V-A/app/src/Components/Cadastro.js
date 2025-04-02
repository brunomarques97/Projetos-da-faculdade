import './Cadastro.css';

import React, { useState } from 'react';

const Registro=()=>{
  const [institution, setInstitution] = useState('');
  const [animalName, setAnimalName] = useState('');
  const [species, setSpecies] = useState('');
  const [animalSize, setAnimalSize] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [description, setDescription] = useState('');

  const handleInstitutionChange = (event) => {
    setInstitution(event.target.value);
  };

  const handleAnimalNameChange = (event) => {
    setAnimalName(event.target.value);
  };

  const handleSpeciesChange = (event) => {
    setSpecies(event.target.value);
  };

  const handleAnimalSizeChange = (event) => {
    setAnimalSize(event.target.value);
  };

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(URL.createObjectURL(event.target.files[0]));
    } else {
      setSelectedImage(null);
    }
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      institution,
      animalName,
      species,
      animalSize,
      selectedImage, // Note: You might want to handle file uploads differently
      description,
    };
    console.log('Dados do formulário:', formData);
    // Aqui você pode enviar os dados para o seu backend
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
              <label htmlFor="institution">Institution</label><br/>
              <input
                type="text"
                id="institution"
                value={institution}
                onChange={handleInstitutionChange}
              />
            </form>
          </div>

          <div className='col-5 d-flex'>
            <form>
              <label htmlFor="animalName">Animal name</label><br/>
              <input
                type="text"
                id="animalName"
                value={animalName}
                onChange={handleAnimalNameChange}
              />
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
            <form onChange={handleSpeciesChange}>
              <div className="opcoes_lista">
                <div className="col-2 d-inline-flex">
                  <input
                    type="radio"
                    name="species"
                    value="Canine"
                    checked={species === 'Canine'}
                  />
                  <label>Canine</label>
                </div>

                <div className="col-2 d-inline-flex">
                  <input
                    type="radio"
                    name="species"
                    value="Feline"
                    checked={species === 'Feline'}
                  />
                  <label>Feline</label>
                </div>
              </div>
            </form>
          </div>

          <div className='col-5'>
            <label>Animal size</label>
            <form onChange={handleAnimalSizeChange}>
              <div className="opcoes_lista">
                <div className="col-2 d-inline-flex">
                  <input
                    type="radio"
                    name="animalSize"
                    value="Small"
                    checked={animalSize === 'Small'}
                  />
                  <label>Small</label>
                </div>

                <div className="col-2 d-inline-flex">
                  <input
                    type="radio"
                    name="animalSize"
                    value="Half"
                    checked={animalSize === 'Half'}
                  />
                  <label>Half</label>
                </div>

                <div className="col-2 d-inline-flex">
                  <input
                    type="radio"
                    name="animalSize"
                    value="Big"
                    checked={animalSize === 'Big'}
                  />
                  <label>Big</label>
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
                    <img src={selectedImage} alt="Imagem selecionada" className="imagem"/>
                  </div>
                </div>
              )}
            </form>
          </div>

          <div className='col-5 d-flex'>
            <form id="textarea">
              <label htmlFor="description">Description</label><br/>
              <textarea
                id="description"
                className="descricao"
                name="descrição"
                form="textarea"
                placeholder="Type something here"
                value={description}
                onChange={handleDescriptionChange}
              ></textarea>
            </form>
          </div>
          <div className='col-1'></div>
        </section>
      </section>

      <section className='container d-flex botao1'>
        <button onClick={handleSubmit}>Register</button>
      </section>
    </section>

    </section>
  );
}
  
export default Registro;