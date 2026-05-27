package orders.management.backend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import orders.management.backend.model.Order;
import orders.management.backend.service.OrderService;

@RestController
@RequestMapping("/api/orders")

public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService){
        this.orderService = orderService;
    }

    @PostMapping
    public Order createOrder(@RequestBody Order order) {
        return orderService.createOrder(order);
    }

    @GetMapping
    public List<Order> getAllOrders() {
        return orderService.getAllOrders();
    }

    @GetMapping("/{orderId}")
    public Optional<Order> getOrderById(@PathVariable String orderId) {
        return orderService.getSingleOrder(orderId);
    }

    @PutMapping("/{orderId}")
    public Order updateOrder(@PathVariable String orderId, @RequestBody Order updatedOrder) {
        return orderService.updateOrder(updatedOrder, orderId);
    }

    @DeleteMapping("/{orderId}")
    public void deleteOrder(@PathVariable String orderId) {
        orderService.deleteOrder(orderId);
    }

}