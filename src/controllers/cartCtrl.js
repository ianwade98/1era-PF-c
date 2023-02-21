import Table from "../models/tableClass.js";
import {productsTable} from "./productsCtrl.js";

//Defino la ubicacion de la DB
const cartBd = './ddbb/carts.json';

//Creo la tabla CARRITO
const cartsTable = new Table(cartBd);

//Creo la clase Carts
class Carts{
    constructor() {
        this.id;
        this.timestamp;
        this.items = [];
    }
}

//Creo el controlador con los metedos:
export const cartsCtrl = [];

//Crea un carrito y devuelve su id.
cartsCtrl.postCart = async (req, res) =>{
    const newId = await cartsTable.add(new Carts());
    res.send(`New cart was created with ID:${newId}`)
}

//Vacía un carrito y lo elimina.
cartsCtrl.deleteCart = (req, res)=>{
    const cartId = req.params.id;
    cartsTable.delete(cartId);
    res.send("cart deleted")
}

//Me permite listar todos los productos guardados en el carrito
cartsCtrl.getProducts = async (req, res)=>{
    const cartId = req.params.id;
    const cartTemp = await cartsTable.get(cartId);
    if(cartTemp){
        res.send(cartTemp.items)
    };
}

//Para incorporar productos al carrito por su id de producto
cartsCtrl.postProduct = async (req, res)=>{
    const cartId = req.params.id;
    const productId = req.params.id_prod;

    //Obtengo el producto:
        let newItem = req.body; //si lo mande por el body lo uso
        if (productId) { //si lo mande por parametro lo busco y cargo
            newItem = await productsTable.get(productId);
        } 

    //Agrego el producto al carrito indicado:
        //Obtengo el carrito:
        let cartTemp = await cartsTable.get(cartId);
        //Agrego el producto
        cartTemp.items.push(newItem);
        //Actualizo el carrito
        cartsTable.update(cartId, cartTemp);

    res.send(`Product added: ${JSON.stringify(newItem)}`)
}

//Eliminar un producto del carrito por su id de carrito y de producto
cartsCtrl.deleteProduct = async (req, res)=>{
    const cartId = req.params.id;
    const productId = req.params.id_prod;

    //Obtengo el carrito:
    let cartTemp = await cartsTable.get(cartId);

    //Filtro eliminando el producto:
    cartTemp.items = cartTemp.items.filter( item => item.id != productId );

    //Actualizo el carrito
    cartsTable.update(cartId, cartTemp);

    res.send("Product deleted")
}