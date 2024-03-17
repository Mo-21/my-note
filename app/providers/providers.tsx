"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import AuthProvider from "../auth/Provider";
import ReactQueryProvider from "./ReactQueryProvider";
import { NotesProvider } from "./NotesProvider";
import { ActiveNoteProvider } from "./ActiveNoteProvider";
import TagsProvider from "./TagsProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ReactQueryProvider>
        <NotesProvider>
          <TagsProvider>
            <ActiveNoteProvider>
              <NextUIProvider>
                <NextThemesProvider attribute="class" defaultTheme="dark">
                  {children}
                </NextThemesProvider>
              </NextUIProvider>
            </ActiveNoteProvider>
          </TagsProvider>
        </NotesProvider>
      </ReactQueryProvider>
    </AuthProvider>
  );
}
