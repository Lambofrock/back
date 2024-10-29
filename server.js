//console.log("hola");
import express from "express";
import productRouter from "./src/routes/productRouter.js"
const app =express();

//app.get("/", (req,res)=>{    res.status(200).send("hola")})
app.use('/products',productRouter);

app.listen(8080, ()=>console.log("server ok  en el puerto 8080"))


