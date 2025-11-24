import mongoose from "mongoose";

// tengo que corregir lo de la db connect 
// no se si dejarlo en ingles o español

export const connectDB = async () => {
try {
    await mongoose.connect('mongodb://127.0.0.1:27017/e-commerce');
    console.log(">>> DB is connected")
} catch (error) {
    console.log('error en la base de datos', error.message);
}
};