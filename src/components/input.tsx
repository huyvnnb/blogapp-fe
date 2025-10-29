import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & { label: string; };

const Input: React.FC<InputProps> = ({ label, ...props }) => {
    return (
        <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
        </label>
        <input
            {...props}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        </div>
    );
}

export default Input;