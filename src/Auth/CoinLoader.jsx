import React from "react";
import "../Components/Style/Header.css"; 

const CoinLoaderRow = () => {
  return (
    <tr>
      <td colSpan="5" className="py-10 text-center">
        <div class="loader-wrapper">
  <div class="coin-loader">
    <div class="coin coin-1">
      <span class="symbol">₿</span>
    </div>
    <div class="coin coin-2">
      <span class="symbol">₿</span>
    </div>
    <div class="coin coin-3">
      <span class="symbol">₿</span>
    </div>
  </div>
</div>

      </td>
    </tr>
  );
};

export default CoinLoaderRow;




