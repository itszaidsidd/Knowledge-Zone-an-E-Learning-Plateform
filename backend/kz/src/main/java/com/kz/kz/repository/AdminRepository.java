package com.kz.kz.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.kz.kz.entity.Admin;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {
    Admin findByUsername(String username);
}