import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/chat-page")({
  component: ChatPage,
});

function ChatPage() {
  return (
    <div>
      <h1>Chat Page</h1>
    </div>
  );
}