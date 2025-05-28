const express = require('express');
const cors = require('cors');
const path = require('path');
const estadoRoutes = require('./routes/estadoRoutes');
const municipioRoutes = require('./routes/municipioRoutes');
const { connectDb } = require('./models');

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

(async()=> {
    try {
         await connectDb()

        app.listen(port, () => {
          console.log(`Servidor rodando em http://localhost:${port}`);
        });

    } catch (error) {
        console.log("Deu error")
        process.exit(1);
    }
})()