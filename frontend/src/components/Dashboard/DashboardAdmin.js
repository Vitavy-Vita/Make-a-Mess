import React from "react";
import { NavLink } from "react-router-dom";

const DashboardAdmin = () => {
  return (
    <main className="main-dashboard">
      <h1>Dashboard</h1>
      <h2>Databases:</h2>
      <section className="database-container">
        <NavLink to={"/update/bread"}>Bread</NavLink>
        <NavLink to={"/update/cheese"}>Cheese</NavLink>
        <NavLink to={"/update/meat"}>Meat</NavLink>
        <NavLink to={"/update/sauce"}>Sauce</NavLink>
        <NavLink to={"/update/topping"}>Topping</NavLink>
        <NavLink to={"/burgers/new"}>Pre-Made</NavLink>
        <NavLink to={"/users"}>Users</NavLink>
      </section>
    </main>
  );
};

export default DashboardAdmin;
