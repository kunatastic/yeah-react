import React, { useEffect, useState } from "react";
import noiseImage from "../../assets/noise.png";

function Noise({ opacity = 1 }) {
  const [bodyHeight, setBodyHeight] = useState(0);
  useEffect(() => {
    setBodyHeight(document.body.clientHeight);
    window.onresize = () => {
      setBodyHeight(document.body.clientHeight);
    };
  }, []);
  return (
    <div
      style={{
        background: "url(" + noiseImage + ")",
        position: "absolute",
        top: 0,
        left: 0,
        pointerEvents: "none",
        width: "100%",
        opacity: opacity,
        height: bodyHeight,
        zIndex: 10,
      }}
    ></div>
  );
}

export default Noise;
