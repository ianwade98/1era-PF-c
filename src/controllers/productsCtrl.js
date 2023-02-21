import Table from "../models/tableClass.js";
import HttpMethods from "../models/httpMethodsClass.js";

//Defino la ubicacion de la DB
const productsBd = './ddbb/products.json';

//Creo la tabla con sus atributos
export const productsTable = new Table(productsBd);

//Creo el controlador con los metedos:
export const productsCtrl = new HttpMethods(productsTable);




