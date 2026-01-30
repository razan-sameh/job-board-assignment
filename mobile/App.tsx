import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppNavigator from "./src/navigation/AppNavigator";
import { ThemeProvider } from "src/contexts/ThemeContext";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AppNavigator />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
