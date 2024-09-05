package com.projeto_integrador_facul.projeto.integrador.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data

@Entity

@Table(name="game")
public class jogEntity {
    

    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer AppID;
    
    private String name;
    private String releaseDate;
    private String estimatedOwners;
    private String peakCCU;
    private int required_age;
    private int price;
    
    @Column(name = "dlcCount", columnDefinition = "TEXT")
    private int dlcCount;
    
    @Column(name = "longDesc", columnDefinition = "INTEGER")
    private String longDesc;
    
    private String shortDesc;
    private String languages;
    private String fullAudioLanguages;
    private String reviews;
    private String headerImage;
    private String website;
    private String supportWeb;
    private String supportEmail;
    private String supportWindows;
    private String supportMac;
    private String supportLinux;
    private int metacriticScore;
    private String metacriticURL;
    private int userScore;
    private int positive;
    private int negative;
    private int scoreRank;
    private int achievements;
    private String recommens;
    private String notes;
    private int average_playtime;
    private int averageplaytime2W;
    private int medianPlaytime;
    private int medianPlaytime2W;
    private String packages;
    private String developers;
    private String publishers;
    private String categories;
    private String genres;
    private String screenshots;
    private String movies;
    private String tags;
    
}

