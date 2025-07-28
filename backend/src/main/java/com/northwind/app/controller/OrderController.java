package com.northwind.app.controller;

import com.northwind.app.domain.Order;
import com.northwind.app.repository.OrderRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderRepository repository;

    public OrderController(OrderRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Order> getAllOrders() {
        return repository.findAll();
    }

    @PostMapping
    public Order createOrder(@RequestBody Order order) {
        return repository.save(order);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Order> updateOrder(@PathVariable Long id, @RequestBody Order orderDetails) {
        return repository.findById(id)
                .map(order -> {
                    order.setCustomerId(orderDetails.getCustomerId());
                    order.setOrderDate(orderDetails.getOrderDate());
                    order.setRequiredDate(orderDetails.getRequiredDate());
                    order.setShippedDate(orderDetails.getShippedDate());
                    order.setShipVia(orderDetails.getShipVia());
                    order.setFreight(orderDetails.getFreight());
                    order.setShipCity(orderDetails.getShipCity());
                    order.setShipCountry(orderDetails.getShipCountry());
                    return ResponseEntity.ok(repository.save(order));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Order> patchOrder(@PathVariable Long id, @RequestBody Order orderDetails) {
        return repository.findById(id)
                .map(order -> {
                    // Only update fields that are not null in the request
                    if (orderDetails.getCustomerId() != null) {
                        order.setCustomerId(orderDetails.getCustomerId());
                    }
                    if (orderDetails.getOrderDate() != null) {
                        order.setOrderDate(orderDetails.getOrderDate());
                    }
                    if (orderDetails.getRequiredDate() != null) {
                        order.setRequiredDate(orderDetails.getRequiredDate());
                    }
                    if (orderDetails.getShippedDate() != null) {
                        order.setShippedDate(orderDetails.getShippedDate());
                    }
                    if (orderDetails.getShipVia() != null) {
                        order.setShipVia(orderDetails.getShipVia());
                    }
                    if (orderDetails.getFreight() != null) {
                        order.setFreight(orderDetails.getFreight());
                    }
                    if (orderDetails.getShipCity() != null) {
                        order.setShipCity(orderDetails.getShipCity());
                    }
                    if (orderDetails.getShipCountry() != null) {
                        order.setShipCountry(orderDetails.getShipCountry());
                    }
                    return ResponseEntity.ok(repository.save(order));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long id) {
        return repository.findById(id)
                .map(order -> {
                    repository.delete(order);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
