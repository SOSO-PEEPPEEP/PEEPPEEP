package com.peeppeep.domain.pet.collection.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PetCollection {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pet_collection_id")
    private Integer petCollectionId;

    @Column(name = "name")
    private String name;

    @Column(name = "pet_rank")
    private PetRankType petRank;

    @Column(name = "content")
    private String content;

    @ManyToOne
    @JoinColumn(name = "pet_type_id")
    private PetType petType;
}
