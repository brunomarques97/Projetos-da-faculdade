
import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;

public class ListaTurma {
   
    public static final List<Turma> listaTurma = new ArrayList<>();
    
    public void adicionarAlunoNaTurma(Aluno aluno, int codigoDaTurma) throws ParseException{
        
        if(codigoDaTurma < listaTurma.size() && codigoDaTurma >= 0){
        
        listaTurma.get(codigoDaTurma).cadastrarAluno(aluno);
        
        }else{
            
            System.out.println("Essa turma não existe. Aluno não cadastrado");
            
        }
        
    }
    
    public void adicionarTurma(Turma novaTurma){
        
        listaTurma.add(novaTurma);
        
    }
    
    public void printarAlunosDaTurma(int numeroTurma) throws ParseException{
        
        ListaAluno listaAluno = listaTurma.get(numeroTurma).getListaAluno();
        
        listaAluno.ordenar();
        
        System.out.println("--------------------------------------------------\n");
        
        for(int i = 0; i < listaAluno.tamanho();i++){
                       
            System.out.println(listaAluno.get(i).getNome() + " - " + listaAluno.get(i).calcularIdadeDoAluno());
            
        }
        
    }
    
    public int quantidadeAlunosForaDaEtapaEnisno(String etapaEnsino) throws ParseException{
        
        List<Turma> listaTurmaEtapaEnsino = criarListaTurmaEtapaEnsino(etapaEnsino);
        
    
        
        Turma turma;
        
        int contador = 0;
        
        for(int i = 0; i < listaTurmaEtapaEnsino.size(); i++){
        
            turma = listaTurmaEtapaEnsino.get(i);
                     
            contador = contador + quantidadeAlunosForaEtapaEnsinoTurma(turma.getListaAluno(),etapaEnsino);
        
        }
        
        return contador;
        
    }
    
    public int quantidadeAlunosForaEtapaEnsinoTurma(ListaAluno listaAluno, String etapaEnsino) throws ParseException{
        
        int contador = 0;
        
        for(int i = 0; i < listaAluno.tamanho(); i++){
            
            if(!checarIdadeNaEtapaEnsino(listaAluno.get(i).calcularIdadeDoAluno(), etapaEnsino)){
                
                contador++;
                
            }
            
        }
        
        return contador;
        
    }
    
    public boolean checarIdadeNaEtapaEnsino(int idade, String etapaEnsino){
        
        if(etapaEnsino.contains("infantil") && idade > 6){
            
            return false;
            
        }
        if(etapaEnsino.contains("fundamental anos iniciais") && (idade < 6 || idade > 11)){
            
            return false;
            
        }
        if(etapaEnsino.contains("fundamental anos finais") && (idade < 11 || idade > 15)){
            
            return false;
            
        }
        if(etapaEnsino.contains("médio") && (idade < 15 || idade > 18)){
            
            return false;
            
        }
        return true;
    }
    
    public List<Turma> criarListaTurmaEtapaEnsino(String etapaEnsino){
        
        List<Turma> listaTurmaEtapaEnsino = new ArrayList<>();
        
        for(int i = 0; i < listaTurma.size(); i++){
            
            if(listaTurma.get(i).getEtapaEnsino().contains(etapaEnsino)){
                
                listaTurmaEtapaEnsino.add(listaTurma.get(i));
                
            }
            
        }
        

        return listaTurmaEtapaEnsino;
        
    }
    
    
    public void printarTodosOsAlunos() throws ParseException{
        
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
    
    public void printarTurmas(){
        
        for(int i = 0; i < listaTurma.size(); i++){
            
            System.out.println("--------------------------------");
            System.out.println("Turma: " + i + "\nEtapa de ensino: " + listaTurma.get(i).getEtapaEnsino() +
            "\nAno: " + listaTurma.get(i).getAno() + "\nLimite de vagas: " + listaTurma.get(i).getLimiteVagas() +
                    "\nNumero de matriculados: " + listaTurma.get(i).getNumeroMatriculados());
            
        }
        
    }
    
    public void printarUltimaTurmaCadastrada(){
        
        int codigoDaTurma = listaTurma.size()-1;
        
        System.out.println("--------------------------------------------------\n");
        
        System.out.println("\nCodigo da turma: " + codigoDaTurma);
        System.out.println("Etapa Ensino: " + listaTurma.get(listaTurma.size()-1).getEtapaEnsino());
        System.out.println("Ano: " + listaTurma.get(listaTurma.size()-1).getAno());
        System.out.println("Limite de vagas: " + listaTurma.get(listaTurma.size()-1).getLimiteVagas());
        
    }
    
}
