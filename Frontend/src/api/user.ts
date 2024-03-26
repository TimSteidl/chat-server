import axios from "axios";
import { toast } from "sonner";
import { User, UserDto } from "@/types.ts";
import { currentUserStore } from "@/store.ts";

export async function loginUser(username: string, password: string) {
  const [user, setUser] = currentUserStore((state) => [
    state.user,
    state.setUser,
  ]);
  if (user === undefined) {
    await axios
      .get("http://localhost:8080/api/user/" + username + "/" + password)
      .then((res) => {
        toast.success("Logged in successfully");
        setUser(res.data as User);
      })
      .catch(() => {
        toast.error("Error logging in user");
      });
  } else {
    toast.error("User already logged in");
  }
}

export async function registerUser(userDto: UserDto) {
  const [user, setUser] = currentUserStore((state) => [
    state.user,
    state.setUser,
  ]);
  if (user === undefined) {
    await axios
      .post("http://localhost:8080/api/user", userDto)
      .then((res) => {
        toast.success("Registered user successfully");
        setUser(res.data as User);
      })
      .catch(() => {
        toast.error("Error registering user");
      });
  } else {
    toast.error("User already logged in");
  }
}