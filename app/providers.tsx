"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import AuthProvider from "./auth/Provider";
import ReactQueryProvider from "@/ReactQueryProvider";
import { NotesProvider } from "./hooks/useNotesContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ReactQueryProvider>
        <NotesProvider>
          <NextUIProvider>
            <NextThemesProvider attribute="class" defaultTheme="dark">
              {children}
            </NextThemesProvider>
          </NextUIProvider>
        </NotesProvider>
      </ReactQueryProvider>
    </AuthProvider>
  );
}
