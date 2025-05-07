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
      className="bg-white hover:bg-gray-100 text-black font-semibold py-2 px-6 rounded-xl shadow-md border border-gray-300 transition duration-300"
    >
      insights
    </button>
  );
};

export default AdminButton;
