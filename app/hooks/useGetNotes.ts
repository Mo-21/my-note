import { Note, Tag } from "@prisma/client";
import { useInfiniteQuery } from "@tanstack/react-query";

export interface NoteWithTags extends Note {
  tags: Tag[];
}

interface ApiResponse {
  data: NoteWithTags[];
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

export const useGetInfiniteNotes = (shouldFetch: boolean) => {
  return useInfiniteQuery<ApiResponse, Error, { data: Note[] }, [string]>({
    queryKey: ["infinite_notes"],
    queryFn: fetchInfiniteData,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasMore ? allPages.length + 1 : undefined;
    },
    select: (data) => ({
      data: data.pages.flatMap((page) => page.data),
    }),
    enabled: shouldFetch,
  });
};
