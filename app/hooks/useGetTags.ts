import { Tag, Note } from "@prisma/client";
import { useInfiniteQuery } from "@tanstack/react-query";

export interface TaggedNotes extends Tag {
  notes: Note[];
}

interface ApiResponse {
  data: TaggedNotes[];
  hasMore: boolean;
}

const LIMIT = 10;

const fetchInfiniteData = async ({
  pageParam,
}: {
  pageParam: unknown;
}): Promise<ApiResponse> => {
  const res = await fetch(`/api/tag/list?cursor=${pageParam}&limit=${LIMIT}`);
  const data: ApiResponse = await res.json();
  return data;
};

export const useGetTags = (shouldFetch: boolean) => {
  return useInfiniteQuery<
    ApiResponse,
    Error,
    { data: TaggedNotes[] },
    [string]
  >({
    queryKey: ["tags"],
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
