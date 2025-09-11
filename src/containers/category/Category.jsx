import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addCategory, getAllCategory } from "../../actions";
import Input from "../../components/UI/Input/Input";
import CustomModal from "../../components/UI/CustomModal/CustomModal";

function Category() {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [parentCategoryId, setParentCategoryId] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const category = useSelector((state) => state.category);

  const handleClose = () => {
    const form = new FormData();
    form.append("name", categoryName);
    form.append("parentId", parentCategoryId);
    form.append("categoryImage", categoryImage);
    dispatch(addCategory(form));
    setCategoryName("");
    setParentCategoryId("");
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const renderCategories = (categoryList) => {
    let categories = [];
    for (let category of categoryList) {
      categories.push(
        <li key={category._id}>
          {category.name}{" "}
          {category.children.length > 0 ? (
            <ul>{renderCategories(category.children)}</ul>
          ) : null}
        </li>
      );
    }
    return categories;
  };
  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({
        value: category._id,
        name: category.name,
      });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };
  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Category</h3>
              <button onClick={handleShow}>Add</button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <ul>{renderCategories(category.categories)}</ul>
          </Col>
        </Row>
      </Container>
      <CustomModal
        title={"Add New Category"}
        show={show}
        handleClose={() => setShow(false)}
        handleSubmit={handleClose}
        children={
          <>
            <Input
              value={categoryName}
              placeholder={"Category Name"}
              onChange={(e) => setCategoryName(e.target.value)}
            />
            <Input
              value={parentCategoryId}
              placeholder={"Parent Category Id"}
              onChange={(e) => setParentCategoryId(e.target.value)}
            />
            <select
              className="form-control"
              value={parentCategoryId}
              onChange={(e) => setParentCategoryId(e.target.value)}
            >
              <option>Select category</option>
              {createCategoryList(category.categories).map((option) => (
                <option key={option.value} value={option.value}>
                  {option.name}
                </option>
              ))}
            </select>
            <input
              type="file"
              name="categoryImage"
              onChange={(e) => setCategoryImage(e.target.files[0])}
            />
          </>
        }
      />
    </Layout>
  );
}

export default Category;
