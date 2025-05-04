import React from "react";
import { useNavigate } from "react-router";

const TravelPage = () => {
  const navigate = useNavigate();
  return (
    <button
      className=""
      onClick={() => {
        navigate("/dashboard");
      }}>
      Dashboard
    </button>
  );
};

export default TravelPage;
