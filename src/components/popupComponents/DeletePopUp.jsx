import React from "react";
import ReactDOM from "react-dom";

function DeletePopUp({ className, heading = "Delete", onClose, id }) {
  console.log("notificationId", id);
  return ReactDOM.createPortal(
    <div className={`${className}`}>
      <div className="delete-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="div">
                <h6>{heading}</h6>
              </div>
              <div className="div">icon</div>
            </div>
            <div className="col-12">icon</div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default DeletePopUp;
