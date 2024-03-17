import { Tag, Note } from "@prisma/client";
import { useInfiniteQuery } from "@tanstack/react-query";

export interface TaggedNotes extends Tag {
  notes: Note[];
}

interface ApiResponse {
  data: TaggedNotes[];
  nextCursor: string | null;
  hasMore: boolean;
}

const LIMIT = 20;

const fetchInfiniteData = async ({
  pageParam,
}: {
  pageParam: unknown;
}): Promise<ApiResponse> => {
  const res = await fetch(`/api/tag/list?cursor=${pageParam}&limit=${LIMIT}`);
  const data: ApiResponse = await res.json();
  return data;
};

export const useGetTags = () => {
  return useInfiniteQuery<
    ApiResponse,
    Error,
    { data: TaggedNotes[]; nextCursor: string | null },
    [string]
  >({
    queryKey: ["tags"],
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
