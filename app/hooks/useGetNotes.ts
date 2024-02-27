import { Note } from "@prisma/client";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

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

interface ApiResponse {
  data: Note[];
  nextCursor: string | null;
  hasMore: boolean;
}

const LIMIT = 10;

const fetchInfiniteData = async ({
  pageParam,
}: {
  pageParam: unknown;
}): Promise<ApiResponse> => {
  const res = await fetch(`/api/note/list?cursor=${pageParam}&limit=${LIMIT}`);
  const data: ApiResponse = await res.json();
  return data;
};

export const useGetInfiniteNotes = () => {
  return useInfiniteQuery<
    ApiResponse,
    Error,
    { data: Note[]; nextCursor: string | null },
    [string]
  >({
    queryKey: ["infinite_notes"],
    queryFn: fetchInfiniteData,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.hasMore ? lastPage.nextCursor : undefined;
    },
    select: (data) => ({
      data: data.pages.flatMap((page) => page.data),
      nextCursor: data.pages[data.pages.length - 1].nextCursor,
    }),
  });
};
