import React from "react";
import FacebookLogin from "react-facebook-login";

const FacebookLoginButton = () => {
  const responseFacebook = (response) => {
    console.log(response);
    if (response.status !== "unknown") {
      // Send the user data to the backend for further processing
      fetch("http://localhost:1234/auth/facebook/callback", {
        method: "POST",
        body: JSON.stringify({
          accessToken: response.accessToken,
          userID: response.userID,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Logged in with Facebook", data);
          // Optionally redirect or store session
        })
        .catch((err) => console.error("Error logging in with Facebook:", err));
    }
  };

  return (
    <div>
      <FacebookLogin
        appId={process.env.appId}
        fields='name,email,picture'
        callback={responseFacebook}
      />
    </div>
  );
};

export default FacebookLoginButton;
