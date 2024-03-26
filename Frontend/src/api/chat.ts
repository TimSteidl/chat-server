import { User } from "@/types.ts";
import axios from "axios";

export async function getChatsForUser(user: User) {
  return await axios
    .post(`http://localhost:8080/api/chat`, user)
    .then((res) => res.data);
}

export async function getChatById(id: number) {
  return await axios
    .get(`http://localhost:8080/api/chat/${id}`)
    .then((res) => res.data);
}