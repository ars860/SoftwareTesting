package com.example.server.web;

import com.example.server.domain.User;
import com.example.server.service.UserService;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@CrossOrigin
@AllArgsConstructor
public class UserController {
    private final UserService userService;

    @Data
    @AllArgsConstructor
    private static class LoginResponse {
        Boolean authenticated;
    }

    @PostMapping("/login")
    @ResponseBody
    public LoginResponse loginUser(@RequestBody User user) {
        if (userService.checkUser(user.getEmail(), user.getPassword())) {
            return new LoginResponse(true);
        }

        return new LoginResponse(false);
    }

    @Data
    @AllArgsConstructor
    private static class RegisterResponse {
        Boolean success;
        String msg;

        public RegisterResponse(Boolean success) {
            this.success = success;
        }
    }

    @PostMapping("/register")
    @ResponseBody
    public RegisterResponse registerUser(@RequestBody User user) {
        if (userService.userExists(user.getEmail())) {
            return new RegisterResponse(false, "User with that email already exists!");
        }

        if (!userService.checkPassword(user.getPassword())) {
            return new RegisterResponse(false, "Password must contain at least one \"@\" and one \"123\"!");
        }

        userService.addUser(user.getEmail(), user.getPassword());
        return new RegisterResponse(true);
    }
}
