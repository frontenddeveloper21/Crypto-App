import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

// Full Dashboard with reusable AdvancedPieChart
const DashboardCharts = () => {
  // High-contrast pie colors (darker → base → lighter)
  const pieColors = [
    "#00786e", "#00FFE0", "#CCFFF9",
    "#005343", "#00C49F", "#B3EDE0",
    "#004141", "#00A6A6", "#B3E5E5",
    "#001A20", "#004D61", "#66A3B3",
    "#00786e", "#00FFE0", "#CCFFF9",
    "#005343", "#00C49F", "#B3EDE0",
    "#004141", "#00A6A6", "#B3E5E5"
  ];

  // Reusable Pie Chart Component
  const AdvancedPieChart = ({ title, data, colors }) => {
    const sortedData = [...data].sort((a, b) => b.value - a.value);
    const total = sortedData.reduce((acc, item) => acc + item.value, 0);

    return (
      <div
        className="w-full h-96 p-5 rounded-xl border-2 border-gray-400 relative"
        style={{ backgroundColor: "white/20" }}
      >
        <h2 className="text-[#1A3B5D] font-bold mb-4">{title}</h2>
        <ResponsiveContainer width="100%" height="90%">
          <PieChart>
            <Pie
              data={sortedData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={110}
              //             paddingAngle={4}
            cornerRadius={8}
              paddingAngle={1}
              className="font-bold text-sm"
              // cornerRadius={0}
              isAnimationActive={true}
              label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
            >
              {sortedData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                  stroke="#D2E9EA"
                //   strokeWidth={3}
                />
              ))}
            </Pie>
            <Tooltip
  contentStyle={{
    backgroundColor: "#002F3D",
    border: "none",
    borderRadius: "8px",
    boxShadow: "0 0 10px #00FFE0",
  }}
  labelStyle={{
    color: "#fff",
    fontSize: "14px",
    fontWeight: 600,
  }}
  itemStyle={{
    color: "#fff",
    fontSize: "14px",
    fontWeight: 600,
  }}
  formatter={(value) => [`${value}`, "Customers"]}
/>

            <Legend
              wrapperStyle={{
                color: "#fff",
                fontSize: "12px",
                paddingTop: "10px",
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Center total label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center mt-7 pointer-events-none text-[#1A3B5D] font-bold text-sm">
          <span>Total</span>
          <span>{total}</span>
        </div>
      </div>
    );
  };

  // Example datasets
  const weeklyCustomers = [
    { name: "Mon", value: 12 },
    { name: "Tue", value: 18 },
    { name: "Wed", value: 8 },
    { name: "Thu", value: 15 },
    { name: "Fri", value: 10 },
    { name: "Sat", value: 20 },
    { name: "Sun", value: 7 },
  ];

  const oldTransactions = [
    { name: "Mon", value: 5 },
    { name: "Tue", value: 8 },
    { name: "Wed", value: 3 },
    { name: "Thu", value: 6 },
    { name: "Fri", value: 4 },
    { name: "Sat", value: 10 },
    { name: "Sun", value: 2 },
  ];

  const newTransactions = [
    { name: "Mon", value: 7 },
    { name: "Tue", value: 10 },
    { name: "Wed", value: 5 },
    { name: "Thu", value: 9 },
    { name: "Fri", value: 6 },
    { name: "Sat", value: 12 },
    { name: "Sun", value: 3 },
  ];

  const ticketsResolved = [
    { name: "Mon", value: 4 },
    { name: "Tue", value: 5 },
    { name: "Wed", value: 2 },
    { name: "Thu", value: 7 },
    { name: "Fri", value: 3 },
    { name: "Sat", value: 8 },
    { name: "Sun", value: 2 },
  ];

  const ticketsPending = [
    { name: "Mon", value: 2 },
    { name: "Tue", value: 3 },
    { name: "Wed", value: 4 },
    { name: "Thu", value: 2 },
    { name: "Fri", value: 5 },
    { name: "Sat", value: 1 },
    { name: "Sun", value: 2 },
  ];

  const remarketingCustomers = [
    { name: "Sun", value: 1 },
    { name: "Mon", value: 3 },
    { name: "Tue", value: 4 },
    { name: "Wed", value: 2 },
    { name: "Thu", value: 5 },
    { name: "Fri", value: 3 },
    { name: "Sat", value: 6 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
      <AdvancedPieChart
        title="Weekly Customer Details"
        data={weeklyCustomers}
        colors={pieColors}
      />
      <AdvancedPieChart
        title="Old Customer Transactions"
        data={oldTransactions}
        colors={pieColors}
      />
      <AdvancedPieChart
        title="New Customer Transactions"
        data={newTransactions}
        colors={pieColors}
      />
      <AdvancedPieChart
        title="Tickets Resolved"
        data={ticketsResolved}
        colors={pieColors}
      />
      <AdvancedPieChart
        title="Tickets Pending"
        data={ticketsPending}
        colors={pieColors}
      />
      <AdvancedPieChart
        title="Remarketing Customers"
        data={remarketingCustomers}
        colors={pieColors}
      />
    </div>
  );
};

export default DashboardCharts;



// import React, { useState } from "react";
// import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

// const ModernPieChart = ({ title, data, colors }) => {
//   const [activeIndex, setActiveIndex] = useState(null);
//   const total = data.reduce((acc, item) => acc + item.value, 0);

//   const onPieEnter = (_, index) => setActiveIndex(index);
//   const onPieLeave = () => setActiveIndex(null);

//   return (
//     <div
//       className="w-full h-96 p-5 rounded-xl shadow-2xl relative hover:shadow-3xl transition-all duration-300"
//       style={{ backgroundColor: "#0A1B2C" }}
//     >
//       <h2 className="text-[#00C49F] text-lg font-bold mb-4">{title}</h2>
//       <ResponsiveContainer width="100%" height="85%">
//         <PieChart>
//           <Pie
//             data={data}
//             dataKey="value"
//             nameKey="name"
//             cx="50%"
//             cy="50%"
//             innerRadius={60}
//             outerRadius={110}
//             paddingAngle={4}
//             cornerRadius={8}
//             onMouseEnter={onPieEnter}
//             onMouseLeave={onPieLeave}
//             isAnimationActive
//             animationDuration={1200}
//             label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
//           >
//             {data.map((entry, index) => {
//               const isActive = index === activeIndex;
//               return (
//                 <Cell
//                   key={`cell-${index}`}
//                   fill={colors[index % colors.length]}
//                   stroke="#0A1B2C"
//                   strokeWidth={2}
//                   style={{
//                     transform: isActive ? "scale(1.05)" : "scale(1)",
//                     transformOrigin: "center",
//                     transition: "all 0.3s",
//                     filter: isActive
//                       ? "drop-shadow(0 0 15px rgba(0, 196, 159,0.8))"
//                       : "drop-shadow(0 0 5px rgba(0, 196, 159,0.5))",
//                   }}
//                 />
//               );
//             })}
//           </Pie>

//           <Tooltip
//             contentStyle={{
//               backgroundColor: "#001F2D",
//               border: "none",
//               borderRadius: "6px",
//               boxShadow: "0 0 10px rgba(0,196,159,0.5)",
//             }}
//             itemStyle={{ color: "#00C49F", fontWeight: "bold" }}
//             formatter={(value) => [`${value}`, "Customers"]}
//           />

//           <Legend
//             layout="horizontal"
//             verticalAlign="bottom"
//             wrapperStyle={{ color: "#00C49F", fontSize: "12px" }}
//             iconType="square"
//           />
//         </PieChart>
//       </ResponsiveContainer>

//       <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-[#00C49F] font-bold text-lg">
//         <span>Total</span>
//         <span>{total}</span>
//       </div>
//     </div>
//   );
// };

// const DashboardCharts = () => {
//   const colors = ["#00C49F", "#F0B90B", "#FF6F61", "#9C27B0", "#00A6A6", "#4CAF50", "#FFC107"];

//   const weeklyCustomers = [
//     { name: "Mon", value: 12 },
//     { name: "Tue", value: 18 },
//     { name: "Wed", value: 8 },
//     { name: "Thu", value: 15 },
//     { name: "Fri", value: 10 },
//     { name: "Sat", value: 20 },
//     { name: "Sun", value: 7 },
//   ];

//   const oldTransactions = [
//     { name: "Mon", value: 5 },
//     { name: "Tue", value: 8 },
//     { name: "Wed", value: 3 },
//     { name: "Thu", value: 6 },
//     { name: "Fri", value: 4 },
//     { name: "Sat", value: 10 },
//     { name: "Sun", value: 2 },
//   ];

//   const newTransactions = [
//     { name: "Mon", value: 7 },
//     { name: "Tue", value: 10 },
//     { name: "Wed", value: 5 },
//     { name: "Thu", value: 9 },
//     { name: "Fri", value: 6 },
//     { name: "Sat", value: 12 },
//     { name: "Sun", value: 3 },
//   ];

//   const ticketsResolved = [
//     { name: "Mon", value: 4 },
//     { name: "Tue", value: 5 },
//     { name: "Wed", value: 2 },
//     { name: "Thu", value: 7 },
//     { name: "Fri", value: 3 },
//     { name: "Sat", value: 8 },
//     { name: "Sun", value: 2 },
//   ];

//   const ticketsPending = [
//     { name: "Mon", value: 2 },
//     { name: "Tue", value: 3 },
//     { name: "Wed", value: 4 },
//     { name: "Thu", value: 2 },
//     { name: "Fri", value: 5 },
//     { name: "Sat", value: 1 },
//     { name: "Sun", value: 2 },
//   ];

//   const remarketingCustomers = [
//     { name: "Mon", value: 3 },
//     { name: "Tue", value: 4 },
//     { name: "Wed", value: 2 },
//     { name: "Thu", value: 5 },
//     { name: "Fri", value: 3 },
//     { name: "Sat", value: 6 },
//     { name: "Sun", value: 1 },
//   ];

//   return (
//     <div className="grid grid-cols-3 gap-4 p-5">
//       <ModernPieChart title="Weekly Customer Details" data={weeklyCustomers} colors={colors} />
//       <ModernPieChart title="Old Customer Transactions" data={oldTransactions} colors={colors} />
//       <ModernPieChart title="New Customer Transactions" data={newTransactions} colors={colors} />
//       <ModernPieChart title="Tickets Resolved" data={ticketsResolved} colors={colors} />
//       <ModernPieChart title="Tickets Pending" data={ticketsPending} colors={colors} />
//       <ModernPieChart title="Remarketing Customers" data={remarketingCustomers} colors={colors} />
//     </div>
//   );
// };

// export default DashboardCharts;
