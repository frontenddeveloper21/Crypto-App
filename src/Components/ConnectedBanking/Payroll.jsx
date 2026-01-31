import React from 'react'
import { Link } from 'react-router-dom'

const Payroll = () => {
  return (
    <div>
          <div className='flex justify-between mt-5 items-center'>
            <span className='text-[#1A3B5D] text-[16px] font-semibold'>External Logs</span>
            <Link to="/payroll-services/create">Create</Link>
          </div>
          <div className='table__container mt-5'>
            <table>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>branch</th>
                  <th>Department</th>
                  <th>Designation</th>
                  <th>Date of joining</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Krish</td>
                  <td>krish@gmail.com</td>
                  <td>chennai</td>
                  <td>Tech</td>
                  <td>Developer</td>
                  <td>00/00/0000</td>
                  <td>active</td>
                  <td>edit</td>
                </tr>
    
              </tbody>
            </table>
          </div>
    </div>
  )
}

export default Payroll