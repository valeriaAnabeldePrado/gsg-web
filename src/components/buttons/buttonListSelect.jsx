"use client";

import React from "react";

import Link from "next/link";
import "./styleButtonList.css";

const ButtonListSelect = ({ tipo }) => {
  return (
    <Link href={`/productos/${tipo}`} className="buttonList-lista">
      {tipo}
    </Link>
  );
};

export default ButtonListSelect;
