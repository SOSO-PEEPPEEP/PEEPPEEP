package com.peeppeep.domain.user.main.repository;

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

    @Query("UPDATE User u SET u.userPw = :userPw WHERE u.userId = :userId")
    int setNewPassword(@Param("userId") String userId, @Param("userPw") String userPw);
}
