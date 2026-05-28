package orders.management.backend.seeder;

import orders.management.backend.model.*;
import orders.management.backend.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.util.List;

@Component
public class InitialData implements CommandLineRunner {

    private final UserRepository userRepository;
    private final OrderRepository orderRepository;

    public InitialData(UserRepository userRepository, OrderRepository orderRepository) {
        this.userRepository = userRepository;
        this.orderRepository = orderRepository;
    }

    @Override
    public void run(String... args) {
        if (userRepository.count() > 0) {
            System.out.println("The database is already populated.");
            return;
        }

        List<User> savedUsers = userRepository.saveAll(List.of(
            createUser("Phoebe", "Buffay", "Buffay", "phoebe.buffay@hotmail.com"),
            createUser("Joey", "Tribbiani", "Vafananapoli", "joey.tribbiani@yahoo.com"),
            createUser("Chanandler", "Muriel", "Bing", "chandler.bing@gmail.com"),
            createUser("Rachel", "Geller", "Green", "rachel.green@hotmail.com"),
            createUser("Ross", "Geller", "Green", "ross.geller@yahoo.com"),
            createUser("Monica", "Bing", "Geller", "monica.gellerg@gmail.com")
        ));

        User user1 = savedUsers.get(0);
        User user2 = savedUsers.get(1);
        User user3 = savedUsers.get(2);
        User user4 = savedUsers.get(3);
        User user5 = savedUsers.get(4);
        User user6 = savedUsers.get(5);

        Product itemA = new Product();
        itemA.setId("HY78YJI");
        itemA.setName("Sofa Naranja");
        itemA.setPrice(19990);
        itemA.setQuantity(1);

        Product itemB = new Product();
        itemB.setId("AP9YHJ0");
        itemB.setName("Peluche Hugsy");
        itemB.setPrice(455);
        itemB.setQuantity(2);

        Product itemC = new Product();
        itemC.setId("GH98YKH6");
        itemC.setName("Marco amarillo");
        itemC.setPrice(250);
        itemC.setQuantity(3);

        Product itemD = new Product();
        itemD.setId("76TUJV");
        itemD.setName("Guitarra acustica");
        itemD.setPrice(1650);
        itemD.setQuantity(4);

        orderRepository.saveAll(List.of(
            createOrder(user1.getId(), "Central Perk 234, NY", "PENDING", 20240.0, List.of(itemA, itemC), 4),
            createOrder(user2.getId(), "Purple apartment 20, NY", "DELIVERED", 19990.0, List.of(itemA), 1),
            createOrder(user3.getId(), "90 Bedford Street, New York, NY 10014", "DELIVERED", 2105.0, List.of(itemD, itemB), 6),
            createOrder(user4.getId(), "Central Perk 234, NY", "CANCELLED", 20695.0, List.of(itemA, itemB, itemC), 6),
            createOrder(user5.getId(), "Central Perk 234, NY", "TRANSIT", 20445.0, List.of(itemA, itemB), 3),
            createOrder(user6.getId(), "90 Bedford Street, New York, NY 10014", "DELIVERED", 705.0, List.of(itemC, itemB), 5),
            createOrder(user2.getId(), "90 Bedford Street, New York, NY 10014", "DELIVERED", 22095.0, List.of(itemD, itemB, itemA), 7)
        ));

        System.out.println("DataSeeder: Base de datos poblada exitosamente.");
    }

    private User createUser(String name, String pat, String mat, String email) {
        User u = new User();
        u.setName(name);
        u.setFirstLastName(pat);
        u.setSecondLastName(mat);
        u.setId(email);
        return u;
    }

    private Order createOrder(String userId, String dir, String status, double total, List<Product> items, int quantity) {
        Order o = new Order();
        o.setUserId(userId);
        o.setAddress(dir);
        o.setStatus(status);
        o.setTotal(total);
        o.setProducts(items);
        o.setQuantity(quantity);
        return o;
    }
}