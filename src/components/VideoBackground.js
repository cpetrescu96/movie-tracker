import styled from "styled-components";
import React from "react";
import videoBackground from "../assets/VideoBackground.mp4";

export const Video = styled.video`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: -1;
  @media only screen and (min-aspect-ratio: 16/9) {
    width: 100%;
    height: auto;
  }
  @media only screen and (max-aspect-ratio: 16/9) {
    width: auto;
    height: 100%;
  }
`;
const VideoBackground = () => {
  return (
    <Video autoPlay muted loop>
      <source src={videoBackground} type="video/mp4" />
    </Video>
  );
};

export default VideoBackground;
