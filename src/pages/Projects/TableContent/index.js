import React, { useEffect, useRef } from "react";

const TableContent = (props) => {
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
    <div
      ref={scrollableDivRef}
      style={{
        overflow: "hidden",
        height: "100%",
      }}
    >
      <ul className="table-content">
        <li
          onClick={() => {
            props.setTab(1);
          }}
        >
          S.O.Search
        </li>
        <ul>
          <li
            onClick={() => {
              props.setTab(1);
            }}
          >
            Mobile
          </li>
          <li
            onClick={() => {
              props.setTab(1);
            }}
          >
            Website
          </li>
          <li
            onClick={() => {
              props.setTab(1);
            }}
          >
            Console
          </li>
        </ul>
        <li
          onClick={() => {
            props.setTab(2);
          }}
        >
          Wolca Website
        </li>
        <li
          onClick={() => {
            props.setTab(3);
          }}
        >
          Lampara
        </li>
        <ul>
          <li
            onClick={() => {
              props.setTab(3);
            }}
          >
            Mobile
          </li>
          <li
            onClick={() => {
              props.setTab(3);
            }}
          >
            Website
          </li>
          <li
            onClick={() => {
              props.setTab(3);
            }}
          >
            Desktop Accounting
          </li>
        </ul>
        <li
          onClick={() => {
            props.setTab(4);
          }}
        >
          UP Provident Fund Portal
        </li>
        <li
          onClick={() => {
            props.setTab(5);
          }}
        >
          AIF Group Accounting System
        </li>
        <li
          onClick={() => {
            props.setTab(6);
          }}
        >
          Other Recent Projects
        </li>
        <ul>
          <li
            onClick={() => {
              props.setTab(6);
            }}
          >
            Plagiarish and Grammar Checker Website (Our Thesis)
          </li>
          <li
            onClick={() => {
              props.setTab(6);
            }}
          >
            Face Recognition Mobile
          </li>
          <li
            onClick={() => {
              props.setTab(6);
            }}
          >
            NLEX Scheduling Management Desktop
          </li>
          <li
            onClick={() => {
              props.setTab(6);
            }}
          >
            TopNotch Petshop Website
          </li>
          <li
            onClick={() => {
              props.setTab(6);
            }}
          >
            Manga Website
          </li>
        </ul>
      </ul>
    </div>
  );
};

export default TableContent;
