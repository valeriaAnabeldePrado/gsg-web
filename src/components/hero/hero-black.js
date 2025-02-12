import React from 'react';

export default function HeroBlack({ title }) {
  return (
    <div className="h-[30vh] w-full bg-slate-900 mt-10 flex items-center  align-middle p-[var(--padding-generico-x)] justify-center md:justify-start">
      <h2 style={{ fontSize: 'var(--text-grande)' }} className=" text-white">
        {title}
      </h2>
    </div>
  );
}
