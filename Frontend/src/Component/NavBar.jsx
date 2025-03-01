import React from 'react';

const NavBar = () => {
  return (
    <nav className="bg-purple-600 flex justify-between items-center px-20 h-14  ">
       <div className='text-2xl text font-bold text-center'>
          <span className="text-green-700">&lt;</span>
          <span>Pass</span>
          <span className="text-green-700">OP/&gt;</span>
        </div>
      <ul className="flex gap-6">
        <li>
          <a href="/" className="hover:font-bold text-white">Home</a>
        </li>
        <li>
          <a href="#" className="hover:font-bold text-white">About</a>
        </li>
        <li>
          <a href="#" className="hover:font-bold text-white">Contact</a>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
