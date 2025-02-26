package com.peeppeep.domain.user.main.repository;

import com.peeppeep.domain.user.main.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByUserIdAndDeletedAtIsNull(Integer userId);

    @Query("SELECT u FROM User u WHERE u.userId IN :user_ids AND u.deletedAt IS NULL")
    List<User> findAllByIdAndDeletedAtIsNull(@Param("user_ids") List<Integer> userIds);
}
