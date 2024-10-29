//import http from "node:http";
import express from "express";
import productRouter from "./src/routes/productRouter.js";
import cartRouter from "./src/routes/cartRouter.js";
import morgan from 'morgan'
import path from 'path';

//const server = http.createServer((req,res)=>
//res.end("holanda"))
//server.listen(8080,()=>console.log("server ok puerto 8080"));


const app = express();

app.use('/static', express.static(path.join(process.cwd(), "src", "publico")));;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);




app.listen(8080, () => console.log("server ok puerto 8080"));


