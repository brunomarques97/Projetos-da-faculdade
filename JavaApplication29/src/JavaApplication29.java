import java.text.SimpleDateFormat;
import java.util.Date;
import java.text.ParseException;
import java.util.Calendar;
//import java.util.ArrayList;
import java.util.Scanner;


public class JavaApplication29 {

    public static void main(String[] args) {
        Scanner entrada = new Scanner(System.in);
        int opcao = 0;
    
        do{
            System.out.println("Bem-vindo ao sistema de gerenciamento da escola\n");
            System.out.println("Escolha uma opção para o que deseja fazer");
            System.out.println("1-Cadastrar Aluno\n2-Cadastrar Turma\n3-Encerrar");

            opcao = entrada.nextInt();
            entrada.nextLine();

            switch (opcao) {
                case 1:
                
                //ArrayList<Aluno> listaAlunos = new ArrayList<>();
                    
                System.out.println("Opção Cadastrar selecionada.");

                    //aluno 1

                        Aluno aluno = new Aluno();

                        System.out.println("Digite seu Aluno 1: ");
                        String nome = entrada.nextLine();
                        aluno.setNome(nome);

                        System.out.println("Digite seu CPF: ");
                        String cpf = entrada.nextLine();
                        aluno.setCPF(cpf);

                        System.out.println("Digite seu Endereço: ");
                        String endereco = entrada.nextLine();
                        aluno.setEndereco(endereco);

                        System.out.println("Digite sua Data de Nascimento (dd/MM/yyyy): ");
                        SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
                        String nascimento = entrada.nextLine();
                        aluno.setDataNascimento(nascimento);
                    
                    //calcula a idade
                    try {
                        Date dataNascimento = sdf.parse(nascimento);
                        Calendar dateOfBirth = Calendar.getInstance();
                        dateOfBirth.setTime(dataNascimento);

                        Calendar hoje = Calendar.getInstance();
        
                        int idade = hoje.get(Calendar.YEAR) - dateOfBirth.get(Calendar.YEAR);
            
                        // Verifica se o mês e o dia de nascimento já ocorreram no ano atual
                        if (hoje.get(Calendar.MONTH) < dateOfBirth.get(Calendar.MONTH) ||
                            (hoje.get(Calendar.MONTH) == dateOfBirth.get(Calendar.MONTH) &&
                            hoje.get(Calendar.DAY_OF_MONTH) < dateOfBirth.get(Calendar.DAY_OF_MONTH))) {
                            idade--;
                        }
                

                        String[] aluno1 = new String[4];

                        aluno1[0] = nome;
                        aluno1[1] = cpf;
                        aluno1[2] = endereco;
                        aluno1[3] = "" + idade;

                        System.out.println(hoje);
                        System.out.println("\nInformações do Aluno:");
                        System.out.println("Nome: " + aluno.getNome());
                        System.out.println("CPF: " + aluno.getCPF());
                        System.out.println("Endereço: " + aluno.getEndereco());
                        System.out.println("Idade: " + idade + " anos");
            
                    }catch (ParseException e) {
                        System.out.println("Data inválida! Certifique-se de usar o formato dd/MM/yyyy.");
                    }
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
