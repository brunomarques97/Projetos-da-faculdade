
import java.util.ArrayList;
import java.util.List;

public class Turma {
    private String etapaEnsino;
    private String ano;
    private int limiteVagas;
    private int numeroMatriculados = 0;
    private ListaAluno listaDeAlunosDaTurma = new ListaAluno();
    
    
    //verificar retorno do erro caso não possua vagas na turma
    public void cadastrarAluno(Aluno novoAluno){
        
        if(numeroMatriculados < limiteVagas){
        listaDeAlunosDaTurma.incluirNoFim(novoAluno);
        numeroMatriculados++;
        
        }
        
    }
    
    
    public ListaAluno getListaAluno(){
        
        return listaDeAlunosDaTurma;
        
    }
   

    public Turma(String etapaEnsino, String ano, int limiteVagas, int numeroMatriculados) {
        this.etapaEnsino = etapaEnsino;
        this.ano = ano;
        this.limiteVagas = limiteVagas;
        this.numeroMatriculados = numeroMatriculados;
    }
    
    public Turma(){
        
    }

    public String getEtapaEnsino() {
        return etapaEnsino;
    }

    public void setEtapaEnsino(String etapaEnsino) {
        this.etapaEnsino = etapaEnsino;
    }

    public String getAno() {
        return ano;
    }

    public void setAno(String ano) {
        this.ano = ano;
    }

    public int getLimiteVagas() {
        return limiteVagas;
    }

    public void setLimiteVagas(int limiteVagas) {
        this.limiteVagas = limiteVagas;
    }

    public int getNumeroMatriculados() {
        return numeroMatriculados;
    }

    public void setNumeroMatriculados(int numeroMatriculados) {
        this.numeroMatriculados = numeroMatriculados;
    }
    
}
