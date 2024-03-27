package de.volkswagen.chat.chat;


import de.volkswagen.chat.user.User;
import de.volkswagen.chat.user.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ChatService {

    private final ChatRepository chatRepository;

    private final UserRepository userRepository;

    public ChatService(ChatRepository chatRepository, UserRepository userRepository) {
        this.chatRepository = chatRepository;
        this.userRepository = userRepository;
    }

    public Set<Chat> getAllChatsForUser(long id) {
        return chatRepository
                .findAll()
                .stream()
                .filter(chat -> chat.getUsers()
                        .stream()
                        .anyMatch(user -> user.getId() == id))
                .collect(Collectors.toSet());
    }

    public ChatDto createChat(ChatDto chatDto) {
        System.out.println(STR."\{chatDto.getChatName()} \{chatDto.getChatDescription()} \{chatDto.getUsers().size()}");
        Set<User> users = chatDto.getUsers()
                .stream()
                .map(userDto -> userRepository.findByNameEquals(userDto.getName()))
                .collect(Collectors.toSet());
        System.out.println(users.size());
        if (users.size() != chatDto.getUsers().size()) {
            throw new IllegalArgumentException("User not found");
        }
        System.out.println(chatDto.getChatName());
        Chat chat = ChatDto.convertDtoToChat(chatDto, users);
        System.out.println(chat.getChatName());
        return ChatDto.convertChatToDto(chatRepository.save(chat));
    }
}