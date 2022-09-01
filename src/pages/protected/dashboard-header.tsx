import { signOut } from "next-auth/react";
import React from "react";
import { usePageContext } from "../../lib/usePageContext";

export const DashboardHeader = () => {
  const { session } = usePageContext();

  if (!session) return null;

  const renderAvatar = () => {
    if (!session.user?.image) return "";

    return (
      <img
        className="rounded-full"
        width="42"
        height="42"
        src={session.user!.image!}
        alt={session.user!.name!}
      />
    );
  };

  return (
    <div className="flex gap-4 py-2 items-center px-4">
      <h1>Dashboard</h1>
      <span className="ml-auto"></span>
      {renderAvatar()}
      <div>
        {session.user?.name}({session.user?.email})
      </div>
      <button
        className="border rounded px-2 py-1 text-red-400"
        onClick={() => signOut()}
      >
        Sign Out
      </button>
    </div>
  );
};
