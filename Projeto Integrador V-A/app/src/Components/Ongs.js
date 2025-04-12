import './Ongs.css';

import React from 'react';

import data from '../data/pets.json'

const Ongs=()=>{  

  return (
    <section className='main container'>
      <section className='titles'>
        <h1>Ongs</h1>
      </section>
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
            <td className='tabela'>Road:{item.rua} | City:{item.cidade} | State:{item.estado} | Country:{item.pais}</td>
            <td className='tabela'>Email:{item.email} | 
            Number:{item.telefone}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </section>
  );
}
  
export default Ongs;