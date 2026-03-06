export interface iPessoa {
  mostrarDados(): string;
}

export abstract class Pessoa implements iPessoa {
  protected nome: string;
  protected email: string;

  constructor(nome: string, email: string) {
    this.nome = nome;
    this.email = email;
  }

  getNome(): string {
    return this.nome;
  }

  getEmail(): string {
    return this.email;
  }

  mostrarDados(): string {
    return `Nome: ${this.nome} | E-mail: ${this.email}`;
  }
}

export class Aluno extends Pessoa {

  private id_aluno: number;
  private matricula: string;
  private curso: string;
  private mediaFinal: number;

  constructor(
    id_aluno: number,
    nome: string,
    email: string,
    matricula: string,
    curso: string,
    mediaFinal: number
  ) {
    super(nome, email);

    this.id_aluno = id_aluno;
    this.matricula = matricula;
    this.curso = curso;
    this.mediaFinal = mediaFinal;
  }

  getIdAluno(): number {
    return this.id_aluno;
  }

  getMatricula(): string {
    return this.matricula;
  }

  getCurso(): string {
    return this.curso;
  }

  getMediaFinal(): number {
    return this.mediaFinal;
  }

  mostrarDados(): string {
    return `Aluno: ${this.nome} | Email: ${this.email}`;
  }

  estaAprovado(): boolean {
    return this.mediaFinal >= 6;
  }
}

export class Professor extends Pessoa {

  private id_professor: number;
  private disciplina: string;
  private cargaHoraria: number;

  constructor(
    id_professor: number,
    nome: string,
    email: string,
    disciplina: string,
    cargaHoraria: number
  ) {
    super(nome, email);

    this.id_professor = id_professor;
    this.disciplina = disciplina;
    this.cargaHoraria = cargaHoraria;
  }

  getIdProfessor(): number {
    return this.id_professor;
  }

  getDisciplina(): string {
    return this.disciplina;
  }

  getCargaHoraria(): number {
    return this.cargaHoraria;
  }

  mostrarDados(): string {
    return `Professor: ${this.nome} | Email: ${this.email}`;
  }
}