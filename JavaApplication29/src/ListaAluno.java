
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

public class ListaAluno {
    private Aluno[] alunoArray = new Aluno[0];
    
    public void incluirNoInicio(Aluno aluno){
        Aluno[] alunoArrayCopia = new Aluno[alunoArray.length+1];
        alunoArrayCopia[0] = aluno;
        
        for(int i = 1; i < alunoArrayCopia.length; i++){
            
            alunoArrayCopia[i] = alunoArray.clone()[i-1];
            
        }
        
        alunoArray = null;
        alunoArray = alunoArrayCopia.clone();
        alunoArrayCopia = null;
    }
    
    public void incluirNoFim(Aluno aluno){
        
        Aluno[] alunoArrayCopia = new Aluno[alunoArray.length+1];
        
        for(int i = 0; i < alunoArray.length; i++){
            
            alunoArrayCopia[i] = alunoArray.clone()[i];
            
        }
        
        alunoArrayCopia[alunoArrayCopia.length-1] = aluno;
        
        alunoArray = null;
        alunoArray = alunoArrayCopia.clone();
        alunoArrayCopia = null;
    }
    
    public void ordenar(){
        
        Arrays.sort(alunoArray, Comparator.comparing(Aluno::getNome));
        
    }
    
    public Aluno removerDoFim(){
        
        Aluno[] alunoArrayCopia = alunoArray.clone();
        Aluno alunoRetorno;
        
        alunoRetorno = alunoArrayCopia[alunoArrayCopia.length-1];
        
        alunoArray = new Aluno[alunoArrayCopia.length-1];
        
        for(int i = 0; i < alunoArray.length; i++){
            
            
            alunoArray[i] = alunoArrayCopia.clone()[i];
            
        }
        
        alunoArrayCopia = null;
        return alunoRetorno;
        
    }
    
    public int tamanho(){
        
        return alunoArray.length;
        
    }
    
    public Aluno get(int posição){
        
        return alunoArray[posição];
        
    }
    

}
