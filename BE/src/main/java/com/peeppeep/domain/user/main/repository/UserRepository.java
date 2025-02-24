package com.peeppeep.domain.user.main.repository;

import com.peeppeep.domain.user.friend.entity.UserFriend;
import com.peeppeep.domain.user.main.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {

    @Query("SELECT u FROM User u WHERE u.userId = :userId")
    Optional<User> findUserId(@Param("userId") String userId);

    @Query("SELECT u FROM User u WHERE u.nickname = :nickname")
    Optional<User> findUserNickname(@Param("nickname") String nickname);

    @Query("SELECT u.userId FROM User u WHERE u.name = :name and u.email = :email")
    Optional<String> findId(@Param("name") String name, @Param("email") String email);

    @Query("SELECT u.userId FROM User u WHERE u.userId = :userId and u.name = :name and u.email = :email")
    Optional<String> findPw(@Param("userId") String userId, @Param("name") String name, @Param("email") String email);

    void saveUser(User user);

    //uf.status = 'ACCEPTED'"
    @Query("SELECT u FROM User u JOIN UserFriend uf ON (u.userId = uf.senderId OR u.userId = uf.receiverId) WHERE (:userId IN (uf.senderId, uf.receiverId)) AND uf.status = :status")
    Optional<User> findUserFriend(@Param("userId") String userId, @Param("status") String status);

    @Query("SELECT uf FROM UserFriend uf WHERE uf.senderId = :userId AND uf.status = :status")
    Optional<UserFriend> requestFriendship(@Param("userId") String userId, @Param("status") String status);

    void saveUserFriend(UserFriend userFriend);
}
