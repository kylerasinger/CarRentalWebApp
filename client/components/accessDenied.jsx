import React from 'react';

export default function AccessDenied() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md py-8 px-4 bg-white shadow-lg rounded-lg text-center">
                <h1 className="text-2xl font-semibold text-gray-800">Access Denied</h1>
                <p className="mt-4 text-gray-600">You do not have permission to view this page.</p>
            </div>
        </div>
    );
}
