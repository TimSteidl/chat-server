import axios from "axios";
import { toast } from "sonner";
import { User, UserDto } from "@/types.ts";

export async function loginUser(name: string, password: string) {
  return await axios
    .get("http://localhost:8080/api/user/" + name + "/" + password)
    .then((res) => {
      toast.success("Logged in successfully");
      return res.data as User;
    })
    .catch(() => {
      toast.error("Error logging in user");
      return undefined;
    });
}

export async function registerUser(userDto: UserDto) {
  return await axios
    .post("http://localhost:8080/api/user", userDto)
    .then((res) => {
      toast.success("Registered user successfully");
      return res.data as User;
    })
    .catch(() => {
      toast.error("Error registering user");
      return undefined;
    });
}

export async function getAllUsers() {
  return await axios
    .get("http://localhost:8080/api/user")
    .then((res) => res.data as User[])
    .catch(() => {
      toast.error("Error getting all users");
      return [];
    });
}