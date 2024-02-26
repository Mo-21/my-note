import { useEffect, useState } from "react";
import { useGetNotes } from "./useGetNotes";

interface NewNoteType {
  content: string;
  title?: string | null | undefined;
}

export const useCreateNote = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState<NewNoteType>({ title: "", content: "" });

  const { refetch } = useGetNotes();

  useEffect(() => {
    const fetchNotes = async () => {
      setIsSubmitting(true);

      try {
        await fetch("/api/note/new", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .catch(() => {
            setIsError(true);
          })
          .finally(() => {
            setIsSubmitting(false);
            refetch();
          });
      } catch (error) {
        setIsError(true);
        console.error(error);
      }
    };
    fetchNotes();
  }, [data, refetch]);

  return { isSubmitting, isError, setData };
};
