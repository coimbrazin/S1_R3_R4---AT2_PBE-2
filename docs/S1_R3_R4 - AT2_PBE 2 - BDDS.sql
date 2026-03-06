create database escolinha_do_bem;
use escolinha_do_bem;

CREATE TABLE alunos (
    id_aluno INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(45) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    matricula VARCHAR(45) NOT NULL UNIQUE,
    curso VARCHAR(45) NOT NULL,
    mediaFinal DECIMAL(10,2) NOT NULL
);

CREATE TABLE professores (
	id_professor INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(45) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    disciplina VARCHAR(45) NOT NULL,
    cargaHoraria INT NOT NULL
);
