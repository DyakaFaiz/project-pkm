import express from 'express';
import FileUpload from 'express-fileupload';
import cors from 'cors';
import ProductRoute from "./routes/ProductRoute.js";

const app = express();
const port = 8081;

app.use(cors());
app.use(express.json());
app.use(FileUpload());
app.use(ProductRoute);
app.use(express.static("public"));

app.listen(port,()=> console.log("server running at port ", port))