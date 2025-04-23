import './Cadastro.css';
import React, { useState, useEffect, useCallback } from 'react';

const Cadastro = () => {
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
  const [ongs, setOngs] = useState([]);
  const [loadingOngs, setLoadingOngs] = useState(true);
  const [errorOngs, setErrorOngs] = useState(null);

  const limparCampos = () => {
    setSpecies('');
    setAnimalName('');
    setSelectedImage(null);
    setImageFile(null);
    setAGE('');
    setGender('');
    setAnimalSize('');
    setCoat('');
    setRaca('');
    setInstitution('');
  };

  const fetchOngs = useCallback(async () => {
    setLoadingOngs(true);
    setErrorOngs(null);
    try {
      const response = await fetch('http://localhost/pets/dados.php?acao=listar&tabela=ongs');
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setOngs(data);
    } catch (error) {
      console.error('Erro ao buscar ONGs:', error);
      setErrorOngs('Erro ao carregar as instituições.');
    } finally {
      setLoadingOngs(false);
    }
  }, []);

  useEffect(() => {
    fetchOngs();
  }, [fetchOngs]);

  const handleInputChange = (setter) => (e) => setter(e.target.value);

  const handleImageChange = (e) => {
    const path = '/img'; // caminho base
    const file = e.target.files[0];
    if (file) {
      const fullPath = `${path}/${file.name}`; 
      setImageFile(fullPath);  
    
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result); 
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedImage(null);
      setImageFile(null);
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const payload = {
      type: species,
      name: animalName,
      age: age,
      gender: gender,
      size: animalSize,
      coat: coat,
      Raca_primaria: raca,
      Ong: institution,
      photo: imageFile || '',
    };

    try {
      const response = await fetch('http://localhost/pets/envio.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const errorMessage = await response.text();
        console.error(`Erro ao enviar dados: ${response.status} - ${errorMessage}`);
        alert(`Erro ao registrar o pet: ${errorMessage}`);
        return;
      }

      alert('Pet registrado com sucesso!');
      limparCampos();
    } catch (error) {
      console.error('Erro de rede:', error);
      alert('Erro ao conectar com o servidor.');
    }
  };

  return (
    <section className='main'>
      <section className='container titles'>
        <h1>Pet registration</h1>
      </section>

      <form className='area' onSubmit={handleSubmit}>
        <section className='container'>
          <section className='row'>
            <div className='col-1'></div>

            <div className='col-10 col-md-5 d-flex flex-column'>
              <label htmlFor="institution">Institution</label>
              {loadingOngs ? (
                <p>Carregando instituições...</p>
              ) : errorOngs ? (
                <p className="error-message">{errorOngs}</p>
              ) : (
                <select id="institution" value={institution} onChange={handleInputChange(setInstitution)}>
                  <option value="">Selecione uma instituição</option>
                  {ongs.map((ong) => (
                    <option key={ong.ID} value={ong.ID}>{ong.Nome}</option>
                  ))}
                </select>
              )}
            </div>

            <div className='col-10 col-md-5 d-flex flex-column'>
              <label htmlFor="animalName">Animal name</label>
              <input type="text" id="animalName" value={animalName} onChange={handleInputChange(setAnimalName)} />
            </div>
            <div className='col-1'></div>
          </section>
        </section>

        {/* Species */}
        <section className='container'>
          <section className='row'>
            <div className='col-1'></div>

            <div className="col-10 col-md-5">
              <label>Species</label>
              <div className="opcoes_lista">
                {['Dog', 'Cat'].map((type) => (
                  <label key={type} className="col-2 d-inline-flex">
                    <input type="radio" name="species" value={type} checked={species === type} onChange={handleInputChange(setSpecies)} />
                    {type === 'Dog' ? 'Canine' : 'Feline'}
                  </label>
                ))}
              </div>
            </div>

            <div className='col-10 col-md-5'>
              <label>Animal size</label>
              <div className="opcoes_lista">
                {['Small', 'Half', 'Big'].map((size) => (
                  <label key={size} className="col-2 d-inline-flex">
                    <input type="radio" name="animalSize" value={size} checked={animalSize === size} onChange={handleInputChange(setAnimalSize)} />
                    {size}
                  </label>
                ))}
              </div>
            </div>

            <div className='col-1'></div>
          </section>
        </section>

        {/* Image Upload & Age */}
        <section className='container'>
          <section className='row'>
            <div className='col-1'></div>

            <div className="col-10 col-md-5">
              <label htmlFor="image-upload">Select an image:</label>
              <input type="file" id="image-upload" accept="image/*" onChange={handleImageChange} />
              {selectedImage && (
                <div className="image-preview">
                  <img src={selectedImage} alt="Imagem selecionada" className="imagem" style={{ maxWidth: '200px', maxHeight: '200px' }} />
                </div>
              )}
            </div>

            <div className='col-10 col-md-5'>
              <label>Age</label>
              <div className="opcoes_lista">
                {['Young', 'Adult', 'Elderly'].map((value) => (
                  <label key={value} className="col-2 d-inline-flex">
                    <input type="radio" name="age" value={value} checked={age === value} onChange={handleInputChange(setAGE)} />
                    {value}
                  </label>
                ))}
              </div>
            </div>

            <div className='col-1'></div>
          </section>
        </section>

        {/* Gender & Coat */}
        <section className='container'>
          <section className='row'>
            <div className='col-1'></div>

            <div className="col-10 col-md-5">
              <label>Gender</label>
              <div className="opcoes_lista">
                {['Masculine', 'Feminine'].map((value) => (
                  <label key={value} className="col-2 d-inline-flex">
                    <input type="radio" name="gender" value={value} checked={gender === value} onChange={handleInputChange(setGender)} />
                    {value}
                  </label>
                ))}
              </div>
            </div>

            <div className='col-10 col-md-5'>
              <label>Coat</label>
              <div className="opcoes_lista">
                {['Small', 'Half', 'Big'].map((value) => (
                  <label key={value} className="col-2 d-inline-flex">
                    <input type="radio" name="coat" value={value} checked={coat === value} onChange={handleInputChange(setCoat)} />
                    {value}
                  </label>
                ))}
              </div>
            </div>

            <div className='col-1'></div>
          </section>
        </section>

        {/* Breed */}
        <section className='container'>
          <section className='row'>
            <div className='col-12 d-flex flex-column'>
              <label htmlFor="raca">Breed</label>
              <input type="text" id="raca" value={raca} onChange={handleInputChange(setRaca)} />
            </div>
          </section>
        </section>

        {/* Submit */}
        <section className='container d-flex botao1'>
          <button type="submit">Register</button>
        </section>
      </form>
    </section>
  );
};

export default Cadastro;