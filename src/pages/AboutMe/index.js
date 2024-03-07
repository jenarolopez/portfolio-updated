import React, { useRef } from "react";
import DownIcon from "../../assets/svg/down-line-svgrepo-com.svg";
import DownArrow from "../../assets/svg/DownArrow";
const AboutMe = (props) => {
  const downloadLinkRef = useRef(null);
  const downloadFile = () => {
    downloadLinkRef.current.click();
  };
  return (
    <div className="aboutme">
      <h1>About Me</h1>
      <h2>
        As a developer, I manage databases, backend, and frontend development
        using ReactJS as my primary tool. While I predominantly focus on React
        for web applications, I'm also proficient in other frontend languages
        and frameworks. For mobile app development, I utilize React Native,
        leveraging my ReactJS knowledge seamlessly. In my recent projects, I've
        employed ReactJS for frontend and utilized Scala and NodeExpress for the
        backend. Additionally, I explore game development using C#. I'm eager to
        expand my programming language expertise to create a diverse range of
        applications.
      </h2>
      <h2>
        My hobbies are playing computer games, drawing, listening to music,
        watching shows, reading and more. But usually on my freetime I just play
        games and read stuffs like news and articles that I find interesting
        like programming stuffs.
      </h2>
      <div className="parent-button">
        <span onClick={downloadFile}>
          My Resume
          <DownArrow className="down-arrow" />
        </span>
        <div className="line" style={{transform: "translateX(-8px) translateY(-5px)"}}></div>
        <a ref={downloadLinkRef} href="./resume/resume.pdf"/>
      </div>
    </div>
  );
};

export default AboutMe;
