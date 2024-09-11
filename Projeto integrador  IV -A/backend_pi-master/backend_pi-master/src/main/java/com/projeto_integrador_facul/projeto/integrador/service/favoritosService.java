package com.projeto_integrador_facul.projeto.integrador.service;

import com.projeto_integrador_facul.projeto.integrador.model.favoritosEntity;
import com.projeto_integrador_facul.projeto.integrador.model.favoritosRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class favoritosService {
    
    @Autowired
    
    favoritosRepository favoritosRepository;
    
    public List<favoritosEntity> listarTodosFavoritos(){
        
        return favoritosRepository.findAll();
        
    }
    
    public favoritosEntity criarFavorito (favoritosEntity favorito){
        
        favorito.setAppID(null);
        
        favoritosRepository.save(favorito);
        
        return favorito;
        
    }
    
}
