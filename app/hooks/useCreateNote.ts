import { useEffect, useState } from "react";
import { useGetInfiniteNotes } from "./useGetNotes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Note } from "@prisma/client";

interface NewNoteType {
  content: string;
  title?: string | null | undefined;
}

interface ApiResponse {
  data: Note[];
  nextCursor: string | null;
  hasMore: boolean;
}

interface MutationDataType {
  pageParam: number[];
  pages: ApiResponse[];
}

interface ContextType {
  oldNotes: Note[];
}

const fetchNewNote = async (payload: NewNoteType): Promise<Note> => {
  const response = await fetch("/api/note/new", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  return data;
};

const useCreateNote = () => {
  const queryClient = useQueryClient();
  return useMutation<Note, Error, Note, ContextType>({
    mutationKey: ["infinite_notes"],
    mutationFn: fetchNewNote,
    onMutate: async (newNote) => {
      const previousNotes = queryClient.getQueryData<MutationDataType>([
        "infinite_notes",
      ]) || {
        pageParam: [0],
        pages: [{ data: [], hasMore: true, nextCursor: "1" }],
      };
      queryClient.setQueryData<MutationDataType>(["infinite_notes"], {
        ...previousNotes,
        pages: [
          {
            data: [newNote, ...previousNotes.pages[0].data],
            hasMore: previousNotes.pages[0].hasMore,
            nextCursor: previousNotes.pages[0].nextCursor,
          },
          ...previousNotes.pages.slice(1),
        ],
      });

      return { oldNotes: previousNotes.pages[0].data };
    },
    onSuccess: (newNote, previousNote) => {
      queryClient.setQueryData<MutationDataType>(
        ["infinite_notes"],
        (mutationData) => {
          if (!mutationData) return mutationData;

          const updatedData: MutationDataType = {
            ...mutationData,
            pages: [
              {
                data: mutationData.pages[0].data.map((note) =>
                  note.id === previousNote.id ? newNote : note
                ),
                hasMore: mutationData.pages[0].hasMore,
                nextCursor: mutationData.pages[0].nextCursor,
              },
              ...mutationData.pages.slice(1),
            ],
          };

          return updatedData;
        }
      );
    },
    onError: (error, newNote, ctx) => {
      if (!ctx) return;
      queryClient.setQueryData<MutationDataType>(["infinite_notes"], (data) => {
        if (!data) return data;
        const previousData: MutationDataType = {
          ...data,
          pages: [
            {
              data: ctx.oldNotes,
              hasMore: data.pages[0].hasMore,
              nextCursor: data.pages[0].nextCursor,
            },
            ...data.pages.slice(1),
          ],
        };

        return previousData;
      });
    },
  });
};
export default useCreateNote;
