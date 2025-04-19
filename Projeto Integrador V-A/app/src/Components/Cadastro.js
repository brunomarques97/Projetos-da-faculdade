import './Cadastro.css';

import React, { useState,useEffect } from 'react';

const Registro=()=>{
  const [species, setSpecies] = useState('');
  const [animalName, setAnimalName] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [age, setAGE] = useState('');
  const [gender, setGender] = useState('');
  const [animalSize, setAnimalSize] = useState('');
  const [coat, setCoat] = useState('');
  const [raca, setRaca] = useState('');
  const [institution, setInstitution] = useState('');

  const [data, setData] = useState([]);
  
  useEffect(() => {
      fetch('http://localhost/pets/dados.php?acao=listar&tabela=ongs')
          .then(response => response.json())
          .then(data => setData(data))
          .catch(error => console.error('Erro:', error));
  }, []);

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
    const file = event.target.files[0];

    if (file) {
      setImageFile(file); // Armazena o objeto File para upload
      const reader = new FileReader();

      reader.onloadend = () => {
        setSelectedImage(reader.result); // Previsualização da imagem como URL de dados
      };

      reader.readAsDataURL(file);
    } else {
      setSelectedImage(null);
      setImageFile(null);
    }
  };

  const handleSubmit = async (event) => {

    event.preventDefault();

    const formData = new FormData();
      formData.append('type', species);
      formData.append('name', animalName);

      if (imageFile) {
          formData.append('photo', imageFile); 
      }

      formData.append('age', age);
      formData.append('gender', gender);
      formData.append('size', animalSize);
      formData.append('coat', coat);
      formData.append('Raca_primaria', raca); 
      formData.append('Ong', institution);

    try {
      const response = await fetch('http://localhost/pets/envio.php', {
        method: 'POST',
        body: formData, // Envia o objeto FormData no corpo
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        console.error(`Erro ao enviar dados para o servidor: ${response.status} - ${errorMessage}`);
        alert(`Erro ao registrar o pet: ${errorMessage}`);
        return;
      }

      const dados = await response.json();
      console.log('Resposta do servidor:', dados);

      if (dados.status === 'success') {
        alert('Pet registrado com sucesso!');
        limparFormulario();
      } else {
        alert(`Erro ao registrar o pet: ${dados.message || 'Erro desconhecido'}`);
      }

    } catch (error) {
      console.error('Erro de rede ou ao processar a resposta:', error);
      alert('Erro ao conectar com o servidor.');
    }
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
              <label htmlFor="institution">Institution</label><br />
              <select
                  id="institution"
                  value={institution}
                  onChange={handleInstitutionChange}
              >
                  <option value="">Selecione uma instituição</option>
                  {data.map((institution) => (
                      <option key={institution.id} value={institution.ID}>
                          {institution.Nome}
                      </option>
                  ))}
              </select>
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
                    <img src={selectedImage} alt="Imagem selecionada" className="imagem" style={{ maxWidth: '200px', maxHeight: '200px' }} />
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