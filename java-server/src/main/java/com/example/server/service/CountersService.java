package com.example.server.service;

import com.example.server.domain.Counter;
import com.example.server.domain.CountersRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;

@Service
@AllArgsConstructor
public class CountersService {
    private final CountersRepository countersRepository;
    private static final long DEFAULT_COUNTER_ID = 0;

    public void makeSureDefaultCounter() {
        if (countersRepository.findById(DEFAULT_COUNTER_ID).isPresent()) {
            return;
        }

        countersRepository.save(new Counter(DEFAULT_COUNTER_ID, -1L));
    }

    public long updateAndGetCounter(long id) {
        countersRepository.updateCounter(id, 1);
        return countersRepository.findById(id).map(Counter::getValue).orElse(-1L);
    }

    public long updateAndGetDefaultCounter() {
        return updateAndGetCounter(DEFAULT_COUNTER_ID);
    }

    public long getCounter(long id) {
        return countersRepository.findById(id).map(Counter::getValue).orElse(-1L);
    }
}
