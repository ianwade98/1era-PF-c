import FileManager from "./fileManager.js"

export default class Table{
    constructor(dbFile){
        this.bufferTable=[]
        this.dbFile = new FileManager(dbFile);
    };

    getBufferTable= async()=>{
        this.bufferTable = await this.dbFile.read();
    };

    saveToFile = ()=>{
        this.dbFile.save(this.bufferTable);
    };

    getNewId = () =>{ 
        let newId = 0; //Id inicial
        //Si ya exiten datos en la tabla:
        if( this.bufferTable.length != 0){
            newId = this.bufferTable[this.bufferTable.length - 1].id + 1;
        } 
        return newId;
    };

    get = async (id)=>{
        //Cargo en buffer la tabla:
        await this.getBufferTable();
        //Si tengo un ID lo busco y retorno ese objecto
        if(id){
            const objectFound = this.bufferTable.filter( object => object.id == id )
            return objectFound[0];
        };
        //Si no tengo ID retorno todos los productos:
        return this.bufferTable;
    };

    add = async (newObject)=>{
        //Cargo en buffer la tabla:
        await this.getBufferTable();

        //Agrego el Id:
        newObject.id = this.getNewId();

        //Agrego el timestamp:
        newObject.timestamp = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`;
        
        //Agrego el objecto nuevo a la tabla:
        this.bufferTable.push( newObject );

        //Guardo en archivo:
        this.saveToFile();

        return newObject.id;
   };

   update = async (id, modifedObject)=>{
       //Cargo en buffer la tabla:
       await this.getBufferTable();

       //modifico el objecto:
       this.bufferTable.map( object => {
           if(object.id == id){
               //creo un array con los Keys del objecto enviado:
               const keys = Object.keys(modifedObject)
               //actualizo solo los Keys enviados:
               keys.forEach(key => { object[key] = modifedObject[key] });
           }
       });

       //Guardo los cambios:
       this.saveToFile();
   }

   delete = async (id) =>{
       //Cargo en buffer la tabla:
       await this.getBufferTable();

       //Filtro el ID a eliminar
       this.bufferTable = this.bufferTable.filter( object => object.id != id );

       ///Guardo los cambios:
       this.saveToFile();
   }

};
