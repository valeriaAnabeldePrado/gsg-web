'use client';
import React from 'react';
import './styleButtonList.css';
import Link from 'next/link';

const ButtonListSelect = ({ tipo }) => {
  return (
    <Link
      href={`/productos?categoria=${tipo}`}
      className="buttonList-lista text-xl hover:text-red-500 transition duration-100 ease-in-out"
    >
      {tipo}
    </Link>
  );
};

export default ButtonListSelect;
