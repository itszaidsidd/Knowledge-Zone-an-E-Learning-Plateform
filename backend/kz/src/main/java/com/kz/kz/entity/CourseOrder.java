package com.kz.kz.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Table(name = "course_orders")
@Getter
@Setter
@NoArgsConstructor
public class CourseOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "order_id", unique = true, nullable = false)
    private String orderId;

    @Column(name = "student_email")
    private String studentEmail;

    @Column(name = "amount")
    private Double amount;

    @Column(name = "course_id")
    private Long courseId;

    @Column(name = "order_date")
    private LocalDateTime orderDate = LocalDateTime.now();
}