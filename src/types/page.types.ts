import { Session } from "next-auth";
import React from "react";

// The `pageContext` that are available in both on the server-side and browser-side
export type PageContext = {
  // eslint-disable-next-line no-unused-vars
  Page: (pageProps: any) => React.ReactElement;
  pageProps?: any;
  urlPathname: string;
  exports: {
    documentProps?: {
      title?: string;
      description?: string;
    };
  };
  session?: Session;
  csrfToken?: string;
  callbackUrl?: string;
};
