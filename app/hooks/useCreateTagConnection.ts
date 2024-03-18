import { Tag, Note } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { NoteWithTags } from "./useGetNotes";
import { TaggedNotes } from "./useGetTags";

export const useCreateTagConnection = () => {
  const queryClient = useQueryClient();

  return useMutation<ConnectionType, Error, ConnectionType, ContextType>({
    mutationKey: ["note-tag-connection"],
    mutationFn: async (payload: ConnectionType) => {
      const response = await fetch("/api/tag/connection/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      return data;
    },
    onMutate: async ({ tag, note }) => {
      await queryClient.cancelQueries({ queryKey: ["tags"] });
      await queryClient.cancelQueries({ queryKey: ["infinite_notes"] });

      const previousTags = queryClient.getQueryData<TagsMutationDataType>([
        "tags",
      ]);
      const previousNotes = queryClient.getQueryData<NoteMutationDataType>([
        "infinite_notes",
      ]);

      queryClient.setQueryData<NoteMutationDataType>(
        ["infinite_notes"],
        (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              data: page.data.map((n) =>
                n.id === note.id ? { ...n, tags: [...n.tags, tag] } : n
              ),
            })),
          };
        }
      );

      queryClient.setQueryData<TagsMutationDataType>(["tags"], (oldData) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            data: page.data.map((t) =>
              t.id === tag.id ? { ...t, notes: [...t.notes, note] } : t
            ),
          })),
        };
      });

      return { previousTags, previousNotes };
    },
    onError: (error, { note, tag }, context) => {
      if (context?.previousTags) {
        queryClient.setQueryData(["tags"], context.previousTags);
      }
      if (context?.previousNotes) {
        queryClient.setQueryData(["infinite_notes"], context.previousNotes);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tags"] });
      queryClient.invalidateQueries({ queryKey: ["infinite_notes"] });
    },
  });
};

interface ConnectionType {
  tag: Tag;
  note: Note;
}

//
interface NoteApiResponse {
  data: NoteWithTags[];
  nextCursor: string | null;
  hasMore: boolean;
}

interface NoteMutationDataType {
  pageParam: number[];
  pages: NoteApiResponse[];
}

//
interface TagsApiResponse {
  data: TaggedNotes[];
  nextCursor: string | null;
  hasMore: boolean;
}

interface TagsMutationDataType {
  pageParam: number[];
  pages: TagsApiResponse[];
}

//
interface ContextType {
  previousTags?: TagsMutationDataType;
  previousNotes?: NoteMutationDataType;
}
