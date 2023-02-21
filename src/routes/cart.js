import {Router} from "express";
import {cartsCtrl} from "../controllers/cartCtrl.js";
export const cartRoute = Router();


// POST: '/' - Crea un carrito y devuelve su id.
cartRoute.post('/', cartsCtrl.postCart)

// DELETE: '/:id' - Vacía un carrito y lo elimina.
cartRoute.delete('/:id', cartsCtrl.deleteCart)

// GET: '/:id/productos' - Me permite listar todos los productos guardados en el carrito
cartRoute.get('/:id/productos', cartsCtrl.getProducts)

// POST: '/:id/productos' - Para incorporar productos al carrito por su id de producto
cartRoute.post('/:id/productos/', cartsCtrl.postProduct)
cartRoute.post('/:id/productos/:id_prod', cartsCtrl.postProduct)

// DELETE: '/:id/productos/:id_prod' - Eliminar un producto del carrito por su id de carrito y de producto
cartRoute.delete('/:id/productos/:id_prod', cartsCtrl.deleteProduct)