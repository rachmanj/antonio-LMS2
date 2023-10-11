import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/authOptions";

export const authUser = async () => {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) throw new Error("You must be logged in to upload files");
  return userId;
};
