import { Dot, DotIcon } from 'lucide-react'
import React, { useState } from 'react'
import { FaDotCircle } from 'react-icons/fa'

const Kyc = () => {
    const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      alert(`File "${selectedFile.name}" uploaded successfully!`);
    } else {
      alert("Please upload a PDF file only.");
      e.target.value = null; // reset input
    }
  };
  return (
    <div>
               <div className='flex justify-between items-center'>
                   <span className='text-[#1A3B5D] text-[16px] font-semibold'>KYC List</span>
               </div>
               <div className='table__container mt-8'>
                   <table>
                       <thead>
                           <tr>
                               <th>S.No</th>
                               <th>Date</th>
                               <th>Item</th>
                               <th>Risk Level</th>
                               <th>Risk Score</th>
                               <th>Scenario Name</th>
                               <th>Scenario Type</th>
                               <th>status</th>
                               <th> action status</th>
                           </tr>
                       </thead>
                       <tbody>
                           <tr>
                               <td>1</td>
                               <td>00/00/0000 00:00</td>
                               <td>C0xjhd...336tedf</td>
                               <td>Low risk</td>
                               <td>65</td>
                               <td>KYC Document Update Required</td>
                               <td>Customer Due Diligence</td>
                               <td>
                                   <div className='flex items-center justify-center gap-1 text-red-700'>
                                       <span className='text-[8px]'><FaDotCircle/></span><span className='font-semibold'>Open</span>
                                   </div>
                               </td>
                               <td>Pending Review</td>
                           </tr>

                           <tr>
                               <td>1</td>
                               <td>00/00/0000 00:00</td>
                               <td>C0xjhd...336tedf</td>
                               <td>Low risk</td>
                               <td>65</td>
                               <td>KYC Document Update Required</td>
                               <td>Customer Due Diligence</td>
                               <td>
                                   <div className='flex items-center justify-center gap-1 text-green-700'>
                                       <span className='text-[8px]'><FaDotCircle/></span><span className='font-semibold'>Resolved</span>
                                   </div>
                               </td>
                               <td>Pending Review</td>
                           </tr>
   
                       </tbody>
                   </table>
               </div>
    </div>
  )
}

export default Kyc