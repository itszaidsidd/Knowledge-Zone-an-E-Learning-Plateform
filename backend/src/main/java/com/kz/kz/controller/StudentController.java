package com.kz.kz.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.kz.kz.entity.Student;
import com.kz.kz.repository.StudentRepository;
import com.kz.kz.service.CloudinaryService;

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

    @Autowired
    private CloudinaryService cloudinaryService;

    // @Value("${file.upload-dir}")
    // private String uploadDir;

    @PostMapping("/signup")
    public ResponseEntity<String> registerStudent(@RequestBody Student student) {
        if(studentRepository.findByUsername(student.getUsername()) != null) {
            return ResponseEntity.badRequest().body("Username already exists!");
        }
        studentRepository.save(student);
        return ResponseEntity.ok("Signup Successful");
    }

    @PostMapping("/login")
    public ResponseEntity<Student> loginStudent(@RequestBody Student loginData) {
        Student student = studentRepository.findByUsername(loginData.getUsername());
        if(student != null && student.getPassword().equals(loginData.getPassword())) {
            return ResponseEntity.ok(student);
        }
        return ResponseEntity.status(401).build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable Long id) {
        Optional<Student> student = studentRepository.findById(id);
        return student.map(ResponseEntity::ok)
                      .orElseGet(() -> ResponseEntity.notFound().build());
    }

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

    @PostMapping("/upload-pic/{id}")
    public ResponseEntity<String> uploadProfilePic(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
        Optional<Student> optionalStudent = studentRepository.findById(id);
        
        if(optionalStudent.isPresent()) {
            Student student = optionalStudent.get();
            try {
                // Cloudinary par image upload karke live HTTPS URL lein
                String profilePicUrl = cloudinaryService.uploadImage(file);

                if (profilePicUrl != null) {
                    student.setProfilePicUrl(profilePicUrl);
                    studentRepository.save(student);
                    return ResponseEntity.ok("Profile picture uploaded successfully to Cloudinary!");
                } else {
                    return ResponseEntity.status(400).body("File is empty or invalid");
                }

            } catch (Exception e) {
                e.printStackTrace();
                return ResponseEntity.status(500).body("Failed to upload profile picture: " + e.getMessage());
            }
        }
        return ResponseEntity.notFound().build();
    }
    
    // @PostMapping("/upload-pic/{id}")
    // public ResponseEntity<String> uploadProfilePic(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
    //     Optional<Student> optionalStudent = studentRepository.findById(id);
        
    //     if(optionalStudent.isPresent()) {
    //         Student student = optionalStudent.get();
    //         try {
    //             File dir = new File(uploadDir);
    //             if (!dir.exists()) {
    //                 dir.mkdirs();
    //             }

    //             String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
    //             Path filePath = Paths.get(uploadDir, fileName);
    //             Files.write(filePath, file.getBytes());

    //             student.setProfilePicUrl("/uploads/" + fileName);
    //             studentRepository.save(student);
                
    //             return ResponseEntity.ok("Profile picture uploaded successfully");
    //         } catch (IOException e) {
    //             e.printStackTrace();
    //             return ResponseEntity.status(500).body("Failed to upload profile picture");
    //         }
    //     }
    //     return ResponseEntity.notFound().build();
    // }

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

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteStudent(@PathVariable Long id) {
        if(studentRepository.existsById(id)) {
            studentRepository.deleteById(id);
            return ResponseEntity.ok("Student deleted successfully");
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/all")
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }
}

class PasswordChangeRequest {
    private String oldPassword;
    private String newPassword;

    public String getOldPassword() { return oldPassword; }
    public void setOldPassword(String oldPassword) { this.oldPassword = oldPassword; }
    public String getNewPassword() { return newPassword; }
    public void setNewPassword(String newPassword) { this.newPassword = newPassword; }
}