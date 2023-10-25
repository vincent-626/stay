import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function registerUser(e) {
    e.preventDefault();
    try {
      await axios.post("/register", {
        name,
        email,
        password,
      });
      alert("User registered successfully!");
    } catch (err) {
      alert("Error registering user!");
    }
  }

  return (
    <div className="flex items-center justify-around mt-4 grow">
      <div className="mb-48">
        <h1 className="mb-4 text-4xl text-center">Register</h1>
        <form
          className="max-w-md mx-auto"
          onSubmit={(e) => registerUser(e)}
        >
          <input
            type="text"
            placeholder="Insert your name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="on"
          />
          <input
            type="email"
            placeholder="Insert your email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="on"
          />
          <input
            type="password"
            placeholder="Insert your password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="on"
          />
          <button className="primary">Register</button>
          <div className="py-2 text-center text-gray-500">
            Already a member?{" "}
            <Link
              to={"/login"}
              className="text-black underline"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
