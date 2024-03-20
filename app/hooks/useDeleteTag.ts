import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { MutationTagType } from "./useCreateNewTag";

const deleteTag = async (tagId: string) => {
  const response = await fetch("/api/tag/connection/delete", {
    method: "DELETE",
    body: JSON.stringify(tagId),
  });
  if (!response.ok) {
    throw new Error("Failed to delete the note");
  }
  return response.json();
};

const useDeleteTag = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["infinite_notes"],
    mutationFn: deleteTag,
    onMutate: async (deletedTagId) => {
      const previousData = queryClient.getQueryData<MutationTagType>(["tags"]);

      if (previousData) {
        const updatedData = previousData.pages.map((page) => ({
          ...page,
          data: page.data.filter((tag) => tag.id !== deletedTagId),
        }));

        queryClient.setQueryData<MutationTagType>(["tags"], {
          ...previousData,
          pages: updatedData,
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["infinite_notes"] });
      queryClient.invalidateQueries({ queryKey: ["tags"] });
      toast.success("Tag deleted successfully");
    },
    onError: (error) =>
      toast.error(
        `Error deleting the note: ${
          error instanceof Error ? error.message : ""
        }`
      ),
  });
};

export default useDeleteTag;
