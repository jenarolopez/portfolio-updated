import React, { useEffect, useRef, useState } from "react";
import { useEffectOnce } from "../helper.ts";
import Bg1 from "../../../assets/images/Others/1.png";
import Bg2 from "../../../assets/images/Others/2.png";
import Bg3 from "../../../assets/images/Others/3.png";
import Bg4 from "../../../assets/images/Others/4.png";
import Bg5 from "../../../assets/images/Others/5.png";
import Bg6 from "../../../assets/images/Others/6.png";
import LeftArrow from "../../../assets/svg/LeftArrow/index.js";

const Others = () => {
  const [isEndReached, setIsEndReached] = useState(false);
  const [init, setInit] = useState(false);
  const [timingInterval, setTimingInterval] = useState();
  const scrollableDivRef = useRef(null);
  let startY = 0;

  useEffect(() => {
    setTimeout(() => {
      setInit(true);
    }, 500);

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
                scrollableDivRef.current.clientHeight - 10
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
      <div className="parent-button backtotable">
        <span>
          <LeftArrow className="right-arrow " />
          Table of Content
        </span>
        <div className="line"></div>
      </div>
      <h1>Other Recent Projects</h1>
      <div className="scroll-div-others scroll-div " ref={scrollableDivRef}>
        <div className={isEndReached ? "d-remove" : "top scroll-div-others"} />
        <div className="top">
          <h2 className="others-title">Plagiarism and Grammar Checker</h2>
          <img src={Bg1} className="showcase" alt="" />
          <h2>
            This is our thesis project. It is a repository of thesis documents
            and it also checked the uploads for the plagiarized sentences over
            local and the internet.This is also nominated for Best Capstone
            award.
          </h2>
          <h2 className="others-title">Face Recognition Mobile</h2>
          <img src={Bg2} className="showcase" alt="" />
          <h2>
            This is a project that we build as proposal for a client in Vietnam.
            I build the frontend and I use React Native.
          </h2>
          <h2 className="others-title">NLEX Scheduling System</h2>
          <img src={Bg3} className="showcase" alt="" />
          <h2>
            I made this project during my intership in NLEX Traffic Systems. It
            is a system to schedule their mainternance of the CCTV and event
            monitoring.
          </h2>
          <h2 className="others-title">TopNotch Grooming</h2>
          <img src={Bg4} className="showcase" alt="" />
          <h2>
            This is a thesis project that is a pet grooming scheduler and live
            streaming of the groomer. It also has a store module that you can
            buy their products throught the website.
          </h2>
          <h2 className="others-title">Manga Website</h2>
          <img src={Bg5} className="showcase" alt="" />
          <h2>
            I made this as a self project during the pandemic for my practice in
            programming. It uses MERN stack that is React and Node.
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Others;
