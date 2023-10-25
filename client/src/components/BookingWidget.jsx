import React, { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";

function BookingWidget({ place }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  async function bookThisPlace() {
    const response = await axios.post("/booking", {
      place: place._id,
      price: place.price * numberOfNights,
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      mobile,
    });

    const bookingId = response.data._id;
    setRedirect(`/account/bookings/${bookingId}`);
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="p-4 bg-white shadow rounded-2xl">
      <div className="mb-4 text-2xl text-center">
        Price: ${place.price} / per night
      </div>
      <div className="border rounded-2xl">
        <div className="flex">
          <div className="px-4 py-3 grow">
            <label>Check-in:</label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>
          <div className="px-4 py-3 border-l grow">
            <label>Check-out:</label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
        </div>
        <div className="flex border-t">
          <div className="w-full px-4 py-3">
            <label>Number of guests:</label>
            <input
              type="number"
              value={numberOfGuests}
              placeholder="1"
              onChange={(e) => setNumberOfGuests(e.target.value)}
            />
          </div>
        </div>
        {numberOfNights > 0 && (
          <div className="flex border-t">
            <div className="w-full px-4 py-3">
              <label>Your full name:</label>
              <input
                type="text"
                value={name}
                placeholder="Arthur Morgan"
                onChange={(e) => setName(e.target.value)}
              />
              <label>Phone number:</label>
              <input
                type="tel"
                value={mobile}
                placeholder="+6011-12345678"
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>
          </div>
        )}
      </div>

      <button
        onClick={bookThisPlace}
        className="mt-4 primary"
      >
        Book this place
        {numberOfNights > 0 && (
          <span> for ${numberOfNights * place.price}</span>
        )}
      </button>
    </div>
  );
}

export default BookingWidget;
