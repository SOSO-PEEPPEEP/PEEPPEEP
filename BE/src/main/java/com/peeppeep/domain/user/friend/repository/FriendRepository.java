package com.peeppeep.domain.user.friend.repository;

import com.peeppeep.domain.user.friend.entity.Friend;
import org.hibernate.annotations.SQLDelete;
import com.peeppeep.domain.user.main.entity.User;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FriendRepository extends JpaRepository<Friend, String> {

    @Query("SELECT u CASE FROM User u JOIN Friend uf ON (u.userId = uf.senderId OR u.userId = uf.receiverId) WHERE uf.status = :status")
    List<User> findUserFriendInfo(@Param("userId") int userId, @Param("status") String status);

    @Query("SELECT uf FROM Friend uf WHERE uf.receiverId = :userId AND uf.status = :status")
    Optional<Friend> requestFriendship(@Param("userId") int userId, @Param("status") String status);
}
