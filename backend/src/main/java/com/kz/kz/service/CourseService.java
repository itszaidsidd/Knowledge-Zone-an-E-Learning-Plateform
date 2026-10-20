package com.kz.kz.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import com.kz.kz.entity.Course;
import com.kz.kz.repository.CourseRepository;

@Service 
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

  

    public List<Course> getAll() {
        return courseRepository.findAll();
    }

    public Course addCourse(Course course) {
        return courseRepository.save(course);
    }

    public Course getCourseById(Long id) {
        return courseRepository.findById(id).orElse(null);
    }



    public Course updateCourse(Long id, Course newCourse) {
        Optional<Course> optionalCourse = courseRepository.findById(id);
        if (optionalCourse.isPresent()) {
            Course existingCourse = optionalCourse.get();
            
            existingCourse.setTitle(newCourse.getTitle());
            existingCourse.setDescription(newCourse.getDescription());
            existingCourse.setAuthor(newCourse.getAuthor());
            existingCourse.setDuration(newCourse.getDuration());
            existingCourse.setOriginalPrice(newCourse.getOriginalPrice());
            existingCourse.setSellingPrice(newCourse.getSellingPrice());
            
            return courseRepository.save(existingCourse);
        }
        return null;
    }

    public Boolean deleteCourse(Long id) {
        try {
            courseRepository.deleteById(id);
            return true; 
        } catch (EmptyResultDataAccessException e) {
            return false; 
        }
    }

}
