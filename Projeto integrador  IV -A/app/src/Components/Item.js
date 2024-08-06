import 'bootstrap/dist/css/bootstrap.min.css';

const Item=({voltar,valor})=>{
    return (
      <div>
        <button onClick={voltar}>Voltar</button>
        <section className="container">
            <h1>{valor}</h1>
        </section>
        
      </div>
    );
  }
  
  export default Item;