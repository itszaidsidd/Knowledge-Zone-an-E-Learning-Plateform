package com.kz.kz.controller;

import java.io.File;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.kz.kz.entity.Course;
import com.kz.kz.service.CloudinaryService;
import com.kz.kz.service.CourseService;

@RestController
@RequestMapping("/course")
@CrossOrigin(origins = "*")
public class CourseController {

    @Autowired
    private CourseService courseService;

    @Autowired
    private CloudinaryService cloudinaryService;

    // @Value("${file.upload-dir}")
    // private String uploadDir;

    @GetMapping
    public List<Course> getAll() {
        return courseService.getAll();
    }

   
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
            Course course = courseService.getCourseById(id);
            if (course == null) {
                return ResponseEntity.status(404).body("Course not found with id: " + id);
            }

            // Cloudinary service ka uploadImage method call karke live URL lein
            String imageUrl = cloudinaryService.uploadImage(file);

            if (imageUrl != null) {
                // Ab local path "/uploads/xyz.png" ki jagah direct Cloudinary ka link set hoga
                course.setImgUrl(imageUrl);
                courseService.addCourse(course);
                return ResponseEntity.ok("Image uploaded successfully to Cloudinary!");
            } else {
                return ResponseEntity.status(400).body("File is empty or invalid");
            }

        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }

    // @PostMapping("/{id}/upload-image")
    // public ResponseEntity<String> uploadImage(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
    //     try {
    //         File directory = new File(uploadDir);
    //         if (!directory.exists()) {
    //             directory.mkdirs();
    //         }

    //         String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
    //         File destinationFile = new File(directory.getAbsolutePath() + File.separator + fileName);
    //         file.transferTo(destinationFile);

    //         Course course = courseService.getCourseById(id);
    //         if (course != null) {
    //             course.setImgUrl("/uploads/" + fileName);
    //             courseService.addCourse(course);
    //             return ResponseEntity.ok("Image uploaded successfully");
    //         }

    //         return ResponseEntity.status(404).body("Course not found with id: " + id);

    //     } catch (Exception e) {
    //         return ResponseEntity.status(500).body("Error: " + e.getMessage());
    //     }
    // }

    @GetMapping("/{id}")
    public Course getCourseById(@PathVariable Long id) {
        return courseService.getCourseById(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Course> updateCourse(@PathVariable Long id,@RequestBody Course course) {
        Course savedCourse = courseService.updateCourse(id,course);
        if (savedCourse != null) {
            return ResponseEntity.ok(savedCourse);
        }
        return ResponseEntity.internalServerError().build();
    }

    @DeleteMapping("/{id}")
    public Boolean deleteCourse(@PathVariable Long id){
        return courseService.deleteCourse(id);
    }
}
