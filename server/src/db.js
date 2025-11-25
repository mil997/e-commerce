import mongoose from "mongoose"; // importo mongoose desde mongoose

export const connectDB = async () => {  // exporto connect y lo importo en index.js
try {
    await mongoose.connect('mongodb://127.0.0.1:27017/e-commerce');
    console.log(">>> DB is connected") 
} catch (error) {
    console.log('error en la base de datos', error.message);
}
};

                 // ES LA CONECTION A LA BASE DE DATOS