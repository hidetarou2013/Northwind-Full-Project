package com.northwind.app.controller;

import com.northwind.app.domain.Customer;
import com.northwind.app.repository.CustomerRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {

    private final CustomerRepository repository;

    public CustomerController(CustomerRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Customer> getAllCustomers() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Customer> getCustomerById(@PathVariable String id) {
        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Customer createCustomer(@RequestBody Customer customer) {
        return repository.save(customer);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Customer> updateCustomer(@PathVariable String id, @RequestBody Customer customerDetails) {
        return repository.findById(id)
                .map(customer -> {
                    customer.setCompanyName(customerDetails.getCompanyName());
                    customer.setContactName(customerDetails.getContactName());
                    customer.setContactTitle(customerDetails.getContactTitle());
                    customer.setCity(customerDetails.getCity());
                    customer.setCountry(customerDetails.getCountry());
                    return ResponseEntity.ok(repository.save(customer));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Customer> patchCustomer(@PathVariable String id, @RequestBody Customer customerDetails) {
        return repository.findById(id)
                .map(customer -> {
                    // Only update fields that are not null in the request
                    if (customerDetails.getCompanyName() != null) {
                        customer.setCompanyName(customerDetails.getCompanyName());
                    }
                    if (customerDetails.getContactName() != null) {
                        customer.setContactName(customerDetails.getContactName());
                    }
                    if (customerDetails.getContactTitle() != null) {
                        customer.setContactTitle(customerDetails.getContactTitle());
                    }
                    if (customerDetails.getCity() != null) {
                        customer.setCity(customerDetails.getCity());
                    }
                    if (customerDetails.getCountry() != null) {
                        customer.setCountry(customerDetails.getCountry());
                    }
                    return ResponseEntity.ok(repository.save(customer));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCustomer(@PathVariable String id) {
        return repository.findById(id)
                .map(customer -> {
                    repository.delete(customer);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
