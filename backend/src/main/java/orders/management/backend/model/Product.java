package orders.management.backend.model;

import org.springframework.data.annotation.Id;

import lombok.Data;

@Data
public class Product {
    @Id
    private String id;

    private String name;
    private double price;
    private int quantity;
   
}


