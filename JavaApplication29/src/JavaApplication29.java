//import java.util.Scanner;

public class JavaApplication29 {

    public static void main(String[] args) {
        //Scanner entrada = new Scanner(System.in);
        //int opcao = 0;
        
        Aluno aluno = new Aluno();
        aluno.setNome("teste");
        
        Aluno aluno2 = new Aluno();
        aluno2.setNome("abc");
        
        Aluno aluno3 = new Aluno();
        aluno3.setNome("cba");
        
        ListaAluno listaAluno = new ListaAluno();
        
        listaAluno.incluirNoFim(aluno);
        listaAluno.incluirNoFim(aluno2);
        listaAluno.incluirNoFim(aluno3);
        
        Aluno alunoRemovido = listaAluno.removerDoFim();
        
        listaAluno.teste();
        System.out.println(alunoRemovido.getNome());
        
      /** do{
            System.out.println("Bem-vindo ao sistema de gerenciamento da escola\n");
            System.out.println("Escolha uma opção para o que deseja fazer");
            System.out.println("1-Cadastrar Aluno\n2-Cadastrar Turma\n3-Encerrar");
            opcao = entrada.nextInt();
        }while(opcao != 3);
    **/}
    
}
