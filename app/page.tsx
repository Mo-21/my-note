"use client";
import { Tab, Tabs } from "@nextui-org/react";
import AddNewNote from "./AddNewNote";
import Notes from "./Notes";
import NotesIcon from "./assets/NotesIcon";
import ArchiveIcon from "./assets/ArchiveIcon";
import ErrorCallout from "./components/ErrorCallout";
import { useNotesContext } from "./hooks/useNotesContext";
import NotesSkeleton from "./skeletons/NotesSkeleton";

const TabsNavigation = () => {
  const {
    filteredNotes: notes,
    isLoading,
    error,
    fetchNextPage,
    isFetchingNextPage,
    query,
  } = useNotesContext();

  if (error) return <ErrorCallout>{error.message}</ErrorCallout>;
  if (isLoading) return <NotesSkeleton />;

  const archivedNotes = notes.filter((n) => n.isArchived);
  const pinnedNotes = notes.filter((n) => n.isPinned && !n.isArchived);
  const unpinnedNotes = notes.filter((n) => {
    if (query) {
      return !n.isPinned;
    } else if (!query) {
      return !n.isPinned && !n.isArchived;
    }
  });

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
        <Notes
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
          pinnedNotes={pinnedNotes}
          unpinnedNotes={unpinnedNotes}
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
        <Notes
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
          archivedNotes={archivedNotes}
        />
      </Tab>
    </Tabs>
  );
};

export default TabsNavigation;
