package com.peeppeep.domain.user.friend.repository;

import com.peeppeep.domain.user.friend.entity.Friend;
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

    @Query("""
      SELECT CASE WHEN COUNT(f) > 0 THEN true ELSE false END
      FROM Friend f
      WHERE (
        (f.senderId   = :u1 AND f.receiverId = :u2)
        OR
        (f.senderId   = :u2 AND f.receiverId = :u1)
      )
      AND f.status     = 'ACCEPTED'
      AND f.deletedAt  IS NULL
    """)
    boolean existsFriendship(@Param("u1") Integer userId1, @Param("u2") Integer userId2);
}
