import express from 'express';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

let db;

(async () => {
  db = await open({
    filename: './tarefas.db',
    driver: sqlite3.Database
  });
  await db.run('CREATE TABLE IF NOT EXISTS tarefas (id INTEGER PRIMARY KEY AUTOINCREMENT, texto TEXT NOT NULL)');
})();

// Buscar todas as tarefas
app.get('/tarefas', async (req, res) => {
  const tarefas = await db.all('SELECT * FROM tarefas');
  res.json(tarefas);
});

// Adicionar tarefa
app.post('/tarefas', async (req, res) => {
  const { texto } = req.body;
  if (!texto) return res.status(400).json({ erro: 'Texto é obrigatório' });
  const result = await db.run('INSERT INTO tarefas (texto) VALUES (?)', texto);
  res.json({ id: result.lastID, texto });
});

// Excluir tarefa
app.delete('/tarefas/:id', async (req, res) => {
  const { id } = req.params;
  await db.run('DELETE FROM tarefas WHERE id = ?', id);
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
