import './Relatos.css';

import avatar1  from '../img/avatar1.jpg'
import avatar2 from '../img/avatar2.jpg'
import avatar3  from '../img/avatar3.png'

const Relatos=()=>{  

  return (
    <section className='main'>
      <section className='container'>
        <h1>Relatos</h1>
      </section>

      <section className='container d-flex borda'>
         
        <img src={avatar1} alt="avatar1" style={{ width: '100px', height: '100px' }}/>
              
        <p>"Já diz o ditado: 'Um cachorro é o único ser no mundo que te ama mais do que a si mesmo'. 
          E eu posso confirmar! A adoção transformou minha vida e a dele. Aquele olhar inocente 
          e cheio de esperança me conquistou de imediato. Hoje, somos inseparáveis e a cada dia 
          descobro um novo motivo para agradecer por essa amizade.
        </p>

      </section>

      <section className='container d-flex borda'>
         
        <img src={avatar2} alt="avatar2" style={{ width: '100px', height: '100px' }}/>
              
        <p>Você já pensou em adotar um amigo de quatro patas? Além de dar uma nova 
          chance a um animal, você ganha um companheiro fiel e muito amor. 
          Aquele olhar inocente te derrete o coração e a cada dia você descobre novas 
          formas de amar e ser amado. ❤️
        </p>

      </section>

      <section className='container d-flex borda'>
         
        <img src={avatar3} alt="avatar3" style={{ width: '100px', height: '100px' }}/>
              
        <p>"Lembro como se fosse ontem, o dia em que meus olhos se cruzaram 
          com os dele. Um olhar cheio de esperança e medo, perdido em meio 
          a tantos outros cães em um abrigo. Não consegui me esquecer daquele 
          rostinho e, no dia seguinte, já estava de volta para levá-lo para casa.

          No início, ele era tímido e inseguro, mas com muito amor e 
          paciência, ele foi se abrindo para o mundo. Hoje, ele é a
          alegria da minha casa, correndo pela grama, brincando com as crianças 
          e me recebendo sempre com um abraço apertado. A adoção foi a melhor decisão 
          da minha vida, e sou grato por ter a oportunidade de dar a ele uma vida feliz e cheia de amor."
        </p>

      </section>
      
    </section>
  );
}
  
export default Relatos;