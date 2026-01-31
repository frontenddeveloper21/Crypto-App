import React from 'react'

// Mock transaction data
const transactions = [
    {
        id: 'TXN123456',
        sender: '0xabc...123',
        receiver: '0xdef...456',
        amount: '0.045 BTC',
        date: '2025-10-01',
        status: 'Success'
    },
    {
        id: 'TXN987654',
        sender: '0xaaa...999',
        receiver: '0xbbb...888',
        amount: '1.2 ETH',
        date: '2025-09-28',
        status: 'Pending'
    },
    {
        id: 'TXN564738',
        sender: '0xccc...777',
        receiver: '0xddd...666',
        amount: '500 USDT',
        date: '2025-09-25',
        status: 'Failed'
    },
];

const Transactions = () => {
    return (
        <div>
            <div className='flex justify-between items-center mb-4'>
                <span className='text-[#1A3B5D] text-[16px] font-semibold'>Report - Transactions</span>
            </div>
            <div className='table__container mt-4 overflow-x-auto'>
                <table>
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Txn ID</th>
                            <th>Sender</th>
                            <th>Receiver</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((txn, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{txn.id}</td>
                                <td>{txn.sender}</td>
                                <td>{txn.receiver}</td>
                                <td>{txn.amount}</td>
                                <td>{txn.date}</td>
                                <td>
                                    <span className={`px-3 py-1 rounded-full text-sm ${txn.status === 'Success' ? 'bg-green-200 text-green-700' :
                                            txn.status === 'Pending' ? 'bg-yellow-200 text-yellow-800' :
                                                'bg-red-200 text-red-700'
                                        }`}>
                                        {txn.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    )
}

export default Transactions