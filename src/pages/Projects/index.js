import React, { useEffect, useRef, useState } from "react";
import SOSearch from "./SOSearch";
import TableContent from "./TableContent";
import Wolca from "./Wolca";
import Lampara from "./Lampara";
const Projects = (props) => {
  const [tab, setTab] = useState(0);

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
  ];

  return <div className="projects">{components[tab]}</div>;
};

export default Projects;
