CREATE DATABASE  GerenciadordeTarefas;
USE GerenciadordeTarefas;

CREATE TABLE IF NOT EXISTS tarefas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    concluida BOOLEAN NOT NULL DEFAULT FALSE,
    criada_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO tarefas (titulo) VALUES ('Estudar SQL');
INSERT INTO tarefas (titulo) VALUES ('Criar projeto em Flask');
