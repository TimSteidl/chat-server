package de.volkswagen.chat.user;

import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User loginUser(String name, String password) {
        return userRepository.findByNameEqualsAndPasswordEquals(name, password);
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public Set<User> getAll() {
        return Set.copyOf(userRepository.findAll());
    }
}