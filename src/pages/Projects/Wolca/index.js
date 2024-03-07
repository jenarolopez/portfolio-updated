import React, { useEffect, useRef, useState } from "react";
import WolcaBG from "../../../assets/images/church.png";
import { useEffectOnce } from "../helper.ts";

const Wolca = () => {
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

  useEffectOnce(() => {
    setTimingInterval(
      setInterval(() => {
        if (scrollableDivRef.current) {
          setIsEndReached((prev) => {
            if (prev) {
              return prev;
            }
            return (
              scrollableDivRef.current.scrollTop >
              scrollableDivRef.current.scrollHeight -
                scrollableDivRef.current.clientHeight
            );
          });
          const newTop = parseInt(scrollableDivRef.current.scrollTop + 1.5);
          scrollableDivRef.current.scrollTop = newTop + 1;
        }
      }, 20)
    );
  });

  useEffect(() => {
    if (isEndReached) {
      console.log(timingInterval, "timing");
      clearInterval(timingInterval);
    }
  }, [isEndReached]);

  useEffect(() => {
    return () => {
      clearInterval(timingInterval);
    };
  }, [timingInterval]);

  return (
    <div>
      <h1>World of Life Christian Assembly Website</h1>
      <div className="grid">
        <div className={`flex flex-col img-container ${"visible"}`}>
          <img src={WolcaBG} />
        </div>
        <div className="scroll-div" ref={scrollableDivRef}>
          <div className={isEndReached ? "d-remove" : "top"} />
          <div className="top">
            <h2>
              World of Life Christian Assembly's website serves as a seamless
              platform for member registration and offers a dynamic promotional
              space that showcases the vibrant community and its impactful
              initiatives. With user-friendly features and engaging content, it
              fosters a sense of belonging while effectively communicating the
              organization's mission and values to a global audience.
            </h2>
            <h2>
              As a solo freelance developer, my primary role is to
              conceptualize, design, develop, and deploy the website for World
              of Life Christian Assembly. I handle all aspects of the project,
              ensuring a seamless user experience and effective deployment for
              the organization's members and promotional purposes.
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wolca;
