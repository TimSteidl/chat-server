package de.volkswagen.chat.chat;


import de.volkswagen.chat.user.User;
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

    @GetMapping("{id}")
    public ResponseEntity<ChatDto> getChats(@PathVariable long id) {
        return ResponseEntity.ok(chatService.getChats(id));
    }

    @PostMapping
    public ResponseEntity<Set<ChatDto>> getAllChatsForUser(@RequestBody User user) {
        System.out.println(user.getName());
        return ResponseEntity.ok(chatService.getAllChatsForUser(user));
    }
}