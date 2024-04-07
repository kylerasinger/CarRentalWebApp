import React, { useEffect, useState } from 'react';

export default function UsersAdminView() {
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingUser, setEditingUser] = useState({ name: '', email: '' });

    useEffect(() => {
        fetchUsers();
    }, []);

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

    const handleEdit = (user) => {
        setEditingUser(user);
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        // Implement delete functionality
    };

    const handleCreateOrUpdate = async () => {
        // Implement create or update functionality
    };

    const handleChange = (e) => {
        setEditingUser({ ...editingUser, [e.target.name]: e.target.value });
    };

    const openCreateModal = () => {
        setEditingUser({ name: '', email: '' }); // Reset the form for a new user
        setShowModal(true);
    };

    return (
        <div className="container mx-auto p-4">
      <div className="bg-white shadow overflow-hidden rounded-md">
        <div className="flex justify-between items-center py-4 px-6 border-b">
          <h1 className="text-lg font-semibold text-gray-900">Admin User Console</h1>
          <button onClick={openCreateModal} className="rounded bg-green-500 py-2 px-4 text-white">Add User</button>
        </div>
            <ul role="list" className="divide-y divide-gray-200">
                {users.map((user, index) => (
                    <li key={index} className="py-5 flex justify-between items-center">
                        <div>
                            <p className="text-sm font-semibold text-gray-900">{`Name: ${user.name}`}</p>
                            <p className="text-sm text-gray-500">{`Email: ${user.email}`}</p>
                        </div>
                        <div>
                            <button onClick={() => handleEdit(user)} className="rounded bg-blue-500 py-2 px-4 text-white mr-2">Edit</button>
                            <button onClick={() => handleDelete(user._id)} className="rounded bg-red-500 py-2 px-4 text-white">Delete</button>
                        </div>
                    </li>
                ))}
            </ul>

            {showModal && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <h2 className="text-lg font-semibold text-gray-900">{editingUser._id ? 'Edit User' : 'Add New User'}</h2>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={editingUser.name}
                            onChange={handleChange}
                            className="mt-2 p-2 border rounded w-full"
                        />
                        <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            value={editingUser.email}
                            onChange={handleChange}
                            className="mt-2 p-2 border rounded w-full"
                        />
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={handleCreateOrUpdate}
                                className="rounded bg-blue-500 py-2 px-4 text-white mr-2"
                            >
                                {editingUser._id ? 'Update' : 'Create'}
                            </button>
                            <button
                                onClick={() => setShowModal(false)}
                                className="rounded bg-red-500 py-2 px-4 text-white"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    </div>
    );
}
