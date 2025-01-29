import React from "react";

type CardProps = {
  title: string;
  description: string;
};

const Card: React.FC<CardProps> = ({ title, description }) => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <p>{description}</p>
    </div>
  );
};

export default Card;
