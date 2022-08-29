import { useSession, signOut } from "next-auth/react";
import React from "react";
import { Counter } from "./Counter";
import "./index.scss";

function Page() {
  const { data: session } = useSession();
  const haveSession = session && session.user;
  return (
    <div className="h-screen flex flex-col gap-4 justify-center items-center">
      <h1 className="header">FullStack Web Framework</h1>
      <Counter />
      {haveSession && (
        <div>
          Logged in as {session.user?.name}
          <button className="ml-4 btn" onClick={() => signOut()}>
            Sign Out
          </button>
        </div>
      )}
      {!haveSession && (
        <a className="btn" href="/api/auth/signin">
          Login
        </a>
      )}
    </div>
  );
}

export { Page };
