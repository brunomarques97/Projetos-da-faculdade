import './Cadastro.css';

import React, { useState } from 'react';

const Registro=()=>{
  const [species, setSpecies] = useState('');
  const [animalName, setAnimalName] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [age, setAGE] = useState('');
  const [gender, setGender] = useState('');
  const [animalSize, setAnimalSize] = useState('');
  const [coat, setCoat] = useState('');
  const [raca, setRaca] = useState('');
  const [institution, setInstitution] = useState('');

  const limparFormulario = () => {
    setSpecies('');
    setAnimalName('');
    setSelectedImage(null)
    setAGE('');
    setGender('');
    setAnimalSize('');
    setCoat('');
    setRaca('');    
    setInstitution('');
  };

  const handleInstitutionChange = (event) => {
    setInstitution(event.target.value);
  };

  const handleAnimalNameChange = (event) => {
    setAnimalName(event.target.value);
  };

  const handleSpeciesChange = (event) => {
    setSpecies(event.target.value);
  };

  const handleAgeChange = (event) => {
    setAGE(event.target.value);
  };
  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };
  const handleCoatChange = (event) => {
    setCoat(event.target.value);
  };
  const handleRacaChange = (event) => {
    setRaca(event.target.value);
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


  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      institution,
      animalName,
      species,
      animalSize,
      selectedImage,
      age,
    }
    console.log('Dados do formulário:', formData);
    // Aqui você pode enviar os dados para o seu backend

    alert("pet registrado")
    limparFormulario()
  };
 
  return (
    <section className='main'>

    <section className='container titles'> 
      <h1>Pet registration</h1>
    </section>
    
    <section className='area'>

      <section className='container '>
        <section className='row'>
          <div className='col-1'></div>
          
          
          <div className='col-10 col-md-5  d-flex' >
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

          <div className='col-10 col-md-5  d-flex'>
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

          <div className="col-10 col-md-5 ">
            <label>Species</label>
            <form onChange={handleSpeciesChange}>
              <div className="opcoes_lista">
                <div className="col-2 d-inline-flex">
                  <input
                    type="radio"
                    name="species"
                    value="Dog"
                    checked={species === 'Dog'}
                  />
                  <label>Canine</label>
                </div>

                <div className="col-2 d-inline-flex">
                  <input
                    type="radio"
                    name="species"
                    value="Cat"
                    checked={species === 'Cat'}
                  />
                  <label>Feline</label>
                </div>
              </div>
            </form>
          </div>

          <div className='col-10 col-md-5 '>
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

          <div className="col-10 col-md-5">
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

          <div className='col-10 col-md-5 '>
            <label>Age</label>
            <form onChange={handleAgeChange}>
              <div className="opcoes_lista">
                
                <div className="col-2 d-inline-flex">
                  <input
                    type="radio"
                    name="animalSize"
                    value="Young"
                    checked={age === 'young'}
                  />
                  <label>Young</label>
                </div>

                <div className="col-2 d-inline-flex">
                  <input
                    type="radio"
                    name="animalSize"
                    value="Adult"
                    checked={age === 'adult'}
                  />
                  <label>Adult</label>
                </div>

                <div className="col-2 d-inline-flex">
                  <input
                    type="radio"
                    name="animalSize"
                    value="Elderly"
                    checked={age === 'elderly'}
                  />
                  <label>Elderly</label>
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

          <div className="col-10 col-md-5 ">
            <label>Gender</label>
            <form onChange={handleGenderChange}>
              <div className="opcoes_lista">
                <div className="col-2 d-inline-flex">
                  <input
                    type="radio"
                    name="species"
                    value="Masculine"
                    checked={gender === 'Masculine'}
                  />
                  <label>Masculine</label>
                </div>

                <div className="col-2 d-inline-flex">
                  <input
                    type="radio"
                    name="species"
                    value="Feminine"
                    checked={gender === 'Feminine'}
                  />
                  <label>Feminine</label>
                </div>
              </div>
            </form>
          </div>

          <div className='col-10 col-md-5 '>
            <label>Coat</label>
            <form onChange={handleCoatChange}>
              <div className="opcoes_lista">

                <div className="col-2 d-inline-flex">
                  <input
                    type="radio"
                    name="animalSize"
                    value="Small"
                    checked={coat === 'Small'}
                  />
                  <label>Small</label>
                </div>

                <div className="col-2 d-inline-flex">
                  <input
                    type="radio"
                    name="animalSize"
                    value="Half"
                    checked={coat === 'Half'}
                  />
                  <label>Half</label>
                </div>

                <div className="col-2 d-inline-flex">
                  <input
                    type="radio"
                    name="animalSize"
                    value="Big"
                    checked={coat === 'Big'}
                  />
                  <label>Big</label>
                </div>
              </div>
            </form>
          </div>
          <div className='col-1'></div>
        </section>
      </section>

      <section className='container '>
        <section className='row'>
         
          <div className='col-12 d-flex'>
            <form>
              <label htmlFor="animalName">Breed</label><br/>
              <input
                type="text"
                id="raca"
                value={raca}
                onChange={handleRacaChange}
              />
            </form>
          </div>
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