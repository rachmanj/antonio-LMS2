import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";

export const SignOutButton = () => {
  // const { data: session } = useSession();
  // console.log("[SignOutButton]", session);

  return (
    <Button
      size="sm"
      onClick={() =>
        signOut({
          redirect: true,
          callbackUrl: "/",
        })
      }
    >
      SignOut
    </Button>
  );
};
