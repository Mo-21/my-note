"use client";
import NotesList from "./NoteList";
import ErrorCallout from "./ErrorCallout";
import NotesSkeleton from "../skeletons/NotesSkeleton";
import { Tab, Tabs, Input, Button, Divider } from "@nextui-org/react";
import { SubmitHandler, useForm } from "react-hook-form";
import AddIcon from "../assets/AddIcon";
import useCreateTag from "../hooks/useCreateNewTag";
import { NewTagSchemaType, tagSchema } from "@/prisma/schema/newTagSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTagsContext } from "../hooks/useTagsContext";
import useDeleteTag from "../hooks/useDeleteTag";

const TagsTab = () => {
  const { tags, fetchNextPage, isFetchingNextPage, isLoading, error } =
    useTagsContext();

  const { mutate: deleteTag } = useDeleteTag();

  if (error) return <ErrorCallout>{error.message}</ErrorCallout>;
  if (isLoading) return <NotesSkeleton />;

  return (
    <div>
      <Tabs
        size="md"
        variant="bordered"
        aria-label="Tabs"
        className="flex justify-center"
      >
        <Tab
          title={<div className="flex items-center space-x-2">Create New</div>}
        >
          <CreateTag />
        </Tab>
        {tags?.data.map((t, index) => (
          <Tab
            key={index}
            title={<div className="flex items-center space-x-2">{t.name}</div>}
          >
            <div className="p-3">
              <Button
                onClick={() => deleteTag(t.id)}
                color="danger"
                variant="flat"
                className="m-2"
              >
                Delete Tag
              </Button>
              <Divider />
            </div>
            <NotesList
              noteKey="UNPINNED"
              notes={t.notes}
              fetchNextPage={fetchNextPage}
              isFetchingNextPage={isFetchingNextPage}
            />
          </Tab>
        ))}
      </Tabs>
    </div>
  );
};

const CreateTag = () => {
  const { register, handleSubmit, reset } = useForm<NewTagSchemaType>({
    resolver: zodResolver(tagSchema),
  });
  const { mutate: mutateNewTag } = useCreateTag();

  const formSubmit: SubmitHandler<NewTagSchemaType> = async (data, e) => {
    e?.preventDefault();
    e?.stopPropagation();

    mutateNewTag({
      id: "-1",
      name: data.name,
      createdAt: new Date(),
      userId: "-1",
      notesIDs: [],
    });

    reset({ name: "" });
  };

  return (
    <div>
      <div aria-label="Tag options" className="flex gap-2 items-center">
        <Input
          variant="underlined"
          size="sm"
          type="text"
          placeholder="Create new tag"
          {...register("name")}
        />
        <Button
          onClick={handleSubmit(formSubmit)}
          className="flex items-center"
          size="lg"
          variant="ghost"
        >
          Create Tag
          <AddIcon width={30} height={30} />
        </Button>
      </div>
    </div>
  );
};

export default TagsTab;
