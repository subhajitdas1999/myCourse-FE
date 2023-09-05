import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Courses from "./Courses.tsx";
import Header from "./Header.tsx";
import CourseDetail from "./CourseDetail.tsx";
import VideoDisplay from "./VideoDisplay.tsx";
import { Dispatch, SetStateAction, createContext, useState } from "react";

interface User {
  // Define the structure of your user object here
  id: string;
  username: string;
  // ... other properties
}
interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>; // Include setIsLoggedIn
  setUser: Dispatch<SetStateAction<User | null>>;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const authContextValue: AuthContextType = {
    isLoggedIn,
    user,
    setUser,
    setIsLoggedIn, // Include setIsLoggedIn in the context
  };
  return (
    <Router>
      <div className=" bg-dark min-h-screen px-10 py-5">
        <AuthContext.Provider value={authContextValue}>
          <Header />
          <Routes>
            <Route path="/" Component={Courses} />
            <Route path="/courses/:courseId" Component={CourseDetail} />
            <Route
              path="/courses/:courseId/:videoId"
              Component={VideoDisplay}
            />
          </Routes>
        </AuthContext.Provider>
      </div>
    </Router>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export { App, AuthContext };
