
import java.util.ArrayList;
import java.util.List;

public class Turma {
    private String etapaEnsino;
    private String ano;
    private int limiteVagas;
    private int numeroMatriculados;
    private List<Aluno> alunosCadastrados = new ArrayList<>();
    
    public void cadastrarAluno(Aluno novoAluno){
        alunosCadastrados.add(novoAluno);
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
