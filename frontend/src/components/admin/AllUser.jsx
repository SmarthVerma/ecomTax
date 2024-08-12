import { useGetAllUsers } from '@/hooks/admin/useGetAllUsers';
import React, { useMemo } from 'react';
import { COLUMNS } from "../../util/columns_AllUsers.jsx";
import { useTable } from "react-table";
import './AllUser.css';
import { useNavigate } from 'react-router-dom';

function AllUsers() {
    const { isLoading, data, isError, error } = useGetAllUsers();
    const allUsers = data?.users || [];

    const navigate = useNavigate()

    console.log('THis is the' ,allUsers)
    const columns = useMemo(() => COLUMNS, []);
    const tableData = useMemo(() => allUsers, [allUsers]);

    const tableInstance = useTable({
        columns,
        data: tableData
    });

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

    const handleRowClick = (userId) => {
        console.log('This is the user you clicked', userId);
        navigate(`/profile/${userId}`)
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
                            const profileId = row.original._id; // magic to find userId
                            return (
                                <tr {...row.getRowProps()} key={row.id} onClick={() => handleRowClick(profileId)}>
                                    {row.cells.map(cell => (
                                        <td {...cell.getCellProps()} className='cursor-pointer' key={cell.column.id}>
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

export default AllUsers;