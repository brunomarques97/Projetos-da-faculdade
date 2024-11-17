import './Ongs.css';

import React from 'react';

import data from '../data/pets.json'

const Ongs=()=>{  

  return (
    <section className='main container'>
      <h1>Ongs</h1>
      <table>
      <thead>
        <tr>
          <th className='tabela'>Address</th>
          <th className='tabela'>Contact</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td className='tabela'>Rua:{item.rua} | Cidade:{item.cidade} | Estado:{item.estado} | Pais:{item.pais}</td>
            <td className='tabela'>Email:{item.email} | Numero:{item.telefone}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </section>
  );
}
  
export default Ongs;