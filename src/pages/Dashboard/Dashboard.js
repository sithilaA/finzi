import React from "react";
import NavBar from "../../components/NavBar";
function Dashboard() {
  const email = localStorage.getItem("email");
  return (
    <div>
      <NavBar />
      Dashboard
      <h1>{email}</h1>
    </div>
  );
}

export default Dashboard;
