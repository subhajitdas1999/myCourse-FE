import Courses from "./Courses.tsx";
import Header from "./Header.tsx";

function App() {
  return (
    <div className=" bg-dark h-screen w-screen px-10 py-5">
      <Header />
      <Courses />
      {/* Your main content */}
    </div>
  );
}

export default App;
