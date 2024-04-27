import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {useParams,useNavigate} from 'react-router-dom'

const EditProduct = () => {
    const [title,setTitle] = useState("");
    const [file,setFile] = useState("");
    const [preview,setPreview] = useState("");
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(()=>{
        getProductById();
    },[]);

    const getProductById = async () =>{
        const response = await axios.get(`http://localhost:8081/products/${id}`);
        setTitle(response.data.name);
        setFile(response.data.image);
        setPreview(response.data.url);
    };

    const loadImage = (e)=>{
        const image = e.target.files[0];
        setFile(image);
        setPreview(URL.createObjectURL(image));
    }

    const updateProduct = async (e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('title',title);
        formData.append('file',file);
        try{
            await axios.patch(`http://localhost:8081/products/${id}`, formData,{
                headers:{
                    "Content-Type": "multipart/form-data",
                }
            });
            navigate('/');
        }catch(error){
            console.log(error.message);
        }
    }
  return (
    <div className="container">
        <div className="wrapper">
            <form onSubmit={updateProduct}>

            <div className="col">
            <label>Product Name </label>
            <input type="text" value={title} onChange={(e)=> setTitle(e.target.value)} placeholder='Product name'/>
            </div>
            
            <div className="col">
            <label>Image </label>
            <input type="file" onChange={loadImage} placeholder='Product name'/>
            </div>


            {preview ? (
                <img src={preview} alt="Image preview" />
            ):(
                ""
            )}

            <div className="col">
                <button type='submit'>Update</button>
            </div>
            </form>
        </div>
    </div>
)
}

export default EditProduct
