package com.kz.kz.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.kz.kz.entity.CourseOrder;
import com.kz.kz.repository.CourseOrderRepository;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/order")
@CrossOrigin(origins = "*")
public class CourseOrderController {

    @Autowired
    private CourseOrderRepository orderRepository;

    // Generate New Order ID for Checkout
    @GetMapping("/generate-order-id")
    public ResponseEntity<String> generateOrderId() {
        String uniqueOrderId = "ORDS" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        return ResponseEntity.ok(uniqueOrderId);
    }

    // Save Completed Course Order
    @PostMapping("/save")
    public ResponseEntity<String> saveOrder(@RequestBody CourseOrder order) {
        orderRepository.save(order);
        return ResponseEntity.ok("Order placed and saved successfully!");
    }

    // @GetMapping("/student-orders/{email}")
    // public List<CourseOrder> getOrdersByStudentEmail(@PathVariable String email) {
    //     return (List<CourseOrder>) orderRepository.findByStudentEmail(email);
    // }

    @GetMapping("/student-orders/{email}")
    public ResponseEntity<List<CourseOrder>> getOrdersByStudentEmail(@PathVariable("email") String email) {
        List<CourseOrder> orders = (List<CourseOrder>) orderRepository.findByStudentEmail(email);
        return ResponseEntity.ok(orders);
    }
}