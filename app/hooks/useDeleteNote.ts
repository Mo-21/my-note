import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useDeleteNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["infinite_notes"],
    mutationFn: async (noteID: string) => {
      const response = await fetch("/api/note/delete", {
        method: "DELETE",
        body: JSON.stringify(noteID),
      });
      if (!response.ok) {
        throw new Error("Failed to delete the note");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["infinite_notes"] });
      toast.success("Note deleted successfully");
    },
    onError: (error) =>
      toast.error(
        `Error deleting the note: ${
          error instanceof Error ? error.message : ""
        }`
      ),
  });
};

export default useDeleteNote;
