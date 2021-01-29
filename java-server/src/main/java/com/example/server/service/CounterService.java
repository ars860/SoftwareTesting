package com.example.server.service;

import com.example.server.domain.Counter;
import com.example.server.domain.CounterRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@AllArgsConstructor
public class CounterService {
    private final CounterRepository counterRepository;
    private static final long DEFAULT_COUNTER_ID = 0;

    public void makeSureDefaultCounter() {
        if (counterRepository.findById(DEFAULT_COUNTER_ID).isPresent()) {
            return;
        }

        counterRepository.save(new Counter(DEFAULT_COUNTER_ID, -1L));
    }

    @Transactional
    public long updateAndGetCounter(long id) {
        counterRepository.updateCounter(id, 1);
        return counterRepository.findById(id).map(Counter::getValue).orElse(-1L);
    }

    @Transactional
    public long updateAndGetDefaultCounter() {
        return updateAndGetCounter(DEFAULT_COUNTER_ID);
    }

    public long getCounter(long id) {
        return counterRepository.findById(id).map(Counter::getValue).orElse(-1L);
    }
}
