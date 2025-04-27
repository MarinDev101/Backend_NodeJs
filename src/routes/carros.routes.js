const express = require('express');
const router = express.Router();
const crud = require('../controllers/carros.controller');

router.get('/', async (req, res) => {
  try {
    const carros = await crud.obtenerTodos();
    res.json(carros);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const carro = await crud.obtenerUno(req.params.id);
    res.json(carro);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const nuevaCarro = await crud.crear(req.body);
    res.status(201).json(nuevaCarro);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const carroActualizado = await crud.actualizar(req.params.id, req.body);
    res.json(carroActualizado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const resultado = await crud.eliminar(req.params.id);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;