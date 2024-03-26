package de.volkswagen.chat.message;

import de.volkswagen.chat.chat.Chat;
import de.volkswagen.chat.chat.ChatRepository;
import de.volkswagen.chat.user.User;
import de.volkswagen.chat.user.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class MessageService {

    private final MessageRepository messageRepository;

    private final ChatRepository chatRepository;

    private final UserRepository userRepository;

    public MessageService(MessageRepository messageRepository, ChatRepository chatRepository, UserRepository userRepository) {
        this.messageRepository = messageRepository;
        this.chatRepository = chatRepository;
        this.userRepository = userRepository;
    }

    public Message sendMessage(MessageDto messageDto) {
        Chat chat =
                chatRepository.findById(messageDto.getChatId()).orElseThrow(() -> new IllegalArgumentException("Chat not found"));
        User user =
                userRepository.findById(messageDto.getUserId()).orElseThrow(() -> new IllegalArgumentException("User not found"));
        return messageRepository.save(MessageDto.convertDtoToMessage(messageDto, user, chat));
    }
}