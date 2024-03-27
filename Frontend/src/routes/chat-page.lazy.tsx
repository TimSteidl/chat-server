import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { currentUserStore } from "@/store.ts";
import { createChat, getChatsForUser } from "@/api/chat.ts";
import { Chat, ChatDto, User } from "@/types.ts";
import { Button } from "@/components/ui/button.tsx";
import {
  MinusCircleIcon,
  PlusCircleIcon,
  RefreshCcw,
  Send,
} from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card.tsx";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable.tsx";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet.tsx";
import { getAllUsers } from "@/api/user.ts";
import { Input } from "@/components/ui/input.tsx";
import { toast } from "sonner";
import { postMessage } from "@/api/message.ts";

export const Route = createLazyFileRoute("/chat-page")({
  component: ChatPage,
});

function ChatPage() {
  const user = currentUserStore((state) => state.user);
  const [selectedChat, setSelectedChat] = useState<Chat>();
  const [chats, setChats] = useState<Chat[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [newChat, setNewChat] = useState<ChatDto>({
    chatDescription: "",
    chatName: "",
    users: [],
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate({ from: "/chat-page" });

  function fetchData() {
    getChatsForUser(user.id).then((chats) => {
      setChats(chats);
      chats.forEach((chat) => {
        console.log(chat.id + " " + chat.chatName);
      });
    });
    getAllUsers().then((users) => {
      setAllUsers(users);
      users.forEach((user) => {
        console.log(user.id);
      });
    });
    // @ts-ignore
    toast("Data loaded.", { type: "success" });
  }

  useEffect(() => {
    if (user.name === undefined) {
      toast("You need to be logged in to view this page!");
      navigate({ to: "/" });
    }
    fetchData();
  }, []);

  function addUserToChat(user: User) {
    setNewChat({
      ...newChat,
      users: [...newChat.users, user],
    });
  }

  function removeUserFromChat(user: User) {
    setNewChat({
      ...newChat,
      users: newChat.users.filter(
        (u) => u.name.toString() !== user.name.toString(),
      ),
    });
  }

  function checkIfUserIsInChat(user: User) {
    return newChat.users.filter((u) => u.name === user.name).length > 0;
  }

  function createNewChat() {
    const users: User[] = newChat.users.map((u) => {
      return { id: u.id, name: u.name, chats: [], password: u.password };
    });
    const chatToSend = {
      chatName: newChat.chatName,
      chatDescription: newChat.chatDescription,
      users: users,
    };
    createChat(chatToSend).then((r) => {
      if (r === undefined) {
        toast("Chat creation failed!");
        return;
      } else {
        setChats([...chats, r]);
        toast("Chat created!");
      }
    });
  }

  function sendMessage() {
    if (selectedChat !== undefined) {
      console.log(
        "Sending message: " +
          message +
          " to chat: " +
          selectedChat.id +
          " from user: " +
          user.id,
      );
      postMessage({
        content: message,
        userId: user.id,
        chatId: selectedChat.id,
      }).then((r) => {
        if (r === undefined) {
          toast("Message failed to send!");
          return;
        } else {
          if (selectedChat !== undefined) {
            const currentMessages = selectedChat.messages;
            currentMessages.push(r);
            setSelectedChat({ ...selectedChat, messages: currentMessages });
          }
          setMessage("");
        }
      });
    }
  }

  return (
    <div className={"flex flex-row h-[calc(100vh-100px)]"}>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel
          className={"w-1/5 border-r rounded-none"}
          defaultSize={30}
        >
          <Button
            className={"w-full"}
            variant={"ghost"}
            onClick={() => fetchData()}
          >
            <RefreshCcw />
          </Button>
          <Sheet>
            <SheetTrigger
              className={
                "w-full bg-primary text-primary-foreground rounded-none flex-nowrap flex justify-center p-2"
              }
            >
              Create Chat
              <PlusCircleIcon />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Create a new chat</SheetTitle>
                <SheetDescription>
                  You need to add at least one other person to the chat!
                </SheetDescription>
              </SheetHeader>
              <div className={"p-2"}>
                <div className={"w-full py-2"}>
                  <Input
                    placeholder={"Chat Title"}
                    value={newChat.chatName}
                    onChange={(e) =>
                      setNewChat({ ...newChat, chatName: e.target.value })
                    }
                  />
                </div>
                <div className={"w-full py-2"}>
                  <Input
                    placeholder={"Chat Description"}
                    value={newChat.chatDescription}
                    onChange={(e) =>
                      setNewChat({
                        ...newChat,
                        chatDescription: e.target.value,
                      })
                    }
                  />
                </div>
                Users currently in the chat: {newChat.users.length}
                <br />
                Available users:
                <ScrollArea className={"w-full h-[calc(100vh-400px)]"}>
                  <Separator className="my-2" />
                  {allUsers
                    .filter((u) => u.name !== currentUserStore.name)
                    .map((user) => {
                      return (
                        <div key={user.name}>
                          <div className={"flex justify-between"}>
                            {user.name}
                            {checkIfUserIsInChat(user) ? (
                              <Button
                                variant={"ghost"}
                                onClick={() => removeUserFromChat(user)}
                              >
                                <MinusCircleIcon />
                              </Button>
                            ) : (
                              <Button
                                variant={"ghost"}
                                onClick={() => addUserToChat(user)}
                              >
                                <PlusCircleIcon />
                              </Button>
                            )}
                          </div>
                          <Separator className="my-2" />
                        </div>
                      );
                    })}
                </ScrollArea>
              </div>
              <SheetFooter>
                <SheetClose
                  className={"bg-primary text-primary-foreground p-1 rounded"}
                  onClick={() => createNewChat()}
                >
                  Create Chat
                </SheetClose>
                <SheetClose>Cancel</SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
          <ScrollArea className={"w-full h-[calc(100vh-100px)]"}>
            {chats?.map((chat) => {
              return (
                <div key={chat.chatName}>
                  <Button
                    variant={"ghost"}
                    className={
                      chat === selectedChat
                        ? "bg-pink-400 w-full rounded-none py-2"
                        : "w-full rounded-none py-2"
                    }
                    onClick={() => setSelectedChat(chat)}
                  >
                    {chat.chatName}
                  </Button>
                  <Separator className="my-2" />
                </div>
              );
            })}
          </ScrollArea>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel className={"w-4/5"} defaultSize={70}>
          {selectedChat ? (
            <div>
              <div
                className={"flex justify-center text-2xl border-b rounded-none"}
              >
                {selectedChat.chatName}
              </div>
              <div className={"w-full h-[calc(100vh-200px)]"}>
                {selectedChat?.messages ? (
                  selectedChat.messages.sort().map((message) => {
                    return (
                      <Card
                        key={message.id}
                        className={
                          "flex justify" + message.user.name ===
                          currentUserStore.name
                            ? "-end"
                            : "-start"
                        }
                      >
                        <CardContent>{message.content}</CardContent>
                        <CardFooter>{message.user.name}</CardFooter>
                      </Card>
                    );
                  })
                ) : (
                  <div className={"justify-center flex"}>
                    No messages in this chat yet!
                  </div>
                )}
              </div>
              <div className={"pl-2 flex-nowrap flex"}>
                <Input
                  placeholder={"..."}
                  className={
                    "w-full rounded-none bg-primary text-primary-foreground"
                  }
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      sendMessage();
                    }
                  }}
                />
                <Button variant={"ghost"} onClick={() => sendMessage()}>
                  <Send />
                </Button>
              </div>
            </div>
          ) : null}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}