import React from "react";
import { formatDateTimeIndia } from "./convertTime";

export const COLUMNS = [
    {
        Header: 'Avatar',
        accessor: 'avatar',
        Cell: ({ value }) => {
            const avatarUrl = value?.url || 'default-avatar-url'; // Provide a default URL if necessary

            return (
                <div>
                    <img src={avatarUrl} alt="Avatar" className="w-12 h-12 rounded-full" />
                </div>
            )
        },
    },
    {
        Header: 'Name',
        accessor: 'name',
    },
    {
        Header: 'Email',
        accessor: 'email',
    },
    {
        Header: 'Date of Creation',
        accessor: 'createdAt',
        Cell: ( {value} ) => {
            const userCreation = formatDateTimeIndia(value)

            return (
                <span>{userCreation}</span> // or simply return `userCreation` if it's a string
            );
        }
    },
    {
        Header: 'Role',
        accessor: 'role',
    },
];