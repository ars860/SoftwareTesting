package com.example.server.web;

import com.example.server.service.CountersService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@CrossOrigin
@AllArgsConstructor
public class CountersController {
    private final CountersService countersService;

    @GetMapping("/counter")
    @ResponseBody
    public String getCounter() {
        return Long.toString(countersService.updateAndGetDefaultCounter());
    }
}
