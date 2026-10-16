package com.kz.kz.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kz.kz.entity.Course;
import com.kz.kz.service.CourseService;

@RestController 
@RequestMapping("/course")
@CrossOrigin(origins = "*")
// @CrossOrigin(origins = "http://localhost:5173")
public class CourseController {

    @Autowired 
    private CourseService courseService;

    @PostMapping 
    private Boolean saveEntry(@RequestBody Course myEntry){
        return courseService.saveEntry(myEntry);
    }

}
