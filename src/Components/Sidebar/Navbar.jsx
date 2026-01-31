
// import { NavLink, useLocation } from "react-router-dom";
// import { useState, useEffect, useRef } from "react";
// import {
//   LayoutDashboard,
//   ChevronUp,
//   ChevronDown,
//   Wallet,
//   Image,
//   TrendingUp,
//   RefreshCw,
//   History,
//   ShieldCheck,
//   Users,
//   UserCog,
//   PieChart,
//   UserCircle,
//   UserSquare2,
//   CreditCard,
//   ShieldAlert,
//   IdCard,
//   FileSearch,
//   AlertTriangle,
//   Lock,
//   Building,
//   Banknote,
//   Bell,
//   SlidersHorizontal,
//   Briefcase,
//   PauseCircle,
//   AlertOctagon,
//   Activity,
//   CheckCircle,
//   Settings,
//   ArrowLeftRight,
//   Shield,
//   Sliders,
//   SearchCheck,
//   Building2
// } from "lucide-react";


// const Navbar = ({ showSideBar, setShowSideBar, collapsed }) => {
//   const location = useLocation();
//   const [openMenu, setOpenMenu] = useState(null);
//   const [openSubMenu, setOpenSubMenu] = useState(null); // 👈 new state for 3rd level
//   const sidebarRef = useRef(null);

//   const [openSubMenuMap, setOpenSubMenuMap] = useState({}); // second/third-level

//   // const toggleSubMenu = (parentName, childName) => {
//   //   setOpenSubMenuMap(prev => ({
//   //     ...prev,
//   //     [parentName]: prev[parentName] === childName ? null : childName
//   //   }));
//   // };

//   useEffect(() => {
//     const currentMain = links.find((link) =>
//       link.children?.some(
//         (child) =>
//           location.pathname.startsWith(child.path) ||
//           child.children?.some((sub) => location.pathname.startsWith(sub.path))
//       )
//     );
//     if (currentMain) setOpenMenu(currentMain.name);
//   }, [location.pathname]);

//   // Close sidebar if clicked outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (sidebarRef.current && !sidebarRef.current.contains(event.target) && showSideBar) {
//         setShowSideBar(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [showSideBar]);

