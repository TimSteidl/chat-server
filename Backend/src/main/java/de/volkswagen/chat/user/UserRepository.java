package de.volkswagen.chat.user;


import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByNameEqualsAndPasswordEquals(String name, String password);

    User findByNameEquals(String name);
}