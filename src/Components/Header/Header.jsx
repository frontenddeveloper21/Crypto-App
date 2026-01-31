// import React from 'react'
// import logo from "../../../public/Images/DarkThemeLogo.png"
// import "../Style/Header.css"
// import { HiMenuAlt3 } from "react-icons/hi"; 

// import { FiSearch } from "react-icons/fi";
// import { IoClose } from "react-icons/io5";

// const Header = ({handleShowSideBar}) => {
//     return (
//         <div className='py-4 px-5 bg-[#FAFAFA]'>
//             <div className='flex justify-between items-center'>
//                 <div className="flex items-center gap-3">
//                         <button onClick={handleShowSideBar} className=" p-2 rounded hover:bg-gray-100">
//                             <HiMenuAlt3 size={24} className="text-gray-700" />
//                         </button>
//                         {/* <img src={logo} className='header_logo_img' alt="Logo" /> */}
//                         <div className="flex items-center gap-3 p-4">
//         <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#004D61] to-[#00A6A6] flex items-center justify-center text-white font-bold">
//           H
//         </div>
//         <h2 className="text-lg font-extrabold text-[#004D61]">Haoda Cash</h2>
//       </div>
//                 </div>
//                    <div className='search__box flex items-center'>
//                        <input
//                            className=''
//                            placeholder='Search employees or actions'
//                        />
//                    </div>
//             </div>
//         </div>
//     )
// }

// export default Header


import React from 'react';
import { HiMenuAlt3 } from "react-icons/hi";

const Header = ({ handleShowSideBar }) => {
    return (
        <div className='py-4 px-5 bg-[#FAFAFA] sticky top-0 z-10'>
            <div className='flex justify-between items-center'>
                <div className="flex items-center gap-3">
                    <button onClick={handleShowSideBar} className="p-2 rounded hover:bg-gray-100">
                        <HiMenuAlt3 size={24} className="text-gray-700" />
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#004D61] to-[#00A6A6] flex items-center justify-center text-white font-bold">
                            H
                        </div>
                        <h2 className="text-lg font-extrabold text-[#004D61]">Haoda Cash</h2>
                    </div>
                </div>
                <div className='search__box flex items-center'>
                    <input
                        className='border border-gray-300 rounded-md px-3 py-1'
                        placeholder='Search employees or actions'
                    />
                </div>
            </div>
        </div>
    )
}

export default Header;


// import React from 'react'
// import logo from "../../../public/Images/DarkThemeLogo.png"
// import "../Style/Header.css"

// import { FiSearch } from "react-icons/fi";
// import { IoClose } from "react-icons/io5";
// import { HiMenuAlt3 } from "react-icons/hi"; // hamburger icon

// const Header = ({ showSideBar, setShowSideBar, handleShowSideBar }) => {
//   return (
//     <header className="py-2 px-4 border-b border-gray-200 bg-white flex items-center justify-between">
      
//       {/* Left side: Hamburger + Logo */}
//       <div className="flex items-center gap-3">
//         {/* Hamburger (only visible on small screens) */}
//         <button
//           onClick={handleShowSideBar}
//           className=" p-2 rounded hover:bg-gray-100"
//         >
//           <HiMenuAlt3 size={24} className="text-gray-700" />
//         </button>

//         {/* Logo */}
//         <img src={logo} className="header_logo_img h-10" alt="Logo" />
//       </div>

//       {/* Right side: Search box */}
//       <div className="hidden md:flex items-center bg-gray-100 px-3 py-1 rounded-lg">
//         <FiSearch className="text-gray-400 mr-2" />
//         <input
//           className="bg-transparent outline-none text-sm w-64"
//           placeholder="Search employees or actions"
//         />
//         <button>
//           <IoClose className="text-gray-400 hover:text-gray-600" />
//         </button>
//       </div>
//     </header>
//   );
// };

// export default Header;
