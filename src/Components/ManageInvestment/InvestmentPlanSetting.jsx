import React, { useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
import Select from "react-select";
import { AiFillEdit } from "react-icons/ai";

const defaultPlans = [
    {
        id: 1,
        name: "Fixed Plan",
        type: "fixed",
        rate: 12,
        duration: 30,
        min: 100,
        max: 10000,
    },
    {
        id: 2,
        name: "Daily Return Plan",
        type: "daily",
        rate: 1.5,
        duration: 15,
        min: 200,
        max: 8000,
    },
];

const options = [
    { value: 'fixed', label: 'Fixed' },
    { value: 'flexible', label: 'Flexible' },
    { value: 'daily', label: 'Daily Return' },
];
const InvestmentPlanSetting = () => {
    const [plans, setPlans] = useState(defaultPlans);
    const [popupOpen, setPopupOpen] = useState(false);
    const [editingPlan, setEditingPlan] = useState(null);
    const [popup, setPopup] = useState(false);
    const handlePopup = () => setPopup(!popup);
    const [editPopup, setEditPopup] = useState(false)
    const handleEditPopup = () => {
        setEditPopup(!editPopup);
    }
    const [form, setForm] = useState({
        name: "",
        type: "fixed",
        rate: "",
        duration: "",
        min: "",
        max: "",
    });

    const openPopup = (plan = null) => {
        if (plan) {
            setForm(plan);
            setEditingPlan(plan.id);
        } else {
            setForm({ name: "", type: "fixed", rate: "", duration: "", min: "", max: "" });
            setEditingPlan(null);
        }
        setPopupOpen(true);
    };

    const closePopup = () => {
        setPopupOpen(false);
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editingPlan) {
            setPlans(plans.map((p) => (p.id === editingPlan ? { ...form, id: editingPlan } : p)));
        } else {
            setPlans([...plans, { ...form, id: Date.now() }]);
        }

        closePopup();
    };

    const handleDelete = (id) => {
        setPlans(plans.filter((p) => p.id !== id));
    };

    return (
    <div>
      <h2 className='text-[#1A3B5D] text-[18px] font-semibold'>Investment Plan Setting</h2>

      <div className='table__container mt-5'>
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Investment ID</th>
              <th>list of coins</th>
            </tr>
          </thead>
          <tbody>
            <tr>
                <td>1</td>
                <td>UYY6586TR6R</td>
                <td>10</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    );
};

export default InvestmentPlanSetting;
