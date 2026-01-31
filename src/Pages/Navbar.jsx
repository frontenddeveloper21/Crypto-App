import { useState } from "react";
import { ChevronDown, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import "../Style/Navbar.css"
const Navbar = () => {
  const [langOpen, setLangOpen] = useState(false);

  return (
    <nav className="w-full navbar_css">
  
      <div className="text-2xl font-bold">
        <span className="crypto_text">Haoda</span>
        <span className="cap_text text-[#366FFF]">Cash</span>
      </div>

      <ul className="hidden md:flex gap-8 navbar__page">
        {["Home", "Businesses", "Trade", "Market", "Learn"].map((item) => (
          <li key={item}>
            <Link
              to="/"
              className=""
            >
              {item}
            </Link>
          </li>
        ))}
      </ul>

      {/* Right Section */}
      <div className="flex items-center gap-4">
       

     
         <button className="login_btn w-[104px]">
          <a href="https://crypto-edv.pages.dev/sign-in">Login</a>
        </button>
         <button className="login_btn w-[120px]">
         <a href="https://cryptouat.crypto-edv.pages.dev/sign-up">Sign Up</a>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
