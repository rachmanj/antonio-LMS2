"use client";

import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SignOutButton } from "@/components/signOut-button";
import Link from "next/link";

export const NavbarRoutes = () => {
  const pathname = usePathname();

  const isTeacherPage = pathname.startsWith("/teacher");
  const isPlayerPage = pathname.startsWith("/chapter");

  return (
    <div className="flex gap-x-2 ml-auto">
      {isTeacherPage || isPlayerPage ? (
        <Link href="/">
          <Button variant="ghost" size="sm">
            <LogOut className="h-4 w-4 mr-2" /> Exit Teacher Mode
          </Button>
        </Link>
      ) : (
        <Link href="/teacher/courses">
          <Button size="sm" variant="ghost">
            Teacher Mode
          </Button>
        </Link>
      )}

      <SignOutButton />
    </div>
  );
};
