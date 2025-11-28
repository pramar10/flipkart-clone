import React from "react";
import CustomModal from "../../../components/UI/CustomModal/CustomModal";
import { Col, Row } from "react-bootstrap";
import Input from "../../../components/UI/Input/Input";

function DeleteCategoryModal({
  size,
  handleClose,
  show,
  modalTitle,
  deleteCategories,
  expandedArray,
  checkedArray,
}) {
  return (
    <CustomModal
      title={modalTitle}
      show={show}
      size={size}
      handleClose={handleClose}
      buttons={[
        {
          label: "No",
          color: "primary",
          onClick: () => {
            alert("no");
          },
        },
        {
          label: "Yes",
          color: "danger",
          onClick: deleteCategories,
        },
      ]}
    >
      <h5>Expanded</h5>
      {expandedArray.map((item, index) => (
        <span key={index}>{item.name}</span>
      ))}
      <h5>Checked</h5>
      {checkedArray.map((item, index) => (
        <span key={index}>{item.name}</span>
      ))}
    </CustomModal>
  );
}

export default DeleteCategoryModal;
