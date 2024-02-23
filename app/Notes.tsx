"use client";
import {
  Card,
  CardHeader,
  Divider,
  CardBody,
  Skeleton,
  CardFooter,
} from "@nextui-org/react";
import { useGetNotes } from "./hooks/useGetNotes";
import ErrorCallout from "./components/ErrorCallout";

const Notes = () => {
  const { data: notes, isLoading, error } = useGetNotes();

  if (error) return <ErrorCallout>{error.message}</ErrorCallout>;
  if (isLoading)
    return (
      <div className="w-screen flex flex-col gap-2 mt-5">
        <Skeleton className="h-3 w-full rounded-lg" />
        <Skeleton className="h-3 w-full rounded-lg" />
        <Skeleton className="h-3 w-full rounded-lg" />
      </div>
    );

  return (
    <div className="flex mt-5 gap-3 flex-wrap px-5 justify-center">
      {notes ? (
        notes.map((note, index) => (
          <Card className="flex flex-col w-[300px] min-h-[250px]" key={index}>
            {note.title ? (
              <>
                <CardHeader className="flex gap-3">{note.title}</CardHeader>
                <Divider />
              </>
            ) : (
              ""
            )}
            <CardBody className="flex-grow">
              <p>{note.content}</p>
            </CardBody>
            <Divider />
            <CardFooter className="mt-auto">
              <div className="text-sm">
                {note.updatedAt.toString().split("T")[0]}
              </div>
            </CardFooter>
          </Card>
        ))
      ) : (
        <div>There are no notes</div>
      )}
    </div>
  );
};

export default Notes;
