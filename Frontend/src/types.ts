export type User = {
  name: string;
  password: string;
  id: number;
  chats: Chat[];
};
export type UserDto = {
  name: string;
  password: string;
};

export type Chat = {
  id: number;
  chatName: string;
  chatDescription: string;
  messages: Message[];
  users: User[];
  createdAt: Date;
};

export type ChatDto = {
  chatName: string;
  chatDescription: string;
  users: User[];
};

export type Message = {
  id: number;
  content: string;
  user: User;
  createdAt: Date;
};

export type MessageDto = {
  content: string;
  userId: number;
  chatId: number;
};