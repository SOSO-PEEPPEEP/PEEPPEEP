package com.peeppeep.domain.challenge.main.service;

import com.peeppeep.domain.challenge.main.entity.Challenge;
import com.peeppeep.domain.challenge.main.entity.ChallengeUser;
import com.peeppeep.domain.challenge.main.entity.RoleType;
import com.peeppeep.domain.challenge.main.repository.ChallengeUserRepository;
import com.peeppeep.domain.user.main.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ChallengeUserService {
    private final ChallengeUserRepository challengeUserRepository;

    // 챌린지장 설정
    public void setOrganizer(User organizer, Challenge challenge) {
        // 새로운 ORGANIZER 추가
        ChallengeUser challengeUser = ChallengeUser.of(organizer, challenge, RoleType.ORGANIZER);
        challengeUserRepository.save(challengeUser);
    }

    // 참여자 추가
    public void addParticipants(Challenge challenge, List<User> newParticipants) {
        List<User> existingParticipants = challengeUserRepository.findUsersByChallengeAndRoleAndDeletedAtIsNull(challenge, RoleType.PARTICIPANT);

        for (User participant : newParticipants) {
            if (!existingParticipants.contains(participant)) {
                ChallengeUser challengeUser = ChallengeUser.of(participant, challenge, RoleType.PARTICIPANT);
                challengeUserRepository.save(challengeUser);
            }
        }
    }

    // 기존 참가자 중 빠진 사람 제거
    public void removeMissingParticipants(Challenge challenge, List<User> newParticipants) {
        List<User> existingParticipants = challengeUserRepository.findUsersByChallengeAndRoleAndDeletedAtIsNull(challenge, RoleType.PARTICIPANT);

        for (User existingParticipant : existingParticipants) {
            if (!newParticipants.contains(existingParticipant)) {
                challengeUserRepository.softDeleteByChallengeAndUser(challenge, existingParticipant);
            }
        }
    }
}
