import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import { generatePublicUrl } from "../../../urlConfig";
import { getProductsBySlug } from "../../../actions/product.action";
import { Link } from "react-router-dom";
import Card from "../../../components/UI/Card/Card";

function ProductStore(props) {
  const product = useSelector((state) => state.product);
  const priceRange = {
    under5K: 5000,
    under10K: 10000,
    under15K: 15000,
    under20K: 20000,
    under30K: 30000,
  };
  const dispatch = useDispatch();
  useEffect(() => {
    const { match } = props;
    dispatch(getProductsBySlug(match.params.slug));
  }, []);
  return (
    <div>
      {Object.keys(product.productsByPrice).map((key, index) => {
        const slug = props.match.params?.slug.split("-");
        return (
          <Card
            key={index}
            headerleft={`${slug[0]} mobile under ${priceRange[key]}`}
            headerright={<button>View all</button>}
            style={{
              margin: 10,
            }}
          >
            <div style={{ display: "flex" }}>
              {product.productsByPrice[key].map((product, _index) => {
                return (
                  <Link
                    className="productContainer"
                    key={_index}
                    style={{ display: "block" }}
                    to={`/${product.slug}/${product._id}/p`}
                  >
                    <div className="productImgContainer">
                      <img
                        src={generatePublicUrl(product.productPictures[0].img)}
                        alt="samsung"
                      />
                    </div>
                    <div className="productInfo">
                      <div style={{ margin: "5px 0" }}>{product?.name}</div>
                      <div>
                        <span>4.3</span>&nbsp;
                        <span>3434</span>
                      </div>
                      <div className="productPrice">{product.price}</div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </Card>
        );
      })}
    </div>
  );
}

export default ProductStore;
