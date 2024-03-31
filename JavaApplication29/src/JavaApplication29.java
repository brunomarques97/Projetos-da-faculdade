


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
               
        do{
            System.out.println("--------------------------------------------------\n");
            System.out.println("Bem-vindo ao sistema de gerenciamento da escola\n");
            System.out.println("Escolha uma opção");
            System.out.println("1-Controle Alunos\n2-Controle Turmas\n0-Encerrar\n");

            opcao = entrada.nextInt();

            entrada.nextLine();
            
            if(opcao == 1){
                
                System.out.println("--------------------------------------------------\n");
                System.out.println("Escolha uma opção");
                System.out.println("1-Cadastrar aluno\n2-Lista dos alunos matriculados\n3-Voltar\n");
                
                opcao = entrada.nextInt();
               
                switch (opcao) {
                case 1:           
                    
                    Aluno aluno = new Aluno();
                    
                    System.out.println("\nOpção Cadastrar selecionada.");
                 
                    entrada.nextLine();

                    System.out.println("Digite seu Aluno: ");
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
                    System.out.println("\nOpção Consultar selecionada.\n");
                    System.out.println("--------------------------------------------------\n");
                    
                    listaTurma.printarTodosOsAlunos();
    

                    break;
                case 3:
                    break;

                default:
                    System.out.println("Opção inválida! Tente novamente.");
            }
                
            }else if(opcao == 2){
                
                System.out.println("--------------------------------------------------\n");
                System.out.println("Escolha uma opção");
                System.out.println("1-Cadastrar turma\n2-Lista das turmas cadastradas\n3-Lista de alunos de uma turma\n4-Lista de alunos fora da etapa de ensino\n5-Voltar\n");
                
                opcao = entrada.nextInt();
                
                switch (opcao) {
                case 1:     
                    
                    Turma turma = new Turma();
                    
                    System.out.println("\nOpção Cadastrar selecionada.\n");

                    System.out.println("Digite o codigo da etapa de ensino: ");
                    System.out.println("1-Infantil\n2-Fundamental anos iniciais\n3-Fundamental anos finais\n4-Médio");
                    turma.setEtapaEnsino(entrada.nextInt());
                    
                    entrada.nextLine();
                    
                    System.out.println("Digite o ano da turma");
                    turma.setAno(entrada.nextLine());
                    
                    System.out.println("Digite o limite de vagas:");
                    turma.setLimiteVagas(entrada.nextInt());
                    
                    listaTurma.adicionarTurma(turma);
                    
                    System.out.println("Turma cadastrada com sucesso");
                    
                    listaTurma.printarUltimaTurmaCadastrada();
                               
                    break;
                case 2:
                    System.out.println("Opção Consultar selecionada.\n");
                    
                    listaTurma.printarTurmas();

                    break;
                case 3:
                    
                    System.out.println("Digite o codigo da turma");                   
                    listaTurma.printarAlunosDaTurma(entrada.nextInt());
                    
                    
                    break;
                    
                case 4:
                    
                    entrada.nextLine();
                    
                    System.out.println("Digite a etapa de ensino a ser consultada");
                    System.out.println("infantil - fundamental anos iniciais - fundamental anos finais - médio");
                    System.out.println(listaTurma.quantidadeAlunosForaDaEtapaEnisno(entrada.nextLine()));
                    
                    break;
                    
                case 5:
                    break;

                default:
                    System.out.println("Opção inválida! Tente novamente.");
            }
                
            }

            
        }while(opcao != 0);

    
        entrada.close(); 
        
    }
    
    
}
