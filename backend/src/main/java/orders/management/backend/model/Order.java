package orders.management.backend.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "orders")
public class Order {
    @Id
    private String id;

    private List<Product> products;
    private int quantity;
    private double total;
    private String status;
    private String address;
    private String userId;
}


