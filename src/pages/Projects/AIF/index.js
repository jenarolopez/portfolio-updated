import React, { useEffect, useRef, useState } from "react";
import { useEffectOnce } from "../helper.ts";

const AIF = () => {
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
      <h1>AIF PCM System</h1>
      <div className="scroll-div" ref={scrollableDivRef}>
        <div className={isEndReached ? "d-remove" : "top"} />
        <div className="top">
          <h2>
            This system is product content management. Usually you can find here
            all the product that has been issued, accounting about the product
            and the expenses of the company.
          </h2>
          <h2>
            I work here as a freelance developer and add some features to the
            system. This system is made with PHP codeigniter.
          </h2>
        </div>
      </div>
    </div>
  );
};

export default AIF;
