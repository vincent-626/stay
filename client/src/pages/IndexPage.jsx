import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function IndexPage() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get("/places").then((res) => {
      setPlaces(res.data);
    });
  }, []);

  return (
    <div className="grid grid-cols-1 mx-4 mt-8 sm:grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
      {places.length > 0 &&
        places.map((place) => (
          <Link
            to={"/place/" + place._id}
            key={place._id}
          >
            <div className="flex mb-2 bg-gray-500 rounded-2xl">
              {place.photos?.[0] && (
                <img
                  src={"http://localhost:4000/uploads/" + place.photos?.[0]}
                  alt=""
                  className="object-cover aspect-square rounded-2xl"
                />
              )}
            </div>
            <h2 className="font-semibold">{place.address}</h2>
            <h3 className="text-sm text-gray-600 truncate">{place.title}</h3>
            <div className="mt-1">
              <span className="font-semibold">${place.price} per night</span>
            </div>
          </Link>
        ))}
    </div>
  );
}
