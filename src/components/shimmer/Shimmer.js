import React from "react";
import { useInView } from "react-hook-inview";

const Shimmer = () => {
  const [ref, isVisible] = useInView({ threshold: 1 });

  return (
    <div className="shimmer card">
      <span className="shimmer-thumb" ref={observerTarget}></span>
      <span className="shimmer-tags"></span>
      <div className="shimmer-img"></div>
    </div>
  );
};

export default Shimmer;
