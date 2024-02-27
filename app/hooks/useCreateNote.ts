import { useEffect, useState } from "react";
import { useGetInfiniteNotes } from "./useGetNotes";

interface NewNoteType {
  content: string;
  title?: string | null | undefined;
}

//TODO: use react-query to mutate
export const useCreateNote = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState<NewNoteType | null>(null);

  const { refetch } = useGetInfiniteNotes();

  useEffect(() => {
    const fetchNotes = async () => {
      if (data === null || data === undefined) return;

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
