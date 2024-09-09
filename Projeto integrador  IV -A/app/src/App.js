import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Jogos from './Components/Jogos';
import Item from './Components/Item';


function App() {

 
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<Jogos />} />
        <Route path="/item/:id" element={<Item />} />
      </Routes>
    </Router>
  );
}

export default App;
