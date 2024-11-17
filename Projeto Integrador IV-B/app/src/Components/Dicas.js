import './Dicas.css';

import React from 'react';
import { Container } from 'react-bootstrap';

const Dicas=()=>{  

  return (
    <section className='main'>
      <section className='container'>
        <h1>Dicas</h1>
      </section>

      <Container>
          
            <section >
              <h2 className="text-center">Como Escolher o Pet Ideal</h2>
                <h3>Avalie seu estilo de vida:</h3>
                <ul>
                  <li>Tempo disponível: Você tem tempo para passear, brincar e cuidar do seu pet?</li>
                  <li>Espaço físico: Seu apartamento ou casa é grande o suficiente para acomodar um animal?</li>
                  <li>Rotina: Suas atividades diárias são compatíveis com os cuidados que um pet exige?</li>
                  <li>Orçamento: Você está preparado para os custos com alimentação, vacinas, consultas veterinárias e outros gastos?</li>
                </ul>
            </section>

            <section >
              <h2 className="text-center">Dicas para Cuidar do Seu Pet</h2>
                <section>
                  <h3>Alimentação Saudável</h3>
                  <li>Ofereça uma dieta equilibrada e adequada para o tipo e idade
                  do seu pet.</li>
                </section>

                <section>
                  <h3>Exercício Diário</h3>
                  <li> Caminhadas e brincadeiras mantêm seu pet ativo e saudável.</li>
                </section>

                <section>
                  <h3>Visitas ao Veterinário</h3>
                  <li>Leve seu pet ao veterinário regularmente para check-ups.</li>
                </section>
                
            </section>
    </Container>

    </section>
  );
}
  
export default Dicas;