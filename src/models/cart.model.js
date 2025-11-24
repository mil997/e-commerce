import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({ // basicamente le digo a mongoDB como quiero que guarde los datos
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
    },
  ],
  total: {
    type: Number,
    required: true,
    default: 0,
  },
}, { timestamps: true });

export default mongoose.model("Cart", cartSchema);