//   // Toggle second-level submenu
//   const toggleSubMenu = (parentName, childName) => {
//     setOpenSubMenuMap((prev) => ({
//       ...prev,
//       [parentName]: prev[parentName] === childName ? null : childName,
//     }));
//   };
//   const links = [
//     { name: "Dashboard", path: "/", icon: <LayoutDashboard size={18} /> },
//     { name: "Assets", path: "/assets", icon: <Wallet size={18} /> },
//     { name: "NFT", path: "/nft", icon: <Image size={18} /> },
//     { name: "Staking", path: "/staking", icon: <TrendingUp size={18} /> },
//     { name: "Swap", path: "/swap", icon: <RefreshCw size={18} /> },
//     { name: "Transaction History", path: "/transaction-history", icon: <History size={18} /> },
//     { name: "Whitelisted Addresses", path: "/whitelisted-addresses", icon: <ShieldCheck size={18} /> },
//     { name: "P2P", path: "/p2p", icon: <Users size={18} /> },
//     { name: "P2C", path: "/p2c", icon: <UserCog size={18} /> },
//     { name: "Portfolio", path: "/portfolio", icon: <PieChart size={18} /> },
//     {
//       name: "User Management",
//       icon: <UserCircle size={18} />,
//       children: [
//         { name: "Users", path: "/usermanagement/user", icon: <Users size={18} /> },
//         { name: "Department", path: "/usermanagement/department", icon: <Briefcase size={18} /> },
//         { name: "Role", path: "/usermanagement/role", icon: <UserCog size={18} /> },
//         { name: "Module", path: "/usermanagement/module", icon: <SlidersHorizontal size={18} /> },
//       ],
//     },
//     {
//       name: "Accounts",
//       icon: <Wallet size={18} />,
//       children: [
//         { name: "Vault", path: "/accounts/vault", icon: <Lock size={18} /> },
//         { name: "Exchanges", path: "/accounts/exchanges", icon: <ArrowLeftRight size={18} /> },
//         { name: "Fiat", path: "/accounts/fiat", icon: <Banknote size={18} /> },
//       ],
//     },
//     {
//       name: "Customers",
//       icon: <UserSquare2 size={18} />,
//       children: [
//         { name: "Customers Details", path: "/customers/details", icon: <UserSquare2 size={18} /> },
//         { name: "KYC", path: "/customers/kyc", icon: <IdCard size={18} /> },
//         { name: "Compliance", path: "/customers/compliance", icon: <ShieldAlert size={18} /> },
//         { name: "Risk Management", path: "/customers/risk", icon: <AlertTriangle size={18} /> },
//       ],
//     },
//     {
//       name: "Compliance",
//       icon: <ShieldCheck size={18} />,
//       children: [
//         {
//           name: "KYC",
//           icon: <IdCard size={18} />,
//           children: [
//             { name: "Onhold", path: "/kyc/onhold", icon: <PauseCircle size={16} /> },
//             { name: "High Risk", path: "/kyc/high-risk", icon: <AlertTriangle size={16} /> },
//             { name: "Middle Risk", path: "/kyc/middle-risk", icon: <AlertOctagon size={16} /> },
//             { name: "Low Risk", path: "/kyc/low-risk", icon: <Shield size={16} /> },
//             { name: "Notification", path: "/kyc/notification", icon: <Bell size={16} /> },
//             { name: "Parameters", path: "/kyc/parameters", icon: <Sliders size={16} /> },
//           ],
//         },
//         {
//           name: "AML",
//           icon: <SearchCheck size={18} />,
//           children: [
//             { name: "Business Type", path: "/aml/business-type", icon: <Building2 size={16} /> },
//             { name: "Onhold", path: "/aml/onhold", icon: <PauseCircle size={16} /> },
//             { name: "High Risk", path: "/aml/high-risk", icon: <AlertTriangle size={16} /> },
//             { name: "Middle Risk", path: "/aml/middle-risk", icon: <AlertOctagon size={16} /> },
//             { name: "Low Risk", path: "/aml/low-risk", icon: <Shield size={16} /> },
//             { name: "Parameters", path: "/aml/parameters", icon: <Sliders size={16} /> },
//           ],
//         },
//         {
//           name: "Risk Managements",
//           icon: <SearchCheck size={18} />,
//           children: [
//             { name: "Contain Update", path: "/risk-management/contain-update", icon: <Building2 size={16} /> },
//             { name: "Parameter", path: "/risk-management/parameter", icon: <PauseCircle size={16} /> },
//             { name: "Notification", path: "/risk-management/notification", icon: <AlertTriangle size={16} /> },
//           ],
//         },
//       ],
//     },
//     {
//       name: "Logs",
//       icon: <UserCircle size={18} />,
//       children: [
//         { name: "Internal Logs", path: "/internal-logs", icon: <Users size={18} /> },
//         { name: "External Logs", path: "/external-logs", icon: <Briefcase size={18} /> },
//         { name: "Mobile Logs", path: "/mobile-logs", icon: <UserCog size={18} /> },
//         { name: "Web Logs", path: "/web-logs", icon: <SlidersHorizontal size={18} /> },
//       ],
//     },

//     {
//       name: "RM",
//       icon: <UserCircle size={18} />,
//       children: [
//         { name: "User", path: "/rm/user", icon: <Users size={18} /> },
//         { name: "Call Log", path: "/rm/call-log", icon: <Briefcase size={18} /> },
//         { name: "Customers", path: "/rm/customers", icon: <UserCog size={18} /> },
//       ],
//     },
//     {
//       name: "Report",
//       icon: <UserCircle size={18} />,
//       children: [
//         { name: "Transactions", path: "/report/transaction", icon: <Users size={18} /> },
//         { name: "Top Gainers or Losers", path: "/report/top-gainers-losers", icon: <Briefcase size={18} /> },
//         { name: "Marketing Capitalizations", path: "/report/capitalizations", icon: <UserCog size={18} /> },
//         { name: "Crypto Summary", path: "/report/crypto-summary", icon: <UserCog size={18} /> },
//       ],
//     },
//     { name: "Currency Exchange", path: "/currency-exchange", icon: <PieChart size={18} /> },
//     {
//       name: "Manage Investment",
//       icon: <UserCircle size={18} />,
//       children: [
//         { name: "Investment Plan", path: "/manage-investment/investment-plan", icon: <Users size={18} /> },
//         { name: "Investment History", path: "/manage-investment/investment-history", icon: <Briefcase size={18} /> },
//         { name: "Return History", path: "/manage-investment/return-history", icon: <UserCog size={18} /> },
//         { name: "Investment Plan Settings", path: "/manage-investment/investment-plan-settings", icon: <UserCog size={18} /> },
//         { name: "Invest Template", path: "/manage-investment/invest-template", icon: <UserCog size={18} /> },
//       ],
//     },

//     {
//       name: "Manage Stake",
//       icon: <UserCircle size={18} />,
//       children: [
//         { name: "Stake Plan", path: "/manage-stake/stake-plan", icon: <Users size={18} /> },
//         { name: "Stake History", path: "/manage-stake/stake-history", icon: <Briefcase size={18} /> },
//       ],
//     },

