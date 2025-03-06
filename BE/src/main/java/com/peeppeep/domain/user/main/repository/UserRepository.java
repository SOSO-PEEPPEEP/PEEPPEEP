package com.peeppeep.domain.user.main.repository;

import com.peeppeep.domain.user.main.entity.User;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {

    /*ID중복검사*/
    @Query("SELECT u FROM User u WHERE u.loginId = :loginId AND u.deletedAt IS NULL")
    Optional<User> findUser(@Param("loginId") String loginId);

    /*login*/
    @Query("SELECT u FROM User u WHERE u.loginId = :loginId AND u.userPw = :userPw AND u.deletedAt IS NULL")
    Optional<User> login(@Param("loginId") String loginId, String userPw);

    /*ID찾기*/
    @Query("SELECT u.loginId FROM User u WHERE u.name = :name AND u.email = :email AND u.deletedAt IS NULL")
    Optional<String> findId(@Param("name") String name, @Param("email") String email);

    /*PASSWORD 찾기*/
    @Query("SELECT u.loginId FROM User u WHERE u.loginId = :loginId AND u.name = :name AND u.email = :email AND u.deletedAt IS NULL")
    Optional<String> findPw(@Param("loginId") String loginId, @Param("name") String name, @Param("email") String email);

    /*계정 존재 여부 확인*/
    @Query("SELECT u FROM User u WHERE u.userId = :userId AND u.deletedAt IS NULL")
    Optional<User> isIdPresent(@Param("userId") int userId);
}
