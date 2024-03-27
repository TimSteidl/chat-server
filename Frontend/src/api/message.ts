import axios from "axios";
import { Message, MessageDto } from "@/types.ts";

export async function postMessage(message: MessageDto) {
  return await axios
    .post(`http://localhost:8080/api/message`, message)
    .then((res) => res.data as Message);
}