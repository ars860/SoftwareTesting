package com.example.server.integration;

import com.codeborne.selenide.Browsers;
import com.codeborne.selenide.Configuration;
import org.junit.Ignore;
import org.junit.jupiter.api.BeforeEach;
import org.junit.Test;

import static com.codeborne.selenide.Condition.disappear;
import static com.codeborne.selenide.Condition.exist;
import static com.codeborne.selenide.Selenide.*;

public class LoginTest {
    @BeforeEach
    void init() {
        Configuration.browser = Browsers.CHROME;
    }

    @Test
    @Ignore("Too hard to implement in ci")
    public void userCanLoginByUsername() {
        open("http://localhost:3001/login");
        $("#emailInput").setValue("12345@12345");
        $("#passwordInput").setValue("123@");
        $(".button").click();

        $("#counterLink").should(exist);
        $("#blogLink").should(exist);
        $("#email").should(exist);
        $("#logoutLink").should(exist);

        refresh();

        $("#counterLink").should(exist);
        $("#blogLink").should(exist);
        $("#email").should(exist);
        $("#logoutLink").should(exist);

        $("#logoutLink").click();

        $("#counterLink").should(disappear);
        $("#blogLink").should(disappear);
        $("#email").should(disappear);
        $("#logoutLink").should(disappear);

        $("#loginLink").should(exist);
        $("#registerLink").should(exist);
    }
}
