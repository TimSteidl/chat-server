package de.volkswagen.chat.user;


import de.volkswagen.chat.chat.Chat;
import de.volkswagen.chat.message.Message;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String password;
    @ManyToMany(mappedBy = "users", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @Nullable
    private Set<Chat> chats = new LinkedHashSet<>();
    @OneToMany(mappedBy = "user")
    @Nullable
    private Set<Message> messages;

    public User(String name, String password) {
        this.name = name;
        this.password = password;
    }
}