import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const ViadeModal = props => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  const saveButton = props.saveText ? (
    <Button
      data-testid="modalSaveButton"
      variant="primary"
      onClick={handleClose}
    >
      {props.saveText}
    </Button>
  ) : null;

  const closeButton = props.closeText ? (
    <Button
      data-testid="modalCancelButton"
      variant="secondary"
      onClick={handleClose}
    >
      {props.closeText}
    </Button>
  ) : null;

  return (
    <div>
      <Button
        data-testid="modalButton"
        disabled={props.disabled}
        variant="primary"
        onClick={e => {
          handleShow();
          props.onClick(e);
        }}
      >
        {props.toggleText}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title data-testid="modalTitle">{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.children}</Modal.Body>
        <Modal.Footer>
          {saveButton}
          {closeButton}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ViadeModal;
