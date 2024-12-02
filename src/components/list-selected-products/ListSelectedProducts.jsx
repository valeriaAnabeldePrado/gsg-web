import React from "react";
import ButtonListSelect from "@/components/buttons/buttonListSelect";
import { productTitle } from "../../utils/constants";
import "./list.css";

const ListSelectedProducts = () => {
  return (
    <div className="container-list-tipos">
      <ul className="container-list-ul m-4 ">
        {productTitle.map((title, index) => (
          <li key={`button_${index}`}>
            <ButtonListSelect tipo={title} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListSelectedProducts;
