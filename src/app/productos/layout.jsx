import ListSelectedProducts from "@/components/list-selected-products/ListSelectedProducts";
import React from "react";

const Layout = ({ children }) => {
  return (
    <>
      <div className="bg-orange-600 h-30">
        <ListSelectedProducts />
      </div>
      <div className="bg-orange-300 h-full w-full">{children}</div>
    </>
  );
};

export default Layout;
