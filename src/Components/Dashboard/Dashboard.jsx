// // src/components/Dashboard.jsx
// import React from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer
// } from "recharts";

// const data = [
//   { month: "Jan", customers: 150000 },
//   { month: "Feb", customers: 275000 },
//   { month: "Mar", customers: 180000 },
//   { month: "Apr", customers: 379502 }, // Highest
//   { month: "Mei", customers: 200000 },
//   { month: "Jun", customers: 300000 }
// ];

// const CustomTooltip = ({ active, payload, label }) => {
//   if (active && payload && payload.length) {
//     return (
//       <div className="bg-gray-800 text-white p-3 rounded-lg shadow-md text-sm">
//         <p>{`Month: ${label}`}</p>
//         <p>{`Customers: ${payload[0].value.toLocaleString()}`}</p>
//       </div>
//     );
//   }

//   return null;
// };

// const Dashboard = () => {
//   return (
//     <div className="mx-auto">
//       <div className="bg-gray-900 text-white p-6 rounded-xl max-w-4xl mx-auto mt-10 shadow-lg">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-xl font-semibold">Customer Engagement</h2>
//           <div className="bg-gray-700 text-sm rounded-full px-4 py-1 text-green-400">
//             +12.8%
//           </div>
//         </div>

//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={data}>
//             <XAxis dataKey="month" stroke="#ccc" />
//             <YAxis stroke="#ccc" tickFormatter={(value) => `${value / 1000}k`} />
//             <Tooltip content={<CustomTooltip />} />
//             <Bar
//               dataKey="customers"
//               fill="#8b5cf6"
//               radius={[10, 10, 0, 0]}
//               background={{ fill: "rgba(139, 92, 246, 0.2)" }}
//             />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
      
//     </div>
//   );
// };

// export default Dashboard;


import React from 'react'
import AdvancedCustomerGraph from './AdvancedGraph'

const Dashboard = () => {
  return (
    
    <div className='h-screen overflow-auto'>
        <AdvancedCustomerGraph />
    </div>
  )
}

export default Dashboard