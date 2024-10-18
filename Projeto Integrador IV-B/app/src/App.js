import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Petfinder from './Components/teste';

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="petfinder" element={<Petfinder />} />
      </Routes>
    </Router>
  );
}

export default App;
