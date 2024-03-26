import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { ThemeProvider } from "@/components/theme-provider.tsx";
import { LogOut } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle.tsx";
import { Toaster } from "sonner";

export const Route = createRootRoute({
  component: Index,
});

function Index() {
  return (
    <ThemeProvider>
      <div className={"p-2 px-14 flex justify-end border-b-4"}>
        <div className={"flex-nowrap flex"}>
          <ModeToggle />
          <Link to={"/"} className="rounded hover:bg-secondary p-3 px-4">
            <LogOut className={"h-[1.2rem] w-[1.2rem]"} />
          </Link>
        </div>
      </div>
      <Outlet />
      <Toaster />
    </ThemeProvider>
  );
}