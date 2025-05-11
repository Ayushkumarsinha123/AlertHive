import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/admin');
  };

  return (
    <button
      onClick={handleClick}
      className="bg-white hover:bg-gray-100 text-black font-semibold p-2 rounded-xl shadow-md border border-gray-300 transition duration-300"
    >
      insights
    </button>
  );
};

export default AdminButton;
