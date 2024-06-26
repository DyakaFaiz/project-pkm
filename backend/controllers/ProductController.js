import Product from "../models/ProductModel.js";
import path from 'path';

import fs from 'fs'

export const getProducts = async (req,res)=>{
    try{
        const response = await Product.findAll();
        res.json(response);
    }catch(error){
        console.log(error.message);
    }
}
export const getProductById = async (req,res)=>{
    try{
        const response = await Product.findOne({
            where:{
                id: req.params.id
            }
        });
        res.json(response);
    }catch(error){
        console.log(error.message);
    }

}
export const saveProduct = (req,res)=>{
    if(req.files === null) return res.status(400).json({msg: "No file uploaded"});
    const name = req.body.title;
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get('host')}/images/${fileName}`;
    const allowedType = ['.png','.jpeg','.jpg'];

    if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Invalid images"});

    if(fileSize > 5000000) return res.status(422).json({msg: "image must be lower than 5MB"});

    file.mv(`./public/images/${fileName}`, async(err)=>{
        if(err) return res.status(500).json({msg: err.message})

        try{
            Product.create({name:name, image: fileName, url:url});
            res.status(201).json({msg: "Product Created successfully"});
        }catch(error){
            console.log(err.message);
        }
    })
}
export const updateProduct = async (req,res)=>{
    const product = await Product.findOne({
        where:{
            id: req.params.id
        }
    });
    if(!product) return res.status(404).json({msg: "no data found"});

    let fileName = "";
    if(req.file === null){
        fileName = Product.image;
    }else{
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        fileName = file.md5 + ext;
        const allowedType = ['.png','.jpeg','.jpg'];

        if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Invalid images"});
        if(fileSize > 5000000) return res.status(422).json({msg: "image must be lower than 5MB"});
    
        const filePath = `./public/images/${product.image}`;
        fs.unlinkSync(filePath);

        file.mv(`./public/images/${fileName}`,(err)=>{
            if(err) return res.status(500).json({msg: err.message})
        });
    
    }
    const name = req.body.title;
    const url = `${req.protocol}://${req.get('host')}/images/${fileName}`;

    try{
        await Product.update({name:name, image: fileName, url:url},{
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Product updated successfully"});
    }catch(error){
        console.log(err.message);
    }

}
export const deleteProduct = async (req,res)=>{
    const product = await Product.findOne({
        where:{
            id: req.params.id
        }
    });

    if(!product) return res.status(404).json({msg: "no data found"});

    try{
        const filePath = `./public/images/${product.image}`;
        fs.unlinkSync(filePath);
        await Product.destroy({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Product deleted succesfully"});
    }catch(error){
        console.log(error.message);
    }
}