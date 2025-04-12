import './Relatos.css';

import avatar1  from '../img/avatar1.jpg'
import avatar2 from '../img/avatar2.jpg'
import avatar3  from '../img/avatar3.png'

const Relatos=()=>{  

  return (
    <section className='main'>
      <section className='titles'>
        <h1>Storys</h1>
      </section>

      <section className='container d-flex borda'>
         
        <img src={avatar1} alt="avatar1" style={{ width: '100px', height: '100px' }}/>
              
        <p>
          "As the saying goes: 'A dog is the only being in the world that 
          loves you more than it loves itself'. And I can confirm it! 
          Adoption transformed my life and his. That innocent and hopeful look won me over 
          immediately. Today, we are inseparable and every day I discover a new reason to 
          be thankful for this friendship."
        </p>

      </section>

      <section className='container d-flex borda'>
         
        <img src={avatar2} alt="avatar2" style={{ width: '100px', height: '100px' }}/>
              
        <p>
          "Have you ever thought about adopting a four-legged friend? 
          In addition to giving an animal a new chance, you gain a loyal 
          companion and lots of love. That innocent look melts your heart and 
          every day you discover new ways to love and be loved. ❤️"
        </p>

      </section>

      <section className='container d-flex borda'>
         
        <img src={avatar3} alt="avatar3" style={{ width: '100px', height: '100px' }}/>
              
        <p>
        "I remember as if it were yesterday the day my eyes met his. A look full of hope and fear, 
        lost among so many other dogs in a shelter. I couldn't forget that little face and, the next 
        day, I was back to take him home. At first, he was shy and insecure, but with a lot of love and 
        patience, he opened up to the world. Today, he is the joy of my home, running around in the grass, 
        playing with the children and always welcoming me with a tight hug. Adoption was the best decision 
        of my life, and I am grateful for having the opportunity to give him a happy and loving life."
        </p>

      </section>
      
    </section>
  );
}
  
export default Relatos;