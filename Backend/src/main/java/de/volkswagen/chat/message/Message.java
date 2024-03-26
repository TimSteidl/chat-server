package de.volkswagen.chat.message;

import com.fasterxml.jackson.annotation.JsonBackReference;
import de.volkswagen.chat.chat.Chat;
import de.volkswagen.chat.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String content;
    private LocalDateTime createdAt;
    @ManyToOne
    private User user;
    @ManyToOne
    @JsonBackReference(value = "message-chat")
    private Chat chat;

    public MessageDto convertMessageToDto() {
        return new MessageDto(id, content, user.getId(), user.getName(), chat.getId());
    }
}