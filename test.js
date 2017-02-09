var assert = require('assert');
var restify = require('restify');
var client = restify.createJsonClient({
   url: 'http://127.0.0.1:8081'
});
describe('REST Services', function() {
  describe('#mostrarHoraActual()', function() {
    it('se verifica que la respuesta del servicio sea una fecha valida', function() {

	    client.get('/obtenerHoraActual', function(err, req, res, obj) {
	       console.log('se obtiene la respuesta del servicio rest que devuelve la hora');
	       console.log(obj.hora);
	       // using ISO 8601 Date String
	       if (isNaN(Date.parse(obj.hora))) {
		  console.log('la hora NO ES valida');
		  assert.isOk(false, 'la hora NO ES valida');
	       }else{
                  console.log('la hora ES valida');
		  assert.isOk(true, 'la hora ES valida');
	       }
	     });
	
    });
  });
});


