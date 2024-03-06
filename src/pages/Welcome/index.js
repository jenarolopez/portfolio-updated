import React from "react";
import RightArrow from "../../assets/svg/RightArrow";
const Welcome = (props) => {
  return (
    <div className="welcome">
      <h1>HI! Nice too meet you. I'm Jenaro Lopez but you can call me Jen.</h1>
      <h2>I'm a Software Engineer and a Full Stack Developer.</h2>
      <div className="parent-button">
        <span onClick={props?.nextPage}>
          About Me
          <RightArrow className="right-arrow" />
        </span>
        <div className="line"></div>
      </div>
    </div>
  );
};

export default Welcome;
