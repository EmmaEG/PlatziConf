import React from "react";

import Modal from "./Modal";

function DeleteBadgeMmodal(props) {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <div className="DeleteBadgeMmodal">
        <h1>Are you sure?</h1>
        <p>you are about to delete this badge.</p>
        <div>
          <button onClick={props.onDeleteBadge} className="btn btn-danger">Delete</button>
          <button onClick={props.onClose} className="btn btn-primary">Cancel</button>
        </div>
      </div>
    </Modal>
  );
}

export default DeleteBadgeMmodal;
