package com.peeppeep.domain.pet.collection.entity;

import jakarta.persistence.*;

@Entity
public class PetType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pet_type_id")
    private Integer petTypeId;

    @Column(name = "name")
    private String name;
}
