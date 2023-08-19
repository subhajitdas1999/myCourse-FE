import { useState } from "react";
import axiosInstance from "./AxiosInstance";

const Header = () => {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isLogInOpen, setIsLogInOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [userDataForAuth, setUserDataForAuth] = useState({
    userName: "Subhajit",
    email: "Subhajit@gmail.com",
    password: "Subhajit123",
  });
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleUserDataChange = (event: any) => {
    const { name, value } = event.target;
    setUserDataForAuth((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const openSignUpModal = () => {
    setIsSignUpOpen(true);
  };

  const closeSignUpModal = () => {
    setUserDataForAuth({
      userName: "",
      email: "",
      password: "",
    });
    setIsSignUpOpen(false);
  };

  const openLogInModal = () => {
    setIsLogInOpen(true);
  };

  const closeLogInModal = () => {
    setUserDataForAuth({
      userName: "",
      email: "",
      password: "",
    });
    setIsLogInOpen(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSignUp = async (e: any) => {
    e.preventDefault();
    // console.log(userDataForAuth);
    const signupData = {
      userName: userDataForAuth.userName,
      email: userDataForAuth.email,
      password: userDataForAuth.password,
    };

    try {
      const response = await axiosInstance.post("auth/signup", signupData, {
        withCredentials: true,
      });
      console.log(response);

      // Handle success response here
    } catch (error) {
      // Handle error response here
      console.error(error);
    }

    // Perform sign up logic
    setIsLoggedIn(true);
    setIsSignUpOpen(false);
    setUserDataForAuth({
      userName: "",
      email: "",
      password: "",
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleLogIn = async (e: any) => {
    e.preventDefault();
    const logInData = {
      email: userDataForAuth.email,
      password: userDataForAuth.password,
    };
    try {
      const response = await axiosInstance.post("auth/login", logInData, {
        withCredentials: true,
      });
      console.log(response);

      // Handle success response here
    } catch (error) {
      // Handle error response here
      console.error(error);
    }
    // Perform log in logic
    setIsLoggedIn(true);
    setIsLogInOpen(false);
  };

  const handleLogout = async () => {
    try {
      const response = await axiosInstance.post(
        "auth/logout",
        {},
        {
          withCredentials: true,
        }
      );
      console.log(response);

      // Handle success response here
    } catch (error) {
      // Handle error response here
      console.error(error);
    }
    // Perform logout logic
    setIsLoggedIn(false);
  };

  return (
    <header className="text-white p-4 border-2 border-white border-solid">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-semibold">Home</h1>
        <nav className="">
          {isLoggedIn ? (
            <ul className="flex space-x-4">
              <li>
                <button onClick={handleLogout} className="hover:text-gray-300">
                  Logout
                </button>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Profile
                </a>
              </li>
            </ul>
          ) : (
            <ul className="flex space-x-4">
              <li>
                <button
                  onClick={openSignUpModal}
                  className="hover:text-gray-300"
                >
                  Sign Up
                </button>
              </li>
              <li>
                <button
                  onClick={openLogInModal}
                  className="hover:text-gray-300"
                >
                  Log In
                </button>
              </li>
            </ul>
          )}
        </nav>
      </div>
      {isSignUpOpen && (
        <div className="fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-dark p-4 rounded-lg">
            <div className="flex justify-end">
              <button onClick={closeSignUpModal} className="text-white">
                &times;
              </button>
            </div>
            <h2 className="text-xl font-semibold mb-4 text-white">Sign Up</h2>
            <form onSubmit={handleSignUp}>
              <div className="mb-4">
                <label className="block text-gray-300">Username</label>
                <input
                  type="text"
                  required
                  className="w-full bg-gray-800 text-white p-2 rounded"
                  placeholder="subhajit1999"
                  name="userName"
                  value={userDataForAuth.userName}
                  onChange={handleUserDataChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-300">Email</label>
                <input
                  type="email"
                  required
                  className="w-full bg-gray-800 text-white p-2 rounded"
                  placeholder="subhajit@gmail.com"
                  name="email"
                  value={userDataForAuth.email}
                  onChange={handleUserDataChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-300">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    className="w-full bg-gray-800 text-white p-2 rounded pr-10"
                    name="password"
                    value={userDataForAuth.password}
                    onChange={handleUserDataChange}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-300"
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                className="bg-violet text-white py-2 px-4 rounded hover:bg-gray-700"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      )}
      {isLogInOpen && (
        <div className="fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-dark p-4 rounded-lg">
            <div className="flex justify-end">
              <button onClick={closeLogInModal} className="text-white">
                &times;
              </button>
            </div>
            <h2 className="text-xl font-semibold mb-4 text-white">Log In</h2>
            <form onSubmit={handleLogIn}>
              <div className="mb-4">
                <label className="block text-gray-300">Email</label>
                <input
                  type="email"
                  required
                  className="w-full bg-gray-800 text-white p-2 rounded"
                  placeholder="subhajit@gmail.com"
                  name="email"
                  value={userDataForAuth.email}
                  onChange={handleUserDataChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-300">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    className="w-full bg-gray-800 text-white p-2 rounded pr-10"
                    name="password"
                    value={userDataForAuth.password}
                    onChange={handleUserDataChange}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-300"
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                className="bg-violet text-white py-2 px-4 rounded hover:bg-gray-700"
              >
                Log In
              </button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
