const express = require('express');
const router = express.Router();
const juguetesController = require('../controllers/juguetes.controller');

/*
Mayor organización: La lógica de las rutas y la lógica del negocio están separadas, lo que facilita el mantenimiento y la escalabilidad.
Pruebas más sencillas: Puedes probar el controlador sin tener que lidiar con las rutas, facilitando los tests unitarios.
Más limpio: Las rutas solo se encargan de recibir las solicitudes y pasar los datos al controlador, sin lógica de negocio, lo que hace que el código sea más claro.
*/

// Definir solo las rutas y referirse a los métodos del controlador
router.get('/', juguetesController.obtenerTodos);
router.get('/:id', juguetesController.obtenerUno);
router.post('/', juguetesController.crear);
router.put('/:id', juguetesController.actualizar);
router.delete('/:id', juguetesController.eliminar);

module.exports = router;