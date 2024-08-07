import './Item.css';

const Item=({voltar})=>{
    return (
        <section className="container">
          <button onClick={voltar}>Voltar</button>
          <section>
            <h1>item</h1>
          </section>
            
        </section>

    );
  }
  
  export default Item;