import React, { useEffect, useState } from "react";
import Select from 'react-select';
const ACCENT = "#004D61";


const formatINR = (n) =>
  typeof n === "number" ? `₹${n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "-";

const computeAmount = (entry, grossSalary) => {
  if (!entry) return 0;
  if (entry.type === "Percentage") {
    const percent = parseFloat(entry.value) || 0;
    return (grossSalary * percent) / 100;
  } else {
    return parseFloat(entry.value) || 0;
  }
};

/* -------------------- Modal Component -------------------- */
const Modal = ({ open, onClose, onSubmit, initial = {}, grossSalary }) => {
  const [form, setForm] = useState({
    id: null,
    employeeName: "",
    type: "Percentage",
    value: "",
    title: "",
    ...initial,
  });

  useEffect(() => {
    setForm((f) => ({ ...f, ...initial }));
  }, [initial]);

  if (!open) return null;
  return (
    <div
      className="fixed h-screen bg-fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999]
      transition-opacity duration-300 ease-in-out opacity-100 animate-fadeIn"
    >
      <div
        className="bg-white w-[90%] top-80 max-w-lg rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 ease-in-out scale-100 animate-slideUp"
      >
        <div className="px-6 py-4 flex justify-between items-center border-b border-[#DADADA]">
          <h3 className="text-lg font-semibold text-[#004D61]" style={{ color: ACCENT }}>
            {form.id ? "Edit Entry" : "Add Entry"}
          </h3>
          <button onClick={onClose} className="text-[#004D61]">✕</button>
        </div>

        <div className="px-6 py-5 space-y-4">
          <div>
            <label className="input__label mb-1 font-semibold block">Employee Name</label>
            <input
              className="popup__input px-4"
              value={form.employeeName}
              onChange={(e) => setForm({ ...form, employeeName: e.target.value })}
              placeholder="e.g. Sunitha Test"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="input__label mb-1 font-semibold block">Type</label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full border border-[#DADADA] rounded px-3 py-3 outline-none "
              >
                <option value="Percentage">Percentage</option>
                <option value="Fixed">Fixed Amount</option>
              </select>
            </div>

            <div>
              <label className="input__label mb-1 font-semibold block">
                {form.type === "Percentage" ? "Percent (%)" : "Amount (₹)"}
              </label>
              <input
                type="number"
                className="w-full border border-[#DADADA] rounded px-3 py-3 outline-none"
                value={form.value}
                onChange={(e) => setForm({ ...form, value: e.target.value })}
                placeholder={form.type === "Percentage" ? "e.g. 10" : "e.g. 500"}
                min="0"
              />
            </div>
          </div>

          <div>
            <label className="input__label mb-1 font-semibold block">Title (optional)</label>
            <input
              className="popup__input px-4"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. Food Allowance"
            />
          </div>

          <div className="pt-2 border-t border-[#DADADA] flex items-center justify-between text-sm text-[#004D61]">
            <div>
              <div>Estimated Amount: <span className="font-semibold">{formatINR(computeAmount(form, grossSalary))}</span></div>
              {form.type === "Percentage" && <div className="text-xs text-[#004D61]/60">Based on gross salary {formatINR(grossSalary)}</div>}
            </div>

            <div className="flex gap-2">
              <button onClick={onClose} className="px-4 py-2 rounded bg-[#222] text-white/80 hover:opacity-90">Cancel</button>
              <button
                onClick={() => {
                  // Simple validation
                  if (!form.employeeName || form.value === "") {
                    alert("Please enter employee name and value.");
                    return;
                  }
                  onSubmit(form);
                }}
                className="px-4 py-2 rounded bg-[#004D61] text-white font-semibold shadow"
              >
                {form.id ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* -------------------- Card Component -------------------- */
const Card = ({ title, children, onAdd, accentBtn, topRight }) => (
  <div className="rounded-lg border border-[#DADADA]  shadow-lg overflow-hidden">
    <div className="flex items-center justify-between px-6 py-4 border-b border-[#DADADA]">
      <h4 className="font-semibold text-[#004D61]" style={{ color: ACCENT }}>{title}</h4>
      <div className="flex items-center gap-2">
        {topRight}
        <button
          onClick={onAdd}
          className="w-9 h-9 rounded-md flex items-center justify-center text-[#004D61] bg-[rgba(212,133,20,0.12)] border border-[#DADADA] hover:scale-105"
          title="Add"
        >
          +
        </button>
      </div>
    </div>

    <div className="p-4">{children}</div>
  </div>
);

const OptionF = () => {
  const [active, setActive] = useState("personal");
  const [popup, setPopup] = useState(false);

  const tabs = [
    { key: "personal", label: "👤 Personal Details" },
    { key: "company", label: "🏢 Company Details" },
    { key: "bank", label: "🏦 Bank Details" },
    { key: "documents", label: "📂 Documents Upload" },
    { key: "salary", label: "Set Salary" },
    { key: "verify", label: "✅ Final Verification" },
  ];


  const [grossSalary, setGrossSalary] = useState(30000);
  const [payslipType, setPayslipType] = useState("Monthly");

  // entries per category
  const [hra, setHra] = useState([
    { id: 1, employeeName: "Sunitha Test", type: "Percentage", value: "10", title: "HRA" },
  ]);
  const [da, setDa] = useState([
    { id: 1, employeeName: "Sunitha Test", type: "Percentage", value: "1", title: "DA" },
  ]);
  const [others, setOthers] = useState([
    { id: 1, employeeName: "Sunitha Test", type: "Fixed", value: "500", title: "Food Allowance" },
    { id: 2, employeeName: "Sunitha Test", type: "Fixed", value: "300", title: "Medical Allowance" },
  ]);

  // PF / PT toggles and values
  const [pfOn, setPfOn] = useState(true);
  const [ptOn, setPtOn] = useState(true);

  // modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTarget, setModalTarget] = useState(null); // "hra" | "da" | "others"
  const [editInitial, setEditInitial] = useState({});

  // utility to get setter by key
  const mapState = {
    hra: [hra, setHra],
    da: [da, setDa],
    others: [others, setOthers],
  };

  const openAdd = (target) => {
    setEditInitial({});
    setModalTarget(target);
    setModalOpen(true);
  };

  const openEdit = (target, entry) => {
    setEditInitial({ ...entry });
    setModalTarget(target);
    setModalOpen(true);
  };

  const handleModalSubmit = (form) => {
    const [list, setter] = mapState[modalTarget];
    if (!list) {
      setModalOpen(false);
      return;
    }

    if (form.id) {
      // update
      const updated = list.map((it) => (it.id === form.id ? { ...it, ...form } : it));
      setter(updated);
    } else {
      const newItem = { ...form, id: Date.now() };
      setter([newItem, ...list]);
    }

    setModalOpen(false);
  };

  const handleDelete = (target, id) => {
    const [list, setter] = mapState[target];
    setter(list.filter((it) => it.id !== id));
  };

  const pfEmployee = () => {
    // demo: 12% of basic (we'll assume basic = 12000 for demo)
    const basic = 12000;
    return Math.round((basic * 12) / 100);
  };

  const pfEmployer = () => pfEmployee();

  const ptValue = () => {
    // demo logic: PT depends on state or fixed slabs; here simple fixed
    return 200;
  };

  const ACCENT = "rgb(212,133,20)";
  return (
    <div className=" py-5 flex flex-col items-center text-[#004D61] relative overflow-auto">

      {/* Animated Background Glow */}
      {/* <div className="absolute top-10 left-10 w-72 h-72 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full blur-3xl animate-pulse"></div> */}


      {/* Top Navigation Tabs */}
      <div className="w-full bg-[#004D61]/10 backdrop-blur-xl rounded-md shadow-md border border-[#DADADA] px-4 py-3 flex justify-between overflow-x-auto hide-scrollbar">
        {tabs.map((tab) => {
          const isActive = active === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActive(tab.key)}
              className={`relative px-6 py-3 text-base font-medium transition-all duration-300 rounded-xl whitespace-nowrap
                ${isActive
                  ? " text-[#004D61]"
                  : "text-[#004D61]/70 hover:text-[#004D61]"}
              `}
            >
              {tab.label}
              {isActive && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-[3px] border-2 border-b-[#004D61] rounded-md" />
              )}
            </button>
          );
        })}
      </div>

      {/* Content Area */}
      <div className="w-full h-[calc(100vh-220px)] overflow-auto backdrop-blur-2xl border border-[#004D61]/20 rounded-md mt-5 p-5  transition-all duration-500">
        <h3 className="text-xl font-bold mb-5 capitalize tracking-wide">
          {active.replace("-", " ")} Details
        </h3>

        {/* PERSONAL */}
        {active === "personal" && (
          <div className="grid grid-cols-3 gap-6">
            <div>
              <span className='input__label font-semibold mb-2 block'>Full Name</span>
              <input className='popup__input px-4' placeholder='Enter Full Name' name='firstName' />
            </div>
            <div>
              <span className='input__label font-semibold mb-2 block'>Official Email ID</span>
              <input className='popup__input px-4' placeholder='Enter Official Email ID' name='firstName' />
            </div>
            <div>
              <span className='input__label font-semibold mb-2 block'>Personal Email Id</span>
              <input className='popup__input px-4' placeholder='Enter Personal Email ID' name='firstName' />
            </div>

            <div>
              <span className='input__label font-semibold mb-2 block'>Password</span>
              <input className='popup__input px-4' placeholder='Enter Password' name='firstName' />
            </div>
            <div>
              <span className='input__label font-semibold mb-2 block'>Phone Number</span>
              <input className='popup__input px-4' placeholder='Enter Phone Number' name='firstName' />
            </div>
            <div>
              <span className='input__label font-semibold mb-2 block'>Alternative Phone Number</span>
              <input className='popup__input px-4' placeholder='Enter Alternative Phone Number' name='firstName' />
            </div>
            <div>
              <span className='input__label font-semibold mb-2 block'>Date of Birth</span>
              <input className='popup__input px-4' placeholder='Date of Birth' name='firstName' />
            </div>

            <div>
              <span className='input__label font-semibold mb-2 block'>Genter</span>
              <Select
                className="select__option"
                options={[
                  { value: "male", label: "Male" },
                  { value: "female", label: "Female" },
                  { value: "other", label: "Other" },
                ]}
                placeholder="Select a Genter"
                styles={{
                  control: (base) => ({
                    ...base,
                    minHeight: "48px",
                    borderRadius: "6px",
                    border: "1px solid #DADADA",
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#000",
                    boxShadow: "none",
                    outline: "none",
                  }),
                  valueContainer: (base) => ({
                    ...base,
                    padding: "0px 12px",
                  }),
                }}
              />
            </div>

            <div>
              <span className='input__label font-semibold mb-2 block'>Marital Status</span>
              <Select
                className="select__option"
                options={[
                  { value: "married", label: "Married" },
                  { value: "unmarried", label: "Unmarried" },
                  { value: "other", label: "Other" },
                ]}
                placeholder="Select a Marital Status"
                styles={{
                  control: (base) => ({
                    ...base,
                    minHeight: "48px",
                    borderRadius: "6px",
                    border: "1px solid #DADADA",
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#000",
                    boxShadow: "none",
                    outline: "none",
                  }),
                  valueContainer: (base) => ({
                    ...base,
                    padding: "0px 12px",
                  }),
                }}
              />
            </div>

            <div>
              <span className='input__label font-semibold mb-2 block'>Father's Name</span>
              <input className='popup__input px-4' placeholder='Enter Father Name' name='firstName' />
            </div>
            <div>
              <span className='input__label font-semibold mb-2 block'>Father's Age</span>
              <input className='popup__input px-4' placeholder='Enter Father Age' name='firstName' />
            </div>
            <div>
              <span className='input__label font-semibold mb-2 block'>Mother's Name</span>
              <input className='popup__input px-4' placeholder='Enter Mother Name' name='firstName' />
            </div>
            <div>
              <span className='input__label font-semibold mb-2 block'>Mother's Age</span>
              <input className='popup__input px-4' placeholder='Enter Mother Age' name='firstName' />
            </div>
            <div>
              <span className='input__label font-semibold mb-2 block'>Spouce's Name</span>
              <input className='popup__input px-4' placeholder='Enter Spouce Name' name='firstName' />
            </div>
            <div>
              <span className='input__label font-semibold mb-2 block'>Spouce's Age</span>
              <input className='popup__input px-4' placeholder='Enter Spouce Age' name='firstName' />
            </div>
            <div>
              <span className='input__label font-semibold mb-2 block'>Address</span>
              <textarea className='popup__input px-4 py-3' placeholder='Enter Address' name='firstName' />
            </div>
          </div>
        )}

        {/* COMPANY */}
        {active === "company" && (
          <div className="grid grid-cols-3 gap-6">
            <div>
              <span className='input__label font-semibold mb-2 block'>Employee ID</span>
              <input className='popup__input px-4' placeholder='Enter Employee ID' name='firstName' />
            </div>

            <div>
              <span className='input__label font-semibold mb-2 block'>Branch</span>
              <Select
                className="select__option"
                options={[
                  { value: "chennai", label: "Chennai" },
                  { value: "mumbai", label: "Mumbai" },
                ]}
                placeholder="Select a Branch"
                styles={{
                  control: (base) => ({
                    ...base,
                    minHeight: "48px",
                    borderRadius: "6px",
                    border: "1px solid #DADADA",
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#000",
                    boxShadow: "none",
                    outline: "none",
                  }),
                  valueContainer: (base) => ({
                    ...base,
                    padding: "0px 12px",
                  }),
                }}
              />
            </div>
            <div>
              <span className='input__label font-semibold mb-2 block'>Department</span>
              <Select
                className="select__option"
                options={[
                  { value: "tech", label: "Tech" },
                  { value: "sales", label: "Sales" },
                  { value: "compliance", label: "Compliance" },
                ]}
                placeholder="Select a Department"
                styles={{
                  control: (base) => ({
                    ...base,
                    minHeight: "48px",
                    borderRadius: "6px",
                    border: "1px solid #DADADA",
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#000",
                    boxShadow: "none",
                    outline: "none",
                  }),
                  valueContainer: (base) => ({
                    ...base,
                    padding: "0px 12px",
                  }),
                }}
              />
            </div>
            <div>
              <span className='input__label font-semibold mb-2 block'>Designation</span>
              <Select
                className="select__option"
                options={[
                  { value: "developer", label: "Developer" },
                  { value: "testing", label: "Testing" },
                  { value: "cybersecurity", label: "Cyber Security" },
                ]}
                placeholder="Select a Department"
                styles={{
                  control: (base) => ({
                    ...base,
                    minHeight: "48px",
                    borderRadius: "6px",
                    border: "1px solid #DADADA",
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#000",
                    boxShadow: "none",
                    outline: "none",
                  }),
                  valueContainer: (base) => ({
                    ...base,
                    padding: "0px 12px",
                  }),
                }}
              />
            </div>
            <div>
              <span className='input__label font-semibold mb-2 block'>Notice Period(in days)</span>
              <input className='popup__input px-4' placeholder='Enter Notice Period' name='firstName' />
            </div>
            <div>
              <span className='input__label font-semibold mb-2 block'>Role</span>
              <Select
                className="select__option"
                options={[
                  { value: "developer", label: "Developer" },
                  { value: "testing", label: "Testing" },
                  { value: "cybersecurity", label: "Cyber Security" },
                ]}
                placeholder="Select a Role"
                styles={{
                  control: (base) => ({
                    ...base,
                    minHeight: "48px",
                    borderRadius: "6px",
                    border: "1px solid #DADADA",
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#000",
                    boxShadow: "none",
                    outline: "none",
                  }),
                  valueContainer: (base) => ({
                    ...base,
                    padding: "0px 12px",
                  }),
                }}
              />
            </div>
            <div>
              <span className='input__label font-semibold mb-2 block'>Reporting Manager</span>
              <Select
                className="select__option"
                options={[
                  { value: "developer", label: "Developer" },
                  { value: "testing", label: "Testing" },
                  { value: "cybersecurity", label: "Cyber Security" },
                ]}
                placeholder="Select a Reporting Manager"
                styles={{
                  control: (base) => ({
                    ...base,
                    minHeight: "48px",
                    borderRadius: "6px",
                    border: "1px solid #DADADA",
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#000",
                    boxShadow: "none",
                    outline: "none",
                  }),
                  valueContainer: (base) => ({
                    ...base,
                    padding: "0px 12px",
                  }),
                }}
              />
            </div>
          </div>
        )}

        {/* BANK */}
        {active === "bank" && (
          <div className="grid grid-cols-3 gap-6">
            <div>
              <span className='input__label font-semibold mb-2 block'>Account Holder Name</span>
              <input className='popup__input px-4' placeholder='Enter Account Holder Name' name='firstName' />
            </div>
            <div>
              <span className='input__label font-semibold mb-2 block'>Account Number</span>
              <input className='popup__input px-4' placeholder='Enter Account Number' name='firstName' />
            </div>
            <div>
              <span className='input__label font-semibold mb-2 block'> IFSC Code</span>
              <input className='popup__input px-4' placeholder='Enter IFSC Code' name='firstName' />
            </div>
            <div>
              <span className='input__label font-semibold mb-2 block'>Bank Name</span>
              <input className='popup__input px-4' placeholder='Enter Bank Name' name='firstName' />
            </div>
            <div>
              <span className='input__label font-semibold mb-2 block'>Branch Name</span>
              <input className='popup__input px-4' placeholder='Enter Branch Name' name='firstName' />
            </div>
            <div>
              <span className='input__label font-semibold mb-2 block'>UAN Number</span>
              <input className='popup__input px-4' placeholder='Enter UAN Number' name='firstName' />
            </div>
          </div>
        )}

        {/* DOCUMENTS */}
        {active === "documents" && (
          <div className="grid grid-cols-3 gap-6">
            <div className="flex flex-col">
              <span className="input__label font-semibold mb-2 block">Aadhaar</span>
              <input
                className="popup__input px-4 border border-[#DADADA] rounded-md py-2 focus:outline-none"
                placeholder="Enter Aadhaar Number"
                name="aadhaarNumber"
                type="text"
              />
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.pdf"
                className="mt-3 border border-[#DADADA] rounded-md py-2 px-3 text-gray-600 file:mr-3 file:py-1 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-[#004D61] file:text-white hover:file:bg-[#00A6A6] transition"
              />
            </div>
            <div className="flex flex-col">
              <span className="input__label font-semibold mb-2 block">PAN</span>
              <input
                className="popup__input px-4 border border-[#DADADA] rounded-md py-2 focus:outline-none "
                placeholder="Enter PAN Number"
                name="panNumber"
                type="text"
              />
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.pdf"
                className="mt-3 border border-[#DADADA] rounded-md py-2 px-3 text-gray-600 file:mr-3 file:py-1 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-[#004D61] file:text-white hover:file:bg-[#00A6A6] transition"
              />
            </div>
            <div className="flex flex-col">
              <span className="input__label font-semibold mb-2 block">Degree Certificate</span>
              <input
                className="popup__input px-4 border border-[#DADADA] rounded-md py-2 focus:outline-none "
                placeholder="Enter Degree Certificate Number"
                name="aadhaarNumber"
                type="text"
              />
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.pdf"
                className="mt-3 border border-[#DADADA] rounded-md py-2 px-3 text-gray-600 file:mr-3 file:py-1 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-[#004D61] file:text-white hover:file:bg-[#00A6A6] transition"
              />
            </div>
          </div>
        )}

        {active === "salary" && (
          <div>
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Top row: Employee Salary card */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card
                  title="Employee Salary"
                  className="border border-[#DADADA]"
                  onAdd={() => openAdd("employee")}
                  topRight={
                    <div className="text-sm text-[#004D61]">
                      <div className="text-xs">Payslip Type</div>
                      <div className="font-medium">{payslipType}</div>
                    </div>
                  }
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-[#004D61]/70">Payslip Type</div>
                      <div className="font-semibold">{payslipType}</div>
                    </div>

                    <div className="text-right">
                      <div className="text-sm text-[#004D61]/70">Gross Monthly Salary</div>
                      <div className="flex items-center gap-3">
                        {grossSalary}
                      </div>
                    </div>
                  </div>
                </Card>

                <Card title="HRA : House Rent Allowance" onAdd={() => openAdd("hra")}>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left table-fixed">
                      <thead>
                        <tr className="text-sm text-[#004D61]/70">
                          <th className="w-1/3 py-2">Employee Name</th>
                          <th className="w-1/6 py-2">Type</th>
                          <th className="w-1/6 py-2">Amount</th>
                          <th className="w-1/6 py-2">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {hra.map((row) => {
                          const amount = computeAmount(row, grossSalary);
                          return (
                            <tr key={row.id} className="">
                              <td className="py-3 px-3">{row.employeeName}</td>
                              <td className="py-3 px-3 text-[#004D61]/80">{row.type}</td>
                              <td className="py-3 px-3 text-[#004D61]/80">{row.type === "Percentage" ? `${row.value}% (${formatINR(amount)})` : formatINR(amount)}</td>
                              <td className="py-3 px-3">
                                <div className="flex gap-2">
                                  <button onClick={() => openEdit("hra", row)} className="px-2 py-1 rounded bg-[#14788a] text-white">✎</button>
                                  <button onClick={() => handleDelete("hra", row.id)} className="px-2 py-1 rounded bg-[#a31e1e] text-white">🗑</button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </Card>
              </div>

              {/* second row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card title="DA : Dearness Allowance" onAdd={() => openAdd("da")}>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left table-fixed">
                      <thead>
                        <tr className="text-sm text-[#004D61]/70">
                          <th className="w-1/3 py-2">Employee Name</th>
                          <th className="w-1/6 py-2">Type</th>
                          <th className="w-1/6 py-2">Amount</th>
                          <th className="w-1/6 py-2">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {da.map((row) => {
                          const amount = computeAmount(row, grossSalary);
                          return (
                            <tr key={row.id} className="">
                              <td className="py-3 px-3">{row.employeeName}</td>
                              <td className="py-3 px-3 text-[#004D61]/80">{row.type}</td>
                              <td className="py-3 px-3 text-[#004D61]/80">{row.type === "Percentage" ? `${row.value}% (${formatINR(amount)})` : formatINR(amount)}</td>
                              <td className="py-3 px-3">
                                <div className="flex gap-2">
                                  <button onClick={() => openEdit("da", row)} className="px-2 py-1 rounded bg-[#14788a] text-white">✎</button>
                                  <button onClick={() => handleDelete("da", row.id)} className="px-2 py-1 rounded bg-[#a31e1e] text-white">🗑</button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </Card>

                <Card title="Others Allowance" onAdd={() => openAdd("others")}>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left table-fixed">
                      <thead>
                        <tr className="text-sm text-[#004D61]/70">
                          <th className="w-1/4 py-2">Employee Name</th>
                          <th className="w-1/4 py-2">Allowance Option</th>
                          <th className="w-1/4 py-2">Title</th>
                          <th className="w-1/6 py-2">Amount</th>
                          <th className="w-1/6 py-2">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {others.map((row) => {
                          const amount = computeAmount(row, grossSalary);
                          return (
                            <tr key={row.id} className="">
                              <td className="py-3 px-3">{row.employeeName}</td>
                              <td className="py-3 px-3">{row.type === "Percentage" ? `${row.value}%` : "Fixed"}</td>
                              <td className="py-3 px-3">{row.title || "-"}</td>
                              <td className="py-3 px-3">{formatINR(amount)}</td>
                              <td className="py-3 px-3">
                                <div className="flex gap-2">
                                  <button onClick={() => openEdit("others", row)} className="px-2 py-1 rounded bg-[#14788a] text-white">✎</button>
                                  <button onClick={() => handleDelete("others", row.id)} className="px-2 py-1 rounded bg-[#a31e1e] text-white">🗑</button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </Card>
              </div>

              {/* bottom row: PF & PT */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card
                  title="Create PF"
                  onAdd={() => alert("PF additions handled automatically in demo")}
                  topRight={
                    <div className="flex items-center gap-2">
                      <div className="text-sm text-[#004D61]/70">ON</div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={pfOn}
                          onChange={() => setPfOn(!pfOn)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-700 peer-checked:bg-[text-[#004D61]] rounded-full peer transition-all" />
                      </label>
                    </div>
                  }
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="text-[#004D61]/80">Employee's PF</div>
                      <div className="font-semibold">{pfOn ? formatINR(pfEmployee()) : "-"}</div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-[#004D61]/80">Employer's PF</div>
                      <div className="font-semibold">{pfOn ? formatINR(pfEmployer()) : "-"}</div>
                    </div>
                  </div>
                </Card>

                <Card
                  title="Create PT"
                  onAdd={() => alert("PT managed in demo")}
                  topRight={
                    <div className="flex items-center gap-2">
                      <div className="text-sm text-[#004D61]/70">ON</div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={ptOn}
                          onChange={() => setPtOn(!ptOn)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-700 peer-checked:bg-[#004D61] rounded-full peer transition-all" />
                      </label>
                    </div>
                  }
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="text-[#004D61]/80">State</div>
                      <div className="font-semibold text-[#004D61]/80">Tamil Nadu</div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-[#004D61]/80">PT Amount</div>
                      <div className="font-semibold">{ptOn ? formatINR(ptValue()) : "-"}</div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Modal (shared for HRA / DA / Others) */}
            <Modal
              open={modalOpen}
              initial={editInitial}
              grossSalary={grossSalary}
              onClose={() => {
                setModalOpen(false);
                setEditInitial({});
                setModalTarget(null);
              }}
              onSubmit={handleModalSubmit}
            />
          </div>)}


        {/* VERIFY */}
        {active === "verify" && (
          <div className="text-center">
            <p className="text-[#004D61]/80 mb-6 text-lg">
              Please verify all your information before final submission.
            </p>
            <button className="bg-gradient-to-r from-[#004D61] to-[#00A6A6] text-[#004D61] px-10 py-4 rounded-xl text-lg font-semibold shadow-lg shadow-[#00A6A6]/50 hover:scale-105 transition-all">
              ✔ Submit & Verify
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

/* -------------------- REUSABLE COMPONENTS -------------------- */

const InputField = ({ placeholder, type }) => (
  <input
    type={type || "text"}
    placeholder={placeholder}
    className="w-full p-4 rounded-md border border-[#DADADA] text-[#004D61] placeholder-[#004D61]/50 focus:outline-none focus:border-[#004D61] transition-all duration-300"
  />
);

const SelectField = ({ options, placeholder }) => (
  <select
    defaultValue=""
    className="w-full p-4 rounded-md border border-[#DADADA] text-[#004D61] focus:outline-none transition-all duration-300"
  >
    <option value="" disabled>
      {placeholder}
    </option>
    {options.map((opt, i) => (
      <option key={i} value={opt} className="text-black">
        {opt}
      </option>
    ))}
  </select>
);

const FileUpload = ({ label }) => (
  <div>
    <label className="text-[#004D61]/80 mb-2 block">{label}</label>
    <input
      type="file"
      className="w-full p-3 rounded-md border border-[#DADADA] text-[#004D61] focus:outline-none focus:border-[#DADADA] transition-all duration-300"
    />
  </div>
);

export default OptionF;
