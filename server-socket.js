/*socket server disponibilizado para recibir conexiones desde el cliente 
y devolver cada 3 segundos la hora actual*/
var restify = require('restify');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var sleep = require('sleep');
var InfiniteLoop = require('infinite-loop');

app.get('/', function(req, res){
  res.sendfile('client-socket.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('mostrarHora', function(){
    console.log('mostrar hora actual');
    var il = new InfiniteLoop();

    il.add(enviarHoraActual);
    il.run();
    
  });
});

http.listen(8080, function(){
  console.log('server socket escuchando en *:8080');
});


//Creo el cliente json al servicio REST publicado en localhost 8081
var client = restify.createJsonClient({
   url: 'http://127.0.0.1:8081'
});
function enviarHoraActual() {
   console.log('se envia el mensaje al cliente');

   client.get('/mostrarHoraActual', function(err, req, res, obj) {
       console.log('se obtiene la respuesta del servicio rest que devuelve la hora');
       var respuesta=JSON.stringify(obj, null, 2);
       console.log(respuesta);
       io.emit('mostrarHora', respuesta);
   });
   console.log('el mensaje al cliente fue enviado');
   console.log('se esperan 3 segundos para volver a consultar la hora');
   sleep.sleep(3);
}

