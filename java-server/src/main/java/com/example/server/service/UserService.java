package com.example.server.service;

import com.example.server.domain.User;
import com.example.server.domain.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public void addUser(String email, String password) {
        userRepository.save(new User(email, password));
    }

    public boolean checkUser(String email, String password) {
        User user = userRepository.findByEmail(email);

        return !(user == null || !user.getPassword().equals(password));
    }

    public boolean userExists(String email) {
        return userRepository.existsByEmail(email);
    }

    public boolean checkPassword(String password) {
        return password.contains("@") && password.contains("123");
    }
}
