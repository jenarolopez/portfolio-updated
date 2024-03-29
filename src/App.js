import logo from "./logo.svg";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./App.css";
import { useEffect, useState } from "react";

import Welcome from "./pages/Welcome";
import AboutMe from "./pages/AboutMe";
import Projects from "./pages/Projects";
import ContactMe from "./pages/ContactMe";
import Close from "./assets/svg/Close";
import Hamburger from "./assets/svg/Hamburger";

function App() {
  const [currentTab, setCurrentTab] = useState(0);
  const [resetTab, setResetTab] = useState(false);
  const [sidebarOpen, setSideBarOpen] = useState(false);
  const components = [
    <Welcome
      nextPage={() => {
        setCurrentTab(currentTab + 1);
      }}
    />,
    <AboutMe
      nextPage={() => {
        setCurrentTab(currentTab + 1);
      }}
    />,
    <Projects resetTab={resetTab} setResetTab={setResetTab} />,
    <ContactMe />,
  ];
  const [loadBackground, setLoadBackground] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setLoadBackground(true);
    }, 1000);
  }, []);
  return (
    <div className="App">
      <span
        className={`side-button-open pointer ${
          sidebarOpen ? "remove-burger" : ""
        }`}
        onClick={() => {
          setSideBarOpen(true);
        }}
      >
        <Hamburger />
      </span>
      {/* <div className="carousel-container">{carousel[currentTab]}</div> */}
      {[0, 1, 2, 3].map((index) => {
        const bg = "bg" + (index + 1);
        return (
          <div
            className={`wallpaper ${bg} ${
              index == 0 || index == currentTab ? "visible" : "hidden"
            }`}
          />
        );
      })}
      <div
        className={`wallpaper bg-default`}
        style={{ zIndex: loadBackground ? -10 : -1 }}
      />

      <div
        className={`flex flex-col content-left ${
          sidebarOpen ? "side-open" : "side-close close"
        }`}
      >
        <span
          className="side-button-close pointer"
          onClick={() => {
            setSideBarOpen(false);
          }}
        >
          <Close />
        </span>
        <div className={`bg-default background`} />
        <span
          onClick={() => {
            setCurrentTab(0);
            setSideBarOpen(false);
          }}
          onMouseEnter={(e) => {
            // console.log(e, "123");
          }}
          className="pointer"
        >
          <div className="title">Welcome</div>
        </span>
        <span
          onClick={() => {
            setCurrentTab(1);
            setSideBarOpen(false);
          }}
          className="pointer"
        >
          <div className="title">About Me</div>
        </span>
        <span
          onClick={() => {
            setCurrentTab(2);
            setSideBarOpen(false);
            setResetTab(true);
          }}
          className="pointer"
        >
          <div className="title">Projects</div>
        </span>
        <span
          onClick={() => {
            setCurrentTab(3);
            setSideBarOpen(false);
          }}
          className="pointer"
        >
          <div className="title">Contact Me</div>
        </span>
      </div>

      <div className="content-right">{components[currentTab]}</div>
    </div>
  );
}

export default App;
