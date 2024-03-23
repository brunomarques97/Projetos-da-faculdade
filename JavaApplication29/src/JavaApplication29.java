

import java.text.ParseException;
import java.util.Scanner;

public class JavaApplication29 {

    public static void main(String[] args) throws ParseException {
        Scanner entrada = new Scanner(System.in);
        int opcao = 0;
        ListaTurma listaTurma = new ListaTurma();
        
        Turma turma = new Turma("primario","1",30,5);
        listaTurma.adicionarTurma(turma);
        
        Aluno aluno = new Aluno("Felipe","111","endereço","07/12/2003");
        listaTurma.adicionarAlunoNaTurma(aluno, 0);
        aluno = new Aluno("Luis","111","endereço","07/12/2000");
        listaTurma.adicionarAlunoNaTurma(aluno, 0);
        aluno = new Aluno("Bruno","111","endereço","07/12/1990");
        listaTurma.adicionarAlunoNaTurma(aluno, 0);
        
        listaTurma.printarTodosOsAlunos();
               
        
        /**
        do{
            System.out.println("--------------------------------------------------\n");
            System.out.println("Bem-vindo ao sistema de gerenciamento da escola\n");
            System.out.println("Escolha uma opção para o que deseja fazer");
            System.out.println("1-Cadastrar Aluno\n2-Cadastrar Turma\n3-Encerrar");
            opcao = entrada.nextInt();
            switch(opcao){
                case 1:
                    Aluno novoAluno = new Aluno();
                    System.out.println("Cadastro de aluno");
                    System.out.println("Digite o nome do aluno");
                    novoAluno.setNome(entrada.nextLine());
                    System.out.println("Digite o CPF do aluno");
                    novoAluno.setCPF(entrada.nextLine());
                    System.out.println("Digite o endereço do aluno");
                    novoAluno.setEndereço(entrada.nextLine());
                    System.out.println("Digite a data de nascimento do aluno");
                    novoAluno.setDataNascimento(entrada.nextLine());
                    System.out.println("Digite o codigo da turma na qual deseja cadastrar o aluno");
                    
                
                
            }
        }while(opcao != 3);
        **/
        }
    
}
