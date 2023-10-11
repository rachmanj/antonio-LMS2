"use client";

import { SessionProvider } from "next-auth/react";

const SessionProv = ({ children }: { children: React.ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default SessionProv;
