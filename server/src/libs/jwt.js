import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from "../config.js";

// creo la función 'createAccessToken', que recibe el 'payload' (los datos del usuario)
// por parametros
export function createAccessToken(payload) {

// creo una promesa para poder usar async/await
// esto puede ir bien como puede ir mal 
// entonces va dentro de un RESOLVE (SI VA BIEN) Y REJECT (VA MAL)
// en los controladores (como 'register' y 'login').
    return new Promise((resolve, reject) => {
        
// uso el metodo sign de jwt
        jwt.sign(
  // payload: aca le paso por parametros los datos que quiero recibir
            payload,
  // secret Key: la clave secreta importada. Esto genera la firma del token.
            TOKEN_SECRET, // token secreto
  // options: opciones de configuración, aca le puse que el token expire en 1hs
            { expiresIn: "1h" },
  // callback: la función que se ejecuta al finalizar la firma (recibe un error o el token generado)
            (error, token) => {
  // si hay un error ejecuta el reject
            if (error) reject(error)
  // si no hay un error ejecuta el resolve y devuelve el token
            resolve(token)
   }
  );
 })
}