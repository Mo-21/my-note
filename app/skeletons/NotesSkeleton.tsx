import {
  Card,
  Divider,
  CardBody,
  CardFooter,
  Skeleton,
} from "@nextui-org/react";

const NotesSkeleton = () => {
  const mockNotes = [1, 2, 3, 4, 5];
  return (
    <div className="flex mt-5 gap-3 flex-wrap px-5 justify-center">
      {mockNotes.map((note) => (
        <Card className="flex flex-col w-[300px] min-h-[250px]" key={note}>
          <Skeleton className="h-5 w-full" />
          <Divider />
          <CardBody className="flex-grow">
            <Skeleton className="flex-grow w-full" />
          </CardBody>
          <Divider />
          <CardFooter className="mt-auto">
            <Skeleton className="h-5 w-full" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default NotesSkeleton;
