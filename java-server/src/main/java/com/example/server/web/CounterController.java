package com.example.server.web;

import com.example.server.service.CounterService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@CrossOrigin
@AllArgsConstructor
public class CounterController {
    private final CounterService counterService;

    @GetMapping("/counter")
    @ResponseBody
    public String getCounter() {
        return Long.toString(counterService.updateAndGetDefaultCounter());
    }
}
