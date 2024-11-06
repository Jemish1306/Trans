// src/components/Layout2/Navbar.jsx
import React from 'react';

const Navbar = () => {
  return (
    <div className="flex justify-between items-center   text-white px-2   gap-4 w-full ">
      <div className="text-2xl font-bold bg-black text-textcolor rounded-full py-2 p-4 w-full my-2 h-14">wordibly</div>
      <div className="flex items-center space-x-6 w-1/3">
        <button className="bg-black w-full text-textcolor  py-4 rounded-full">
          Place a New Order
        </button>
        <div className="flex items-center space-x-2  text-textcolor text-text-color p-2 bg-black rounded-full ml-2 mr-2 ">
          <span className='mx-5 my-2'>Dillon</span>
          
        </div>
      </div>
    </div>
  );
};

export default Navbar;


