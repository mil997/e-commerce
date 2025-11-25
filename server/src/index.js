import app from './app.js';
import { connectDB } from './db.js';
console.log("TOKEN_SECRET:", process.env.TOKEN_SECRET);


connectDB();
app.listen(3000);
console.log('Server listening on port', 3000);