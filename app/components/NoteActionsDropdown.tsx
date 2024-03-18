"use client";
import EditIcon from "../assets/EditIcon";
import GripIcon from "../assets/GripIcon";
import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import PinIcon from "../assets/PinIcon";
import DeleteIcon from "../assets/DeleteIcon";
import { Note as PrismaNote, Tag } from "@prisma/client";
import ArchiveNoteIcon from "../assets/ArchiveNoteIcon";
import UnArchiveNoteIcon from "../assets/UnArchiveNoteIcon";
import useCreateAndUpdateNote from "../hooks/useCreateAndUpdateNote";
import useDeleteNote from "../hooks/useDeleteNote";
import { useActiveNote } from "../hooks/useActiveNote";
import TagDropdown from "./TagDropdown";

interface Note extends PrismaNote {
  tags?: Tag[];
}

const iconClasses =
  "text-xl text-default-500 pointer-events-none flex-shrink-0";

const NoteActionsDropdown = ({ note }: { note: Note }) => {
  const { dispatch } = useActiveNote();
  const { mutate } = useDeleteNote();
  const { mutate: updateNote } = useCreateAndUpdateNote(true);

  const handleButtonClick = (key: "PIN" | "ARCHIVE") => {
    updateNote({
      id: note.id,
      title: note.title ? note.title : "",
      content: note.content,
      userId: -1,
      NoteType: note.NoteType,
      createdAt: note.createdAt,
      updatedAt: new Date(),
      isPinned: key === "PIN" ? !note.isPinned : note.isPinned,
      isArchived: key === "ARCHIVE" ? !note.isArchived : note.isArchived,
    });
  };

  return (
    <Dropdown aria-label="Note Actions" shouldBlockScroll={false}>
      <DropdownTrigger aria-label="Tag trigger">
        <Button isIconOnly variant="light" size="sm">
          <GripIcon width={20} height={20} />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Note Actions menu">
        <DropdownItem
          aria-label="Note Actions item"
          key="edit"
          startContent={
            <EditIcon width={20} height={20} className={iconClasses} />
          }
          onClick={() => {
            dispatch({ type: "EDIT", payload: note });
          }}
        >
          Edit
        </DropdownItem>
        <DropdownItem
          aria-label="Note Actions item"
          key="pin"
          startContent={
            <PinIcon width={20} height={20} className={iconClasses} />
          }
          onClick={() => handleButtonClick("PIN")}
        >
          {note.isPinned ? "Unpin" : "Pin"}
        </DropdownItem>
        <DropdownItem
          aria-label="Note Actions item"
          key="archive"
          startContent={
            !note.isArchived ? (
              <ArchiveNoteIcon width={20} height={20} />
            ) : (
              <UnArchiveNoteIcon width={20} height={20} />
            )
          }
          onClick={() => handleButtonClick("ARCHIVE")}
        >
          {note.isArchived ? "Unarchive" : "Archive"}
        </DropdownItem>
        <DropdownItem aria-label="Note Actions item" key="tag">
          <TagDropdown note={note} tags={note.tags} />
        </DropdownItem>
        <DropdownItem
          aria-label="Note Actions item"
          key="delete"
          startContent={<DeleteIcon width={20} height={20} />}
          onClick={() => mutate(note.id)}
        >
          Delete
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default NoteActionsDropdown;
