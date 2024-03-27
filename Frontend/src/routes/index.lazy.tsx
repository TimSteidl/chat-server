import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card.tsx";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { loginUser, registerUser } from "@/api/user.ts";
import { currentUserStore } from "@/store.ts";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const navigate = useNavigate({ from: "/" });
  const setUser = currentUserStore((state) => state.setUser);
  const formSchema = z.object({
    username: z.string().min(3).max(50),
    password: z
      .string()
      .min(8)
      .max(50)
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      ),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    loginUser(values.username, values.password).then((r) => {
      if (r !== undefined) {
        setUser(r);
        navigate({ to: "/chat-page" });
      } else {
        setUser({ id: 0, name: "debug", password: "" });
      }
    });
  }

  function onRegister(values: z.infer<typeof formSchema>) {
    registerUser({
      name: values.username,
      password: values.password,
    }).then((r) => {
      if (r !== undefined) {
        setUser(r);
        navigate({ to: "/chat-page" });
      }
    });
  }

  return (
    <div className={"p-24"}>
      <Card>
        <CardTitle className={"flex justify-center pt-2"}>Login</CardTitle>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={
                form.handleSubmit(onSubmit) || form.handleSubmit(onRegister)
              }
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="..." {...field} />
                    </FormControl>
                    <FormDescription>
                      This name will be displayed to other users.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="********"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      *Must be at least 8 characters long, contain at least one
                      uppercase letter, one lowercase letter, one number, and
                      one special character.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
        <CardFooter className={"justify-evenly flex"}>
          <Button
            type="submit"
            className="px-4 py-2 justify-end flex"
            onClick={form.handleSubmit(onSubmit)}
          >
            Login
          </Button>
          <Button onClick={form.handleSubmit(onRegister)}>Register</Button>
        </CardFooter>
      </Card>
    </div>
  );
}