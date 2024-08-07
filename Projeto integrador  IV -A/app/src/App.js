import './App.css';

import Home from './Components/Home';
import Item from './Components/Item';

import {useState} from "react";

const telas =[
  {name:"home"},
  {name:"item"},
];


function App() {
  const[tela, settela ] = useState(telas[0].name);

  const jogo=()=>{
    settela(telas[1].name)
  }
  
  const voltar=()=>{
    settela(telas[0].name)    
  }
 
  return (
    <div className="App">
             
      {tela === 'home' && <Home jogo={jogo}/>}
      {tela === 'item' && <Item voltar={voltar}/>}
      
    </div>
  );
}

export default App;
