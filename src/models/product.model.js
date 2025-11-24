import mongoose from "mongoose";

const productSchema = new mongoose.Schema(   // basicamente le digo a mongoDB como quiero que guarde los datos
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    stock: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true, // esto agrega las fechas de creacion y actualización (createdAt y updatedAt) automáticamente
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;