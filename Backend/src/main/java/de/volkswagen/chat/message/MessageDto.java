package de.volkswagen.chat.message;

import de.volkswagen.chat.chat.Chat;
import de.volkswagen.chat.user.User;
import lombok.Value;

import java.io.Serializable;

/**
 * DTO for {@link Message}
 */
@Value
public class MessageDto implements Serializable {
    String content;
    long userId;
    long chatId;

    public static Message convertDtoToMessage(MessageDto messageDto, User user, Chat chat) {
        return new Message(messageDto.getContent(), user, chat);
    }

    public static MessageDto convertMessageToDto(Message message) {
        return new MessageDto(message.getContent(), message.getUser().getId(), message.getChat().getId());
    }
}