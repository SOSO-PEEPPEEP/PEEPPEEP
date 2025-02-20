package com.peeppeep.domain.user.main.service;

import com.peeppeep.domain.user.main.entity.User;
import com.peeppeep.domain.user.main.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import java.util.Map;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Optional<User> findUserId(String userId, String userPw) {
        return userRepository.findUserId(userId)
                .filter(user -> passwordEncoder.matches(userPw, user.getUserPw()));
    }

    public Optional<User> signUp(Map<String, Object> userInfo) {
        return null;
    }
}
