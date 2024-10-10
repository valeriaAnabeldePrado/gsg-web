"use client";
import React from "react";
import "./styleButtonList.css";
import { getDataTiposQuery } from "@/utils/fetchData";

const ButtonListSelect = ({ tipo }) => {
  const handleclick = (tipo) => {
    // getDataTipos(tipo);
    //getDataTiposQuery(tipo);
  };

  return (
    <button className="buttonList-lista" onClick={() => handleclick(tipo)}>
      {tipo}
    </button>
  );
};

export default ButtonListSelect;
