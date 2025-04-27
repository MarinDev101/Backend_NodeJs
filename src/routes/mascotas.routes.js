const express = require('express');
const router = express.Router();
const CrudController = require('../controllers/crud.controller');
const crud = new CrudController();
const tabla = 'mascotas';
const idCampo = 'id_mascota';

router.get('/', async (req, res) => {
  try {
    const mascotas = await crud.obtenerTodos(tabla);
    res.json(mascotas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const mascota = await crud.obtenerUno(tabla, idCampo, req.params.id);
    res.json(mascota);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const nuevaMascota = await crud.crear(tabla, req.body);
    res.status(201).json(nuevaMascota);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const mascotaActualizada = await crud.actualizar(tabla, idCampo, req.params.id, req.body);
    res.json(mascotaActualizada);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const resultado = await crud.eliminar(tabla, idCampo, req.params.id);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;