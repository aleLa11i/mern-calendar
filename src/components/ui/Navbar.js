import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLogout } from "../../actions/auth";
import { AddNewEvent } from "./AddNewEvent";
import { DeleteEvent } from "./DeleteEvent";

export const Navbar = () => {
  const { name } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(startLogout());
  };

  return (
    <div className="navbar navbar-dark bg-dark mb-4">
      <span className="navbar-brand">{name}</span>
      <AddNewEvent />
      <DeleteEvent />

      <button onClick={handleLogout} className="btn btn-outline-danger">
        <i className="fas fa-sign-out-alt" />
        <span>Salir</span>
      </button>
    </div>
  );
};
