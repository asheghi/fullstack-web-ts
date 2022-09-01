import React from "react";
import { Session } from "next-auth";
import { DashboardHeader } from "./dashboard-header";
import { usePageContext } from "../../lib/usePageContext";

const Page: React.FC = () => {
  const { session } = usePageContext() as { session: Session };

  if (!session) return <div>invalid session</div>;

  return (
    <div className="min-h-screen  h-screen">
      <DashboardHeader />
      <div className="dash-content text-4xl h-full flex justify-center items-center gap-4 flex-col">
        Wellcome to dashboard
      </div>
    </div>
  );
};

export { Page };
