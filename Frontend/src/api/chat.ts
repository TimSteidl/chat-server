import { Chat, ChatDto } from "@/types.ts";
import axios from "axios";

export async function getChatsForUser(id: number) {
  return await axios
    .post(`http://localhost:8080/api/chat/` + id)
    .then((res) => res.data as Chat[]);
}

export async function createChat(chatDto: ChatDto) {
  return await axios
    .post(`http://localhost:8080/api/chat/create`, chatDto)
    .then((res) => res.data as Chat);
}