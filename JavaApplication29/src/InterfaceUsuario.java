import java.text.ParseException;
import java.util.InputMismatchException;

import java.util.Scanner;


public class InterfaceUsuario {

    public static void main(String[] args) throws ParseException, Exception {
        Scanner entrada = new Scanner(System.in);
        int opcao = 5;
        ListaTurma listaTurma = new ListaTurma();
               
        do{
            
            try{
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

                    System.out.println("Digite o nome do aluno: ");
                    aluno.setNome(entrada.nextLine());
                    
                    System.out.println("Digite o CPF do aluno:");
                    
                    while (true) {
                        String cpf = entrada.nextLine();
                        if (Validacoes.validarCPF(cpf) == true) {
                            aluno.setCPF(cpf);
                            break;
                        }else {
                            System.out.println("Formato de CPF inválido! (Insira apenas os numeros)");
                        }
                    }

                    System.out.println("Digite o endereço do aluno: ");
                    aluno.setEndereço(entrada.nextLine());

                    System.out.println("Digite a data de nascimento do aluno (dd/MM/yyyy): ");
                    
                    while (true) {
                        String Nascimento = entrada.nextLine();
                        if (Validacoes.validarDataDeNascimento(Nascimento)) {
                            aluno.setDataNascimento(Nascimento);
                            break;
                        }else{
                            System.out.println("Formato de data inválido. Use o formato dd/MM/yyyy.");
                        }
                    }
                                 
                    System.out.println("Digite o codigo da turma que você deseja incluir o aluno");
                    
                    
                    try{
                        
                    listaTurma.alunosUnicos(aluno);
                    listaTurma.adicionarAlunoNaTurma(aluno, entrada.nextInt());
                        
                    }catch (Illegal­Access­Exception e){
                        
                        System.out.println("Aluno ja castrado anteriormente");
                        
                    }catch (Exception e){
                        
                        System.out.println("Codigo de turma invalido");
                        
                    }
                    
                               
                    System.out.println("\nPrecione ENTER para continuar");
                    entrada.nextLine();
                    entrada.nextLine();
                    
                    break;
                case 2:
                    System.out.println("\nOpção Consultar selecionada.\n");
                    System.out.println("--------------------------------------------------\n");
                    
                    listaTurma.printarTodosOsAlunos();
                    
                    System.out.println("\nPrecione ENTER para continuar");
                    entrada.nextLine();
                    entrada.nextLine();

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
                    
                    try{
                    System.out.println("Digite o codigo da etapa de ensino: ");
                    System.out.println("1-Infantil\n2-Fundamental anos iniciais\n3-Fundamental anos finais\n4-Médio");
                    turma.setEtapaEnsino(entrada.nextInt());
                    
                    }catch(Exception e){
                        
                        System.out.println("Opção invalida");
                        
                        System.out.println("\nPrecione ENTER para continuar");
                        entrada.nextLine();
                        entrada.nextLine();
                               
                    break;
                        
                    }
                                                          
                    entrada.nextLine();
                    
                    System.out.println("Digite o ano da turma");
                    turma.setAno(entrada.nextLine());
                    
                    System.out.println("Digite o limite de vagas:");
                    turma.setLimiteVagas(entrada.nextInt());
                    
                    listaTurma.adicionarTurma(turma);
                    
                    System.out.println("Turma cadastrada com sucesso");
                    
                    listaTurma.printarUltimaTurmaCadastrada();
                                                        
                    System.out.println("\nPrecione ENTER para continuar");
                    entrada.nextLine();
                    entrada.nextLine();
                               
                    break;
                case 2:
                    System.out.println("Opção Consultar selecionada.\n");
                    
                    listaTurma.printarTurmas();
                    
                    System.out.println("\nPrecione ENTER para continuar");
                    entrada.nextLine();
                    entrada.nextLine();

                    break;
                case 3:
                    try{
                    System.out.println("Digite o codigo da turma");                   
                    listaTurma.printarAlunosDaTurma(entrada.nextInt());
                    }catch (IndexOutOfBoundsException e){
                        
                        System.out.println("Codigo da turma invalido");
                        
                    }
                    
                    System.out.println("\nPrecione ENTER para continuar");
                    entrada.nextLine();
                    entrada.nextLine();
                    
                    break;
                    
                case 4:
                    
                    entrada.nextLine();
                    
                    System.out.println("Digite a etapa de ensino a ser consultada");
                    System.out.println("infantil - fundamental anos iniciais - fundamental anos finais - médio");
                    System.out.println(listaTurma.quantidadeAlunosForaDaEtapaEnisno(entrada.nextLine()));
                    
                    System.out.println("\nPrecione ENTER para continuar");
                    entrada.nextLine();
                    
                    
                    break;

                default:
                    System.out.println("Opção inválida! Tente novamente.");
            }
                
            }
            
            }catch(InputMismatchException e){
                        
                System.out.println("\nDigite apenas numeros");
                
                System.out.println("\nPrecione ENTER para continuar");
                entrada.nextLine();
                entrada.nextLine();
                        
            }

            
        }while(opcao != 0);

    
        entrada.close(); 
        
    }
    
    
}
