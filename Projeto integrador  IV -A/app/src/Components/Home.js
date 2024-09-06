import './Home.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const Home=()=>{
  

    return (
        <section className="container">
            <h1 className='title'>Welcome</h1>
            
            <section className="buttons">

                <Link to={`/games`}>
                    <button className="button">Games</button>
                </Link>

                <Link to={`/games`}>
                    <button className="button">favorites</button>
                </Link>
                
                
            </section>
        </section>
    )
  }
  
  export default Home;