"use client";
import React from "react";
import "./styleButtonList.css";
import Link from "next/link";

const ButtonListSelect = ({ tipo }) => {
  return (
    <Link href={`/productos?categoria=${tipo}`} className="buttonList-lista ">
      {tipo}
    </Link>
  );
};

export default ButtonListSelect;
