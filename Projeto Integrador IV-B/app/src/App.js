import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//components
import Header from './Components/Header';
import Home from './Components/Home';
import Pet from './Components/Pet';
import Ongs from './Components/Ongs';
import Dicas from './Components/Dicas';
import Cadastro from './Components/Cadastro';
import Relatos from './Components/Relatos'


function App() {
  
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Pet/:id" element={<Pet />} />
        <Route path="/Ongs" element={<Ongs />} />
        <Route path="/Dicas" element={<Dicas />} />
        <Route path="/Cadastro" element={<Cadastro />} />
        <Route path="/Relatos" element={<Relatos />} />
      </Routes>
    </Router>
  );
}

export default App;
