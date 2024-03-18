package javaapplication29;

import java.util.Scanner;

public class JavaApplication29 {

    public static void main(String[] args) {
        Scanner entrada = new Scanner(System.in);
        int opcao = 0;
        
       // do{
            System.out.println("Bem-vindo ao sistema de gerenciamento da escola\n");
            System.out.println("Escolha uma opção para o que deseja fazer");
            System.out.println("1-Cadastrar Aluno\n2-Cadastrar Turma\n3-Encerrar");
            opcao = entrada.nextInt();
        //}while(opcao != 3);
    }
    
}
