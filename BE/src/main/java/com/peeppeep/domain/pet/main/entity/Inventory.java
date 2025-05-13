package com.peeppeep.domain.pet.main.entity;

import com.peeppeep.domain.user.main.entity.User;
import com.peeppeep.global.entity.BaseBy;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.SQLDelete;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SQLDelete(sql = "UPDATE inventory SET deleted_at = NOW() where inventory_id = ?")
public class Inventory extends BaseBy {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "inventory_id")
    private Integer inventoryId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "item_id")
    private Item item;

    @Column(name = "count")
    private Integer count;

    @Builder
    private Inventory(User user, Item item, Integer count) {
        this.user = user;
        this.item = item;
        this.count = count;
    }

    public static Inventory of(User user, Item item, Integer count) {
        return builder()
                .user(user)
                .item(item)
                .count(count)
                .build();
    }

    public void updateCountMinus(int count) {
        this.count -= count;
    }

    public void updateCountPlus(int count) {
        this.count += count;
    }
}
