
import fs from "fs";
import { v4 as uuiv4 } from "uuid";
import { prodManager } from "./productManager.js";
import path from "path"


class CartManager {
  constructor(path) {
    this.path = path;
  }
  async getAllCarts() {
    try {
      if (fs.existsSync(this.path)) {
        const carts = await fs.promises.readFile(this.path, "utf-8");
        const cartsJSON = JSON.parse(carts);
        return cartsJSON;
      } else {
        return [];
      }
    } catch (error) {
      throw new Error(error);
    }
  }
  async createCart(){
    try {
        const cart = {
            id: uuiv4(),
            products:[],
        };
        const cartsFile = await this.getAllCarts();
        cartsFile.push(cart);
    } catch (error) { throw new Error(error)
        
    }
  }
  async getCartById(id){
    try {
        const carts = await this.getAllCarts();
        return carts.find((carro)=> carro.id === id);

    } catch (error) {
        throw new Error(error);
    }
  }
  async saveProdToCart(idCart,idProd){
  try {
    const prodExist = await prodManager.getById(idProd);
    if (!prodExist)throw new Error("producto no existe");
    let cartsFile = await this.getAllCarts();
     const cartExist = await this.getCartById(idCart)
     if (!cartExist) throw new Error("carrito no existe");
    const existProductInCart = cartExist.products.find((prod)=>prod.id === idProd);
    if(!existProductInCart){
        const product = {
            id: idProd,
            quantity:1
        };
        cartExist.products.push(product);
         
    }else existProductInCart.quantity ++; ///+=1
    const updatedCarts=  cartsFile.map((cart)=>{
        if (cart.id === idCart)
            return cartExist;
        return cart;
    });
    await fs.promises.writeFile(this.path, JSON.stringify(updatedCarts));
    return cartExist;
  } catch (error) {
    throw new Error(error)
  }
  }
}

export const cartManager = new CartManager(
    path.join(process.cwd(),"../data/carts.json")
)
