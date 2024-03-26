package de.volkswagen.chat.chat;


import de.volkswagen.chat.user.User;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ChatService {

    private final ChatRepository chatRepository;

    public ChatService(ChatRepository chatRepository) {
        this.chatRepository = chatRepository;
    }

    public ChatDto getChats(long id) {
        return chatRepository.findById(id).map(ChatDto::convertChatToDto).orElse(null);
    }

    public Set<ChatDto> getAllChatsForUser(User userToFind) {
        return chatRepository
                .findAll()
                .stream()
                .filter(chat -> {
                    return chat.getUsers()
                            .stream()
                            .anyMatch(user -> user.getName().equals(userToFind.getName()));
                })
                .collect(Collectors.toSet())
                .stream()
                .map(ChatDto::convertChatToDto)
                .collect(Collectors.toSet());
    }
}