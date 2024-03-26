import { create } from "zustand";
import { User } from "@/types.ts";

interface UserStore {
  user: User;
  setUser: (user: User) => void;
  logout: () => void;
}

export const currentUserStore = create<UserStore>((set) => ({
  user: {} as User,
  setUser: (user: User) => set({ user }),
  logout: () => set({ user: undefined }),
}));