import React, { useEffect, useRef, useState } from "react";
import { useEffectOnce } from "../helper.ts";

const UPPFI = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isEndReached, setIsEndReached] = useState(false);
  const [init, setInit] = useState(false);
  const [timingInterval, setTimingInterval] = useState();
  const scrollableDivRef = useRef(null);
  let startY = 0;

  useEffect(() => {
    setTimeout(() => {
      setInit(true);
    }, 500);

    const interval = setInterval(() => {
      console.log("123123");
      setCurrentImage((prev) => {
        const selected = prev == 2 ? 0 : prev + 1;
        return selected;
      });
    }, 5000);

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
      clearInterval(interval);
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
      <h1>UPPFI Admin and Members Portal</h1>
      <div className="grid">
        <div
          className={`flex flex-col img-container ${
            !init ? "d-none" : "visible"
          }`}
        >
          {[0, 1, 2].map((item) => {
            return (
              <div
                key={item}
                className={`up${item + 1} img ${
                  item == currentImage ? "visible" : "hidden"
                }`}
              />
            );
          })}
        </div>
        <div className="scroll-div" ref={scrollableDivRef}>
          <div className={isEndReached ? "d-remove" : "top"} />
          <div className="top">
            <h2>
              UPPFI Admin and Members Portal wesbite is a continues development
              project. I am hired here as a freelance developer. My role for
              this project is Full-stack developer and I manage the API
              integration and also on the DevOps side that I deploy test server
              and manage it.
            </h2>
            <h2>
              This Project uses PHP Laravel and we deployed it on the Linode
              Server.
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UPPFI;
