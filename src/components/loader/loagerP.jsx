import React from "react";

const LoaderP = () => {
  return (
    <div className="w-full h-[100vh] bg-slate-900 relative overflow-hidden loader-bg">
      <div className="circulo-load absolute rounded-full"></div>
      <div className="circulo-load-two absolute rounded-full"></div>
    </div>
  );
};

export default LoaderP;
