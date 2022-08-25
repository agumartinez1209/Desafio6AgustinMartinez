class ContenedorMemoria {
    constructor() {
        this.elementos = []
        this.id = 0
    }

    listar(id) {
        const productoId = this.elementos.find(p => p.id == id);
        if (productoId == undefined){
            return { error : 'no se encontro el producto' }

        } else {
            return productoId;
        }
    }

    listarAll() {
        try {
            const lista = this.elementos;
            return lista;
        } catch (error) {
            console.error("error:", error);
        }
    }

    guardar(elem) {
        if (this.elementos.length == 0){
            elem.id = 1 ;
        } else {
            const ultimoProducto =  this.elementos[this.elementos.length - 1]
        elem.id = ultimoProducto.id + 1;
        }
        this.elementos.push(elem);
        return elem.id
    }

    actualizar(elem, id) {
        let productoIndex = this.elementos.findIndex(p => p.id == id);
        elem.id = id
        this.elementos[productoIndex] = elem ;
        return elem
    }

    borrar(id) {
        let productoIndex = this.elementos.findIndex(p => p.id == id);
        if (productoIndex >= 0) {
           this.elementos.splice(productoIndex,1);
          }
          else {return { error : 'no se encontro el producto' }}
    }

    borrarAll() {
        this.elementos = []
    }
}

module.exports = ContenedorMemoria
