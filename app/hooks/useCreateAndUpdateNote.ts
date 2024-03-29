import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Note } from "@prisma/client";

export interface NewNoteType {
  content: string;
  title?: string | null | undefined;
  NoteType: "EDITOR" | "QUICK_NOTE" | "CHECKBOX";
}

interface UpdatedNoteType {
  id: string;
  content: string;
  title?: string | null | undefined;
  isPinned: boolean;
  isArchived: boolean;
}

interface ApiResponse {
  data: Note[];
  hasMore: boolean;
}

export interface MutationDataType {
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

const updateNote = async (payload: UpdatedNoteType): Promise<Note> => {
  const response = await fetch("/api/note/edit", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  return data;
};

const useCreateAndUpdateNote = (isUpdating: boolean) => {
  const queryClient = useQueryClient();
  return useMutation<Note, Error, Note, ContextType>({
    mutationKey: ["infinite_notes"],
    mutationFn: isUpdating ? updateNote : fetchNewNote,
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
            data: isUpdating
              ? [
                  newNote,
                  ...previousNotes.pages[0].data.filter(
                    (note) => note.createdAt !== newNote.createdAt
                  ),
                ]
              : [newNote, ...previousNotes.pages[0].data],
            hasMore: previousNotes.pages[0].hasMore,
          },
          ...previousNotes.pages.slice(1),
        ],
      });

      return { oldNotes: previousNotes.pages[0].data };
    },
    onSuccess: (newNote, previousNote) => {
      queryClient.invalidateQueries({ queryKey: ["infinite_notes"] });
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
            },
            ...data.pages.slice(1),
          ],
        };

        return previousData;
      });
    },
  });
};
export default useCreateAndUpdateNote;
