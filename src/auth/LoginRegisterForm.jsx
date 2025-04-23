import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginRegisterForm() {
  const [mode, setMode] = useState("login");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = form.email.value;
    const password = form.password.value;

    if (mode === "register") {
      const username = form.username.value;
      const existingUser = localStorage.getItem(email);
      if (existingUser) {
        alert("User already exists!");
      } else {
        localStorage.setItem(
          email,
          JSON.stringify({ username, email, password })
        );
        alert("Registration successful! You can now log in.");
        setMode("login");
      }
    } else {
      const userData = localStorage.getItem(email);
      if (!userData) {
        alert("User not found!");
        return;
      }
      const parsed = JSON.parse(userData);
      if (parsed.password !== password) {
        alert("Incorrect password!");
      } else {
        alert(`Welcome back, ${parsed.username || "User"}!`);
        navigate("/create-order", { replace: true });

      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-100 to-indigo-200 p-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 sm:p-8">
        <div className="flex justify-between mb-6">
          <button
            type="button"
            onClick={() => setMode("login")}
            className={`text-lg font-medium w-1/2 py-2 rounded-l-xl ${
              mode === "login"
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setMode("register")}
            className={`text-lg font-medium w-1/2 py-2 rounded-r-xl ${
              mode === "register"
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            Register
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {mode === "register" && (
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Username
              </label>
              <input
                name="username"
                id="username"
                type="text"
                placeholder="Your name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          )}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              name="email"
              id="email"
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              name="password"
              id="password"
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            {mode === "login" ? "Login" : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}
