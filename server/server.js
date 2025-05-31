const express = require('express');
const cors = require('cors');
const path = require('path');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password:'postgres',
  database:'IBGE',
});
const app = express();
const port = 3000;

// Configurações
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());
app.use(cors());

const connectDb = async()=>{
    try {
        await sequelize.authenticate();
        console.log("Banco conectado")
    } catch (error) {
        console.log("Error aoconectar o banco")
    }
}


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

app.get('/estados',async (req, res)=>{
    try{
        const result = await sequelize.query(
            'SELECT nome, gid FROM public.estados ORDER BY gid ASC');
        res.json(result[0]); // Aqui o result já é o array de objetos direto
    }catch(err){
        console.error(err);
        res.status(500).send('Erro ao buscar dados');
    }
});

app.get('/estados/:nome', async (req, res) => {
  const { nome } = req.params;

  try {
    const result = await sequelize.query(
      'SELECT nome, gid FROM public.estados WHERE nome = $1',
      {
        bind: [nome],
        type: Sequelize.QueryTypes.SELECT
      }
    );
    res.json(result);
    console.log('Estado encontrado:', result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao buscar estado');
  }
});

app.get('/estados/:nome/municipios', async (req, res) => {
  const { nome } = req.params;

  try {
    const result = await sequelize.query(
      `SELECT *
       FROM municipios_2024 m 
       JOIN estados e ON m.sigla_uf = e.sigla 
       WHERE e.nome = $1 
       ORDER BY m.nome ASC`,
      {
        bind: [nome],
        type: Sequelize.QueryTypes.SELECT
      }
    );

    console.log(`Municípios encontrados para o estado "${nome}":`, result);
    res.json(result);
  } catch (err) {
    console.error('Erro ao buscar municípios:', err);
    res.status(500).send('Erro ao buscar municípios');
  }
});

