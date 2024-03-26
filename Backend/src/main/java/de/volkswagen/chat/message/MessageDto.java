package de.volkswagen.chat.message;

import de.volkswagen.chat.chat.Chat;
import de.volkswagen.chat.user.User;
import lombok.Value;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * DTO for {@link Message}
 */
@Value
public class MessageDto implements Serializable {
    Long id;
    String content;
    Long userId;
    String userName;
    Long chatId;

    public static Message convertDtoToMessage(MessageDto messageDto, User user, Chat chat) {
        Message message = new Message();
        message.setId(messageDto.getId());
        message.setContent(messageDto.getContent());
        message.setCreatedAt(LocalDateTime.now());
        message.setUser(user);
        message.setChat(chat);
        return message;
    }

    public static MessageDto convertMessageToDto(Message message) {
        return new MessageDto(message.getId(), message.getContent(), message.getUser().getId(), message.getUser().getName(), message.getChat().getId());
    }
}