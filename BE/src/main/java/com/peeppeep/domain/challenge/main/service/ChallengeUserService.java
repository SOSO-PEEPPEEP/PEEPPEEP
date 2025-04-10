package com.peeppeep.domain.challenge.main.service;

import com.peeppeep.domain.challenge.main.entity.*;
import com.peeppeep.domain.challenge.main.repository.CalendarRepository;
import com.peeppeep.domain.challenge.main.repository.ChallengeUserRepository;
import com.peeppeep.domain.challenge.main.repository.DailyRepository;
import com.peeppeep.domain.user.main.entity.User;
import com.peeppeep.global.response.error.ErrorCode;
import com.peeppeep.global.response.error.exception.BusinessException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ChallengeUserService {
    private final ChallengeUserRepository challengeUserRepository;
    private final CalendarRepository calendarRepository;
    private final DailyRepository dailyRepository;

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
                // ChallengeUser 정보
                ChallengeUser challengeUser = challengeUserRepository.findByChallengeAndUserAndDeletedAtIsNull(challenge, existingParticipant)
                        .orElseThrow(() -> new BusinessException(ErrorCode.CHALLENGE_NOT_EXIST, ErrorCode.CHALLENGE_NOT_EXIST.getMessage()));

                // Calendar 소프트 삭제
                Calendar calendar = challengeUser.getCalendar();
                if (calendar != null) {
                    calendarRepository.softDelete(calendar.getCalendarId());
                }

                // Daily 소프트 삭제
                List<Daily> dailies = dailyRepository.findByChallengeUserAndDeletedAtIsNull(challengeUser);
                dailyRepository.softDeleteAll(dailies);

                // ChallengeUser 소프트 삭제
                challengeUserRepository.softDelete(challengeUser.getChallengeUserId());
            }
        }
    }
}
