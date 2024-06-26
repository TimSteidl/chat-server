import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { ThemeProvider } from "@/components/theme-provider.tsx";
import { LogOut } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle.tsx";
import { Toaster } from "sonner";
import { currentUserStore } from "@/store.ts";

export const Route = createRootRoute({
  component: Index,
});

function Index() {
  const logout = currentUserStore((state) => state.setUser);
  return (
    <ThemeProvider>
      <div className={"p-2 px-14 flex justify-between border-b-4"}>
        <h1 className={"text-2xl"}>Whats-An-App</h1>
        <div className={"flex-nowrap flex"}>
          <ModeToggle />
          <Link
            to={"/"}
            onClick={() => logout({ id: 0, name: "", password: "" })}
            className="rounded hover:bg-secondary p-3 px-4"
          >
            <LogOut className={"h-[1.2rem] w-[1.2rem]"} />
          </Link>
        </div>
      </div>
      <Outlet />
      <Toaster richColors position={"top-center"} />
    </ThemeProvider>
  );
}