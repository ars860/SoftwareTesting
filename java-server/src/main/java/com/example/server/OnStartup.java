package com.example.server;

import com.example.server.service.CountersService;
import lombok.AllArgsConstructor;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class OnStartup implements ApplicationListener<ApplicationReadyEvent> {
    private final CountersService countersService;

    @Override
    public void onApplicationEvent(ApplicationReadyEvent e) {
        countersService.makeSureDefaultCounter();
    }
}
