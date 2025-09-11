import React from "react";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";

export default function CustomModal({
  title,
  show,
  handleSubmit,
  handleClose,
  children,
}) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
