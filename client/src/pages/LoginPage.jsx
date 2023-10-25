import { React, useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const { setUser } = useContext(UserContext);

  async function handleLoginSubmit(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post("/login", {
        email,
        password,
      });
      setUser(data);
      setRedirect(true);
    } catch (err) {
      alert("Error logging in user!");
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="flex items-center justify-around mt-4 grow">
      <div className="mb-48">
        <h1 className="mb-4 text-4xl text-center">Login</h1>
        <form
          className="max-w-md mx-auto"
          onSubmit={(e) => handleLoginSubmit(e)}
        >
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
          <button className="primary">Login</button>
          <div className="py-2 text-center text-gray-500">
            Don't have an account yet?{" "}
            <Link
              to={"/register"}
              className="text-black underline"
            >
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
