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
}