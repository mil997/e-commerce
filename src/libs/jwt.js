// importa la librería 'jsonwebtoken' para la creación y firma de json web token (jwt).
import jwt from 'jsonwebtoken'
// importa la clave secreta desde config.js esta clave es importante para asegurar que solo nuestro servidor pueda firmar tokens validos.
import { TOKEN_SECRET } from "../config.js";

// defino y exporto la función 'createAccessToken', que recibe el 'payload' (los datos del usuario)
export function createAccessToken(payload) {

// envuelve la función asíncrona 'jwt.sign' en una promesa para poder usarla con 'await'
// en los controladores (como 'register' y 'login').
    return new Promise((resolve, reject) => {
        
// aca uso el metodo sign de jwt
        jwt.sign(
  // payload: aca le paso por parametros los datos que quiero recibir
            payload,
  // secret Key: la clave secreta importada. Esto genera la firma del token.
            TOKEN_SECRET, // token secreto
  // options: opciones de configuración, aca le puse que el token expire en 1hs
            { expiresIn: "1h" },
  // callback: la función que se ejecuta al finalizar la firma (recibe un error o el token generado)
            (error, token) => {
  // si hay un error al firmar el token, rechaza la Promesa.
            if (error) reject(error)
  // si la firma es exitosa, resuelve la Promesa y devuelve el token
            resolve(token)
   }
  );
 })
}