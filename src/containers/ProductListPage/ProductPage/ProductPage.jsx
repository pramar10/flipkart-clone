import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductPage } from "../../../actions";
import getParams from "../../../utils/getParams";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Card from "../../../components/UI/Card/Card";

function ProductPage(props) {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
  const { page } = product;
  useEffect(() => {
    const payload = getParams(props.location.search);
    dispatch(getProductPage(payload));
  }, []);
  return (
    <div style={{ margin: "0px 10px" }}>
      <h1>{page.title}</h1>
      <Carousel renderThumbs={() => {}}>
        {page.banners &&
          page.banners.map((banner, index) => {
            return (
              <a
                key={index}
                style={{ display: "block" }}
                href={banner.navigateTo}
              >
                <img
                  src={banner.img}
                  alt="banner"
                  style={{ height: "500px", width: "100%" }}
                />
              </a>
            );
          })}
      </Carousel>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          margin: "5px 0px",
        }}
      >
        {page.products &&
          page.products.map((product, index) => {
            return (
              <Card
                key={index}
                style={{ width: "400px", height: "200px", margin: "5px" }}
              >
                <img src={product.img} alt="" width={"100%"} height={"100%"} />
              </Card>
            );
          })}
      </div>
    </div>
  );
}

export default ProductPage;
