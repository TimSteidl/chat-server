import { createLazyFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { currentUserStore } from "@/store.ts";
import { getChatsForUser } from "@/api/chat.ts";
import { Chat } from "@/types.ts";
import { Button } from "@/components/ui/button.tsx";
import { PlusCircleIcon } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card.tsx";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";
import { Separator } from "@/components/ui/separator.tsx";

export const Route = createLazyFileRoute("/chat-page")({
  component: ChatPage,
});

function ChatPage() {
  const user = currentUserStore((state) => state.user);
  const [selectedChat, setSelectedChat] = useState<Chat>();
  const [chats, setChats] = useState<Chat[]>([]);
  useEffect(() => {
    getChatsForUser(user).then((chats) => {
      console.log(chats);
      setChats(chats);
    });
  }, [user]);

  function createChat() {}

  return (
    <div className={"flex flex-row h-[calc(100vh-100px)]"}>
      <div className={"w-1/5 border-r rounded-none"}>
        <Button className={"w-full rounded-none"} onClick={() => createChat()}>
          Create Chat
          <PlusCircleIcon />
        </Button>
        <ScrollArea className={"w-full h-[calc(100vh-100px)]"}>
          {chats?.map((chat) => {
            return (
              <>
                <Button
                  className={chat === selectedChat ? "bg-pink-400" : ""}
                  onClick={() => setSelectedChat(chat)}
                >
                  {chat.chatName}
                </Button>
                <Separator className="my-2" />
              </>
            );
          })}
        </ScrollArea>
      </div>
      <div className={"w-4/5"}>
        {selectedChat ? (
          <div>
            <div>
              {selectedChat.messages.map((message) => {
                return (
                  <Card
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
              })}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}