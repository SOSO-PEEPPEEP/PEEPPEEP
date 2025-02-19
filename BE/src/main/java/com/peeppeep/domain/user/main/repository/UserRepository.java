package com.peeppeep.domain.user.main.repository;

import com.peeppeep.domain.user.main.entity.User;
import jdk.jfr.Registered;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

@Registered
public interface UserRepository extends JpaRepository<User, String> {

    @Query("SELECT u FROM User u WHERE u.userId = :userId")
    Optional<User> findUserByUserId(@Param("userId") String userId);
}
