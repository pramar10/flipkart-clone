import React from "react";
import Layout from "../../components/Layout";
import "./style.css";
import ProductStore from "./ProductStore/ProductStore";
import getParams from "../../utils/getParams";
import ProductPage from "./ProductPage/ProductPage";

export default function ProductListPage(props) {
  const renderProduct = () => {
    const params = getParams(props.location.search);
    let content = null;
    switch (params.type) {
      case "store":
        content = <ProductStore {...props} />;
        break;
      case "page":
        content = <ProductPage {...props} />;
        break;
      default:
        content = null;
    }
    return content;
  };
  return <Layout>{renderProduct()}</Layout>;
}
