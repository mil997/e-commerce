import app from './app.js'; // importo app desde app.js
import { connectDB } from './db.js'; // importo connectdb desde db.js

connectDB(); // lo ejecuto
app.listen(3000); // pongo a escuchar el sv en el puerto
console.log('Server listening on port', 3000); // mando un msg por consola 