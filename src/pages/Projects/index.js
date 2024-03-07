import React, { useEffect, useRef, useState } from "react";
import SOSearch from "./SOSearch";
import TableContent from "./TableContent";
import Wolca from "./Wolca";
import Lampara from "./Lampara";
import UPPFI from "./UPPFI";
import AIF from "./AIF";
import Others from "./Others";
const Projects = (props) => {
  const [tab, setTab] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);
  const [isEndReached, setIsEndReached] = useState(false);
  const [init, setInit] = useState(false);
  const [timingInterval, setTimingInterval] = useState();
  const scrollableDivRef = useRef(null);
  let startY = 0;

  useEffect(() => {
    const handleScroll = (event) => {
      event.preventDefault();
      const delta = Math.max(-1, Math.min(1, event.deltaY || -event.detail));
      scrollableDivRef.current.scrollTop += delta * 40; // Adjust scrolling speed as needed
    };

    const handleMouseDown = (event) => {
      startY = event.clientY;
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    };

    const handleMouseMove = (event) => {
      event.preventDefault();
      const deltaY = event.clientY - startY;
      scrollableDivRef.current.scrollTop -= deltaY * 2; // Adjust scrolling speed as needed
      startY = event.clientY;
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    scrollableDivRef?.current?.addEventListener("wheel", handleScroll);
    scrollableDivRef?.current?.addEventListener("mousedown", handleMouseDown);

    return () => {
      clearInterval(timingInterval);
      scrollableDivRef?.current?.removeEventListener("wheel", handleScroll);
      scrollableDivRef?.current?.removeEventListener(
        "mousedown",
        handleMouseDown
      );
    };
  }, []);

  useEffect(() => {
    if (props.resetTab) {
      setTab(0);
      props.setResetTab(false);
    }
  }, [props.resetTab]);

  const components = [
    <TableContent setTab={setTab} />,
    <SOSearch setTab={setTab} />,
    <Wolca setTab={setTab} />,
    <Lampara setTab={setTab} />,
    <UPPFI setTab={setTab} />,
    <AIF setTab={setTab} />,
    <Others setTab={setTab} />,
  ];

  return (
    <div className="projects" ref={scrollableDivRef}>
      {components[tab]}
    </div>
  );
};

export default Projects;
