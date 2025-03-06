package com.peeppeep.domain.pet.collection.entity;

import jakarta.persistence.*;
import lombok.Getter;

@Getter
@Entity
public class PetType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JoinColumn(name = "pet_type_id")
    private Integer petTypeId;

    @Column(name = "name")
    private String name;
}