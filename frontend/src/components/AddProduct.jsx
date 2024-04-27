import React,{useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

const AddProduct = () => {
    const [title,setTitle] = useState("");
    const [file,setFile] = useState("");
    const [preview,setPreview] = useState("");
    const navigate = useNavigate();

    const loadImage = (e)=>{
        const image = e.target.files[0];
        setFile(image);
        setPreview(URL.createObjectURL(image));
    }

    const saveProduct = async (e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('title',title);
        formData.append('file',file);
        try{
            await axios.post("http://localhost:8081/products/",formData,{
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
            <form onSubmit={saveProduct}>

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
                <button type='submit'>Save</button>
            </div>
            </form>
        </div>
    </div>
)
}

export default AddProduct
