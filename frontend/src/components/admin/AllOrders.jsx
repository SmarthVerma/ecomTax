import React, { useMemo } from 'react';
import { COLUMNS } from "../../util/columns_AllOrders";
import { useTable } from "react-table";
import './AllOrders.css'; // Renamed to match component
import { useNavigate } from 'react-router-dom';
import { useGetAllOrders } from '@/hooks/admin/useGetAllOrders.js';

function AllOrders() {
    const { isLoading, data, isError, error } = useGetAllOrders();
    const allOrders = data?.allOrders || []; // Adjust based on your data structure
    const navigate = useNavigate();

    // Memoize columns and data
    const columns = useMemo(() => COLUMNS, []);
    const tableData = useMemo(() => allOrders, [allOrders]);

    const tableInstance = useTable({
        columns,
        data: tableData
    });

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

    const handleRowClick = (orderId) => {
        console.log('This is the order you clicked', orderId);
        navigate(`/order/${orderId}`); // Adjust path as needed
    }

    if (isLoading) {
        return (
            <div className='min-h-screen w-full flex items-center justify-center'>
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    if (isError) {
        return (
            <div className='min-h-screen w-full flex items-center justify-center text-white'>
                <div>Error: {error?.response?.data?.message || error.message}</div>
            </div>
        );
    }

    if (allOrders.length === 0) {
        return (
            <div className='min-h-screen w-full flex items-center justify-center text-white'>
                <div>No orders found.</div>
            </div>
        );
    }

    return (
        <div className='min-h-screen w-full flex p-0 justify-center text-white'>
            <div className="w-full overflow-x-auto">
                <table {...getTableProps()} className="w-full table-fixed">
                    <thead>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                                {headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps()} key={column.id}>
                                        {column.render('Header')}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map(row => {
                            prepareRow(row);
                            const orderId = row.original._id; // Adjust if the key is different
                            return (
                                <tr
                                    {...row.getRowProps()}
                                    key={row.id}
                                    onClick={() => handleRowClick(orderId)}
                                    className='cursor-pointer'
                                >
                                    {row.cells.map(cell => (
                                        <td {...cell.getCellProps()} key={cell.column.id}>
                                            {cell.render('Cell')}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AllOrders;