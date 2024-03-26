package de.volkswagen.chat.user;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:5173/")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{name}/{password}")
    public ResponseEntity<User> loginUser(@PathVariable String name, @PathVariable String password) {
        if (checkIfUserExists(name, password)) {
            return ResponseEntity.badRequest().build();
        } else {
            return ResponseEntity.ok(userService.loginUser(name, password));
        }
    }

    private boolean checkIfUserExists(String name, String password) {
        return userService.loginUser(name, password) == null;
    }

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody UserDto userDto) {
        if (checkIfUserExists(userDto.getName(), userDto.getPassword())) {
            return ResponseEntity.ok(userService.createUser(new User(userDto.getName(), userDto.getPassword())));
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping
    public ResponseEntity<Set<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAll());
    }
}