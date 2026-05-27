package orders.management.backend.service;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import orders.management.backend.model.User;
import orders.management.backend.repository.UserRepository;

@Service

public class UserService {
    
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    public User createUser(User user){

        //Verify if email exists with another user
        if(userRepository.existsByEmail(user.getEmail())) {
             throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST, "The email is already registered with another user."
            );
        }

        return userRepository.save(user);
    }

}