"use client";
import { Divider, Tab, Tabs } from "@nextui-org/react";
import AddNewNote from "./AddNewNote";
import NotesIcon from "./assets/NotesIcon";
import ArchiveIcon from "./assets/ArchiveIcon";
import ErrorCallout from "./components/ErrorCallout";
import { useNotesContext } from "./hooks/useNotesContext";
import NotesSkeleton from "./skeletons/NotesSkeleton";
import NotesList from "./components/NoteList";

const TabsNavigation = () => {
  const {
    filteredNotes: notes,
    isLoading,
    error,
    fetchNextPage,
    isFetchingNextPage,
  } = useNotesContext();

  if (error) return <ErrorCallout>{error.message}</ErrorCallout>;
  if (isLoading) return <NotesSkeleton />;

  return (
    <Tabs
      size="lg"
      className="flex justify-center"
      variant="underlined"
      aria-label="Tabs"
    >
      <Tab
        key="notes"
        title={
          <div className="flex items-center space-x-2">
            <NotesIcon width={22} height={22} />
            <span>Notes</span>
          </div>
        }
        className="pt-0"
      >
        <AddNewNote />
        <NotesList
          notes={notes.pinnedNotes}
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
        <Divider className="my-3" />
        <NotesList
          notes={notes.unpinnedNotes}
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      </Tab>
      <Tab
        key="archived-notes"
        title={
          <div className="flex items-center space-x-2">
            <ArchiveIcon width={22} height={22} />
            <span>Archive</span>
          </div>
        }
      >
        <NotesList
          notes={notes.archivedNotes}
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      </Tab>
    </Tabs>
  );
};

export default TabsNavigation;
