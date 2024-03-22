import java.util.ArrayList;
//import java.util.Scanner;
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
                
                ArrayList<Aluno> listaAlunos = new ArrayList<>();
                    
                System.out.println("Opção Cadastrar selecionada.");

                        Aluno aluno1 = new Aluno();
                        System.out.println("Digite seu Aluno 1: ");
                        String nome1 = entrada.nextLine();
                        aluno1.setNome(nome1);

                        Aluno aluno2 = new Aluno();
                        System.out.println("Digite seu Aluno 2: ");
                        String nome2 = entrada.nextLine();
                        aluno2.setNome(nome2);
                        
                        Aluno aluno3 = new Aluno();
                        System.out.println("Digite seu Aluno 3: ");
                        String nome3 = entrada.nextLine();
                        aluno3.setNome(nome3);

                        Aluno aluno4 = new Aluno();
                        System.out.println("Digite seu Aluno 4: ");
                        String nome4 = entrada.nextLine();
                        aluno4.setNome(nome4);

                        listaAlunos.add(aluno1);
                        listaAlunos.add(aluno2);
                        listaAlunos.add(aluno3);
                        listaAlunos.add(aluno4);

                        for (Aluno aluno : listaAlunos) {
                            System.out.println("Nome do aluno: " + aluno.getNome());
                        }
                        System.out.println(listaAlunos.size());
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
