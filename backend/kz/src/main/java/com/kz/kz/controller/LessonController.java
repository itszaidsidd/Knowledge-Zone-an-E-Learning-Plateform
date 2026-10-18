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

import com.kz.kz.entity.Lesson;
import com.kz.kz.service.LessonService;

@RestController
@RequestMapping("/lesson")
@CrossOrigin(origins = "*")
public class LessonController {

    @Autowired
    private LessonService lessonService;

    @Value("${file.upload-dir}")
    private String uploadDir;

    @GetMapping
    public List<Lesson> getAllLessons() {
        return lessonService.getAllLessons();
    }

    @PostMapping
    public ResponseEntity<Lesson> addLesson(@RequestBody Lesson lesson) {
        Lesson savedLesson = lessonService.addLesson(lesson);
        if (savedLesson != null) {
            return ResponseEntity.ok(savedLesson);
        }
        return ResponseEntity.internalServerError().build();
    }

    @PostMapping("/{id}/upload-video")
    public ResponseEntity<String> uploadVideo(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
        try {
            File directory = new File(uploadDir);
            if (!directory.exists()) {
                directory.mkdirs();
            }

            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            File destinationFile = new File(directory.getAbsolutePath() + File.separator + fileName);
            file.transferTo(destinationFile);

            Lesson lesson = lessonService.getLessonById(id);
            if (lesson != null) {
                lesson.setVideoUrl("/uploads/" + fileName);
                lessonService.addLesson(lesson);
                return ResponseEntity.ok("Video uploaded successfully");
            }

            return ResponseEntity.status(404).body("Lesson not found with id: " + id);

        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/course/{courseId}")
    public ResponseEntity<List<Lesson>> getLessonsByCourseId(@PathVariable Long courseId) {
        List<Lesson> lessons = lessonService.getLessonsByCourseId(courseId);
        return ResponseEntity.ok(lessons);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Lesson> getLessonById(@PathVariable Long id) {
        Lesson lesson = lessonService.getLessonById(id);
        if (lesson != null) {
            return ResponseEntity.ok(lesson);
        }
        return ResponseEntity.status(404).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Lesson> updateLesson(@PathVariable Long id, @RequestBody Lesson lesson) {
        Lesson updatedLesson = lessonService.updateLesson(id, lesson);
        if (updatedLesson != null) {
            return ResponseEntity.ok(updatedLesson);
        }
        return ResponseEntity.status(404).build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteLesson(@PathVariable Long id) {
        Boolean isDeleted = lessonService.deleteLesson(id);
        if (isDeleted) {
            return ResponseEntity.ok(true);
        }
        return ResponseEntity.status(404).body(false);
    }
}