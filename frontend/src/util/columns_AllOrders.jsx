import React from "react";
import { formatDateTimeIndia } from "./convertTime";

export const COLUMNS = [
    {
        Header: 'Product',
        accessor: 'orderItems.name', // Accessing nested property
        Cell: ({ value }) => {
            const name = value || 'ERROR';
            return (
                <p>{name}</p>
            );
        },
    },
    {
        Header: 'Quantity',
        accessor: 'orderItems.quantity', // Accessing nested property
        Cell: ({ value }) => {
            const quantity = value || 'ERRORQuantity';
            return (
                <p>{quantity}</p>
            );
        },
    },
    {
        Header: 'TotalPrice',
        accessor: 'totalPrice'
    },
    {
        Header: 'Date of Creation',
        accessor: 'createdAt', // Assuming `createdAt` is a top-level field
        Cell: ({ value }) => {
            const userCreation = formatDateTimeIndia(value);
            return (
                <span>{userCreation}</span> // Or simply return `userCreation` if it's a string
            );
        }
    },
    {
        Header: 'Status',
        accessor: 'orderStatus', // Assuming `role` is a top-level field
    },
];