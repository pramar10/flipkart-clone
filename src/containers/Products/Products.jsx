import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { Container, Row, Col, Table } from "react-bootstrap";
import Input from "../../components/UI/Input/Input";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../actions/product.actions";
import CustomModal from "../../components/UI/CustomModal/CustomModal";

export default function Products() {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [productPictures, setProductPictures] = useState([]);
  const categoryList = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);

  const handleClose = () => {
    const form = new FormData();
    form.append("name", name);
    form.append("quantity", quantity);
    form.append("price", price);
    form.append("description", description);
    form.append("category", category);
    for (let pic of productPictures) {
      form.append("productPicture", pic);
    }
    dispatch(addProduct(form));
    setShow(false);
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
  const renderProducts = () => {
    return (
      <Table responsive="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Description</th>
            <th>Product Pictures</th>
            {/* <th>Category</th> */}
          </tr>
        </thead>
        <tbody>
          {product.products.length > 0
            ? product.products.map((prod, index) => {
                return (
                  <tr key={prod._id}>
                    <td>{index + 1}</td>
                    <td>{prod.name}</td>
                    <td>{prod.price}</td>
                    <td>{prod.quantity}</td>
                    <td>{prod.description}</td>
                    {/* <td>{prod.category}</td> */}
                  </tr>
                );
              })
            : null}
        </tbody>
      </Table>
    );
  };
  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Products</h3>
              <button onClick={handleShow}>Add</button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>{renderProducts()}</Col>
        </Row>
      </Container>

      <CustomModal
        title={"Add New Product"}
        show={show}
        handleClose={() => setShow(false)}
        handleSubmit={handleClose}
      >
        <Input
          value={name}
          label={"Product Name"}
          placeholder={"Category Name"}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          value={quantity}
          placeholder={"Quantity"}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <Input
          value={price}
          placeholder={"Price"}
          onChange={(e) => setPrice(e.target.value)}
        />
        <Input
          value={description}
          placeholder={"Description"}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Input
          type="select"
          value={category}
          placeholder={"Category"}
          onChange={(e) => setCategory(e.target.value)}
          options={createCategoryList(categoryList.categories)}
        />
        <input
          type="file"
          name="productPictures"
          onChange={(e) => {
            setProductPictures([...productPictures, e.target.files[0]]);
          }}
        />
        {productPictures?.length > 0
          ? productPictures.map((item) => {
              return <div>{JSON.stringify(item.name)}</div>;
            })
          : null}
      </CustomModal>
    </Layout>
  );
}
