import React from "react";

function PlaceImg({ place, index = 0, className = "" }) {
  if (!place.photos?.length) {
    return "";
  }

  className += " object-cover w-full h-full";

  return (
    <img
      src={"http://localhost:4000/uploads/" + place.photos[index]}
      alt=""
      className={className}
    />
  );
}

export default PlaceImg;
