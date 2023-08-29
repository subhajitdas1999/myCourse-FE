import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Courses from "./Courses.tsx";
import Header from "./Header.tsx";
import CourseDetail from "./CourseDetail.tsx";

function App() {
  return (
    <Router>
      <div className=" bg-dark min-h-screen px-10 py-5">
        <Header />
        <Routes>
          <Route path="/" Component={Courses} />
          <Route path="/courses/:courseId" Component={CourseDetail} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
