


import java.text.ParseException;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.text.ParseException;
import java.util.Calendar;
import java.util.ArrayList;

import java.util.Scanner;


public class JavaApplication29 {

    public static void main(String[] args) throws ParseException {
        Scanner entrada = new Scanner(System.in);
        int opcao = 0;
        ListaTurma listaTurma = new ListaTurma();
        
        /**
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
               **/
        

    
        do{
            System.out.println("--------------------------------------------------\n");
            System.out.println("Bem-vindo ao sistema de gerenciamento da escola\n");
            System.out.println("Escolha uma opção para o que deseja fazer");
            System.out.println("1-Cadastrar Aluno\n2-Cadastrar Turma\n3-Encerrar");

            opcao = entrada.nextInt();
            /**

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
        ***/

            entrada.nextLine();

            switch (opcao) {
                case 1:               
                    
                System.out.println("Opção Cadastrar selecionada.");

                    //aluno 1

                        Aluno aluno = new Aluno();

                        System.out.println("Digite seu Aluno 1: ");
                        aluno.setNome(entrada.nextLine());

                        System.out.println("Digite seu CPF: ");
                        aluno.setCPF(entrada.nextLine());

                        System.out.println("Digite seu Endereço: ");
                        aluno.setEndereço(entrada.nextLine());

                        System.out.println("Digite sua Data de Nascimento (dd/MM/yyyy): ");
                        aluno.setDataNascimento(entrada.nextLine());
                                 
                        System.out.println("Digite o codigo da turma que você deseja incluir o aluno");
                        listaTurma.adicionarAlunoNaTurma(aluno, entrada.nextInt());
                        
                        System.out.println("\nInformações do Aluno:");
                        System.out.println("Nome: " + aluno.getNome());
                        System.out.println("CPF: " + aluno.getCPF());
                        System.out.println("Endereço: " + aluno.getEndereço());
                        System.out.println("Idade: " + aluno.calcularIdadeDoAluno() + " anos");
                               
                    break;
                case 2:
                    System.out.println("Opção Consultar selecionada.");
    

                    break;
                case 3:
                    System.out.println("Até logo!");

                    break;
                default:
                    System.out.println("Opção inválida! Tente novamente.");
            }
        }while(opcao != 0);

    
        entrada.close(); 
    }
    
}
