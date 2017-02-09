/*Servicio REST que permite obtener la hora actual*/
var restify = require('restify');

var server = restify.createServer();

function mostrarHoraActual(req, res, next) {
  var f=new Date();
  var fecha= "La fecha actual es: " + f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear() + " " + f.getHours()+":"+f.getMinutes()+":"+f.getSeconds(); 
  res.send({hora: fecha});
  return next();
}
function obtenerHoraActualBerlinClock(req, res, next) {
  res.send({hora: 'TODO: mostar hora en formato Berlin Clock'});
  return next();
}
function obtenerHoraActual(req, res, next) {
  var f=new Date();

  res.send({hora: f});
  return next();
}

server.get({path: '/mostrarHoraActual'}, mostrarHoraActual);
server.get({path: '/obtenerHoraActualBerlinClock'}, obtenerHoraActualBerlinClock);
server.get({path: '/obtenerHoraActual'}, obtenerHoraActual);

server.listen(8081, function(){
  console.log('servicio rest escuchando en *:8081');
});







