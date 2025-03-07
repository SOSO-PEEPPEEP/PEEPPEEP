package com.peeppeep.domain.pet.main.entity;

import com.peeppeep.domain.pet.collection.entity.PetCollection;
import com.peeppeep.domain.pet.main.dto.request.PetRequestDTO;
import com.peeppeep.domain.user.main.entity.User;
import com.peeppeep.global.entity.BaseBy;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.SQLDelete;

@Setter
@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SQLDelete(sql = "UPDATE pet SET deleted_at = NOW() where pet_id = ?")
public class Pet extends BaseBy {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pet_id")
    private Integer petId;

    @Column(name = "nickname")
    private String nickname;

    @Column(name = "growth")
    private GrowthType growth;

    @Column(name = "affection")
    private Integer affection;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "pet_collection_id")
    private PetCollection petCollection;

    @Builder
    private Pet(User user, PetCollection petCollection) {
        this.nickname = petCollection.getName();
        this.growth = GrowthType.EGG;
        this.affection = 0;
        this.user = user;
        this.petCollection = petCollection;
    }

    public static Pet of(User user, PetCollection petCollection) {
        return builder()
                .user(user)
                .petCollection(petCollection)
                .build();
    }

    public void updatePet(PetRequestDTO petRequestDTO) {
        if (petRequestDTO.getNickname() != null) this.nickname = petRequestDTO.getNickname();
    }
}