package com.example.server.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name="Counters")
@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
public class Counter {
    @Id
    private Long id;

    private Long value;
}
