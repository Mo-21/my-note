"use client";
import AddIcon from "../assets/AddIcon";
import { useState } from "react";
import RightArrowIcon from "../assets/RightArrowIcon";
import TagIcon from "../assets/TagIcon";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
} from "@nextui-org/react";
import { Tag } from "@prisma/client";
import { useForm, SubmitHandler } from "react-hook-form";
import useCreateTag from "../hooks/useCreateNewTag";
import { useNotesContext } from "../hooks/useNotesContext";
import { useCreateTagConnection } from "../hooks/useCreateTagConnection";

interface TagDropdownProps {
  tags?: Tag[];
  noteId: number;
}

const TagDropdown = ({ tags, noteId }: TagDropdownProps) => {
  const [isChildDropdownOpen, setIsChildDropdownOpen] = useState(false);

  const { register, handleSubmit } = useForm<{ tagName: string }>();
  const { mutateAsync: mutateNewTag } = useCreateTag();
  const { mutateAsync: mutateConnection } = useCreateTagConnection();
  const { refetch } = useNotesContext();

  const formSubmit: SubmitHandler<{ tagName: string }> = async (data, e) => {
    e?.preventDefault();
    e?.stopPropagation();

    try {
      const tag = await mutateNewTag({
        id: -1,
        name: data.tagName,
        createdAt: new Date(),
      });

      await mutateConnection({ tag, noteId });
    } catch (error) {
      console.log(error);
    } finally {
      refetch();
    }
  };

  return (
    <Dropdown aria-label="Tags" isOpen={isChildDropdownOpen}>
      <DropdownTrigger
        aria-label="Tag trigger"
        onMouseEnter={() => {
          setIsChildDropdownOpen(true);
        }}
        onMouseLeave={() => {
          setIsChildDropdownOpen(false);
        }}
      >
        <div aria-label="Tag options" className="flex justify-between">
          <div aria-label="Tag options icon" className="flex gap-2">
            <TagIcon width={20} height={20} />
            <span>Tag</span>
          </div>
          <RightArrowIcon width={20} height={20} />
        </div>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Tag menu"
        onMouseEnter={() => {
          setIsChildDropdownOpen(true);
        }}
        onMouseLeave={() => {
          setIsChildDropdownOpen(false);
        }}
      >
        <DropdownItem
          aria-label="Tag item"
          key="tag"
          startContent={tags && tags.map((t) => <div key={t.id}>{t.name}</div>)}
        />
        <DropdownItem aria-label="Tag item">
          <div aria-label="Tag options" className="flex gap-2 items-center">
            <Input
              size="sm"
              type="text"
              placeholder="Create new tag"
              {...register("tagName")}
            />
            <Button
              onClick={handleSubmit(formSubmit)}
              isIconOnly
              size="sm"
              variant="light"
            >
              <AddIcon width={30} height={30} />
            </Button>
          </div>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default TagDropdown;
