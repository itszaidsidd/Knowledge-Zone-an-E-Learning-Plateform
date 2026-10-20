package com.kz.kz.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.kz.kz.entity.Course;
import com.kz.kz.entity.CourseOrder;
import com.kz.kz.repository.CourseOrderRepository;
import com.kz.kz.repository.CourseRepository; // Course repository import karein

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/order")
@CrossOrigin(origins = "*")
public class CourseOrderController {

    @Autowired
    private CourseOrderRepository orderRepository;

    @Autowired
    private CourseRepository courseRepository; // Course repository inject karein

    @GetMapping("/generate-order-id")
    public ResponseEntity<String> generateOrderId() {
        String uniqueOrderId = "ORDS" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        return ResponseEntity.ok(uniqueOrderId);
    }

    @PostMapping("/save")
    public ResponseEntity<String> saveOrder(@RequestBody CourseOrder order) {
        if (order.getCourse() != null && order.getCourse().getId() != null) {
            Course course = courseRepository.findById(order.getCourse().getId()).orElse(null);
            if (course != null) {
                order.setCourse(course);
            }
        }
        
        orderRepository.save(order);
        return ResponseEntity.ok("Order placed and saved successfully!");
    }

    @GetMapping("/student-orders/{email}")
    public ResponseEntity<List<CourseOrder>> getOrdersByStudentEmail(@PathVariable("email") String email) {
        List<CourseOrder> orders = orderRepository.findByStudentEmail(email);
        return ResponseEntity.ok(orders);
    }

    @GetMapping
    public List<CourseOrder> getAllCourseOrders(){
        return orderRepository.findAll();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteOrder(@PathVariable Long id) {
        if(orderRepository.existsById(id)) {
            orderRepository.deleteById(id);
            return ResponseEntity.ok("Order deleted successfully");
        }
        return ResponseEntity.status(404).body("Order not found");
    }
}