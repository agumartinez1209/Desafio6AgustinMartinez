const express = require('express')
const handlebars = require('express-handlebars');
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const ContenedorMemoria = require('../contenedores/ContenedorMemoria.js')
const ContenedorArchivo = require('../contenedores/ContenedorArchivo.js')

//--------------------------------------------
// instancio servidor, socket y api

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer)

let mensajes = new ContenedorMemoria();
let productos = new ContenedorMemoria();

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: 'public' });
});
//--------------------------------------------
//Set engine

app.engine(
    "hbs",
    handlebars({
        extname: ".hbs",
        defaultLayout: 'index.hbs',
        layoutDir: __dirname + "/views/layouts"
    })
);


app.set("view engine", "hbs");

app.set("views", "./views");



// configuro el socket

io.on('connection', async socket => {
    console.log('nuevo cliente')
    //productos
    socket.emit('productos',    
        productos.listarAll()
    );

    socket.on('productoNuevo', producto => {
        console.log(producto);
        productos.guardar(producto);
        
    });
    //mensajes
    socket.emit('mensajes', 
        mensajes.listarAll()
    );

    socket.on('mensajeNuevo', data => {
        mensajes.guardar(data)
        
        io.sockets.emit('mensajes', mensajes);
    });
});

//--------------------------------------------
// agrego middlewares

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

//--------------------------------------------
// inicio el servidor

const PORT = 8080
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`))
