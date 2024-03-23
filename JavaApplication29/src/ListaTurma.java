
import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;

public class ListaTurma {
   
    public static final List<Turma> listaTurma = new ArrayList<>();
    
    public void adicionarAlunoNaTurma(Aluno aluno, int codigoDaTurma){
        
        listaTurma.get(codigoDaTurma).cadastrarAluno(aluno);
        
    }
    
    public void adicionarTurma(Turma novaTurma){
        
        listaTurma.add(novaTurma);
        
    }
    
    public void criarTurma (Turma turma){
        
        listaTurma.add(turma);
        
    }
    
    public void printarTodosOsAlunos() throws ParseException{
        
        int idade;
        
        ListaAluno listaDeAlunos = criarListaDeAlunosDaEscola();
        
        for(int i = 0; i < listaDeAlunos.tamanho();i++){
                       
            System.out.println(listaDeAlunos.get(i).getNome() + " - " + listaDeAlunos.get(i).calcularIdadeDoAluno());
            
        }
        
    }
    
    public ListaAluno criarListaDeAlunosDaEscola(){
        
        ListaAluno listaAlunosEscola = new ListaAluno();
        
        for(int i = 0; i < listaTurma.size();i++){
            
            ListaAluno listaAlunosTurma = listaTurma.get(i).getListaAluno();
            
             for(int j = 0; j < listaAlunosTurma.tamanho(); j++){
                
                listaAlunosEscola.incluirNoFim(listaAlunosTurma.get(j));
                
            }
            
        }
        
        listaAlunosEscola.ordenar();
        
        return listaAlunosEscola;
        
    }
    
}
