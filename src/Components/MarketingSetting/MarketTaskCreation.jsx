
import React, { useState } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import { IoCloseSharp } from 'react-icons/io5';
import "../Style/Style.css"; // Make sure your global styles (like .profile__btn, .popup__input) are here

const MarketTaskCreation = () => {
    const [tasks, setTasks] = useState([]);
    const [formData, setFormData] = useState({ title: "", description: "" });
    const [popup, setPopup] = useState(false);
    const [editIndex, setEditIndex] = useState(null);

    const handlePopup = () => {
        setPopup(!popup);
        if (!popup) {
            setFormData({ title: "", description: "" });
            setEditIndex(null);
        }
    };

    const handleInputChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.title || !formData.description) return;

        if (editIndex !== null) {
            const updatedTasks = [...tasks];
            updatedTasks[editIndex] = formData;
            setTasks(updatedTasks);
        } else {
            setTasks(prev => [...prev, { ...formData }]);
        }

        handlePopup(); // close modal
    };

    const handleEdit = (index) => {
        setFormData(tasks[index]);
        setEditIndex(index);
        setPopup(true);
    };

    const handleDelete = (index) => {
        const updated = [...tasks];
        updated.splice(index, 1);
        setTasks(updated);
    };

    return (
        <div>
            <div className='flex justify-between items-center'>
                <span className='text-[#1A3B5D] text-[16px] font-semibold'>Task Manager</span>
                <button className="profile__btn mt-5" onClick={handlePopup}>Add Task</button>
            </div>

            {/* Table */}
            <div className='table__container mt-8'>
                <table>
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Task Title</th>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="text-center py-4 text-gray-500">No tasks added</td>
                            </tr>
                        ) : (
                            tasks.map((task, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{task.title}</td>
                                    <td>{task.description}</td>
                                    <td className='flex items-center justify-center gap-3 text-[18px]'>
                                        <span onClick={() => handleEdit(index)} className='grid place-content-center cursor-pointer text-blue-600'> <AiFillEdit /> </span>
                                        <span onClick={() => handleDelete(index)} className='grid place-content-center cursor-pointer text-red-600'> <MdDelete /> </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            <div className={`user__popupContainer flex justify-center ${popup ? "open" : ""}`}>
                <div className='user__popup px-5 py-7'>
                    <div className='flex items-center'>
                        <span className='add__departName block'>{editIndex !== null ? "Update Task" : "Add New Task"}</span>
                        <div className='close__container grid place-content-center ml-auto cursor-pointer' onClick={handlePopup}>
                            <IoCloseSharp className='close__icon' />
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className='grid grid-cols-1 gap-y-5 mt-10 w-[350px] sm:w-[400px]'>
                        <div>
                            <span className='input__label mb-2 block'>Task Title</span>
                            <input
                                name="title"
                                placeholder='Enter Task Title'
                                value={formData.title}
                                onChange={handleInputChange}
                                className='popup__input px-4'
                            />
                        </div>
                        <div>
                            <span className='input__label mb-2 block'>Description</span>
                            <textarea
                                name="description"
                                placeholder='Enter Task Description'
                                value={formData.description}
                                onChange={handleInputChange}
                                className='popup__input px-4 py-2 h-24 resize-none'
                            />
                        </div>
                        <div className='grid place-content-center pt-5 col-span-2'>
                            <button type="submit" className='profile__btn w-[200px]'>
                                {editIndex !== null ? "Update" : "Submit"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MarketTaskCreation;
