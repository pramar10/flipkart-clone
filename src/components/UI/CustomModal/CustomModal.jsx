import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function CustomModal({
  title,
  show,
  handleSubmit,
  handleClose,
  children,
  size,
  showfooter = true,
  buttons,
  ...props
}) {
  return (
    <Modal show={show} onHide={handleClose} size={size}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      {showfooter && (
        <Modal.Footer>
          {buttons ? (
            buttons.map((btn, index) => {
              return (
                <Button key={index} variant={btn.color} onClick={btn.onClick}>
                  {btn.label}
                </Button>
              );
            })
          ) : (
            <Button
              variant="primary"
              onClick={handleSubmit}
              className="btn-sm"
              style={{
                backgroundColor: "#333",
                borderColor: "#333",
              }}
              {...props}
            >
              {"Save"}
            </Button>
          )}
        </Modal.Footer>
      )}
    </Modal>
  );
}
