package orders.management.backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import orders.management.backend.model.User;

public interface  UserRepository extends MongoRepository<User, String> {
    boolean existsByEmail(String email);
}

