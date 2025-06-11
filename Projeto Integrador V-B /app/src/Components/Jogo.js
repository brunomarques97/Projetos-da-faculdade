import './Jogo.css';

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as bootstrap from 'bootstrap';
import { useCart } from '../context/CartContext';
// import Carrinho from './Carrinho'; // Remova esta importação, pois o Carrinho é renderizado no App.js

const ensureStringArray = (data) => {
  if (Array.isArray(data)) return data.filter(val => typeof val === 'string');
  if (typeof data === 'string') {
    try {
      const parsed = JSON.parse(data.replace(/'/g, '"'));
      if (Array.isArray(parsed)) return parsed.filter(val => typeof val === 'string');
      if (typeof parsed === 'string') return [parsed];
    } catch {
      if (data.trim()) return [data];
    }
  }
  return [];
};

const ensureMediaArray = (data) => {
  if (Array.isArray(data)) return data.filter(val => typeof val === 'string' && val.startsWith('http'));
  if (typeof data === 'string') {
    try {
      const parsed = JSON.parse(data.replace(/'/g, '"'));
      if (Array.isArray(parsed)) return parsed.filter(val => typeof val === 'string' && val.startsWith('http'));
      if (typeof parsed === 'object') return Object.values(parsed).filter(val => typeof val === 'string' && val.startsWith('http'));
      if (typeof parsed === 'string' && parsed.startsWith('http')) return [parsed];
    } catch {
      if (data.startsWith('http')) return [data];
    }
  }
  return [];
};

const Jogo = ({ handleShowCart }) => { // Recebe handleShowCart como prop
  const { id } = useParams();
  const { addToCart } = useCart();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [showCart, setShowCart] = useState(false); // Remova este estado, pois é gerenciado no App.js

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    setLoading(true);
    axios.get(`http://localhost:3001/api/item/${id}`)
      .then(response => {
        const rawData = response.data;
        rawData.categories = ensureStringArray(rawData.categories);
        rawData.supported_languages = ensureStringArray(rawData.supported_languages);
        rawData.developers = ensureStringArray(rawData.developers);
        setItem(rawData);
        setLoading(false);
      })
      .catch(() => {
        setError('Não foi possível carregar os detalhes do jogo.');
        setLoading(false);
        setItem(null);
      });
  }, [id]);

  const screenshots = ensureMediaArray(item?.screenshots);
  const videoUrls = ensureMediaArray(item?.movies);
  const videoSrc = videoUrls[0] || null;
  const developers = ensureStringArray(item?.developers);
  const platforms = [];
  if (item?.windows) platforms.push('Windows');
  if (item?.mac) platforms.push('Mac');
  if (item?.linux) platforms.push('Linux');
  const categories = ensureStringArray(item?.categories);
  const languages = ensureStringArray(item?.supported_languages);

  useEffect(() => {
    if (item) {
      const el = document.getElementById('mediaCarousel');
      if (el && !bootstrap.Carousel.getInstance(el)) {
        new bootstrap.Carousel(el);
      }
    }
  }, [item]);

  useEffect(() => {
    if (item?.header_image) {
      const banner = document.querySelector('.game-banner');
      if (banner) {
        banner.style.backgroundImage = `url(${item.header_image})`;
      }
    }
  }, [item]);

  const handleAddToCart = () => {
    if (item) {
      addToCart(item); // Chama a função do contexto para adicionar o item
      handleShowCart(); // Abre o carrinho automaticamente ao adicionar item, usando a prop
    }
  };

  // const handleCloseCart = () => setShowCart(false); // Remova esta função
  // const handleShowCart = () => setShowCart(true); // Remova esta função, agora recebida via prop

  if (loading) return <div className="text-white text-center my-5">Carregando detalhes do jogo...</div>;
  if (error) return <div className="text-danger text-center my-5">{error}</div>;
  if (!item) return <div className="text-white text-center my-5">Jogo não encontrado.</div>;

  return (
    <div className="text-white">
      <div className="game-banner">
        <div className="info-card">
          <h1 className="fw-bold text-center">{item.name}</h1>
          <p className="text-white text-center">{developers.join(', ')}</p>

          <h4 className="text-warning fw-bold text-center mb-3">
            R${item.price?.toFixed(2) || 'N/A'}
          </h4>

          <button className="btn btn-warning fw-bold w-100" onClick={handleAddToCart}>Adicionar ao carrinho</button>
          <button className="btn btn-outline-info fw-bold w-100 mt-2" onClick={handleShowCart}>Ver Carrinho</button>
        </div>
      </div>

      <div className="container mt-5 pt-5">
        <div className="row text-center mb-4">
          <div className="col-md-3">
            <div><strong>Plataformas:</strong></div>
            {platforms.join(', ')}
          </div>
          <div className="col-md-3">
            <div><strong>Categorias:</strong></div>
            {categories.join(', ')}
          </div>
          <div className="col-md-3">
            <div><strong>Idiomas:</strong></div>
            {languages.join(', ')}
          </div>
          <div className="col-md-3">
            <div><strong>Idade:</strong></div>
            {item.required_age === 0 ? 'Livre' : item.required_age + '+'}
          </div>
        </div>

        <div id="mediaCarousel" className="carousel slide mb-5" data-bs-ride="carousel">
          <div className="carousel-inner">
            {videoSrc && (
              <div className="carousel-item active">
                <video className="d-block mx-auto" controls autoPlay muted loop style={{ maxHeight: '240px' }}>
                  <source src={videoSrc} type="video/mp4" />
                </video>
              </div>
            )}
            {screenshots.map((src, i) => (
              <div className={`carousel-item ${!videoSrc && i === 0 ? 'active' : ''}`} key={i}>
                <img src={src} className="d-block mx-auto" alt={`screenshot-${i}`} style={{ maxHeight: '240px', objectFit: 'contain' }} />
              </div>
            ))}
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#mediaCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" />
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#mediaCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon" />
          </button>
        </div>

        <div className="mb-5">
          <h2 className='text-center'>Descrição</h2>
          <p>{item.detailed_description || item.about_the_game || item.short_description || 'Nenhuma descrição disponível.'}</p>
        </div>
      </div>

      {/* O componente Carrinho não é mais renderizado aqui, é renderizado no App.js */}
    </div>
  );
};

export default Jogo;