'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import './loader.css';

export default function Loader() {
  const [hiding, setHiding] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const hide = setTimeout(() => {
      setHiding(true);
      const remove = setTimeout(() => setGone(true), 800);
      return () => clearTimeout(remove);
    }, 2000);
    return () => clearTimeout(hide);
  }, []);

  if (gone) return null;

  return (
    <div className={`loader-overlay${hiding ? ' loader-hiding' : ''}`}>
      <div className="loader-logo">
        <Image
          src="/imagenes/logoS.svg"
          alt="GSG"
          width={160}
          height={106}
          priority
        />
      </div>
      <div className="loader-bar">
        <div className="loader-bar-fill" />
      </div>
    </div>
  );
}
