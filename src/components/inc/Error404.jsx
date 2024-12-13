import React from "react";
import { useNavigate } from "react-router-dom";

const Error404 = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-800">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-black">404</h1>
        <h2 className="text-4xl font-semibold mt-4">Not Found</h2>
        <p className="text-lg text-gray-600 mt-4">
          Oops! The page you’re looking for doesn’t exist.
        </p>
        <button
          onClick={goHome}
          className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition-all duration-300"
        >
          Go Back Home
        </button>
      </div>
  
    </div>
  );
};

export default Error404;
