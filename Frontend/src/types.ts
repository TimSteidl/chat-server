export type User = {
  name: string;
  password: string;
  id: number;
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

export type Message = {
  id: number;
  content: string;
  user: User;
  createdAt: Date;
};