const express = require('express');
const {Pool} = require('pg');
const app = express();
const port = 3000;


const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'postgres',
    port: 5432,
});

app.use(express.static('public'));
app.use(express.json());
app.use(cors());

//Rota estado
app.get('api/estados', async(req,res) =>{
    try{
        const result = await pool.query('SELECT sigla,nome FROM estados ORDER BY nome ASC');
        res.json(result.rows);
    } catch (err){
        res.status(500).json({error:err.message});
    }
});

//Rota de municipios do estado

app.get('api/municipios/:uf', async(req,res)=>{
    try{
        const result = await pool.query(
            'SELECT nome_municipio as nome FROM municipios_ibge WHERE sigla_uf = $1 ORDER BY nome',
        );
        res.json(result.rows);
    }catch(err){
        res.status(500).json({error: err.message});
    }
});

//Rota SVG

app.get('/api/svg/uf:municipio', async(req,res)=> {
    try{
        const result = await pool.query(
            'SELECT * FROM get_municipio_svg($1, $2)',
            [req.params.uf, req.params.municipio]
        );
        res.json(result.rows[0]);
    }catch(err){
        res.status(500).json({error: err.message});
    }
});

app.listen(port, ()=>{
    console.log('Servidor rodando em http://localhost:${port}');
})