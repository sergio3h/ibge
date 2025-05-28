// server/routes/municipioRoutes.js
const express = require('express');
const municipioController = require('../controllers/municipioController');

const router = express.Router();

// GET /api/municipios/:uf
router.get('/:uf', municipioController.listarPorEstado);

// GET /api/municipios/:uf/:municipio/svg
router.get('/:uf/:municipio/svg', municipioController.obterGeometria);

module.exports = router;