import React from "react";
import CustomModal from "../../../components/UI/CustomModal/CustomModal";
import { Col, Row } from "react-bootstrap";
import Input from "../../../components/UI/Input/Input";

const UpdateCategoriesModal = ({
  size,
  handleClose,
  handleSubmit,
  show,
  expandedArray,
  handleCategoryInput,
  checkedArray,
  modalTitle,
  categoryList,
}) => {
  return (
    <CustomModal
      title={modalTitle}
      show={show}
      handleClose={handleClose}
      handleSubmit={handleSubmit}
      size={size}
      children={
        <>
          <Row>
            <Col>
              <h6>Expanded Categories</h6>
            </Col>
          </Row>
          {expandedArray.length > 0 &&
            expandedArray.map((item, index) => {
              return (
                <Row key={index}>
                  <Col>
                    <Input
                      value={item.name}
                      placeholder={"Category Name"}
                      onChange={(e) =>
                        handleCategoryInput(
                          "name",
                          e.target.value,
                          index,
                          "expanded"
                        )
                      }
                    />
                  </Col>
                  <Col>
                    <select
                      className="form-control"
                      value={item.parentId}
                      onChange={(e) =>
                        handleCategoryInput(
                          "parendId",
                          e.target.value,
                          index,
                          "expanded"
                        )
                      }
                    >
                      <option>Select category</option>
                      {categoryList.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </Col>
                  <Col>
                    <select
                      className="form-control"
                      value={item.type}
                      onChange={(e) =>
                        handleCategoryInput(
                          "type",
                          e.target.value,
                          index,
                          "expanded"
                        )
                      }
                    >
                      <option value={""}>Select Type</option>
                      <option value={"store"}>Store</option>
                      <option value={"product"}>Product</option>
                      <option value={"page"}>Page</option>
                    </select>
                  </Col>
                </Row>
              );
            })}
          <h6>Checked Categories</h6>
          {checkedArray.length > 0 &&
            checkedArray.map((item, index) => {
              return (
                <Row key={index}>
                  <Col>
                    <Input
                      value={item.name}
                      placeholder={"Category Name"}
                      onChange={(e) =>
                        handleCategoryInput(
                          "name",
                          e.target.value,
                          index,
                          "checked"
                        )
                      }
                    />
                  </Col>
                  <Col>
                    <select
                      className="form-control"
                      value={item.parentId}
                      onChange={(e) =>
                        handleCategoryInput(
                          "parendId",
                          e.target.value,
                          index,
                          "checked"
                        )
                      }
                    >
                      <option>Select category</option>
                      {categoryList.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </Col>
                  <Col>
                    <select
                      className="form-control"
                      value={item.type}
                      onChange={(e) =>
                        handleCategoryInput(
                          "type",
                          e.target.value,
                          index,
                          "checked"
                        )
                      }
                    >
                      <option value={""}>Select Type</option>
                      <option value={"store"}>Store</option>
                      <option value={"product"}>Product</option>
                      <option value={"page"}>Page</option>
                    </select>
                  </Col>
                </Row>
              );
            })}
        </>
      }
    />
  );
};
export default UpdateCategoriesModal;
