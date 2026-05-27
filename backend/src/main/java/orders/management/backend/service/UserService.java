package orders.management.backend.service;

import java.util.List;
import java.util.Optional;

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
        if(userRepository.existsById(user.getId())) {
             throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST, "The email is already registered with another user."
            );
        }

        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getSingleUser(String userId){
        return userRepository.findById(userId);
    }

    public User updateUser(User updatedUser, String userId) {
        //Verify if the user exists
        if (!userRepository.existsById(userId)) {
            throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "User" + userId + " doesn't exist."
            );
        }

        updatedUser.setId(userId);

        return userRepository.save(updatedUser);

    }   

    public void deleteUser(String userId){
        //Verify if the user exists
        if (!userRepository.existsById(userId)) {
            throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "User" + userId + " doesn't exist."
            );
        }

        userRepository.deleteById(userId);
    }

}