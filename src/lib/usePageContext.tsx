// `usePageContext` allows us to access `pageContext` in any React component.
// See https://vite-plugin-ssr.com/pageContext-anywhere

import React, { useContext } from "react";
import type { PageContext } from "../types/page.types";

const Context = React.createContext<PageContext>(undefined as any);

function PageContextProvider({
  pageContext,
  children,
}: {
  pageContext: PageContext;
  children: React.ReactNode;
}) {
  return <Context.Provider value={pageContext}>{children}</Context.Provider>;
}

function usePageContext(): PageContext {
  const pageContext = useContext(Context);

  return pageContext;
}

export { PageContextProvider };
export { usePageContext };
