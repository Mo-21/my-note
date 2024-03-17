"use client";
import { Divider, Tab, Tabs } from "@nextui-org/react";
import AddNewNote from "./AddNewNote";
import NotesIcon from "./assets/NotesIcon";
import ArchiveIcon from "./assets/ArchiveIcon";
import TagIcon from "./assets/TagIcon";
import ErrorCallout from "./components/ErrorCallout";
import NotesSkeleton from "./skeletons/NotesSkeleton";
import NotesList from "./components/NoteList";
import { useNotesContext } from "./hooks/useNotesContext";
import { Note } from "@prisma/client";
import TagsTab from "./components/TagsTab";

const TabsNavigation = () => {
  const {
    filteredNotes: notes,
    isLoading,
    error,
    fetchNextPage,
    isFetchingNextPage,
  } = useNotesContext();

  const tabConfigs = [
    {
      key: "notes",
      icon: <NotesIcon width={22} height={22} />,
      title: "Notes",
      notes: [notes.pinnedNotes, notes.unpinnedNotes],
      includeAddNew: true,
    },
    {
      key: "archived-notes",
      icon: <ArchiveIcon width={22} height={22} />,
      title: "Archive",
      notes: [notes.archivedNotes],
    },
    {
      key: "tagged-notes",
      icon: <TagIcon width={22} height={22} />,
      title: "Tag",
    },
  ];

  if (error) return <ErrorCallout>{error.message}</ErrorCallout>;
  if (isLoading) return <NotesSkeleton />;

  return (
    <Tabs
      size="lg"
      className="flex justify-center"
      variant="underlined"
      aria-label="Tabs"
    >
      {tabConfigs.map(({ key, icon, title, notes, includeAddNew }) => (
        <Tab
          key={key}
          title={
            <div className="flex items-center space-x-2">
              {icon}
              <span>{title}</span>
            </div>
          }
          className="pt-0 mt-2"
        >
          <TabContent
            fetchNextPage={fetchNextPage}
            isFetchingNextPage={isFetchingNextPage}
            notes={notes || []}
            includeAddNew={includeAddNew || false}
          />
        </Tab>
      ))}
    </Tabs>
  );
};

const TabContent = ({
  isFetchingNextPage,
  fetchNextPage,
  notes,
  includeAddNew,
}: TabContentProps) => {
  return (
    <>
      {includeAddNew && <AddNewNote />}
      {notes && notes.length > 0 ? (
        notes.map((noteGroup, index) => (
          <div key={index}>
            <NotesList
              notes={noteGroup}
              fetchNextPage={fetchNextPage}
              isFetchingNextPage={isFetchingNextPage}
            />
            {index < notes.length - 1 && <Divider className="my-3" />}
          </div>
        ))
      ) : (
        <TagsTab />
      )}
    </>
  );
};

interface TabContentProps {
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  notes?: Note[][];
  includeAddNew: boolean;
}

export default TabsNavigation;
