import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import CustomModal from "../../components/UI/CustomModal/CustomModal";
import { Col, Row } from "react-bootstrap";
import Input from "../../components/UI/Input/Input";
import linearCategories from "../../helpers/linearCategories";
import { useDispatch, useSelector } from "react-redux";
import { createPage } from "../../actions";

function NewPage(props) {
  const [createModal, setCreateModal] = useState(false);
  const [title, setTitle] = useState("");
  const category = useSelector((state) => state.category);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [desc, setDesc] = useState("");
  const [banners, setBanners] = useState([]);
  const [products, setProducts] = useState([]);
  const [type, setType] = useState("");
  const dispatch = useDispatch();
  const page = useSelector((state) => state.page);

  useEffect(() => {
    if (!page.loading) {
      setCreateModal(false);
    }
  }, [page]);
  useEffect(() => {
    const res = linearCategories(category.categories);
    setCategories(res);
  }, [category]);

  const handleProductImage = (e) => {
    setProducts([...products, e.target.files[0]]);
  };

  const handleBannerImages = (e) => {
    setBanners([...banners, e.target.files[0]]);
  };

  const submitPageForm = (e) => {
    if (title === "") {
      alert("Title is required");
      setCreateModal(false);
      return;
    }
    const form = new FormData();
    form.append("title", title);
    form.append("description", desc);
    form.append("category", categoryId);
    form.append("type", type);
    banners.forEach((banner, index) => {
      form.append("banners", banner);
    });
    products.forEach((prod, index) => {
      form.append("products", prod);
    });
    dispatch(createPage(form));
    setCreateModal(false);
  };
  const onCategoryChange = (e) => {
    const category = categories.find(
      (category) => category.value == e.target.value
    );
    setCategoryId(e.target.value);
    setType(category.type);
  };
  const renderCreatpageModal = () => {
    return (
      <CustomModal
        show={createModal}
        title={"Create New Page"}
        handleClose={() => setCreateModal(false)}
        handleSubmit={submitPageForm}
      >
        <Row>
          <Col>
            <Input
              type="select"
              value={categoryId}
              onChange={onCategoryChange}
              options={categories}
              placeholder={"Select Category"}
            />
          </Col>
        </Row>
        <Row style={{ marginTop: 10 }}>
          <Col>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={"Page Title"}
              className="form-control-sm"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Input
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder={"Page Description"}
              className="form-control-sm"
            />
          </Col>
        </Row>

        {banners.length > 0 &&
          banners.map((banner, index) => {
            return (
              <Row key={index}>
                <Col>{banner.name}</Col>
              </Row>
            );
          })}
        <Row>
          <Col>
            <Input
              type="file"
              name="banners"
              onChange={handleBannerImages}
              className={"form-control-sm"}
            />
          </Col>
        </Row>
        {products.length > 0 &&
          products.map((prod, index) => {
            return (
              <Row key={index}>
                <Col>{prod.name}</Col>
              </Row>
            );
          })}
        <Row>
          <Col>
            <Input
              type="file"
              name="products"
              onChange={handleProductImage}
              className={"form-control-sm"}
            />
          </Col>
        </Row>
      </CustomModal>
    );
  };
  return (
    <Layout sidebar>
      {page.loading ? (
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <>
          {renderCreatpageModal()}
          <button onClick={() => setCreateModal(true)}>Create Page</button>
        </>
      )}
    </Layout>
  );
}

export default NewPage;
