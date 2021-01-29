package com.example.server;

import com.example.server.domain.User;
import com.example.server.service.UserService;
import com.example.server.web.UserController;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class UserControllerTest {
    @Mock
    private UserService userService;

    private UserController userController;

    @BeforeEach
    void beforeEach() {
        userController = new UserController(userService);
    }

    @Test
    public void loginUserTest() {
        User userToLogin = new User("a@a", "123@");
        userController.loginUser(userToLogin);

        verify(userService, times(1)).checkUser(userToLogin.getEmail(), userToLogin.getPassword());
    }

    @Test
    public void registerUserTest() {
        User userToLogin = new User("a@a", "123@");

        when(userService.userExists(anyString())).thenReturn(false);
        when(userService.checkPassword(anyString())).thenReturn(true);

        userController.registerUser(userToLogin);

        verify(userService, times(1)).userExists(userToLogin.getEmail());
        verify(userService, times(1)).checkPassword(userToLogin.getPassword());
        verify(userService, times(1)).addUser(userToLogin.getEmail(), userToLogin.getPassword());
    }
}
