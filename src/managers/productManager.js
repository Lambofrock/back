import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import path from "path";

export default class productManager {
  constructor(path) {
    this.path = path;
  }

  async getAll() {
    try {
      if (fs.existsSync(this.path)) {
        const products = await fs.promises.readFile(this.path, "utf-8");
        return JSON.parse(products);
      } else return ["hola"];
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async create(obj) {
    try {
      const product = {
        id: uuidv4(),
        ...obj,
      };
      const products = await this.getAll();
      const productExist = products.find((p) => p.id === product.id);
      if (productExist) throw new Error("el producto ya existe");
      products.push(product);
      await fs.promises.writeFile(this.path, JSON.stringify(products));
      return product;
    } catch (error) {
      throw new Error(message.error);
    }
  }

  async getById(id) {
    try {
      const products = await this.getAll();
      if (!products.length > 0) throw new Error("lista de productos vacia");
      const product = products.find((product) => product.id === id);
      if (!product) throw new Error("producto no encontrado");
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
      return prod;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async delete(id) {
    try {
      const prod = await this.getById(id);
      const products = await this.getAll();
      const newArray = products.filter((prod) => prod.id !== id);
      await fs.promises.writeFile(this.path, JSON.stringify(newArray));
      return prod;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async deleteAll() {
    try {
      const products = await this.getAll();
      if (!products.length > 0) throw new Error("lista de productos vacia");
      await fs.promises.unlink(this.path);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
export const prodManager = new productManager(
  path.join(process.cwd(), "../data/carts.json")
);
