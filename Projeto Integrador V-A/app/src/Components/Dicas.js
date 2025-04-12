import './Dicas.css';

import React from 'react';

const Dicas=()=>{  

  return (
    <section className='main'>
      
      <section className='titles'>
        <h1>Tips</h1>
      </section>
        

        <section className='borda'>
          <h2 className="text-center">How to Choose the Ideal Pet</h2>
            <h3>Evaluate your lifestyle:</h3>
            <ul >
              <li>Available time: Do you have time to walk, play with and take care of your pet?</li>
              <li>Physical space: Is your apartment or house big enough to accommodate an animal?</li>
              <li>Routine: Are your daily activities compatible with the care a pet requires?</li>
              <li>Budget: Are you prepared for the costs of food, vaccinations, veterinary visits and other expenses?</li>
            </ul>
        </section>

            <section className='borda'>
              <h2 className="text-center">Tips for Taking Care of Your Pet</h2>
                <section>
                  <h3>Healthy Eating</h3>
                  <li>Provide a balanced diet suitable for your pet's type and age.</li>
                </section>

                <section>
                  <h3>Daily Exercise</h3>
                  <li> Walks and play keep your pet active and healthy.</li>
                </section>

                <section>
                  <h3>Visits to the Vet</h3>
                  <li>Take your pet to the vet regularly for check-ups.</li>
                </section>
                
            </section>


    </section>
  );
}
  
export default Dicas;