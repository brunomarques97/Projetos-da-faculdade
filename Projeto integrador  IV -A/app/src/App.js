import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Jogos from './Components/Jogos';
import Jogo from './Components/Jogo';
import Favoritos from './Components/Favoritos';
import Favorito from './Components/Favorito';


function App() {

 
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<Jogos />} />
        <Route path="/favorites" element={<Favoritos />} />
        
        <Route path="/games/item/:id" element={<Jogo />} />
        <Route path="/favorites/item/:id" element={<Favorito />} />
      </Routes>
    </Router>
  );
}

export default App;
