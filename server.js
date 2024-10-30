import express from "express";
import productRouter from "./src/routes/productRouter.js";
import cartRouter from "./src/routes/cartRouter.js";
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(`${process.cwd()}/src/public`));
app.use("/products", productRouter);
app.use("/cart", cartRouter);

app.listen(8080, () => console.log("server ok  en el puerto 8080"));
