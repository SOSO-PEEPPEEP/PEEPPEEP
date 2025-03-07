package com.peeppeep.domain.pet.main.entity;

import com.peeppeep.domain.challenge.main.entity.Category;
import com.peeppeep.domain.pet.collection.entity.ContentsType;
import com.peeppeep.domain.pet.collection.entity.PetType;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "item_id")
    private Integer itemId;

    @Column(name = "name")
    private String name;

    @Column(name = "contents")
    private ContentsType contents;

    @Column(name = "rate")
    private Integer rate;

    @ManyToOne
    @JoinColumn(name = "pet_type_id")
    private PetType petType;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
}
