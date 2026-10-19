package com.kz.kz.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.kz.kz.entity.Feedback;
import com.kz.kz.entity.Student;
import com.kz.kz.repository.FeedbackRepository;
import com.kz.kz.repository.StudentRepository;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/feedback")
@CrossOrigin(origins = "*")
public class FeedbackController {

    @Autowired
    private FeedbackRepository feedbackRepository;

    @Autowired
    private StudentRepository studentRepository;

    @PostMapping("/add/{studentId}")
    public ResponseEntity<String> addFeedback(@PathVariable Long studentId, @RequestBody FeedbackRequest request) {
        Optional<Student> optionalStudent = studentRepository.findById(studentId);
        
        if(optionalStudent.isPresent()) {
            Feedback feedback = new Feedback();
            feedback.setMessage(request.getMessage());
            feedback.setStudent(optionalStudent.get());

            feedbackRepository.save(feedback);
            return ResponseEntity.ok("Feedback submitted successfully!");
        }
        return ResponseEntity.status(404).body("Student not found");
    }

    @GetMapping("/all")
    public List<Feedback> getAllFeedbacks() {
        return feedbackRepository.findAll();
    }

    // Delete Feedback API
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteFeedback(@PathVariable Long id) {
        if(feedbackRepository.existsById(id)) {
            feedbackRepository.deleteById(id);
            return ResponseEntity.ok("Feedback deleted successfully");
        }
        return ResponseEntity.status(404).body("Feedback not found");
    }
}

class FeedbackRequest {
    private String message;

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}