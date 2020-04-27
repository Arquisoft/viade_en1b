import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const ViadeModal = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    props.handleClose();
    setShow(false);
  };
  const handleShow = (e) => {
    props.onOpen();
    setShow(true);
  };

  const saveButton = props.saveText ? (
    <Button
      data-testid="modalSaveButton"
      disabled={props.saveDisabled}
      variant="primary"
      onClick={() => {
        props.onSave();
        setShow(false);
      }}
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
    //Main show button
    <div>
      <Button
        data-testid="modalButton"
        disabled={props.disabled}
        variant="primary"
        onClick={e => {
          handleShow(e);
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
