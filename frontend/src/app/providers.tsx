"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

type ThemeProviderProps = React.PropsWithChildren<
  React.ComponentProps<typeof NextThemesProvider>
>;

export function Providers({ children, ...props }: ThemeProviderProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <NextThemesProvider {...props}>{children}</NextThemesProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
