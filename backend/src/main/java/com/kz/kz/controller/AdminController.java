package com.kz.kz.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.kz.kz.entity.Admin;
import com.kz.kz.repository.AdminRepository;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    private AdminRepository adminRepository;

    @PostMapping("/login")
    public ResponseEntity<String> loginAdmin(@RequestBody Admin loginData) {
        if ("admin@gmail.com".equals(loginData.getUsername()) && "admin123".equals(loginData.getPassword())) {
            return ResponseEntity.ok("Login Successful");
        }

        // Database check
        Admin admin = adminRepository.findByUsername(loginData.getUsername());
        if (admin != null && admin.getPassword().equals(loginData.getPassword())) {
            return ResponseEntity.ok("Login Successful");
        }

        return ResponseEntity.status(401).body("Invalid Username or Password");
    }

    // Change Password API for Admin using Username instead of ID
    @PutMapping("/change-password/{username}")
    public ResponseEntity<String> changePassword(@PathVariable String username, @RequestBody AdminPasswordChangeRequest request) {
        Admin admin = adminRepository.findByUsername(username);
        
        if (admin != null) {
            if (admin.getPassword().equals(request.getOldPassword())) {
                admin.setPassword(request.getNewPassword());
                adminRepository.save(admin);
                return ResponseEntity.ok("Password changed successfully");
            } else {
                return ResponseEntity.status(400).body("Incorrect old password");
            }
        }
        return ResponseEntity.status(404).body("Admin not found");
    }
}

// Helper class for Admin Password Change request payload
class AdminPasswordChangeRequest {
    private String oldPassword;
    private String newPassword;

    public String getOldPassword() { return oldPassword; }
    public void setOldPassword(String oldPassword) { this.oldPassword = oldPassword; }
    public String getNewPassword() { return newPassword; }
    public void setNewPassword(String newPassword) { this.newPassword = newPassword; }
}