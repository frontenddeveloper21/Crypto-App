// import React, { useState } from "react";
// import "../Components/Style/Header.css";

// const LoadingButton = ({ text, loading }) => {
//   return (
//     <button
//       className="px-4 py-2 bg-blue-600 text-white rounded flex items-center justify-center"
//       disabled={loading}
//     >
//       {text}
//       {loading && <span className="button-loader"></span>}
//     </button>
//   );
// };

// export default LoadingButton;


// ButtonCoinLoader.jsx
import React from "react";
import "../Components/Style/Header.css";

const ButtonCoinLoader = () => {
  return <span className="button-loader"></span>;
};

export default ButtonCoinLoader;
