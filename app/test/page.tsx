import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

const Test = async () => {
  const session = await getServerSession(authOptions);
  console.log("[TEST]", session);

  return <div>Test</div>;
};

export default Test;
