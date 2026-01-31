import React from 'react'
import { FiChevronRight } from 'react-icons/fi'
import profile from "../../../public/Images/profile_img.png"

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from "recharts";

const data = [
    { name: "Mon", value: 8 },
    { name: "Tue", value: 9 },
    { name: "Wed", value: 8 },
    { name: "Thu", value: 8 },
    { name: "Fri", value: 10 },
    { name: "Sat", value: 8 },
];

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="chart_views_text_box">
                <p className="chart_views_text">{`${payload[0].value} views`}</p>
                <p className="chart_date_text">Monday, April 22nd</p>
            </div>
        );
    }
    return null;
};

const DashboardHeader = () => {
    return (
        <div className=' w-full'> {/* Inbox (special with list + arrows) */}
            <div className='grid grid-cols-4 gap-5'>
                <div className="dashboard_header_box">
                    <div className='flex justify-between pb-3 items-center'>
                        <span className="dashboard_inbox_text">Inbox</span>
                        <button className="dashboard_header_button">Take action</button>
                    </div>
                    <ul className="dashboard__text">
                        {[
                            "Tasks waiting for your approval.",
                            "Tasks waiting for your approval.",
                            "Tasks waiting for your approval.",
                        ].map((item, idx) => (
                            <li
                                key={idx}
                                className="flex justify-between items-center border-b border-b-[#DDD] last:border-b-0 pb-3"
                            >
                                <span>{item}</span>
                                <FiChevronRight className="text-gray-500" />
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="dashboard_header_box">
                    <div className='flex justify-between pb-3 items-center'>
                        <span className="dashboard_inbox_text">Holidays</span>
                        <button className="dashboard_header_button">Take action</button>
                    </div>
                    <ul className="dashboard__text">
                        {[
                            "Everyone is working today!",
                        ].map((item, idx) => (
                            <li
                                key={idx}
                                className="flex justify-between items-center"
                            >
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="dashboard_header_box">
                    <div className='flex justify-between pb-3 items-center'>
                        <span className="dashboard_inbox_text">On leave today</span>
                        <button className="dashboard_header_button">Take action</button>
                    </div>
                    <ul className="dashboard__text">
                        {[
                            "Everyone is working today!",
                        ].map((item, idx) => (
                            <li
                                key={idx}
                                className="flex justify-between items-center"
                            >
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="dashboard_header_box">
                    <div className='flex justify-between pb-3 items-center'>
                        <span className="dashboard_inbox_text">Working remotely</span>
                        <button className="dashboard_header_button">Take action</button>
                    </div>
                    <ul className="dashboard__text">
                        {[
                            "Everyone is at office!",
                        ].map((item, idx) => (
                            <li
                                key={idx}
                                className="flex justify-between items-center"
                            >
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className='grid grid-cols-12 gap-5 py-5'>
                <div className="dashboard_header_box col-span-4 space-y-10">
                    <div className='flex justify-between pb-3 items-center'>
                        <span className="dashboard_inbox_text">Time today - Dec 07, 2024 Sat</span>
                        <button className="dashboard_viewall_text">View all</button>
                    </div>
                    <div className='flex items-center gap-5 xl:gap-10'>
                        <div className='w-100%'>
                            <img className='profile__image' src={profile} />
                        </div>
                        <div className='flex flex-col'>
                            <span className='profile__name'>Abinesh R S</span>
                            <span className='profile__role'>Frontend Developer</span>
                        </div>
                    </div>
                    <div className='flex items-center gap-5'>
                        <div>
                            <span className='profile__role'>Current Time</span>
                            <div>
                                <span className='profile__bigTime'>10:56</span>
                                <span className='profile__smallTime'>:19 AM</span>
                            </div>
                        </div>
                        <div className=''><button className='profile__btn mr-5'>Work from home</button>
                            <button className='profile__btn'>Other</button></div>
                    </div>
                </div>
                <div className="dashboard_header_box col-span-3">
                    <div className='flex justify-between pb-3 items-center'>
                        <span className="dashboard_inbox_text">Quick Access</span>
                    </div>
                    <ul className="space-y-3">
                        {[
                            "Paid Leave",
                            "Casual / Sick",
                            "Unpaid Leave",
                        ].map((item, idx) => (
                            <li
                                key={idx}
                                className=""
                            >
                                <div className='profile_leave_box'>{item}</div>
                            </li>
                        ))}
                    </ul>

                    <button className="profile__btn mt-5">Request Leave</button>
                </div>

                <div className="dashboard_header_box col-span-2">
                    <div className='flex justify-between pb-3 items-center'>
                        <span className="dashboard_inbox_text">Weekly Overview</span>
                    </div>

                    <div className="h-60 w-full">
                        <ResponsiveContainer width="100%" height={240}>
                            <BarChart
                                data={data}
                                margin={{ top: 10, right: -0, left: -40, bottom: 0 }}
                            >
                                <CartesianGrid strokeDasharray="8 6" vertical={false} strokeWidth={0.5} stroke="rgba(0, 0, 0, 0.2)" />

                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: "#555", fontSize: 10 }}
                                    padding={{ left: 0, right: 0 }}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: "#555", fontSize: 10 }}
                                    ticks={[0, 2, 4, 6, 8, 10, 12, 14, 16]}
                                    domain={[0, 16]}
                                />
                                <Tooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }} />
                                <Bar dataKey="value" BarSize={24} radius={[4, 4, 0, 0]}>
                                    {data.map((_, i) => (
                                        <Cell
                                            key={i}
                                            fill="#A2CCD7"
                                            className="hover:fill-[#004D61] cursor-pointer"
                                        />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="flex justify-center mt-4">
                        <button className="px-4 py-2 bg-white shadow rounded-md text-gray-700 text-sm font-medium hover:bg-gray-100">
                            Details
                        </button>
                    </div>
                </div>

                <div className="dashboard_header_box col-span-3">
                    <div className='flex justify-between pb-3 items-center'>
                        <span className="dashboard_inbox_text">Announcement</span>
                        <button className="profile__btn">Add announcement</button>
                    </div>
                    <ul className="dashboard__text">
                        {[
                            "Everyone is at office!",
                        ].map((item, idx) => (
                            <li
                                key={idx}
                                className="flex justify-between items-center"
                            >
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className='grid grid-cols-4 gap-5'>
                <div className="dashboard_header_box overflow-y-auto h-[220px]">
                    <div className='flex justify-between pb-3 items-center'>
                        <span className="dashboard_inbox_text">Finance</span>
                        <button className="dashboard_header_button">Take action</button>
                    </div>
                    <ul className="dashboard__text">
                        {[
                            "Everyone is working today!",
                        ].map((item, idx) => (
                            <li
                                key={idx}
                                className="flex justify-between items-center"
                            >
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="dashboard_header_box overflow-y-auto h-[220px]">
                    <div className='flex justify-between pb-3 items-center'>
                        <span className="dashboard_inbox_text">Leaves</span>
                        <button className="dashboard_header_button">Take action</button>
                    </div>
                    <ul className="dashboard__text">
                        {[
                            "Everyone is working today!",
                        ].map((item, idx) => (
                            <li
                                key={idx}
                                className="flex justify-between items-center"
                            >
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="dashboard_header_box overflow-y-auto h-[220px]">
                    <div className='flex justify-between pb-3 items-center'>
                        <span className="dashboard_inbox_text">Attendence</span>
                        <button className="dashboard_header_button">Take action</button>
                    </div>
                    <ul className="dashboard__text">
                        {[
                            "Everyone is working today!",
                        ].map((item, idx) => (
                            <li
                                key={idx}
                                className="flex justify-between items-center"
                            >
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="dashboard_header_box overflow-y-auto h-[220px]">
                    <div className='flex justify-between pb-3 items-center'>
                        <span className="dashboard_inbox_text">Inbox</span>
                        <button className="dashboard_header_button">Take action</button>
                    </div>
                    <ul className="dashboard__text">
                        {[
                            "Everyone is working today!",
                        ].map((item, idx) => (
                            <li
                                key={idx}
                                className="flex justify-between items-center"
                            >
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="dashboard_header_box overflow-y-auto h-[220px]">
                    <div className='flex justify-between pb-3 items-center'>
                        <span className="dashboard_inbox_text">Documents</span>
                        <button className="dashboard_header_button">Take action</button>
                    </div>
                    <ul className="dashboard__text">
                        {[
                            "Everyone is working today!",
                        ].map((item, idx) => (
                            <li
                                key={idx}
                                className="flex justify-between items-center"
                            >
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="dashboard_header_box overflow-y-auto h-[220px]">
                    <div className='flex justify-between pb-3 items-center'>
                        <span className="dashboard_inbox_text">Goals</span>
                        <button className="dashboard_header_button">Take action</button>
                    </div>
                    <ul className="dashboard__text">
                        {[
                            "Everyone is working today!",
                        ].map((item, idx) => (
                            <li
                                key={idx}
                                className="flex justify-between items-center"
                            >
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="dashboard_header_box overflow-y-auto h-[220px]">
                    <div className='flex justify-between pb-3 items-center'>
                        <span className="dashboard_inbox_text">Expenses</span>
                        <button className="dashboard_header_button">Take action</button>
                    </div>
                    <ul className="dashboard__text">
                        {[
                            "Everyone is working today!",
                        ].map((item, idx) => (
                            <li
                                key={idx}
                                className="flex justify-between items-center"
                            >
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="dashboard_header_box overflow-y-auto h-[220px]">
                    <div className='flex justify-between pb-3 items-center'>
                        <span className="dashboard_inbox_text">Engage</span>
                        <button className="dashboard_header_button">Take action</button>
                    </div>
                    <ul className="dashboard__text">
                        {[
                            "Everyone is working today!",
                        ].map((item, idx) => (
                            <li
                                key={idx}
                                className="flex justify-between items-center"
                            >
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default DashboardHeader