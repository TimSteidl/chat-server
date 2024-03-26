package de.volkswagen.chat.chat;

import de.volkswagen.chat.message.Message;
import lombok.Value;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * DTO for {@link Chat}
 */
@Value
public class ChatDto implements Serializable {
    String chatName;
    String chatDescription;
    LocalDate createdAt;
    Set<UserDto> users;
    Long messageId;
    String messageContent;
    LocalDateTime messageCreatedAt;
    Long messageUserId;
    String messageUserName;

    public static ChatDto convertChatToDto(Chat chat) {
        assert chat.getMessages() != null;
        assert chat.getUsers() != null;
        return new ChatDto(chat.getChatName(), chat.getChatDescription(), chat.getCreatedAt(),
                chat.getUsers().stream().map(user -> new UserDto(user.getId(), user.getName(), user.getEmail(), user.getPassword())).collect(Collectors.toSet()),
                chat.getMessages().stream().findFirst().map(Message::getId).orElse(null),
                chat.getMessages().stream().findFirst().map(Message::getContent).orElse(null),
                chat.getMessages().stream().findFirst().map(Message::getCreatedAt).orElse(null),
                chat.getMessages().stream().findFirst().map(message -> message.getUser().getId()).orElse(null),
                chat.getMessages().stream().findFirst().map(message -> message.getUser().getName()).orElse(null));
    }

    /**
     * DTO for {@link de.volkswagen.chat.user.User}
     */
    @Value
    public static class UserDto implements Serializable {
        Long id;
        String name;
        String email;
        String password;
    }
}