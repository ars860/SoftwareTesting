package com.example.server.domain;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CounterRepository extends JpaRepository<Counter, Long> {
    @Modifying
    @Query(value = "update Counter set value = value + :add where id = :id")
    int updateCounter(@Param("id") long id, @Param("add") long add);
}
