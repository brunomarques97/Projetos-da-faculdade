import './Ongs.css';

import React, { useState,useEffect } from 'react';


const Ongs=()=>{

   const [data, setData] = useState([]);
  
    useEffect(() => {
        fetch('http://localhost/pets/dados.php?acao=listar&tabela=ongs')
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error('Erro:', error));
    }, []);

  return (
    <section className='main container'>
      <section className='titles'>
        <h1>Ongs</h1>
      </section>
      <table>
      <thead>
        <tr>
        <th className='tabela'>Nome</th>
          <th className='tabela'>Endereço</th>
          <th className='tabela'>Contato</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td className='tabela'>Nome: {item.Nome}</td>
            <td className='tabela'>Rua:{item.Rua} | Cidade:{item.Cidade} | Estado:{item.Estado} | Pais:{item.Pais}</td>
            <td className='tabela'>Email:{item.Email} | Numero:{item.Numero}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </section>
  );
}
  
export default Ongs;