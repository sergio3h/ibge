const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

// Serve arquivos da pasta public (que está fora da pasta server)
app.use(express.static(path.join(__dirname, '../public')));

// Conexão com o banco
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'postgres',
    port: 5432,
});

app.use(express.json());
app.use(cors());

// Rota para estados
app.get('/api/estados', async (req, res) => {
    try {
        const result = await pool.query('SELECT sigla,nome FROM estados ORDER BY nome ASC');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Rota para municípios por UF
app.get('/api/municipios/:uf', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT nome_municipio as nome FROM municipios_ibge WHERE sigla_uf = $1 ORDER BY nome',
            [req.params.uf]
        );
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Rota para SVG
app.get('/api/svg/:uf/:municipio', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM get_municipio_svg($1, $2)',
            [req.params.uf, req.params.municipio]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
