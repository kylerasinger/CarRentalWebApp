import React, { useEffect, useState } from 'react';
import { Inter } from "next/font/google";

export default function UsersAdminView() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/users');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div>
            <h1 className="text-lg font-semibold text-gray-900">Users Admin View</h1>
            <ul className="divide-y divide-gray-100 bg-white">
                {users.map((user, index) => (
                    <li key={index} className="py-5">
                        <div className="flex flex-col space-y-2">
                            <p className="text-sm font-semibold text-gray-900">{`Name: ${user.name}`}</p>
                            <p className="text-sm text-gray-500">{`Email: ${user.email}`}</p>
                            {/* Add more user details as needed */}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}