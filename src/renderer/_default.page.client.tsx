import React from "react";
import { hydrateRoot } from "react-dom/client";
import type { PageContextBuiltInClient } from "vite-plugin-ssr/client";
import { telefuncConfig } from "telefunc/client";
import { PageShell } from "./PageShell";
import type { PageContext } from "../types/page.types";
import "../assets/styles/indes.css";

// client side
telefuncConfig.telefuncUrl = "/api/_telefunc";

async function render(pageContext: PageContextBuiltInClient & PageContext) {
  const { Page, pageProps } = pageContext;

  hydrateRoot(
    document.getElementById("page-view")!,
    <PageShell pageContext={pageContext}>
      <Page {...pageProps} />
    </PageShell>
  );
}

export { render };

/* To enable Client-side Routing:
export const clientRouting = true
// !! WARNING !! Before doing so, read https://vite-plugin-ssr.com/clientRouting */
