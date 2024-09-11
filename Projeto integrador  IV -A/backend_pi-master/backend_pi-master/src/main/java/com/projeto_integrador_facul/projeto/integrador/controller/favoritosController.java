package com.projeto_integrador_facul.projeto.integrador.controller;

import com.projeto_integrador_facul.projeto.integrador.model.favoritosEntity;
import com.projeto_integrador_facul.projeto.integrador.service.favoritosService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping("/favoritos")

public class favoritosController {
    
    @Autowired
    
    favoritosService favoritosService;
    
    @GetMapping("/listar")
    
    public ResponseEntity<List> getAllFavoritos(){
        
        List<favoritosEntity> favoritos = favoritosService.listarTodosFavoritos();
        
        return new ResponseEntity<>(favoritos, HttpStatus.OK);
        
    }
    
    @PostMapping("/adicionar")
    
    public ResponseEntity<favoritosEntity> addFavorito(@RequestBody favoritosEntity favorito){
        
        var novoFavorito = favoritosService.criarFavorito(favorito);
        
        return new ResponseEntity<>(novoFavorito, HttpStatus.CREATED);
        
    }
    
}
