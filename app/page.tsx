import NavigationBar from "./NavigationBar";
import AddNewNote from "./AddNewNote";
import Notes from "./Notes";

export default function Home() {
  return (
    <div>
      <NavigationBar />
      <AddNewNote />
      <Notes />
    </div>
  );
}
