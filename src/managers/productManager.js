import fs from "fs";
import { v4 as uuidv4 } from "uuid";

class productManager {
  constructor(path) {
    this.path = path;
  }

  async getAll() {
    try {
      if (fs.existsSync(this.path)) {
        const products = await fs.promises.readFile(this.path, "utf-8");
        return JSON.parse(users);
      } else return [];
    } catch (error) {
      console.log(error);
    }
  }

  async create(obj) {
    try {
      const product = {
        id: uuidv4(),
        ...obj,
      };
      const products = await this.getAll();
      const productExist = products.find((p) => p.id === producto.id);
      if (productExist) throw new Error("el producto ya existe");
      products.push(product);
      await fs.promises.writeFile(this.path, JSON.stringify(users));
    } catch (error) {
      throw new Error(message.error);
    }
  }

  async getById(id) {
    try {
      const products = await this.getAll();
      if (!products.length > 0) throw new Error("lista de productos vacia");
      const product = products.find((product) => product.id === id);
      return product;
    } catch (error) {
      throw new Error(message.error);
    }
  }
  async update(obj, id) {
    try {
      const products = await this.getAll();
      let prod = await this.getById(id);
      prod = { ...prod, ...obj };
      const newArray = products.filter((prod) => prod.id !== id);
      newArray.push(prod);
      await fs.promises.writeFile(this.path, JSON.stringify(newArray));
    } catch (error) {throw new Error(error);}
  }
  async delete (id){
    try {
     const prod = await this.getById(id); 
     const products = await this.getAll();
     const newArray = products.filter((prod) => prod.id !== id);
     await fs.promises.writeFile(this.path, JSON.stringify(newArray));
    return prod;
    } catch (error) {throw new Error(error)
      
    }
  }
  async deleteAll (){
    try {
      const product = await this.getAll();
      if(!products.length >0 ) throw new Error("lista de productos vacia");
      await fs.promises.unlink(this.path);

    } catch (error) {throw new Error(RangeError);
      
    }
  }
}

export default productManager;
