import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class Validacoes {
    private static final DateTimeFormatter dataFormato = DateTimeFormatter.ofPattern("dd/MM/yyyy");
    
        public static boolean validarCPF(String CPF) {
    
            if (CPF.length() != 11) {
                return false;
            }
            return true;
        }
        public static boolean validarDataDeNascimento(String Nascimento){
            
            try {
                LocalDate.parse(Nascimento, dataFormato);
                return true;
            } catch (Exception e) {
                return false;
            }
        }

        public static String nomeFormatado(String nome) {
            String[] words = nome.split("\\s");
            StringBuilder nomeFormatado = new StringBuilder();
        
            for (String word : words) {
                if (word.length() > 0) {
                    String firstLetter = word.substring(0, 1).toUpperCase();
                    String restOfWord = word.substring(1).toLowerCase();
                    nomeFormatado.append(firstLetter).append(restOfWord).append(" ");
                }
            }
        
            return nomeFormatado.toString().trim();
        }
}
