package com.projeto_integrador_facul.projeto.integrador.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.projeto_integrador_facul.projeto.integrador.model.jogEntity;
import com.projeto_integrador_facul.projeto.integrador.model.jogoRepository;

@Service
public class jogoService {
    
    @Autowired
    
    jogoRepository jogoRepository;
    
    public List<jogEntity> listarTodosJogos(){
        
        
        return jogoRepository.findall();
        
    }
    
    public jogEntity listarJogoId(Integer jogoId){
        
        return jogoRepository.findById(jogoId).orElse(null);
        
    }
    
    //public List<jogoEntity> listarJogoNomeCategoria(String jogoNome, String jogoCategoria){
        
       // return jogoRepository.findByNomeOrCategoria(jogoNome, jogoCategoria);
        
    //}
    
    public jogEntity criarJogo(jogEntity jogo){
        
        jogo.setAppID(null);
        
        jogoRepository.save(jogo);
        
        return jogo;
        
    }
    
}
