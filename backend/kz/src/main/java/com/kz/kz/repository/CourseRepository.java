package com.kz.kz.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import com.kz.kz.entity.Course;

@Component 
public interface CourseRepository extends JpaRepository<Course,Long>{

}
