package com.example.stuuse.dao.entity;

import com.example.stuuse.dao.enums.TypeOfFreeHour;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;


@Entity
@Table(name = "free_hours")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FreeHour {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "hour_id")
    private Long hourId;

    @Column(name = "type_of_free_hour")
    private TypeOfFreeHour typeOfFreeHour;

    @Column(name = "date")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date date;

    @Column(name = "duration")
    private String duration;

    @Column(name = "faculty")
    private String faculty;

}

