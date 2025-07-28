package com.northwind.app.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
public class Customer {
    @Id
    private String id;
    private String companyName;
    private String contactName;
    private String contactTitle;
    private String city;
    private String country;
}