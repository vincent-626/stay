import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AccountNav from "../components/AccountNav";
import axios from "axios";
import PlaceImg from "../components/PlaceImg";

function PlacesPage() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get("/user-places").then(({ data }) => {
      setPlaces(data);
    });
  }, []);

  return (
    <>
      <AccountNav />
      <div className="text-center">
        <Link
          to="/account/places/new"
          className="inline-flex gap-1 px-6 py-2 text-white rounded-full bg-primary"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add new place
        </Link>
      </div>
      <div className="mt-4">
        {places.length > 0 &&
          places.map((place) => (
            <Link
              to={"/account/places/" + place._id}
              key={place._id}
              className="flex gap-4 p-4 mt-2 bg-gray-100 cursor-pointer rounded-2xl"
            >
              <div className="flex w-48 bg-gray-300 shrink-0">
                <PlaceImg place={place} />
              </div>
              <div>
                <h2 className="text-xl line-clamp-1">{place.title}</h2>
                <p className="mt-2 text-sm line-clamp-4">{place.description}</p>
              </div>
            </Link>
          ))}
      </div>
    </>
  );
}

export default PlacesPage;
