// The `pageContext` that are available in both on the server-side and browser-side
export type PageContext = {
  Page: (pageProps: any) => React.ReactElement;
  pageProps?: any;
  urlPathname: string;
  exports: {
    documentProps?: {
      title?: string;
      description?: string;
    };
  };
  session?: any;
  csrfToken?: string;
  callbackUrl?: string;
};
