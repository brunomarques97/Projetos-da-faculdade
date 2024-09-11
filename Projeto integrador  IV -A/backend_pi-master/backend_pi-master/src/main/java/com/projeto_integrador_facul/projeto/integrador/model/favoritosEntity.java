package com.projeto_integrador_facul.projeto.integrador.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data

@Entity

@Table(name="favoritos")
public class favoritosEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    
    private Integer AppID;
    private String name;
    private String releaseDate;
    private int required_age;
    private String longDesc; 
    private String shortDesc;
    private String languages;
    private String fullAudioLanguages;
    private String headerImage;
    private String supportWindows;
    private String supportMac;
    private String supportLinux;
    private String developers;
    private String publishers;
    private String categories;
    private String genres;
    private String screenshots;
    private String movies;
    private String tags;
}
