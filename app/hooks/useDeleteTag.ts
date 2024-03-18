import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useDeleteTag = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["infinite_notes"],
    mutationFn: async (tagId: string) => {
      const response = await fetch("/api/tag/connection/delete", {
        method: "DELETE",
        body: JSON.stringify(tagId),
      });
      if (!response.ok) {
        throw new Error("Failed to delete the note");
      }
      return response.json();
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
