"use client";
import { useState } from "react";
import RightArrowIcon from "../assets/RightArrowIcon";
import TagIcon from "../assets/TagIcon";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { Tag, Note } from "@prisma/client";
import { SelectorIcon } from "../assets/SelectorIcon";
import { useTagsContext } from "../hooks/useTagsContext";
import { useCreateTagConnection } from "../hooks/useCreateTagConnection";

interface TagDropdownProps {
  tags?: Tag[];
  note: Note;
}

const TagDropdown = ({ tags, note }: TagDropdownProps) => {
  const [isChildDropdownOpen, setIsChildDropdownOpen] = useState(false);
  const { tags: availableTags } = useTagsContext();
  const { mutate } = useCreateTagConnection();

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
        <DropdownSection title="Note Tags" showDivider>
          <DropdownItem
            aria-label="Tag item"
            key="tag"
            startContent={
              tags &&
              tags.map((t) => (
                <div className="flex items-center gap-2" key={t.id}>
                  <TagIcon width={20} height={20} />
                  <div>{t.name}</div>
                </div>
              ))
            }
          />
        </DropdownSection>
        <DropdownItem aria-label="Tag item">
          <Select
            size="sm"
            aria-label="Tag selection"
            placeholder="Select a tag"
            className="max-w-xs"
            selectorIcon={<SelectorIcon width={20} height={20} />}
            onChange={(e) => {
              const selectedId = e.target.value;
              if (!availableTags) return;
              const selectedTag = availableTags.data.find(
                (tag) => tag.id === selectedId
              );
              if (!selectedTag) return;
              mutate({
                note,
                tag: selectedTag,
              });
            }}
          >
            {availableTags && availableTags.data ? (
              availableTags.data.map((t) => (
                <SelectItem key={t.id} value={t.id}>
                  {t.name}
                </SelectItem>
              ))
            ) : (
              <></>
            )}
          </Select>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default TagDropdown;
