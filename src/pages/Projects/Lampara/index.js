import React, { useEffect, useRef, useState } from "react";
import WolcaBG from "../../../assets/images/lampara.png";
import { useEffectOnce } from "../helper.ts";
import LeftArrow from "../../../assets/svg/LeftArrow/index.js";

const Lampara = (props) => {
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
      clearInterval(timingInterval);
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
                scrollableDivRef.current.clientHeight -
                10
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
      <div
        onClick={() => {
          props.setTab(0);
        }}
        className="parent-button backtotable"
      >
        <span>
          <LeftArrow className="right-arrow " />
          Table of Content
        </span>
        <div className="line"></div>
      </div>
      <h1>Lampara Systems</h1>
      <div className="grid">
        <div className={`flex flex-col img-container ${"visible"}`}>
          <img src={WolcaBG} />
        </div>
        <div className="scroll-div" ref={scrollableDivRef}>
          <div className={isEndReached ? "d-remove" : "top"} />
          <div className="top">
            <h2>
              Lampara is a set of systems that manages schools. They have School
              Management System that schedules events, monitor classes, enroll
              students and etc.
            </h2>
            <h2>
              I took every part of this system. As for the school management I
              work on frontend. For the Learning Management System I work as a
              full stack developer that manages the front end and backend.
              Learning Management System has integration with the School
              Management System.
            </h2>
            <h2>
              Lampara also has accounting system that is made with ElectronJS
              and it is also react base. My role is also a full stack developer
              and it also has integration with the School Managements System.
            </h2>
            <h2>
              I also monitor and updates the deployment server that is hosted on
              Digital Ocean.
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lampara;
