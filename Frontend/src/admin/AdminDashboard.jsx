import React from 'react';
import { Link } from 'react-router-dom';

function AdminDashboard() {
  const cards = [
    { name: "Tools", color: "bg-[#16C47F]", hoverColor: "hover:bg-[#1A9A58]" },
    { name: "About", color: "bg-[#FF5733]", hoverColor: "hover:bg-[#FF3B24]" },
    { name: "Skill", color: "bg-[#3498DB]", hoverColor: "hover:bg-[#2980B9]" },
    { name: "Resume", color: "bg-[#F1C40F]", hoverColor: "hover:bg-[#F39C12]" },
    { name: "Project", color: "bg-[#8E44AD]", hoverColor: "hover:bg-[#9B59B6]" },
    { name: "Internship", color: "bg-[#1ABC9C]", hoverColor: "hover:bg-[#16A085]" },
    { name: "Experience", color: "bg-[#E74C3C]", hoverColor: "hover:bg-[#C0392B]" },
    { name: "Profile", color: "bg-[#754E1A]", hoverColor: "hover:bg-[#6E4B1A]" }
  ];

  return (
    <>
      <div className="text-xl mt-4 font-bold mx-3">Dashboard</div>
      <div className="flex justify-center mt-3 py-24 bg-[#155E95] rounded-lg text-white mx-3">
        <h1 className="font-serif text-4xl font-bold">Portfolio</h1>
      </div>
      <div className="mt-3 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        {cards.map((card) => (
          <Link
            to={`../${card.name}`}
            key={card.name}
            className={`shadow-md rounded-lg p-5 ${card.color} ${card.hoverColor} hover:shadow-lg transition-shadow duration-300`}
          >
            <h2 className="text-xl font-bold mb-2 text-center text-white">{card.name}</h2>
          </Link>
        ))}
      </div>
    </>
  );
}

export default AdminDashboard;
