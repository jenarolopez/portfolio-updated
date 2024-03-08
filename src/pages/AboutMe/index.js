import React, { useRef, useState, useEffect } from "react";
import DownIcon from "../../assets/svg/down-line-svgrepo-com.svg";
import DownArrow from "../../assets/svg/DownArrow";
import RightArrow from "../../assets/svg/RightArrow";
const AboutMe = (props) => {
  const downloadLinkRef = useRef(null);
  const downloadFile = () => {
    downloadLinkRef.current.click();
  };
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

    const handleTouchStart = (event) => {
      startY = event.touches[0].clientY;
    };

    const handleTouchMove = (event) => {
      event.preventDefault();
      const deltaY = event.touches[0].clientY - startY;
      scrollableDivRef.current.scrollTop -= deltaY * 2; // Adjust scrolling speed as needed
      startY = event.touches[0].clientY;
    };

    scrollableDivRef?.current?.addEventListener("wheel", handleScroll);
    scrollableDivRef?.current?.addEventListener("mousedown", handleMouseDown);
    scrollableDivRef?.current?.addEventListener("touchstart", handleTouchStart);
    scrollableDivRef?.current?.addEventListener("touchmove", handleTouchMove);
    return () => {
      scrollableDivRef?.current?.removeEventListener("wheel", handleScroll);
      scrollableDivRef?.current?.removeEventListener(
        "mousedown",
        handleMouseDown
      );
      scrollableDivRef?.current?.removeEventListener(
        "touchstart",
        handleTouchStart
      );
      scrollableDivRef?.current?.removeEventListener(
        "touchmove",
        handleTouchMove
      );
    };
  }, []);

  return (
    <div className="aboutme" ref={scrollableDivRef}>
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
      <div className="flex flex-row" style={{justifyContent: "center", alignItems:"center"}}>
        <div className="parent-button">
          <span onClick={downloadFile}>
            My Resume
            <DownArrow className="down-arrow" />
          </span>
          <div
            className="line"
            style={{ transform: "translateX(-8px) translateY(-5px)" }}
          ></div>
          <a ref={downloadLinkRef} href="./resume/resume.pdf" />
        </div>
        <div className="parent-button">
          <span onClick={props.nextPage}>
            Projects
            <RightArrow className="down-arrow" />
          </span>
          <div
            className="line"
            style={{ transform: "translateX(-3px) translateY(0px)" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
