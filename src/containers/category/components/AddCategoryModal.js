import React from "react";
import CustomModal from "../../../components/UI/CustomModal/CustomModal";
import { Col, Row } from "react-bootstrap";
import Input from "../../../components/UI/Input/Input";

const AddCategoryModal = ({
  size,
  handleClose,
  handleSubmit,
  show,
  modalTitle,
  categoryList,
  categoryName,
  onChange,
  parentCategoryId,
  setCategoryImage,
}) => {
  return (
    <CustomModal
      title={modalTitle}
      show={show}
      size={size}
      handleClose={handleClose}
      handleSubmit={handleSubmit}
      children={
        <>
          <Row>
            <Col>
              <Input
                value={categoryName}
                placeholder={"Category Name"}
                onChange={(e) => onChange("name", e.target.value)}
                className="form-control-sm"
              />
            </Col>
            <Col>
              <select
                className="form-control form-control-sm"
                value={parentCategoryId}
                onChange={(e) => onChange("drop-id", e.target.value)}
              >
                <option>Select category</option>
                {categoryList.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.name}
                  </option>
                ))}
              </select>
            </Col>
          </Row>

          <Row>
            <Col>
              <input
                style={{ marginTop: 15 }}
                type="file"
                name="categoryImage"
                onChange={(e) => setCategoryImage(e.target.files[0])}
              />
            </Col>
          </Row>
        </>
      }
    />
  );
};
export default AddCategoryModal;
