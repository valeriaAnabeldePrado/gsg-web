"use client"
import React from "react";
import ButtonListSelect from "@/components/buttons/buttonListSelect";
import { productTitle } from "../../utils/constants";
import useWindowSize from "@/hooks/useWindowSize";
import "./list.css";
import ListSelectedProductsResponsive from "./ListSelectedProductsResponsive";

const ListSelectedProducts = () => {
  const windowSize = useWindowSize(); 
console.log(windowSize.width);
  return (
    <div >
      {windowSize.width < 800 ? (
        <div className="container-list-tipos"><ListSelectedProductsResponsive/></div>
        ):(
        <ul className="container-list-ul m-4 container-list">
        {productTitle.map((title, index) => (
          <li key={`button_${index}`}>
            <ButtonListSelect tipo={title} />
          </li>
        ))}
      </ul>)}
      
    </div>
  );
};

export default ListSelectedProducts;
