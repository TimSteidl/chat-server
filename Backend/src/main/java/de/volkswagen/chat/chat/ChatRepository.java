package de.volkswagen.chat.chat;


import de.volkswagen.chat.user.User;
import org.hibernate.annotations.processing.SQL;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Set;

public interface ChatRepository extends JpaRepository<Chat, Long>{
}