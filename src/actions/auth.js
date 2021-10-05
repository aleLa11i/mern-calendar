import Swal from "sweetalert2";
import { fetchWithoutToken, fetchWithToken } from "../helpers/fetch";

export const StartLogin = (value) => {
  return async (dispatch) => {
    const resp = await fetchWithoutToken("auth", value, "POST");
    const body = await resp.json();
    if (body.ok) {
      localStorage.setItem("token", body.token);
      localStorage.setItem("token-init-date", new Date().getTime());

      dispatch(
        login({
          uid: body.uid,
          name: body.name,
        })
      );
    } else if (body.msg) {
      Swal.fire("Error", body.msg, "error");
    } else if (body.errors.email) {
      Swal.fire("Error", body.errors.email.msg, "error");
    } else if (body.errors.password) {
      Swal.fire("Error", body.errors.password.msg, "error");
    }
  };
};

export const StartRegister = (value) => {
  return async (dispatch) => {
    const resp = await fetchWithoutToken("auth/new", value, "POST");
    const body = await resp.json();

    if (body.ok) {
      Swal.fire("Excelente!", "Registrado con éxito", "success");
      localStorage.setItem("token", body.token);

      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(
        login({
          uid: body.uid,
          name: body.name,
        })
      );
    } else if (body.msg) {
      Swal.fire("Error", body.msg, "error");
    } else if (body.errors.email) {
      Swal.fire("Error", body.errors.email.msg, "error");
    } else if (body.errors.name) {
      Swal.fire("Error", body.errors.name.msg, "error");
    } else if (body.errors.password) {
      Swal.fire("Error", body.errors.password.msg, "error");
    }
  };
};

export const Checking = () => {
  return async (dispatch) => {
    const resp = await fetchWithToken("auth/renew");
    const body = await resp.json();

    if (body.ok) {
      console.log("Se ha renovado el token.");
      localStorage.setItem("token", body.token);
      localStorage.setItem("token-init-date", new Date().getTime());

      dispatch(
        login({
          uid: body.uid,
          name: body.name,
        })
      );
    }
    else
    {
      dispatch(FinishCheck());
    }
  };
};

export const startLogout = () => {
  return async (dispatch) => {
    localStorage.clear();
    dispatch(logout());
    dispatch(cleanLogout());
  };
};

const login = (payload) => ({
  type: "Login",
  payload,
});

const logout = () => ({ type: "Logout" });
const cleanLogout = () => ({ type: "Logout Clean" });
const FinishCheck = () => ({ type: "Finish Checking" });

