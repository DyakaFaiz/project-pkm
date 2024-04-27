import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProducList = () => {
const [products, setProduct] = useState([]);

const getProduct = async ()=>{
    const response = await axios.get('http://localhost:8081/products');
    setProduct(response.data);
}

const deleteProduct = async (productId)=>{
  try{
    await axios.delete(`http://localhost:8081/products/${productId}`);
    getProduct();
  }catch(error){
    console.log(error.message);
  }
}

useEffect(()=>{
    getProduct();
},[]);


  return (
    <>
    <div className="container">
      <div className="wrapper">
      <Link to="add" >Add New</Link>
    {products.map((product)=>(
      <div className="card" key={product.id}>
        <div className="card-image">
        <img src={product.url} alt="" />
        </div>
        <div className="card-title">
        <p>{product.name}</p>
        </div>
        <div className="card-action">
          <Link to={`edit/${product.id}`}>Edit</Link>
          <button onClick={()=>deleteProduct(product.id)}>Delete</button>
        </div>
      </div>
    ))}
    </div>
    </div>
    </>
  
  )
}

export default ProducList
