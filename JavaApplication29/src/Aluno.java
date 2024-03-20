public class Aluno {
    private String nome;
    private String CPF;
    private String endereço;
    private String dataNascimento;

    public Aluno(String nome, String CPF, String endereço, String dataNascimento) {
        this.nome = nome;
        this.CPF = CPF;
        this.endereço = endereço;
        this.dataNascimento = dataNascimento;
    }

    public Aluno() {
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCPF() {
        return CPF;
    }

    public void setCPF(String CPF) {
        this.CPF = CPF;
    }

    public String getEndereço() {
        return endereço;
    }

    public void setEndereço(String endereço) {
        this.endereço = endereço;
    }

    public String getDataNascimento() {
        return dataNascimento;
    }

    public void setDataNascimento(String dataNascimento) {
        this.dataNascimento = dataNascimento;
    }
    
}
