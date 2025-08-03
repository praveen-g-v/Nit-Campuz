import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap"; // Import Bootstrap Modal component

const useLoadingScreen = (isLoading) => {
  const [show, setShow] = useState(isLoading);

  useEffect(() => {
    setShow(isLoading);
  }, [isLoading]);

  return (
    <Modal show={show} centered backdrop="static" keyboard={false} transparent>
      <Modal.Body className="d-flex justify-content-center align-items-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default useLoadingScreen;
