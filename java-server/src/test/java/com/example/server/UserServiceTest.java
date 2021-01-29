package com.example.server;

import com.example.server.domain.User;
import com.example.server.domain.UserRepository;
import com.example.server.service.UserService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Map;

import static java.util.Map.entry;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {
    @Mock
    private UserRepository userRepository;

    private UserService userService;

    @BeforeEach
    void beforeEach() {
        userService = new UserService(userRepository);
    }

    @Test
    public void AddUserTest() {
        String email = "dsadsad";
        String password = "12345";

        userService.addUser(email, password);

        verify(userRepository, times(1)).save(eq(new User(email, password)));
    }

    @Test
    public void checkPasswordTest() {
        List<String> badPasswords = List.of("without_sobaka", "without_onetwothree", "dsadsadsad", "12three@");
        List<String> goodPasswords = List.of("with_@_and_123", "dsad8sa6d9sa6123@sadsadsa", "123@");

        badPasswords.forEach(badPassword -> Assertions.assertFalse(userService.checkPassword(badPassword)));
        goodPasswords.forEach(goodPassword -> Assertions.assertTrue(userService.checkPassword(goodPassword)));
    }

    @Test
    public void checkUserTest() {
        Map<String, User> users = Map.ofEntries(entry("1", new User("1", "123")), entry("2", new User("2", "password")));
        when(userRepository.findByEmail(anyString())).thenAnswer(email -> users.get(email.getArgument(0, String.class)));


        Assertions.assertTrue(userService.checkUser("1", "123"));
        Assertions.assertTrue(userService.checkUser("2", "password"));

        Assertions.assertFalse(userService.checkUser("1", "wrong password"));
        Assertions.assertFalse(userService.checkUser("wrong email", ""));

        verify(userRepository, times(4)).findByEmail(anyString());
    }
}
