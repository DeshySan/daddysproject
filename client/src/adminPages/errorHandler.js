import React from "react";
import Swal from "sweetalert2";

//error handler
export const sweetError = (err) => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: err,
  });
};
//success handler
export const sweetSuccess = (msg) => {
  Swal.fire({
    icon: "success",
    title: "Success",
    text: msg,
  });
};
