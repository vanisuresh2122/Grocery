import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";

const Login = () => {
  const { setShowUserLogin, setUser, navigate } = useAppContext();

  // ✅ Start with REGISTER page
  const [state, setState] = useState("register");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // 🔹 EMAIL LOGIN / REGISTER
  const handleSubmit = (e) => {
    e.preventDefault();

    const name =
      state === "login"
        ? formData.email.split("@")[0]
        : formData.name;

    const isAdmin = formData.email === "admin@gmail.com";

    const userData = {
      name,
      email: formData.email,
      photo: `https://ui-avatars.com/api/?name=${name}`,
      provider: "email",
      role: isAdmin ? "admin" : "user",
    };

    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    setShowUserLogin(false);
    navigate("/");
  };

  // 🔹 GOOGLE LOGIN INIT
  useEffect(() => {
    if (!window.google) return;

    window.google.accounts.id.initialize({
      client_id: "692969735449-44s1slqgs3vasbgn6ajqqtsbeqpk88lq.apps.googleusercontent.com",
      callback: handleGoogleResponse,
    });

    window.google.accounts.id.renderButton(
      document.getElementById("google-login-btn"),
      {
        theme: "outline",
        size: "large",
        width: 300,
      }
    );
  }, []);

  // 🔹 GOOGLE LOGIN RESPONSE
  const handleGoogleResponse = (response) => {
    const userObject = JSON.parse(
      atob(response.credential.split(".")[1])
    );

    const isAdmin = userObject.email === "admin@gmail.com";

    const userData = {
      name: userObject.name,
      email: userObject.email,
      photo: userObject.picture,
      provider: "google",
      role: isAdmin ? "admin" : "user",
    };

    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    setShowUserLogin(false);
    navigate("/");
  };

  return (
    <div
      onClick={() => setShowUserLogin(false)}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm rounded-lg bg-white border p-5 mx-2"
      >
        <h1 className="mb-4 text-center text-2xl font-semibold">
          {state === "login" ? "Login" : "Create Account"}
        </h1>

        <form onSubmit={handleSubmit}>
          {state !== "login" && (
            <input
              type="text"
              placeholder="Name"
              required
              className="w-full py-2 border rounded text-center mb-3"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          )}

          <input
            type="email"
            placeholder="Email"
            required
            className="w-full py-2 border rounded text-center mb-3"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            required
            className="w-full py-2 border rounded text-center mb-4"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />

          <button className="w-full py-2.5 bg-primary text-white rounded">
            {state === "login" ? "Login" : "Create Account"}
          </button>
        </form>

        <p
          onClick={() =>
            setState(state === "login" ? "register" : "login")
          }
          className="mt-4 text-center text-sm cursor-pointer"
        >
          {state === "login"
            ? "Don't have an account? Sign Up"
            : "Already have an account? Login"}
        </p>

        <div className="my-6 text-center">Or continue with</div>
        <div id="google-login-btn" className="flex justify-center"></div>
      </div>
    </div>
  );
};

export default Login;