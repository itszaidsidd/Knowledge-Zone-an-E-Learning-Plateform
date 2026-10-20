
package com.kz.kz.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.kz.kz.entity.CourseOrder;
import java.util.List; // Yeh import hona zaroori hai

@Repository
public interface CourseOrderRepository extends JpaRepository<CourseOrder, Long> {

    List<CourseOrder> findByStudentEmail(String studentEmail);
}