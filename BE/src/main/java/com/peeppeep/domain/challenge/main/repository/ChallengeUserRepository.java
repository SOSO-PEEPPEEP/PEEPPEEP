package com.peeppeep.domain.challenge.main.repository;

import com.peeppeep.domain.challenge.main.entity.Challenge;
import com.peeppeep.domain.challenge.main.entity.ChallengeUser;
import com.peeppeep.domain.challenge.main.entity.RoleType;
import com.peeppeep.domain.user.main.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChallengeUserRepository extends JpaRepository<ChallengeUser, Integer> {

    @Query("SELECT cu.challenge FROM ChallengeUser cu WHERE cu.user = :user AND cu.deletedAt IS NULL")
    List<Challenge> findChallengesByUserAndDeletedAtIsNull(@Param("user") User user);

    Boolean existsByChallengeAndUserAndDeletedAtIsNull(Challenge challenge, User user);

    @Query("SELECT cu.role FROM ChallengeUser cu WHERE cu.user = :user AND cu.challenge = :challenge AND cu.deletedAt IS NULL")
    Optional<RoleType> findRoleByUserAndChallengeAndDeletedAtIsNull(@Param("user") User user, @Param("challenge") Challenge challenge);

    @Query("SELECT cu.user FROM ChallengeUser cu WHERE cu.challenge = :challenge AND cu.role = :role AND cu.deletedAt IS NULL")
    List<User> findUsersByChallengeAndRoleAndDeletedAtIsNull(@Param("challenge")Challenge challenge, @Param("role") RoleType role);

    @Modifying
    @Query("UPDATE ChallengeUser cu SET cu.deletedAt = CURRENT_TIMESTAMP WHERE cu.challenge = :challenge AND cu.user = :user")
    void softDeleteByChallengeAndUser(@Param("challenge") Challenge challenge, @Param("user") User user);
}
