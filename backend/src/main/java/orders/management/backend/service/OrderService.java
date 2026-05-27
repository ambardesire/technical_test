package orders.management.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import orders.management.backend.model.Order;
import orders.management.backend.model.Product;
import orders.management.backend.repository.OrderRepository;
import orders.management.backend.repository.UserRepository;

@Service

public class OrderService {
    
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;

    public OrderService(OrderRepository orderRepository, UserRepository userRepository){
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
    }

    public Order createOrder(Order order){

        //Verify if user exists
        if(!userRepository.existsById(order.getUserId())) {
             throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "User " + order.getUserId() + " doesn't exist."
            );
        }

        //Verify if has products
        if(order.getProducts().isEmpty()){
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST, "You need to include at least one product in your order."
            );
        }

        double totalAmount = 0;
        int totalProducts = 0;

        //Get total amount and total products
        for(Product product : order.getProducts()) {
            totalAmount += (product.getQuantity() * product.getPrice());
            totalProducts += product.getQuantity();
        }

        //Set product quantity and total amount
        order.setQuantity(totalProducts);
        order.setTotal(totalAmount);

        return orderRepository.save(order);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Optional<Order> getSingleOrder(String orderId){
        return orderRepository.findById(orderId);
    }

    public Order updateOrder(Order updatedOrder, String orderId) {
        //Verify if the order exists
        if (!orderRepository.existsById(orderId)) {
            throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Order" + orderId + " doesn't exist."
            );
        }
       
        //Verify if has products
        if(updatedOrder.getProducts().isEmpty()){
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST, "You need to include at least one product in your order."
            );
        }

        double totalAmount = 0;
        int totalProducts = 0;

        //Get total amount and total products
        for (Product product : updatedOrder.getProducts()) {
            totalAmount += (product.getQuantity() * product.getPrice());
            totalProducts += product.getQuantity();
        }

        updatedOrder.setId(orderId);
        updatedOrder.setQuantity(totalProducts);
        updatedOrder.setTotal(totalAmount);

        return orderRepository.save(updatedOrder);


    }   

    public void deleteOrder(String orderId){
        //Verify if the order exists
        if (!orderRepository.existsById(orderId)) {
            throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Order" + orderId + " doesn't exist."
            );
        }

        orderRepository.deleteById(orderId);
    }
    
}