import { useState, useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./Components/Navigations/ProtectedRoute";
import Login from "./Components/Auth/Login";
import Home from "./Components/Home/Home";
import Register from "./Components/Auth/Register";
import About from "./Components/About/About";
import Contact from "./Components/Contact/Contact";
import Profile from "./Components/Profile/Profile";
import { getAuth, signOut } from "firebase/auth";
import menu from "./assets/Icons/menu.svg";
import { motion } from "framer-motion";
function App() {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [userDAta, setuserData] = useState(null);
  const variants = {
    open: { opacity: 1, x: 0 },
    closed: {
      opacity: viewportWidth < 768 ? 0 : 1,
      x: viewportWidth < 768 ? "-100%" : 0,
    },
  };

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className="relative">
        <motion.img
          className="block md:hidden"
          src={menu}
          onClick={() => setIsOpen((isOpen) => !isOpen)}
        />
        <div className="">
          <motion.div
            animate={isOpen ? "open" : "closed"}
            variants={variants}
            className=" absolute top-0 z-20 h-screen md:h-20 w-96 md:w-full bg-black p-4 shadow-md"
          >
            <h1
              onClick={() => {
                setIsOpen(false);
              }}
              className="block md:hidden text-white font-semibold text-3xl float-right"
            >
              x
            </h1>
            <div className="md:m-auto mt-12 flex flex-col justify-start items-start md:flex-row md:justify-evenly md:items-center max-w-screen-xl m-auto">
              <a className="font-black text-white cursor-default">
                VisitSrilanka.lk
              </a>
              <ul className="flex flex-col md:flex-row text-white">
                <li
                  onClick={() => {
                    setIsOpen(false);
                  }}
                  className="cursor-pointer px-2 text-lg font-semibold md:pt-0 pt-4"
                >
                  <Link to={"/"}>Home</Link>
                </li>
                <li
                  onClick={() => {
                    setIsOpen(false);
                  }}
                  className="cursor-pointer px-2 text-lg font-semibold md:pt-0 pt-4"
                >
                  <a>Services</a>
                </li>
                {userDAta ? (
                  <></>
                ) : (
                  <li
                    onClick={() => {
                      setIsOpen(false);
                    }}
                    className="cursor-pointer px-2 text-lg font-semibold md:pt-0 pt-4"
                  >
                    <Link>Register</Link>
                  </li>
                )}
                <li
                  onClick={() => {
                    if (userDAta == null) {
                      setOpen(true);
                      setIsOpen(false);
                    }
                  }}
                  className="cursor-pointer px-2 text-lg font-semibold md:pt-0 pt-4"
                >
                  <Link to={"/profile"}>Profile</Link>
                </li>
                <li
                  onClick={() => {
                    setIsOpen(false);
                  }}
                  className="cursor-pointer px-2 text-lg font-semibold md:pt-0 pt-4"
                >
                  <Link to={"/about"}>About Us</Link>
                </li>
                <li
                  onClick={() => {
                    setIsOpen(false);
                  }}
                  className="cursor-pointer px-2 text-lg font-semibold md:pt-0 pt-4"
                >
                  <Link to={"/contact"}>Contact Us</Link>
                </li>
              </ul>
              {userDAta ? (
                <button
                  className="bg-white px-8 py-2 font-semibold md:m-0 my-8 "
                  onClick={() => {
                    const auth = getAuth();
                    signOut(auth)
                      .then(() => {
                        setuserData(null);
                        setIsOpen(false);
                      })
                      .catch((error) => {
                        // An error happened.
                      });
                  }}
                >
                  SingOut
                </button>
              ) : (
                <button
                  className="bg-white px-8 py-2 font-semibold md:m-0 my-8 "
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  Login
                </button>
              )}
            </div>
          </motion.div>
        </div>

        <Login
          open={open}
          setOpen={setOpen}
          setIsOpen={setIsOpen}
          setuserData={setuserData}
        />
        <Routes>
          <Route element={<ProtectedRoute userDAta={userDAta} />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/" element={<Home />} />

          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
