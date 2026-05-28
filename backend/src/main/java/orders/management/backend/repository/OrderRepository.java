package orders.management.backend.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import orders.management.backend.model.Order;

public interface  OrderRepository extends MongoRepository<Order, String> {
    List<Order> findByStatus(String statuString);
    List<Order> findByAddress(String adress);
    List<Order> findByUserId(String userId);
    List<Order> findByUserIdContainingIgnoreCase(String userId);
    List<Order> findByIdContainingIgnoreCase(String id);
    List<Order> findByStatusContainingIgnoreCase(String status);

}

