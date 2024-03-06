import React, { useEffect, useRef, useState } from "react";
import {
  SOSearch1,
  SOSearch2,
  SOSearch3,
  SOSearch4,
  SOSearch5,
  SOSearch6,
} from "../../../assets/images/images";
import { Carousel } from "react-responsive-carousel";
import { useEffectOnce } from "../helper.ts";

const SOSearch = () => {
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
      setCurrentImage((prev) => {
        const selected = prev == 5 ? 0 : prev + 1;
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
      <h1>SOSearch</h1>
      <div className="grid">
        <div
          className={`flex flex-col img-container ${
            !init ? "d-none" : "visible"
          }`}
        >
          {[0, 1, 2, 3, 4, 5].map((item) => {
            return (
              <div
                key={item}
                className={`sos${item + 1} img ${
                  item == currentImage ? "visible" : "hidden"
                }`}
              />
            );
          })}
        </div>
        <div ref={scrollableDivRef} className="scroll-div">
          <div className={isEndReached ? "d-remove" : "top"} />
          <h2>
            SOSearch is a dating application catering to young adults and adults
            in the USA, available on both mobile and web platforms. It offers a
            wide range of features resembling those of a social media platform,
            including chat, video calls, and typical functionalities found in
            other dating apps.
          </h2>
          <h2>
            The standout feature of SOSearch is its calendar function, allowing
            users to schedule dates seamlessly. Additionally, the app offers a
            generous trial period of up to one year without any payment
            required.
          </h2>
          <h2>
            In my role as a software engineer for SOSearch, my focus is on
            enhancing user experience, particularly in the areas of chat, video
            calls, and real-time interactions. I'm responsible for overseeing
            the development of both frontend and backend features, ensuring a
            cohesive and seamless user journey.
          </h2>
          <h2>
            Furthermore, I play a crucial role in managing and maintaining our
            deployment server, as well as overseeing the Kubernetes
            infrastructure and MySQL database. This involves continuous
            monitoring, updates, and optimization to ensure the platform's
            stability and performance meet the highest standards.
          </h2>
        </div>
      </div>
    </div>
  );
};

export default SOSearch;
