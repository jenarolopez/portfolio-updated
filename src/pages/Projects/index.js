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
    <div className="projects">
      {components[tab]}
    </div>
  );
};

export default Projects;
