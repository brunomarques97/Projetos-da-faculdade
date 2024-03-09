package projeto_integrador;

import java.util.ArrayList;
import java.util.Scanner;

class Aluno {
    private String nome;
    private String cpf;
    private String endereco;
    private String dataNascimento;

    public Aluno(String nome, String cpf, String endereco, String dataNascimento) {
        this.nome = nome;
        this.cpf = cpf;
        this.endereco = endereco;
        this.dataNascimento = dataNascimento;
    }

    // Getters e Setters
    // Métodos adicionais, se necessário
}

class Turma {
    private String codigo;
    private String etapaEnsino;
    private int ano;
    private int limiteVagas;
    private int numeroMatriculados;

    public Turma(String codigo, String etapaEnsino, int ano, int limiteVagas) {
        this.codigo = codigo;
        this.etapaEnsino = etapaEnsino;
        this.ano = ano;
        this.limiteVagas = limiteVagas;
        this.numeroMatriculados = 0;
    }

    // Getters e Setters
    // Métodos adicionais, se necessário
}

class ListaDeAlunos {
    private ArrayList<Aluno> alunos;

    public ListaDeAlunos() {
        alunos = new ArrayList<>();
    }

    public void incluirNoInicio(Aluno aluno) {
        alunos.add(0, aluno);
    }

    public void incluirNoFim(Aluno aluno) {
        alunos.add(aluno);
    }

    public void ordenar() {
        alunos.sort((a1, a2) -> a1.getNome().compareToIgnoreCase(a2.getNome()));
    }

    public Aluno removerDoFim() {
        if (alunos.isEmpty()) return null;
        return alunos.remove(alunos.size() - 1);
    }

    public int tamanho() {
        return alunos.size();
    }

    public Aluno get(int index) {
        if (index < 0 || index >= alunos.size()) return null;
        return alunos.get(index);
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        ListaDeAlunos listaDeAlunos = new ListaDeAlunos();

        // Implemente o menu de opções e a lógica de interação com o usuário aqui

        scanner.close();
    }
}

