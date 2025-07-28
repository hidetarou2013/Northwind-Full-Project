package com.northwind.app.controller;

import com.northwind.app.domain.Product;
import com.northwind.app.repository.ProductRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductRepository repository;

    public ProductController(ProductRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Product> getAllProducts() {
        return repository.findAll();
    }
    
    @PostMapping
    public Product createProduct(@RequestBody Product product) {
        return repository.save(product);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product productDetails) {
        return repository.findById(id)
                .map(product -> {
                    product.setName(productDetails.getName());
                    product.setSupplier(productDetails.getSupplier());
                    product.setCategory(productDetails.getCategory());
                    product.setUnitPrice(productDetails.getUnitPrice());
                    product.setUnitsInStock(productDetails.getUnitsInStock());
                    return ResponseEntity.ok(repository.save(product));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Product> patchProduct(@PathVariable Long id, @RequestBody Product productDetails) {
        return repository.findById(id)
                .map(product -> {
                    // Only update fields that are not null in the request
                    if (productDetails.getName() != null) {
                        product.setName(productDetails.getName());
                    }
                    if (productDetails.getSupplier() != null) {
                        product.setSupplier(productDetails.getSupplier());
                    }
                    if (productDetails.getCategory() != null) {
                        product.setCategory(productDetails.getCategory());
                    }
                    if (productDetails.getUnitPrice() != null) {
                        product.setUnitPrice(productDetails.getUnitPrice());
                    }
                    if (productDetails.getUnitsInStock() != null) {
                        product.setUnitsInStock(productDetails.getUnitsInStock());
                    }
                    return ResponseEntity.ok(repository.save(product));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        return repository.findById(id)
                .map(product -> {
                    repository.delete(product);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
