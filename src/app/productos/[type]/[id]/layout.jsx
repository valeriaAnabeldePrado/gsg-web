import Image from "next/image";
import React from "react";

export default function layout({ params, children }) {
  const { type, id } = params;
  return (
    <div>
      <h2>{type}</h2>
      <div className="w-full h-[30vh]">
        <Image
          src={`/portadas/${type}.png`}
          alt={type}
          className="h-full w-full"
          height={300}
          width={300}
        />
      </div>
      {children}
    </div>
  );
}