//     {
//       name: "Manage Pool",
//       icon: <UserCircle size={18} />,
//       children: [
//         { name: "Manage Pool", path: "/manage-pool/pool-setup", icon: <Users size={18} /> },
//         { name: "Manual Payout", path: "/manage-pool/manual-payout", icon: <Briefcase size={18} /> },
//         { name: "History", path: "/manage-pool/history", icon: <Briefcase size={18} /> },
//       ],
//     },

//     {
//       name: "Payments",
//       icon: <UserCircle size={18} />,
//       children: [
//         { name: "Wallet Setting", path: "/payments/wallet-setting", icon: <Users size={18} /> },
//         { name: "Deposit Method", path: "/payments/deposit-method", icon: <Briefcase size={18} /> },
//         { name: "Withdraw Method", path: "/payments/withdraw-method", icon: <Briefcase size={18} /> },
//         { name: "Pending Deposit", path: "/payments/pending-deposit", icon: <Briefcase size={18} /> },
//         { name: "Pending Withdraw", path: "/payments/pending-withdraw", icon: <Briefcase size={18} /> },
//         { name: "Deposit History", path: "/payments/deposit-history", icon: <Briefcase size={18} /> },
//         { name: "Withdraw History", path: "/payments/withdraw-history", icon: <Briefcase size={18} /> },
//         { name: "Payment Gateway", path: "/payments/payment-gateway", icon: <Briefcase size={18} /> },
//       ],
//     },

//     {
//       name: "Target Setting",
//       icon: <UserCircle size={18} />,
//       children: [
//         { name: "Sales Target", path: "/target-setting/sales-target", icon: <Users size={18} /> },
//         { name: "Calls Target", path: "/target-setting/calls-target", icon: <Briefcase size={18} /> },
//         { name: "Onboard Target", path: "/target-setting/onboard-target", icon: <Briefcase size={18} /> },
//         { name: "Reachout Target", path: "/target-setting/reach-out-target", icon: <Briefcase size={18} /> },
//         { name: "Budget", path: "/target-setting/budget", icon: <Briefcase size={18} /> },
//       ],
//     },

//     {
//       name: "Marketing Setting",
//       icon: <UserCircle size={18} />,
//       children: [
//         { name: "Users", path: "/marketing-setting/users", icon: <Users size={18} /> },
//         { name: "Bonus Settings", path: "/marketing-setting/Bonus-Setting", icon: <Briefcase size={18} /> },
//         { name: "Referral", path: "/marketing-setting/referral", icon: <Briefcase size={18} /> },
//         { name: "Blog Post", path: "/marketing-setting/blog-post", icon: <Briefcase size={18} /> },
//         { name: "Onboard Customer", path: "/marketing-setting/onboarded-customer", icon: <Briefcase size={18} /> },
//         { name: "Remarketing", path: "/marketing-setting/remarketing", icon: <Briefcase size={18} /> },
//         { name: "Budget", path: "/marketing-setting/budget", icon: <Briefcase size={18} /> },
//         { name: "Task Creation", path: "/marketing-setting/task-creations", icon: <Briefcase size={18} /> },
//         { name: "Notification", path: "/marketing-setting/notifications", icon: <Briefcase size={18} /> },
//         // {
//         //   name: "Remarketing",
//         //   icon: <SearchCheck size={18} />,
//         //   children: [
//         //     { name: "Contain Update", path: "/risk-management/contain-update", icon: <Building2 size={16} /> },
//         //     { name: "Parameter", path: "/risk-management/parameter", icon: <PauseCircle size={16} /> },
//         //     { name: "Notification", path: "/risk-management/notification", icon: <AlertTriangle size={16} /> },
//         //   ],
//         // },
//       ],
//     },
//   ];


//   return (


//     <div
//       ref={sidebarRef}
//       className={`h-screen bg-white overflow-y-auto shadow-xl border-r border-gray-200 flex flex-col transition-all duration-300
//     ${collapsed ? "w-20" : "w-[280px]"}`}
//     >
//       {/* Logo */}
//       <div className={`flex items-center sticky z-auto top-0 bg-white gap-3 p-4 border-b border-gray-100 ${collapsed ? "justify-center" : ""}`}>
//         <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#004D61] to-[#00A6A6] flex items-center justify-center text-white font-bold">
//           H
//         </div>
//         {!collapsed && <h2 className="text-lg font-extrabold text-[#004D61]">Haoda Cash</h2>}
//       </div>

