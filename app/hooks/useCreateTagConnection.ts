import { Tag } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface ConnectionType {
  tag: Tag;
  noteId: number;
}

export const useCreateTagConnection = () =>
  useMutation<ConnectionType, Error, ConnectionType>({
    mutationKey: ["note-tag-connection"],
    mutationFn: async (payload: ConnectionType) =>
      await fetch("/api/tag/connection/new", {
        method: "POST",
        body: JSON.stringify(payload),
      }).then((res) => res.json()),
  });
