import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Configure aqui os dados do seu MySQL
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root', // Altere para seu usuário
  password: '', // Altere para sua senha
  database: 'GerenciadordeTarefas',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Buscar todas as tarefas
app.get('/tarefas', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM tarefas');
  res.json(rows);
});

// Adicionar tarefa
app.post('/tarefas', async (req, res) => {
  const { titulo } = req.body;
  if (!titulo) return res.status(400).json({ erro: 'Título é obrigatório' });
  const [result] = await pool.query('INSERT INTO tarefas (titulo) VALUES (?)', [titulo]);
  res.json({ id: result.insertId, titulo });
});

// Excluir tarefa
app.delete('/tarefas/:id', async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM tarefas WHERE id = ?', [id]);
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
