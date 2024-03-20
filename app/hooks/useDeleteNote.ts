import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { MutationDataType } from "./useCreateAndUpdateNote";

const deleteNote = async (noteID: string) => {
  const response = await fetch("/api/note/delete", {
    method: "DELETE",
    body: JSON.stringify(noteID),
  });
  if (!response.ok) {
    throw new Error("Failed to delete the note");
  }
  return response.json();
};

const useDeleteNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["infinite_notes"],
    mutationFn: deleteNote,
    onMutate: async (deletedNoteId) => {
      const previousNotes = queryClient.getQueryData<MutationDataType>([
        "infinite_notes",
      ]);

      if (previousNotes) {
        const updatedPages = previousNotes.pages.map((page) => ({
          ...page,
          data: page.data.filter((note) => note.id !== deletedNoteId),
        }));
        queryClient.setQueryData<MutationDataType>(["infinite_notes"], {
          ...previousNotes,
          pages: updatedPages,
        });
      }
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
