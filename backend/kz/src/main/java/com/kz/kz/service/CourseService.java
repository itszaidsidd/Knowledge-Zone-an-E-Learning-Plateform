package com.kz.kz.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.kz.kz.entity.Course;
import com.kz.kz.repository.CourseRepository;

@Component 
public class CourseService {

    @Autowired 
    private CourseRepository courseRepository;

    // public Boolean saveEntry(Course course){
    //     try {
    //         courseRepository.save(course);
    //         return true;
    //     } catch (Exception e) {
    //         return false;
    //     }
    // }

    public List<Course> getAll(){
        return courseRepository.findAll();
    }

    public Course addCourse(Course course){
        return courseRepository.save(course);
    }

    public Course getCourseById(Long id){
        return courseRepository.findById(id).orElse(null);
    }

    
}
