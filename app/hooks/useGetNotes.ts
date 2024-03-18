import { Note, Tag } from "@prisma/client";
import { useInfiniteQuery } from "@tanstack/react-query";

export interface NoteWithTags extends Note {
  tags: Tag[];
}

interface ApiResponse {
  data: NoteWithTags[];
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
