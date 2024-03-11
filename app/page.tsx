"use client";
import { Tab, Tabs } from "@nextui-org/react";
import React from "react";
import AddNewNote from "./AddNewNote";
import Notes from "./Notes";
import NotesIcon from "./assets/NotesIcon";
import ArchiveIcon from "./assets/ArchiveIcon";
import ArchivedNotes from "./ArchivedNotes";

const TabsNavigation = () => {
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
        <Notes />
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
        <ArchivedNotes />
      </Tab>
    </Tabs>
  );
};

export default TabsNavigation;
