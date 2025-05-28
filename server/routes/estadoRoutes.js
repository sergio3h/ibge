// server/routes/estadoRoutes.js
const express = require('express');
const estadoController = require('../controllers/estadoController');

const router = express.Router();

// GET /api/estados
router.get('/', estadoController.listarEstados);

module.exports = router;