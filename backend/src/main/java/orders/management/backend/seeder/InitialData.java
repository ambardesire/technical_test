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

        Product itemA = createProduct("Sofa Naranja", 1, 19990.00);
        Product itemB = createProduct("Peluche Hugsy", 2, 455.0);
        Product itemC = createProduct("Marco amarillo", 3, 250.0);
        Product itemD = createProduct("Guitarra acústica", 2, 1650.0);

        orderRepository.saveAll(List.of(
            createOrder(user1.getId(), "Central Perk 234, NY", "CREADO", 250.0, List.of(itemA, itemC)),
            createOrder(user2.getId(), "Purple apartment 20, NY", "ENVIADO", 100.0, List.of(itemA)),
            createOrder(user3.getId(), "90 Bedford Street, New York, NY 10014", "ENTREGADO", 500.0, List.of(itemD, itemB)),
            createOrder(user4.getId(), "Central Perk 234, NY", "CANCELADO", 20.0, List.of(itemA, itemB, itemC)),
            createOrder(user5.getId(), "Central Perk 234, NY", "CREADO", 350.0, List.of(itemA, itemB)),
            createOrder(user6.getId(), "90 Bedford Street, New York, NY 10014", "ENTREGADO", 500.0, List.of(itemC, itemB)),
            createOrder(user2.getId(), "90 Bedford Street, New York, NY 10014", "ENTREGADO", 500.0, List.of(itemD, itemB, itemA))
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

    private Order createOrder(String userId, String dir, String status, double total, List<Product> items) {
        Order o = new Order();
        o.setUserId(userId);
        o.setAddress(dir);
        o.setStatus(status);
        o.setTotal(total);
        o.setProducts(items);
        return o;
    }
}