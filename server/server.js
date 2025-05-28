const express = require('express');
const cors = require('cors');
const path = require('path');
const estadoRoutes = require('./routes/estadoRoutes');
const municipioRoutes = require('./routes/municipioRoutes');

const app = express();
const port = 3000;

// Configurações
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());
app.use(cors());

// Rotas
app.use('/api/estados', estadoRoutes);
app.use('/api/municipios', municipioRoutes);


// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});