package com.example.server;

import com.example.server.domain.User;
import com.example.server.domain.UserRepository;
import com.example.server.service.UserService;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.junit.ClassRule;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.util.TestPropertyValues;
import org.springframework.context.ApplicationContextInitializer;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.containsInAnyOrder;

@Testcontainers
@SpringBootTest
@ContextConfiguration(initializers = {DBIntegrationTest.Initializer.class})
public class DBIntegrationTest {
    private final static int POSTGRES_PORT = 5432;

    @ClassRule
    @Container
    public static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres")
            .withDatabaseName("testing")
            .withUsername("postgres")
            .withPassword("1");

    static class Initializer implements ApplicationContextInitializer<ConfigurableApplicationContext> {
        public void initialize(ConfigurableApplicationContext configurableApplicationContext) {
            TestPropertyValues.of(
                    "spring.datasource.url=" + postgres.getJdbcUrl(),
                    "spring.data.postgres.port=" + postgres.getMappedPort(POSTGRES_PORT),
                    "spring.data.postgres.username=" + postgres.getUsername(),
                    "spring.data.postgres.password=" + postgres.getPassword()
            ).applyTo(configurableApplicationContext.getEnvironment());
        }
    }

    @Autowired
    private UserService userService;

    @Test
    public void getAllUsersTest() {
        List<User> users = List.of(new User("1", "2"), new User("3", "4"), new User("4", "5"));

        for (User user : users) {
            userService.addUser(user.getEmail(), user.getPassword());
        }

        List<User> dbUsers = userService.getUserRepository().findAll();
        assertThat(users, containsInAnyOrder(dbUsers.stream().peek(user -> user.setId(null)).toArray()));
    }
}
