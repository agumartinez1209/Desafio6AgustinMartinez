const { promises: fs } = require('fs')

class ContenedorArchivo {

    constructor(ruta) {
        this.ruta = ruta;
    }

    async listar(id) {
        const products = await this.getAll();
        const productById = products.find(p => p.id == id);
        return productById;
    }

    async listarAll() {
        try {
            const products = await fs.readFile(this.ruta, 'utf-8');
            return JSON.parse(products);
        } catch (error) {
            return console.log('Error lectura');
        }
    }

    async guardar(obj) {
        try {
            const products = await this.getAll();
            const lastProd =  products[products.length - 1]
            obj.id = lastProd.id + 1;
            products.push(obj);
            fs.writeFile(this.ruta, JSON.stringify(products, null,2) ) ;
            return obj.id
          } catch (error) {
            
          }
    }

    async actualizar(elem, id) {
        try {
            const products = await this.getAll();
            const indexId = products.findIndex(p => p.id == id );
            if (indexId >= 0) {
              products[indexId] = elem;
              fs.writeFile(this.ruta, JSON.stringify(products, null,2) ) ;
            }
            else { throw error}
          } catch (error) {
            console.log('Registro no encontrado!')
          }
    }

    async borrar(id) {
        try {
            const products = await this.getAll();
            const indexId = products.findIndex(p => p.id == id );
            if (indexId >= 0) {
              products.splice(indexId,1);
              fs.writeFile(this.ruta, JSON.stringify(products, null,2) ) ;
            }
            else { throw error}
          } catch (error) {
            console.log('Registro no encontrado!')
          }
    }

    async borrarAll() {
        try {
            fs.unlink(this.ruta)
          } catch (error) {
            console.log('Archivo no encontrado!')
          }
    }
}

module.exports = ContenedorArchivo