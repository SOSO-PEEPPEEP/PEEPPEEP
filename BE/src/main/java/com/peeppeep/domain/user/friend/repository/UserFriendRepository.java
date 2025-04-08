package com.peeppeep.domain.user.friend.repository;

import com.peeppeep.domain.user.friend.entity.Friend;
import org.hibernate.annotations.SQLDelete;
import com.peeppeep.domain.user.main.entity.User;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface UserFriendRepository extends JpaRepository<User, String> {

    @Query("SELECT u FROM User u JOIN Friend uf ON (u.userId = uf.senderId OR u.userId = uf.receiverId) WHERE (:userId IN (uf.senderId, uf.receiverId)) AND uf.status = :status")
    Optional<User> findUserFriend(@Param("userId") String userId, @Param("status") String status);

    //비효율적인 코드 => 추후 수정 필요 u.userId = uf.senderId service에서 IF문으로 해결
    @Query("SELECT uf FROM Friend uf WHERE (uf.senderId = :userId OR uf.receiverId = :userId) AND uf.status = :status")
    Optional<Friend> requestFriendship(@Param("userId") String userId, @Param("status") String status);

//    void saveUserFriend(Friend userFriend);

    @Modifying
    @Transactional
    @Query("UPDATE Friend f SET f.deletedAt = CURRENT_TIMESTAMP WHERE (f.senderId = :userId OR f.receiverId = :userId) AND f.status = :status")
    Optional<Friend> deactivateFriendship(@Param("userId") String userId, @Param("status") String status);
}
