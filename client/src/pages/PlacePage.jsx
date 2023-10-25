import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingWidget from "../components/BookingWidget";

function PlacePage() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  useEffect(() => {
    if (!id) return;

    axios.get(`/places/${id}`).then((res) => {
      setPlace(res.data);
    });
  }, [id]);

  if (!place) return <div>Loading...</div>;

  if (showAllPhotos) {
    return (
      <div className="absolute inset-0 min-w-full min-h-screen text-white bg-black">
        <div className="grid gap-4 p-8 bg-gray-900">
          <div>
            <h2 className="mr-48 text-3xl">Photos of {place.title}</h2>
            <button
              className="fixed flex gap-1 px-4 py-2 text-black bg-white shadow top-8 right-12 rounded-2xl shadow-black"
              onClick={() => setShowAllPhotos(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                  clipRule="evenodd"
                />
              </svg>
              Close photos
            </button>
          </div>
          {place?.photos?.length > 0 &&
            place.photos.map((photo) => (
              <div key={photo}>
                <img
                  src={`http://localhost:4000/uploads/${photo}`}
                  alt=""
                  className="w-full"
                />
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="px-8 pt-8 mt-4 -mx-8 bg-gray-100">
      <h1 className="text-3xl">{place.title}</h1>
      <a
        className="flex gap-1 my-3 font-semibold underline"
        target="_blank"
        href={`https://maps.google.com/?q=${place.address}`}
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
            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
          />
        </svg>
        {place.address}
      </a>
      <div className="relative">
        <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
          <div>
            {place.photos?.[0] && (
              <div>
                <img
                  className="object-cover cursor-pointer justify-self-center aspect-square"
                  src={`http://localhost:4000/uploads/${place.photos[0]}`}
                  onClick={() => setShowAllPhotos(true)}
                />
              </div>
            )}
          </div>
          <div className="grid">
            <div>
              {place.photos?.[1] && (
                <img
                  className="object-cover cursor-pointer aspect-square"
                  src={`http://localhost:4000/uploads/${place.photos[1]}`}
                  onClick={() => setShowAllPhotos(true)}
                />
              )}
            </div>
            <div>
              {place.photos?.[2] && (
                <div className="overflow-hidden">
                  <img
                    className="relative object-cover cursor-pointer top-2 aspect-square"
                    src={`http://localhost:4000/uploads/${place.photos[2]}`}
                    onClick={() => setShowAllPhotos(true)}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <button
          className="absolute flex gap-1 px-4 py-2 bg-white shadow-md shadow-gray-500 bottom-2 right-2 rounded-2xl"
          onClick={() => setShowAllPhotos(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
              clipRule="evenodd"
            />
          </svg>
          Show all photos
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8 my-8">
        <div>
          <div className="mb-4">
            <h2 className="mb-2 text-2xl font-semibold">Description</h2>
            {place.description}
          </div>
          Check-in: {place.checkIn} <br />
          Check-out: {place.checkOut} <br />
          Max number of guests: {place.maxGuests}
        </div>
        <div>
          <BookingWidget place={place} />
        </div>
      </div>
      <div className="px-8 py-8 -mx-8 bg-white border-t">
        <div>
          <h2 className="text-2xl font-semibold">Extra info</h2>
        </div>
        <div className="mt-2 mb-4 text-sm leading-5 text-gray-700">
          {place.extraInfo}
        </div>
      </div>
    </div>
  );
}

export default PlacePage;
