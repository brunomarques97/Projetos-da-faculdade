
import java.text.ParseException;

public class Turma {
    private String etapaEnsino;
    private String ano;
    private int limiteVagas;
    private int numeroMatriculados = 0;
    private ListaAluno listaDeAlunosDaTurma = new ListaAluno();
    
    
    //verificar retorno do erro caso não possua vagas na turma
    public void cadastrarAluno(Aluno novoAluno) throws ParseException{
        
        if(numeroMatriculados < limiteVagas){
            listaDeAlunosDaTurma.incluirNoFim(novoAluno);
            numeroMatriculados++;
        
            System.out.println("\nInformações do Aluno:");
            System.out.println("Nome: " + novoAluno.getNome());
            System.out.println("CPF: " + novoAluno.getCPF());
            System.out.println("Endereço: " + novoAluno.getEndereço());
            System.out.println("Idade: " + novoAluno.calcularIdadeDoAluno() + " anos");    
        
        }else{
        
        System.out.println("Turma cheia! tente novamente");
        
        }
        
    }
    
    
    public ListaAluno getListaAluno(){
        
        return listaDeAlunosDaTurma;
        
    }
   

    public Turma(String etapaEnsino, String ano, int limiteVagas) {
        this.etapaEnsino = etapaEnsino;
        this.ano = ano;
        this.limiteVagas = limiteVagas;
    }
    
    public Turma(){
        
    }

    public String getEtapaEnsino() {
        return etapaEnsino;
    }

    public void setEtapaEnsino(int opcao) {
        if(opcao == 1){
            
            this.etapaEnsino = "infantil";
            
        }else if(opcao == 2){
            
            this.etapaEnsino = "fundamental anos iniciais";
            
        }else if(opcao == 3){
            
            this.etapaEnsino = "fundamental anos finais";
            
        }else if(opcao == 4){
            
            this.etapaEnsino = "médio";
            
        }else{
            
            System.out.println("Opção invalida");
            
        }
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
