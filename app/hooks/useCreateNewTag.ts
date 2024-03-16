import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Tag } from "@prisma/client";

interface NewTagType {
  name: string;
}

interface UpdatedTagType {
  id: number;
  name: string;
}

interface ApiResponse {
  data: Tag[];
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
        pages: [{ data: [] }],
      };
      queryClient.setQueryData<MutationDataType>(["tags"], {
        ...previousTags,
        pages: [
          {
            data: [newTag, ...previousTags.pages[0].data],
          },
          ...previousTags.pages.slice(1),
        ],
      });

      return { oldTags: previousTags.pages[0].data };
    },
    onSuccess: (newTag, previousNote) => {
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
