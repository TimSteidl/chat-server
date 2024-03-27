package de.volkswagen.chat.chat;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "http://localhost:5173/")
public class ChatController {

    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }


    @PostMapping("/{id}")
    public ResponseEntity<Set<Chat>> getAllChatsForUser(@PathVariable long id) {
        return ResponseEntity.ok(chatService.getAllChatsForUser(id));
    }

    @PostMapping("/create")
    public ResponseEntity<ChatDto> createChat(@RequestBody ChatDto chatDto) {
        return ResponseEntity.ok(chatService.createChat(chatDto));
    }
}