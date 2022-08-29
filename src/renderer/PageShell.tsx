import { SessionProvider } from "next-auth/react";
import React from "react";
import { PageContextProvider } from "../lib/usePageContext";
import type { PageContext } from "../types/page.types";

function PageShell({
  children,
  pageContext,
}: {
  children: React.ReactNode;
  pageContext: PageContext;
}) {
  return (
    <React.StrictMode>
      <PageContextProvider pageContext={pageContext}>
        <SessionProvider session={pageContext.session}>
          {children}
        </SessionProvider>
      </PageContextProvider>
    </React.StrictMode>
  );
}

export { PageShell };
