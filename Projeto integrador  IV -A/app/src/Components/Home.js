import './Home.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from "react";

const Home=()=>{  
  const [games, setGames] = useState(null);
  const [favorites, setfavorites] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/jogo/listar")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setGames(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/favoritos/listar")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setfavorites(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

    return (
        <section className="container">
            <h1 className='title'>Welcome</h1>
            
            <section className="buttons">

                <Link to={`/games`} state={{ games }}>
                    <button className="button">Games</button>
                </Link>

                <Link to={`/favorites`} state={{ favorites }}>
                    <button className="button">favorites</button>
                </Link>
                
                
            </section>
        </section>
    )
  }
  
  export default Home;