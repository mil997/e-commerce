import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";

// Función auxiliar para populate consistente
const populateCart = (cart) => {
  return cart.populate({
    path: 'items.product',
    select: 'name description price image stock'
  });
};


// obtener carrito del usuario
export const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      cart = new Cart({ user: req.user.id, items: [], total: 0 });
      await cart.save();
    }
    const populatedCart = await populateCart(cart);
    res.json(populatedCart);
  } catch (error) {
    console.error("Error en getCart:", error);
    res.status(500).json({ message: "error al obtener el carrito", error });
  }
};

// agregar producto al carrito
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "producto no encontrado" });

    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      cart = new Cart({ user: req.user.id, items: [], total: 0 });
    }

    const itemIndex = cart.items.findIndex(item => item.product.equals(productId));

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    cart.total = await calculateTotal(cart.items);
    await cart.save();

    const populatedCart = await populateCart(cart);
    res.json(populatedCart);
  } catch (error) {
    res.status(500).json({ message: "error al agregar al carrito", error });
  }
};

// eliminar un producto del carrito
export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) return res.status(404).json({ message: "carrito no encontrado" });

    cart.items = cart.items.filter(item => !item.product.equals(productId));
    cart.total = await calculateTotal(cart.items);
    await cart.save();

    const populatedCart = await populateCart(cart);
    res.json(populatedCart);
  } catch (error) {
    res.status(500).json({ message: "error al eliminar producto", error });
  }
};

// vaciar carrito
export const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ message: "carrito no encontrado" });

    cart.items = [];
    cart.total = 0;
    await cart.save();

    const populatedCart = await populateCart(cart);
    res.json(populatedCart);
  } catch (error) {
    res.status(500).json({ message: "error al vaciar el carrito", error });
  }
};

// funcion auxiliar para que calcule el total del carrito
const calculateTotal = async (items) => {
  const populatedItems = await Promise.all(
    items.map(async (item) => {
      const product = await Product.findById(item.product);
      return product.price * item.quantity;
    })
  );
  return populatedItems.reduce((acc, curr) => acc + curr, 0);
};