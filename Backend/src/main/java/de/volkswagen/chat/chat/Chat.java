package de.volkswagen.chat.chat;


import com.fasterxml.jackson.annotation.JsonBackReference;
import de.volkswagen.chat.message.Message;
import de.volkswagen.chat.user.User;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Chat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String chatName;
    private String chatDescription;
    private LocalDate createdAt = LocalDate.now();
    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(name = "Chat_user",
               joinColumns = @JoinColumn(name = "chat_id"))
    @NotNull
    private Set<User> users = new HashSet<>();
    @OneToMany(mappedBy = "chat")
    @Nullable
    @JsonBackReference(value = "message-chat")
    private Set<Message> messages = new HashSet<>();

    public Chat(String chatName, String chatDescription, Set<User> users) {
        this.chatName = chatName;
        this.chatDescription = chatDescription;
        this.users = users;
    }
}