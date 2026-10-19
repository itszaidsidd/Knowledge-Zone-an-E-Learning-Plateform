package com.kz.kz.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.kz.kz.entity.Student;
import com.kz.kz.repository.StudentRepository;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/student")
@CrossOrigin(origins = "*")
public class StudentController {

    @Autowired
    private StudentRepository studentRepository;

    @Value("${file.upload-dir}")
    private String uploadDir;

    // 1. Student Signup
    @PostMapping("/signup")
    public ResponseEntity<String> registerStudent(@RequestBody Student student) {
        if(studentRepository.findByUsername(student.getUsername()) != null) {
            return ResponseEntity.badRequest().body("Username already exists!");
        }
        studentRepository.save(student);
        return ResponseEntity.ok("Signup Successful");
    }

    // 2. Student Login
    @PostMapping("/login")
    public ResponseEntity<Student> loginStudent(@RequestBody Student loginData) {
        Student student = studentRepository.findByUsername(loginData.getUsername());
        if(student != null && student.getPassword().equals(loginData.getPassword())) {
            return ResponseEntity.ok(student);
        }
        return ResponseEntity.status(401).build();
    }

    // 3. Get Student Details by ID (Profile page ke liye)
    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable Long id) {
        Optional<Student> student = studentRepository.findById(id);
        return student.map(ResponseEntity::ok)
                      .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // 4. Update Student Profile Details (Name, Designation etc.)
    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateStudentProfile(@PathVariable Long id, @RequestBody Student updatedData) {
        Optional<Student> optionalStudent = studentRepository.findById(id);
        
        if(optionalStudent.isPresent()) {
            Student student = optionalStudent.get();
            student.setName(updatedData.getName());
            student.setDesignation(updatedData.getDesignation());
            
            studentRepository.save(student);
            return ResponseEntity.ok("Profile updated successfully");
        }
        return ResponseEntity.notFound().build();
    }

    // 5. Separate API for Profile Picture Upload (Jaise course/lesson me kiya tha)
    @PostMapping("/upload-pic/{id}")
    public ResponseEntity<String> uploadProfilePic(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
        Optional<Student> optionalStudent = studentRepository.findById(id);
        
        if(optionalStudent.isPresent()) {
            Student student = optionalStudent.get();
            try {
                File dir = new File(uploadDir);
                if (!dir.exists()) {
                    dir.mkdirs();
                }

                String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
                Path filePath = Paths.get(uploadDir, fileName);
                Files.write(filePath, file.getBytes());

                student.setProfilePicUrl("/uploads/" + fileName);
                studentRepository.save(student);
                
                return ResponseEntity.ok("Profile picture uploaded successfully");
            } catch (IOException e) {
                e.printStackTrace();
                return ResponseEntity.status(500).body("Failed to upload profile picture");
            }
        }
        return ResponseEntity.notFound().build();
    }

    // 6. Change Password
    @PutMapping("/change-password/{id}")
    public ResponseEntity<String> changePassword(@PathVariable Long id, @RequestBody PasswordChangeRequest request) {
        Optional<Student> optionalStudent = studentRepository.findById(id);
        
        if(optionalStudent.isPresent()) {
            Student student = optionalStudent.get();
            
            if(student.getPassword().equals(request.getOldPassword())) {
                student.setPassword(request.getNewPassword());
                studentRepository.save(student);
                return ResponseEntity.ok("Password changed successfully");
            } else {
                return ResponseEntity.status(400).body("Incorrect old password");
            }
        }
        return ResponseEntity.notFound().build();
    }

    // 7. Delete Student (Admin panel se delete karne ke liye)
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteStudent(@PathVariable Long id) {
        if(studentRepository.existsById(id)) {
            studentRepository.deleteById(id);
            return ResponseEntity.ok("Student deleted successfully");
        }
        return ResponseEntity.notFound().build();
    }

    // 8. Get All Students (Admin panel list ke liye)
    @GetMapping("/all")
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }
}

// Helper class for Password Change request payload
class PasswordChangeRequest {
    private String oldPassword;
    private String newPassword;

    public String getOldPassword() { return oldPassword; }
    public void setOldPassword(String oldPassword) { this.oldPassword = oldPassword; }
    public String getNewPassword() { return newPassword; }
    public void setNewPassword(String newPassword) { this.newPassword = newPassword; }
}