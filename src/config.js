// esta es la CLAVE SECRETA PRIVADA utilizada para firmar (encriptar) y verificar (desencriptar) los JSON Web Tokens (JWT).
export const TOKEN_SECRET = process.env.TOKEN_SECRET;


// Sirve para configurar la aplicación de manera flexible y segura, 
// permitiendo aislar información sensible como claves o credenciales de bases de datos en un archivo .env 
// separado en lugar de incrustarla directamente en el código.