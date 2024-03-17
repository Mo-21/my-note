import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Tag } from "@prisma/client";
import toast from "react-hot-toast";

interface NewTagType {
  name: string;
}

interface UpdatedTagType {
  id: number;
  name: string;
}

interface ApiResponse {
  data: Tag[];
  nextCursor: string | null;
  hasMore: boolean;
}

interface MutationDataType {
  pageParam: number[];
  pages: ApiResponse[];
}

interface ContextType {
  oldTags: Tag[];
}

const fetchNewTag = async (payload: NewTagType): Promise<Tag> => {
  const response = await fetch("/api/tag/new", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (response.status === 400) toast.error(data.message);

  return data;
};

const updateTag = async (payload: UpdatedTagType): Promise<Tag> => {
  const response = await fetch("/api/tag/edit", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  return data;
};

const useCreateTag = () => {
  const queryClient = useQueryClient();
  return useMutation<Tag, Error, Tag, ContextType>({
    mutationKey: ["tags"],
    mutationFn: fetchNewTag,
    onMutate: async (newTag) => {
      const previousTags = queryClient.getQueryData<MutationDataType>([
        "tags",
      ]) || {
        pageParam: [0],
        pages: [{ data: [], hasMore: true, nextCursor: "1" }],
      };
      queryClient.setQueryData<MutationDataType>(["tags"], {
        ...previousTags,
        pages: [
          {
            data: [...previousTags.pages[0].data, newTag],
            hasMore: previousTags.pages[0].hasMore,
            nextCursor: previousTags.pages[0].nextCursor,
          },
          ...previousTags.pages.slice(1),
        ],
      });

      return { oldTags: previousTags.pages[0].data };
    },
    onSuccess: (newTag, previousTags) => {
      queryClient.invalidateQueries({ queryKey: ["tags"] });
    },
    onError: (error, newTag, ctx) => {
      if (!ctx) return;
      queryClient.setQueryData<MutationDataType>(["tags"], (data) => {
        if (!data) return data;
        const previousData: MutationDataType = {
          ...data,
          pages: [
            {
              data: ctx.oldTags,
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
export default useCreateTag;
