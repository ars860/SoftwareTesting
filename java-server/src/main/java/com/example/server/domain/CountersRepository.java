package com.example.server.domain;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;

public interface CountersRepository extends JpaRepository<Counter, Long> {
    @Modifying
    @Transactional
    @Query(value = "update Counter set value = value + :add where id = :id")
    int updateCounter(@Param("id") long id, @Param("add") long add);
}
