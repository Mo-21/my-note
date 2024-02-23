import { Note } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export const useGetNotes = () => {
  return useQuery<Note[], Error>({
    queryKey: ["notes"],
    queryFn: () =>
      fetch("/api/note/list", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((value) => value.json()),
  });
};
