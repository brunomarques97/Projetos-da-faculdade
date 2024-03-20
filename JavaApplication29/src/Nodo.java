public class Nodo {
    private String conteudo;
    private String proximo;
    
    public void Nodo(String dado, String proximoNodo){
        this.conteudo = dado;
        this.proximo = proximoNodo;
    }
    
    public void Nodo(){
        this.conteudo = "0";
        this.proximo = null;
    }
    
    public void exibirConsoleNodo(){
        System.out.println(conteudo + "->" + proximo);
    }
}
