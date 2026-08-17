"use client";

import { signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User, Settings, LogOut, ExternalLink } from "lucide-react";
import Link from "next/link";

export function AdminUserMenu() {
  const { data: session } = useSession();
  const user = session?.user;

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "AD";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="ghost" className="relative h-9 w-9 rounded-full p-0" />}>
        <Avatar className="h-9 w-9 border border-border">
          <AvatarFallback className="bg-primary/10 text-primary font-medium text-xs">
            {initials}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.name || "Admin User"}</p>
            <p className="text-xs leading-none text-muted-foreground truncate">
              {user?.email || "admin@spsolutions.com"}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem render={<Link href="/admin/settings" />}>
            <User className="h-4 w-4 mr-2" />
            <span>Account & Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem render={<Link href="/admin/settings" />}>
            <Settings className="h-4 w-4 mr-2" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem render={<Link href="/" target="_blank" />}>
            <ExternalLink className="h-4 w-4 mr-2" />
            <span>Public Website</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          variant="destructive"
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="cursor-pointer"
        >
          <LogOut className="h-4 w-4 mr-2" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
