import Link from 'next/link';
import React from 'react';

export default function FooterButon({ children, isHome, rute }) {
  console.log(isHome);
  return (
    <button className="footer-button ">
      <Link
        href={`/${rute}`}
        className={`text-2xl font-extralight flex items-center ${isHome ? 'text-white' : 'text-black'}`}
      >
        {children}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 ml-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
          />
        </svg>
      </Link>
    </button>
  );
}
