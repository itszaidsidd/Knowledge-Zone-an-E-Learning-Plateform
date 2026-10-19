package com.kz.kz.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity 
@Table(name="lessons")
@Getter 
@Setter 
@NoArgsConstructor 
public class Lesson {

    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String title;
    
    private String description;
    
    private String videoUrl; 

    @Column(nullable = false)
    private Long courseId; 
}