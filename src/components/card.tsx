import React from "react";

type CardProps = {
  children: React.ReactNode;
};

const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition">
      {children}
    </div>
  );
};

export default Card;
