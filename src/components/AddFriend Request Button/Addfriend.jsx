import React from "react";
import Service from "../../appwrite/Service";

function Addfriend({ userID, FrendID }) {
  return (
    <div>
      <button className="btn btn-success" onClick={sendRequest}>
        Add To Friend
      </button>
    </div>
  );
}

export default Addfriend;
