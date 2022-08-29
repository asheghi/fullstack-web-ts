import { useSession } from "next-auth/react";
import React from "react";

const Page: React.FC = () => {
  const { status, data: session } = useSession();
  const loading = status === "loading";

  if (loading) return <div>loading ...</div>;
  if (session) {
    return <div>Session : {JSON.stringify(session)}</div>;
  }
  return (
    <div>
      <a href="/api/auth/signin">Login</a>
    </div>
  );
};

export { Page };
