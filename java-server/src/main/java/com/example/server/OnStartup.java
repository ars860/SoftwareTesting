package com.example.server;

import com.example.server.service.CounterService;
import lombok.AllArgsConstructor;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class OnStartup implements ApplicationListener<ApplicationReadyEvent> {
    private final CounterService counterService;

    @Override
    public void onApplicationEvent(ApplicationReadyEvent e) {
        counterService.makeSureDefaultCounter();
    }
}
