package com.projeto_integrador_facul.projeto.integrador.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.projeto_integrador_facul.projeto.integrador.model.jogEntity;
import com.projeto_integrador_facul.projeto.integrador.service.jogoService;

@RestController
@CrossOrigin
@RequestMapping("/jogo")


public class jogoController {
    
    @Autowired
    
    jogoService jogoService;
    
    @GetMapping("/listar")
    
    public ResponseEntity<List> getAllJogos(){
        
        List<jogEntity> jogos = jogoService.listarTodosJogos();
        System.out.println("-------------------------------");
        System.out.println(jogos.get(0).getLongDesc());
        System.out.println("-------------------------------");
        
        return new ResponseEntity<>(jogos, HttpStatus.OK);
        
    }
    
    @GetMapping("/pesquisar/{id}")
    
    public ResponseEntity<jogEntity> getJogoById(@PathVariable Integer id){
        
        jogEntity jogo = jogoService.listarJogoId(id);
        
        return new ResponseEntity<>(jogo, HttpStatus.OK);
        
    }
    
    //@GetMapping("pesquisar/{nome}/{categoria}")
    
    //public ResponseEntity<List> getNomeCategoria(@PathVariable String nome, @PathVariable String categoria){
        
        //List<jogoEntity> jogos = jogoService.listarJogoNomeCategoria(nome, categoria);
        
        //return new ResponseEntity<>(jogos,HttpStatus.OK);
        
    //}
    
    @PostMapping("/adicionar")
    
    public ResponseEntity<jogEntity> addJogo(@RequestBody jogEntity jogo){
        
        var nogoJogo = jogoService.criarJogo(jogo);
        
        return new ResponseEntity<>(nogoJogo, HttpStatus.CREATED);
        
    }
    
}

