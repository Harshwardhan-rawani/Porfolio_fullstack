import React, { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaWindowRestore } from "react-icons/fa";

function Adminlogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Send POST request to backend
      const response = await axios.post(`${import.meta.env.VITE_URL}/api/login`, formData);
   
      // Handle success response
      setLoading(false);
      localStorage.setItem("token", response.data.token); // Store token in localStorage
      navigate("/admin/dashboard"); // Redirect to dashboard
    } catch (error) {
      setLoading(false);
      const errorMessage = error.response?.data?.message || error.message;
      alert("Login failed: " + errorMessage);
    }
  finally  {
        window.location.reload()
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-md shadow-md">
        <h2 className="text-3xl font-bold text-center mb-6">Admin Login</h2>
        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="mb-4">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="mt-1 p-1 w-full border-b-2 border-gray-300 focus:outline-none focus:border-teal-500"
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="mt-1 p-1 w-full border-b-2 border-gray-300 focus:outline-none focus:border-teal-500"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            {loading ? (
              <button
                className="w-full py-2 flex space-x-2 items-center justify-center px-4 bg-green-600 text-white rounded-md hover:bg-green-500 focus:outline-none"
                disabled
              >
                <AiOutlineLoading3Quarters className="animate-spin" /> Logging in...
              </button>
            ) : (
              <button
                type="submit"
                className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-500 focus:outline-none"
              >
                Login
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Adminlogin;
