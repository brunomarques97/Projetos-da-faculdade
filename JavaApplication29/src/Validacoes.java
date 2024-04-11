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
}