//       {/* Menu */}
//       <div className="flex flex-col gap-3 p-4">
//         {links.map(link => (
//           <div key={link.name} className="flex flex-col">
//             {/* First-level button */}
//             {link.children ? (
//               <button
//                 type="button"
//                 onClick={() => setOpenMenu(openMenu === link.name ? null : link.name)}
//                 className={`flex items-center justify-between gap-3 px-3 py-2 text-sm font-medium transition ${
//                   // Check if link itself is active OR any of its children/grandchildren
//                   location.pathname === link.path ||
//                     link.children?.some(child =>
//                       child.path === location.pathname ||
//                       child.children?.some(sub => sub.path === location.pathname)
//                     )
//                     ? "bg-gradient-to-r from-[#004D61] to-[#00A6A6] text-white"
//                     : "text-gray-700 hover:bg-gray-100 hover:text-[#004D61]"
//                   } ${collapsed ? "justify-center" : ""}`}
//               >
//                 <div className="flex items-center gap-5">
//                   {link.icon}
//                   {!collapsed && <span>{link.name}</span>}
//                 </div>
//                 {!collapsed && link.children && (openMenu === link.name ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
//               </button>

//             ) : (

//               <NavLink
//                 key={link.name}
//                 to={link.path}
//                 onClick={() => setShowSideBar(false)}
//                 className={({ isActive }) =>
//                   `flex items-center gap-3 px-3 py-2 text-sm font-medium transition 
//                   ${collapsed ? "justify-center" : ""} 
//                   ${isActive ? "bg-gradient-to-r from-[#004D61] to-[#00A6A6] text-white" : "text-gray-600 hover:bg-gray-100 hover:text-[#004D61]"}`
//                 }
//               >
//                 {link.icon}
//                 {!collapsed && <span>{link.name}</span>}
//               </NavLink>

//             )}

//             {/* Submenu */}
//             {link.children && !collapsed && (
//               <div
//                 className={`ml-6 mt-1 flex flex-col gap-2 overflow-hidden transition-all duration-300 ${openMenu === link.name ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
//               >
//                 {link.children.map(child => (
//                   <div key={child.name} className="flex flex-col">
//                     {child.children ? (
//                       <>
//                         {/* Second-level button */}
//                         <button
//                           type="button"
//                           onClick={() => toggleSubMenu(link.name, child.name)}
//                           className={`flex items-center justify-between w-full px-3 py-2 text-sm transition
//                            ${child.children?.some(sub => location.pathname === sub.path)
//                               ? "bg-gradient-to-r from-[#004D61] to-[#00A6A6] text-white"
//                               : "text-gray-700 hover:bg-gray-100 hover:text-[#004D61]"
//                             }`}
//                         >
//                           <div className="flex items-center gap-2">
//                             {child.icon}
//                             {child.name}
//                           </div>
//                           {child.children &&
//                             (openSubMenuMap[link.name] === child.name ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
//                         </button>

//                         {/* Third-level submenu */}
//                         <div
//                           className={`ml-6 mt-1 flex flex-col overflow-hidden transition-all duration-300 ${openSubMenuMap[link.name] === child.name ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
//                             }`}
//                         >
//                           {child.children.map(sub => (
//                             <NavLink
//                               key={sub.name}
//                               to={sub.path}
//                               className={({ isActive }) =>
//                                 `px-3 py-2 text-sm flex gap-2 rounded-md ${isActive
//                                   ? "bg-gradient-to-r from-[#004D61] to-[#00A6A6] text-white"
//                                   : "text-gray-600 hover:bg-gray-100 hover:text-[#004D61]"
//                                 }`
//                               }
//                             >
//                               {sub.icon}
//                               {sub.name}
//                             </NavLink>
//                           ))}
//                         </div>
//                       </>

//                     ) : (
//                       <NavLink
//                         to={child.path}
//                         className={({ isActive }) =>
//                           `px-3 py-2 text-sm flex gap-2 rounded-md ${isActive ? "bg-gradient-to-r from-[#004D61] to-[#00A6A6] text-white" : "text-gray-600 hover:bg-gray-100 hover:text-[#004D61]"}`
//                         }
//                       >
//                         {child.icon}
//                         {child.name}
//                       </NavLink>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Navbar;


import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Wallet,
  Image,
  TrendingUp,
  RefreshCw,
  History,
  ShieldCheck,
  Users,
  UserCog,
  PieChart,
  UserCircle,
  ChevronUp,
  ChevronDown,
  ChevronRight,
  Briefcase,
  Lock,
  ArrowLeftRight,
  Banknote,
  UserSquare2,
  IdCard,
  ShieldAlert,
  AlertTriangle,
  SearchCheck,
  AlertOctagon,
  Shield,
  Bell,
  Sliders,
  Building2,
  PauseCircle,
  UserSquare,
  SlidersHorizontal,
} from "lucide-react";

