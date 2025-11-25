import Product from "../models/product.model.js";

// obtener todos los productos
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "error al obtener los productos", error });
  }
};

// obtener un producto por id
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "producto no encontrado" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "error al obtener el producto", error });
  }
};

// crear un nuevo producto
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock } = req.body;

    const newProduct = new Product({
      name,
      description,
      price,
      stock,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: "error al crear el producto", error });
  }
};

 // actualizar un producto
export const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProduct)
      return res.status(404).json({ message: "producto no encontrado" });
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "error al actualizar el producto", error });
  }
};

//  eliminar un producto
export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct)
      return res.status(404).json({ message: "producto no encontrado" });
    res.json({ message: "producto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "error al eliminar el producto", error });
  }
};