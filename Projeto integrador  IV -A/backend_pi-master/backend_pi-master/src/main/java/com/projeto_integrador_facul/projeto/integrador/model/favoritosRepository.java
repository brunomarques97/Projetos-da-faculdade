package com.projeto_integrador_facul.projeto.integrador.model;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface favoritosRepository extends JpaRepository<favoritosEntity, Integer>{
    
}
