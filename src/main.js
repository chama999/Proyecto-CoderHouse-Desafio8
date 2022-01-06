const path=require('path')
const dirDB=path.normalize(__dirname + "/db/")
console.log(dirDB)
const tableName='products'
const { options }  = require('../db/mariaDB.js')
console.log(options)
const knex = require('knex')(options);

class Contenedor {
    constructor( knex, tableName) {
        this.knex = knex;
        this.tableName=tableName;
    }
    
    //clear table from database
    clearTable() {
        this.knex(this.tableName).del().then(() => {
            console.log('La tabla se ha limpiado correctamente.');
        })
    }


    dropTable() {
        this.knex.schema.dropTableIfExists(this.tableName).then(() => {
            console.log('La tabla se ha eliminado correctamente.');
        })
    }


    //create table if table not exists
    createTable() {
        this.knex.schema.hasTable(this.tableName).then(exists => {
            if (!exists) {
                this.knex.schema.createTable(this.tableName, table => {
                    table.increments('id').primary();
                    table.string('name');
                    table.string('description');
                    table.integer('price');
                    table.string('stock');
                }).then(() => {
                    console.log('La tabla se ha creado correctamente.');
                })
        }
        }).catch(error => {
        console.log(error);
    })
    }   


    //return last id number object from database ecommerce and table products

    // guardar objetos en la tabla products
    saveObjects(objects) {
        console.log("Objeto:" + objects)
        this.knex(this.tableName).insert(objects).then(() => {
            console.log('Los objetos se han guardado correctamente.');
        })
    }

    // obtener el objeto por id de la tabla products
    getObjectById(id) {
        let obj = null;
        this.knex.select('*').from(this.tableName).where('id', id).then(rows => {
            obj = rows[0];
        })
        return obj;
    }


    //obtener todos los productos de la tabla products
    getAllObjects() {
        let objects = [];
        this.knex.select('*').from(this.tableName).then(rows => {
            objects = rows;
        })
        return objects;
    }

    // borrar objeto por id de la tabla products
    deleteObjectById(id) {
        this.knex(this.tableName).where('id', id).del().then(() => {
            console.log(`El objeto de ID: ${id}, se ha borrado correctamente.`);
        })
    }

    updateObjectById(id, obj) {
        this.knex(this.tableName).where('id', id).update(obj).then(() => {
            console.log(`El objeto de ID: ${id}, se ha actualizado correctamente.`);
        })
    }

}

let contenedor = new Contenedor(knex, tableName);

objetoInsertar = [{
    name: 'cerveza premium',
    description: 'cerveza importada premium',
    price: 350,
    stock: 10
},
{
    name: 'cerveza premium2',
    description: 'cerveza importada premium',
    price: 2,
    stock: 2
},
{
    name: 'cerveza premium3',
    description: 'cerveza importada premium',
    price: 3,
    stock: 3
},
{
    name: 'cerveza premium4',
    description: 'cerveza importada premium',
    price: 4,
    stock: 4
}]

objetoUpdate={name: 'cerveza premium3 upd', description: 'cerveza importada premium3 updated', price: 4000, stock: 10}

contenedor.saveObjects(objetoInsertar);

console.log(JSON.stringify(contenedor.getObjectById(10)));
console.log(JSON.stringify(contenedor.getAllObjects()));
console.log(contenedor.deleteObjectById(1));
console.log(contenedor.getAllObjects());
console.log(contenedor.updateObjectById(2, objetoUpdate ));
console.log(contenedor.getAllObjects());