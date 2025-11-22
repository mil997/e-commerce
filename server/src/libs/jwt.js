// importa la librería 'jsonwebtoken' para la creación y firma de json web token (jwt).
import jwt from 'jsonwebtoken'
// importa la clave secreta unica desde el archivo de configuración. Esta clave es muy importante para asegurar que solo nuestro servidor pueda firmar tokens validos.
import { TOKEN_SECRET } from "../config.js";

// define y exporta la función 'createAccessToken', que recibe el 'payload' (los datos del usuario).
export function createAccessToken(payload) {

// envuelve la función asíncrona 'jwt.sign' en una promesa para poder usarla con 'await'
// en los controladores (como 'register' y 'login').
    return new Promise((resolve, reject) => {
        
//firma el json web token:
        jwt.sign(
  // 1. payload: El objeto de datos que se incrustará en el token (ej: { id: 123, role: 'admin' }).
            payload,
  // 2. secret Key: la clave secreta importada. Esto genera la firma del token.
            TOKEN_SECRET, // token secreto
  // 3. options: opciones de configuración, aca le puse que el token expire en 1hs
            { expiresIn: "1h" },
  // 4. callback: la función que se ejecuta al finalizar la firma (recibe un error o el token generado).
            (error, token) => {
  // si hay un error al firmar el token, rechaza la Promesa.
            if (error) reject(error)
  // si la firma es exitosa, resuelve la Promesa y devuelve el token generado (string).
            resolve(token)
   }
  );
 })
}