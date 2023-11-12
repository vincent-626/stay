import React, { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Navigate } from "react-router-dom";
import axios from "axios";
import AccountNav from "../components/AccountNav";

function AccountPage() {
  const [redirect, setRedirect] = useState(null);
  const { user, setUser, ready } = useContext(UserContext);

  async function logout() {
    await axios.post("/logout");
    setRedirect("/");
    setUser(null);
  }

  if (!ready) {
    return <div>Loading...</div>;
  }

  if (!user && !redirect) {
    return <Navigate to="/login" />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <AccountNav />
      <div className="max-w-lg mx-auto text-center">
        Logged in as {user.name} ({user.email}) <br />
        <button
          className="max-w-sm mt-2 primary hover:bg-[#A97791] transition-all duration-300"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default AccountPage;