const Navbar = ({ showSideBar, setShowSideBar, collapsed }) => {
  const location = useLocation();
  const sidebarRef = useRef(null);

  const [openMenu, setOpenMenu] = useState(null);
  const [openSubMenuMap, setOpenSubMenuMap] = useState({});
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [hoveredSubMenu, setHoveredSubMenu] = useState(null);
  const [hoverPos, setHoverPos] = useState({ top: 0 });
  const [nestedHover, setNestedHover] = useState(false);
  const [floatingHover, setFloatingHover] = useState(false);
  const hoverTimeout = useRef(null);
  const floatingRef = useRef(null);
  const nestedRef = useRef(null);

  // ---------------- LINKS ----------------
  const links = [
    { name: "Dashboard", path: "/", icon: <LayoutDashboard size={18} /> },
     {
      name: "User Management",
      icon: <UserCircle size={18} />,
      children: [
        { name: "Users", path: "/usermanagement/user", icon: <Users size={18} /> },
        { name: "Department", path: "/usermanagement/department", icon: <Briefcase size={18} /> },
        { name: "Role", path: "/usermanagement/role", icon: <UserCog size={18} /> },
        { name: "Module", path: "/usermanagement/module", icon: <SlidersHorizontal size={18} /> },
      ],
    },
    { name: "Assets", path: "/assets", icon: <Wallet size={18} /> },
    { name: "Payroll", path: "/payroll-services", icon: <Wallet size={18} /> },
    { name: "Vendor Management", path: "/vendor-management", icon: <Wallet size={18} /> },
    { name: "NFT", path: "/nft", icon: <Image size={18} /> },
    { name: "Staking", path: "/staking", icon: <TrendingUp size={18} /> },
    { name: "Swap", path: "/swap", icon: <RefreshCw size={18} /> },
    { name: "Transaction History", path: "/transaction-history", icon: <History size={18} /> },
    { name: "Whitelisted Addresses", path: "/whitelisted-addresses", icon: <ShieldCheck size={18} /> },
    { name: "P2P", path: "/p2p", icon: <Users size={18} /> },
    { name: "P2C", path: "/p2c", icon: <UserCog size={18} /> },
    { name: "Portfolio", path: "/portfolio", icon: <PieChart size={18} /> },
   
    {
      name: "Accounts",
      icon: <Wallet size={18} />,
      children: [
        { name: "Vault", path: "/accounts/vault", icon: <Lock size={18} /> },
        { name: "Exchanges", path: "/accounts/exchanges", icon: <ArrowLeftRight size={18} /> },
        { name: "Fiat", path: "/accounts/fiat", icon: <Banknote size={18} /> },
      ],
    },
    {
      name: "Customers",
      icon: <UserSquare2 size={18} />,
      children: [
        { name: "Customers Details", path: "/customers/details", icon: <UserSquare2 size={18} /> },
        { name: "KYC", path: "/customers/kyc", icon: <IdCard size={18} /> },
        { name: "Compliance", path: "/customers/compliance", icon: <ShieldAlert size={18} /> },
        { name: "Risk Management", path: "/customers/risk", icon: <AlertTriangle size={18} /> },
      ],
    },
    {
      name: "Compliance",
      icon: <ShieldCheck size={18} />,
      children: [
        {
          name: "KYC",
          icon: <IdCard size={18} />,
          children: [
            { name: "Onhold", path: "/kyc/onhold", icon: <PauseCircle size={16} /> },
            { name: "High Risk", path: "/kyc/high-risk", icon: <AlertTriangle size={16} /> },
            { name: "Middle Risk", path: "/kyc/middle-risk", icon: <AlertOctagon size={16} /> },
            { name: "Low Risk", path: "/kyc/low-risk", icon: <Shield size={16} /> },
            { name: "Notification", path: "/kyc/notification", icon: <Bell size={16} /> },
            { name: "Parameters", path: "/kyc/parameters", icon: <Sliders size={16} /> },
          ],
        },
        {
          name: "AML",
          icon: <SearchCheck size={18} />,
          children: [
            { name: "Business Type", path: "/aml/business-type", icon: <Building2 size={16} /> },
            { name: "Onhold", path: "/aml/onhold", icon: <PauseCircle size={16} /> },
            { name: "High Risk", path: "/aml/high-risk", icon: <AlertTriangle size={16} /> },
            { name: "Middle Risk", path: "/aml/middle-risk", icon: <AlertOctagon size={16} /> },
            { name: "Low Risk", path: "/aml/low-risk", icon: <Shield size={16} /> },
            { name: "Parameters", path: "/aml/parameters", icon: <Sliders size={16} /> },
          ],
        },
        {
          name: "Risk Managements",
          icon: <SearchCheck size={18} />,
          children: [
            { name: "Contain Update", path: "/risk-management/contain-update", icon: <Building2 size={16} /> },
            { name: "Parameter", path: "/risk-management/parameter", icon: <PauseCircle size={16} /> },
            { name: "Notification", path: "/risk-management/notification", icon: <AlertTriangle size={16} /> },
          ],
        },
      ],
    },
    {
      name: "Logs",
      icon: <UserCircle size={18} />,
      children: [
        { name: "Internal Logs", path: "/internal-logs", icon: <Users size={18} /> },
        { name: "External Logs", path: "/external-logs", icon: <Briefcase size={18} /> },
        { name: "Mobile Logs", path: "/mobile-logs", icon: <UserCog size={18} /> },
        { name: "Web Logs", path: "/web-logs", icon: <SlidersHorizontal size={18} /> },
      ],
    },

    {
      name: "RM",
      icon: <UserCircle size={18} />,
      children: [
        { name: "User", path: "/rm/user", icon: <Users size={18} /> },
        { name: "Call Log", path: "/rm/call-log", icon: <Briefcase size={18} /> },
        { name: "Customers", path: "/rm/customers", icon: <UserCog size={18} /> },
      ],
    },
    {
      name: "Report",
      icon: <UserCircle size={18} />,
      children: [
        { name: "Transactions", path: "/report/transaction", icon: <Users size={18} /> },
        { name: "Top Gainers or Losers", path: "/report/top-gainers-losers", icon: <Briefcase size={18} /> },
        { name: "Marketing Capitalizations", path: "/report/capitalizations", icon: <UserCog size={18} /> },
        { name: "Crypto Summary", path: "/report/crypto-summary", icon: <UserCog size={18} /> },
      ],
    },
    { name: "Currency Exchange", path: "/currency-exchange", icon: <PieChart size={18} /> },

    {
      name: "Manage Stake",
      icon: <UserCircle size={18} />,
      children: [
        { name: "Stake Plan", path: "/manage-stake/stake-plan", icon: <Users size={18} /> },
        { name: "Stake History", path: "/manage-stake/stake-history", icon: <Briefcase size={18} /> },
      ],
    },

    {
      name: "Manage Pool",
      icon: <UserCircle size={18} />,
      children: [
        { name: "Manage Pool", path: "/manage-pool/pool-setup", icon: <Users size={18} /> },
        { name: "Manual Payout", path: "/manage-pool/manual-payout", icon: <Briefcase size={18} /> },
        { name: "History", path: "/manage-pool/history", icon: <Briefcase size={18} /> },
      ],
    },

    {
      name: "Payments",
      icon: <UserCircle size={18} />,
      children: [
        { name: "Wallet Setting", path: "/payments/wallet-setting", icon: <Users size={18} /> },
        { name: "Deposit Method", path: "/payments/deposit-method", icon: <Briefcase size={18} /> },
        { name: "Withdraw Method", path: "/payments/withdraw-method", icon: <Briefcase size={18} /> },
        { name: "Pending Deposit", path: "/payments/pending-deposit", icon: <Briefcase size={18} /> },
        { name: "Pending Withdraw", path: "/payments/pending-withdraw", icon: <Briefcase size={18} /> },
        { name: "Deposit History", path: "/payments/deposit-history", icon: <Briefcase size={18} /> },
        { name: "Withdraw History", path: "/payments/withdraw-history", icon: <Briefcase size={18} /> },
        { name: "Payment Gateway", path: "/payments/payment-gateway", icon: <Briefcase size={18} /> },
      ],
    },

    {
      name: "Target Setting",
      icon: <UserCircle size={18} />,
      children: [
        { name: "Sales Target", path: "/target-setting/sales-target", icon: <Users size={18} /> },
        { name: "Calls Target", path: "/target-setting/calls-target", icon: <Briefcase size={18} /> },
        { name: "Onboard Target", path: "/target-setting/onboard-target", icon: <Briefcase size={18} /> },
        { name: "Reachout Target", path: "/target-setting/reach-out-target", icon: <Briefcase size={18} /> },
        { name: "Budget", path: "/target-setting/budget", icon: <Briefcase size={18} /> },
      ],
    },

    {
      name: "Marketing Setting",
      icon: <UserCircle size={18} />,
      children: [
        { name: "Users", path: "/marketing-setting/users", icon: <Users size={18} /> },
        { name: "Bonus Settings", path: "/marketing-setting/Bonus-Setting", icon: <Briefcase size={18} /> },
        { name: "Referral", path: "/marketing-setting/referral", icon: <Briefcase size={18} /> },
        { name: "Blog Post", path: "/marketing-setting/blog-post", icon: <Briefcase size={18} /> },
        { name: "Onboard Customer", path: "/marketing-setting/onboarded-customer", icon: <Briefcase size={18} /> },
        { name: "Remarketing", path: "/marketing-setting/remarketing", icon: <Briefcase size={18} /> },
        { name: "Budget", path: "/marketing-setting/budget", icon: <Briefcase size={18} /> },
        { name: "Task Creation", path: "/marketing-setting/task-creations", icon: <Briefcase size={18} /> },
        { name: "Notification", path: "/marketing-setting/notifications", icon: <Briefcase size={18} /> },
      ],
    },
  ];
  // ---------------- EFFECTS ----------------
  useEffect(() => {
    const currentMain = links.find((link) =>
      link.children?.some(
        (child) =>
          location.pathname.startsWith(child.path) ||
          child.children?.some((sub) => location.pathname.startsWith(sub.path))
      )
    );
    if (currentMain) setOpenMenu(currentMain.name);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target) && showSideBar) {
        setShowSideBar(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showSideBar]);

  useEffect(() => {
    return () => clearTimeout(hoverTimeout.current);
  }, []);

  // ---------------- HANDLERS ----------------
  const toggleSubMenu = (parentName, childName) => {
    setOpenSubMenuMap((prev) => ({
      ...prev,
      [parentName]: prev[parentName] === childName ? null : childName,
    }));
  };


  const handleMouseEnter = (e, menuName) => {
    if (collapsed) {
      clearTimeout(hoverTimeout.current);
      const rect = e.currentTarget.getBoundingClientRect();
      setHoverPos({ top: rect.top + rect.height / 2 });
      setHoveredMenu(menuName);
      setHoveredSubMenu(null);
    }
  };

  const handleMouseLeave = () => {
    if (collapsed) {
      hoverTimeout.current = setTimeout(() => {
        if (!nestedHover && !floatingHover) {
          setHoveredMenu(null);
          setHoveredSubMenu(null);
        }
      }, 200);
    }
  };

  // ---------------- FLOATING MENUS ----------------
  const renderFloatingMenu = (items, parentPos) => {
    if (!items || !parentPos) return null;

    return (
      <div
        className="absolute"
        style={{ top: parentPos.top, left: parentPos.left, zIndex: 9999 }}
        onMouseEnter={() => {
          clearTimeout(hoverTimeout.current);
          setFloatingHover(true);
        }}
        onMouseLeave={() => {
          setFloatingHover(false);
          hoverTimeout.current = setTimeout(() => {
            setHoveredMenu(null);
            setHoveredSubMenu(null);
          }, 150);
        }}
      >
        <div className="bg-white border border-gray-200 shadow-xl rounded-md overflow-hidden w-56">
          {items.map((item) => (
            <div key={item.name} className="relative group">
              <NavLink
                to={item.path || "#"}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2 text-sm transition ${isActive
                    ? "bg-gradient-to-r from-[#004D61] to-[#00A6A6] text-white"
                    : "hover:bg-gray-100 hover:text-[#004D61] text-gray-700"
                  }`
                }
                onMouseEnter={(e) => {
                  if (item.children) {
                    const rect = e.currentTarget.getBoundingClientRect();
                    setHoveredSubMenu({
                      items: item.children,
                      pos: { top: rect.top + 4, left: rect.right - 1 },
                    });
                  } else {
                    console.log("🧹 No submenu for:", item.name);
                    // 🧠 Don't close here — just keep submenu open until mouse leaves
                  }
                }}
                onClick={() => setShowSideBar(false)}
              >
                <div className="flex items-center gap-2">
                  {item.icon}
                  {item.name}
                </div>
                {item.children && <ChevronRight size={14} />}
              </NavLink>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ---------------- RENDER ----------------
  return (
    <div
      ref={sidebarRef}
      className={`h-screen bg-white shadow-xl border-r border-gray-200 flex flex-col transition-all duration-300 relative ${collapsed ? "w-20" : "w-[280px]"
        }`}
      style={{ overflow: "visible" }}
    >
      {/* Logo */}
      <div
        className={`flex items-center sticky top-0 bg-white gap-3 p-4 border-b border-gray-100 z-0 ${collapsed ? "justify-center" : ""
          }`}
      >
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#004D61] to-[#00A6A6] flex items-center justify-center text-white font-bold">
          H
        </div>
        {!collapsed && <h2 className="text-lg font-extrabold text-[#004D61]">Haoda Cash</h2>}
      </div>

      {/* Scrollable Menu */}
      <div className="flex-1 flex flex-col gap-3 p-4" style={{ overflowY: "auto" }}>
        {links.map((link) => (
          <div key={link.name} className="flex flex-col relative group">
            {link.children ? (
              <button
                type="button"
                onClick={() =>
                  !collapsed && setOpenMenu(openMenu === link.name ? null : link.name)
                }
                onMouseEnter={(e) => handleMouseEnter(e, link.name)}
                onMouseLeave={handleMouseLeave}
                className={`flex items-center justify-between gap-3 px-3 py-2 text-sm font-medium transition ${location.pathname === link.path ||
                    link.children?.some(
                      (child) =>
                        child.path === location.pathname ||
                        child.children?.some((sub) => sub.path === location.pathname)
                    )
                    ? "bg-gradient-to-r from-[#004D61] to-[#00A6A6] text-white"
                    : "text-gray-700 hover:bg-gray-100 hover:text-[#004D61]"
                  } ${collapsed ? "justify-center" : ""}`}
              >
                <div className="flex items-center gap-5">
                  {link.icon}
                  {!collapsed && <span>{link.name}</span>}
                </div>
                {!collapsed &&
                  (openMenu === link.name ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
              </button>
            ) : (
              <NavLink
                to={link.path}
                onClick={() => setShowSideBar(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 text-sm font-medium transition ${collapsed ? "justify-center" : ""
                  } ${isActive
                    ? "bg-gradient-to-r from-[#004D61] to-[#00A6A6] text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-[#004D61]"
                  }`
                }
              >
                {link.icon}
                {!collapsed && <span>{link.name}</span>}
              </NavLink>
            )}

            {/* Expanded submenu (normal mode) */}
            {!collapsed && link.children && (
              <div
                className={`ml-6 mt-1 flex flex-col gap-2 overflow-hidden transition-all duration-300 ${openMenu === link.name ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
              >
                {link.children.map((child) =>
                  child.children ? (
                    <div key={child.name} className="flex flex-col">
                      <button
                        type="button"
                        onClick={() => toggleSubMenu(link.name, child.name)}
                        className={`flex items-center justify-between w-full px-3 py-2 text-sm transition ${child.children?.some((sub) => location.pathname === sub.path)
                            ? "bg-gradient-to-r from-[#004D61] to-[#00A6A6] text-white"
                            : "text-gray-700 hover:bg-gray-100 hover:text-[#004D61]"
                          }`}
                      >
                        <div className="flex items-center gap-2">
                          {child.icon}
                          {child.name}
                        </div>
                        {child.children &&
                          (openSubMenuMap[link.name] === child.name ? (
                            <ChevronUp size={14} />
                          ) : (
                            <ChevronDown size={14} />
                          ))}
                      </button>

                      <div
                        className={`ml-6 mt-1 flex flex-col overflow-hidden transition-all duration-300 ${openSubMenuMap[link.name] === child.name
                            ? "max-h-60 opacity-100"
                            : "max-h-0 opacity-0"
                          }`}
                      >
                        {child.children.map((sub) => (
                          <NavLink
                            key={sub.name}
                            to={sub.path}
                            className={({ isActive }) =>
                              `px-3 py-2 text-sm flex gap-2 rounded-md ${isActive
                                ? "bg-gradient-to-r from-[#004D61] to-[#00A6A6] text-white"
                                : "text-gray-600 hover:bg-gray-100 hover:text-[#004D61]"
                              }`
                            }
                          >
                            {sub.icon}
                            {sub.name}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <NavLink
                      key={child.name}
                      to={child.path}
                      className={({ isActive }) =>
                        `px-3 py-2 text-sm flex gap-2 rounded-md ${isActive
                          ? "bg-gradient-to-r from-[#004D61] to-[#00A6A6] text-white"
                          : "text-gray-600 hover:bg-gray-100 hover:text-[#004D61]"
                        }`
                      }
                    >
                      {child.icon}
                      {child.name}
                    </NavLink>
                  )
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Floating submenus (collapsed) */}
      {collapsed &&
        hoveredMenu &&
        renderFloatingMenu(
          links.find((link) => link.name === hoveredMenu)?.children,
          { top: hoverPos.top - 15, left: 60 }
        )}

      {/* Floating nested submenus */}
      {collapsed && hoveredSubMenu && renderFloatingMenu(hoveredSubMenu.items, hoveredSubMenu.pos)}
    </div>
  );
};
export default Navbar;

