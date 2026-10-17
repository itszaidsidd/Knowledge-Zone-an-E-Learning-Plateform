package com.kz.kz.controller;

import java.io.File;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.kz.kz.entity.Course;
import com.kz.kz.service.CourseService;

@RestController
@RequestMapping("/course")
@CrossOrigin(origins = "*")
public class CourseController {

    @Autowired
    private CourseService courseService;

    @Value("${file.upload-dir}")
    private String uploadDir;

    @GetMapping
    public List<Course> getAll() {
        return courseService.getAll();
    }

    // @PostMapping
    // private Boolean saveEntry(@RequestBody Course myEntry){
    // return courseService.saveEntry(myEntry);
    // }
    @PostMapping
    public ResponseEntity<Course> addCourse(@RequestBody Course course) {
        Course savedCourse = courseService.addCourse(course);
        if (savedCourse != null) {
            return ResponseEntity.ok(savedCourse);
        }
        return ResponseEntity.internalServerError().build();
    }

    @PostMapping("/{id}/upload-image")
    public ResponseEntity<String> uploadImage(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
        try {
            // डायरेक्ट्री चेक करें और न होने पर बनाएं
            File directory = new File(uploadDir);
            if (!directory.exists()) {
                directory.mkdirs();
            }

            // फाइल का नाम यूनिक बनाने के लिए currentTimeMillis जोड़ रहे हैं
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            File destinationFile = new File(directory.getAbsolutePath() + File.separator + fileName);
            file.transferTo(destinationFile);

            // डेटाबेस से कोर्स ढूंढकर उसका imgUrl अपडेट करें
            Course course = courseService.getCourseById(id);
            if (course != null) {
                course.setImgUrl("/uploads/" + fileName);
                courseService.addCourse(course);
                return ResponseEntity.ok("Image uploaded successfully");
            }

            return ResponseEntity.status(404).body("Course not found with id: " + id);

        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public Course getCourseById(@PathVariable Long id) {
        return courseService.getCourseById(id);
    }

}
