import React, { useState, useEffect } from "react";

const Manager = () => {
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null); // Track the editing index

  // Load passwords from localStorage on component mount
  useEffect(() => {
    const savedPasswords = localStorage.getItem("passwordArray");
    if (savedPasswords) {
      setPasswordArray(JSON.parse(savedPasswords));
    }
  }, []);

  // Save or Update password
  const savePassword = () => {
    if (!form.site || !form.username || !form.password) {
      alert("Please fill in all fields!");
      return;
    }

    if (editingIndex !== null) {
      // Update the existing password entry
      const updatedPasswords = [...passwordArray];
      updatedPasswords[editingIndex] = form;
      setPasswordArray(updatedPasswords);
      localStorage.setItem("passwordArray", JSON.stringify(updatedPasswords));
      alert("Password added successfully!");
      setEditingIndex(null);
    } else {
      // Add a new password entry
      const updatedPasswords = [...passwordArray, form];
      setPasswordArray(updatedPasswords);
      localStorage.setItem("passwordArray", JSON.stringify(updatedPasswords));
      alert("Password added successfully!");
    }

    // Reset the form fields
    setForm({ site: "", username: "", password: "" });
  };

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Edit password entry
  const editPassword = (index) => {
    setForm(passwordArray[index]);
    setEditingIndex(index);
  };

  // Delete password entry
  const deletePassword = (index) => {
    const updatedPasswords = passwordArray.filter((_, i) => i !== index);
    setPasswordArray(updatedPasswords);
    localStorage.setItem("passwordArray", JSON.stringify(updatedPasswords));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center text-green-700">
        &lt;PassOP/&gt;
      </h1>
      <p className="text-center text-lg text-green-900">
        Your Own Password Manager
      </p>

      <div className="form mt-8">
        <div className="flex flex-col gap-4 items-center">
          <input
            name="site"
            value={form.site}
            onChange={handleChange}
            placeholder="Enter website URL"
            className="rounded-full border border-green-500 p-2 w-1/2 text-black"
            type="text"
          />
          <div className="flex gap-4 w-1/2">
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
              className="rounded-full border border-green-500 p-2 flex-grow text-black"
              type="text"
            />
            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter Password"
              className="rounded-full border border-green-500 p-2 flex-grow text-black"
              type="password"
            />
          </div>
          <button
            onClick={savePassword}
            className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600"
          >
            {editingIndex !== null ? "Update Password" : "Save Password"}
          </button>
        </div>
      </div>

      <div className="passwords mt-8">
        <h2 className="text-2xl font-bold text-center">Saved Passwords</h2>
        {passwordArray.length === 0 ? (
          <p className="text-center text-gray-500">No passwords to display.</p>
        ) : (
          <table className="table-auto w-full mt-4 border-collapse border border-green-500">
            <thead>
              <tr className="bg-green-500 text-white">
                <th className="p-2">Site</th>
                <th className="p-2">Username</th>
                <th className="p-2">Password</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {passwordArray.map((password, index) => (
                <tr key={index} className="text-center">
                  <td className="p-2 border border-green-500">{password.site}</td>
                  <td className="p-2 border border-green-500">{password.username}</td>
                  <td className="p-2 border border-green-500">{password.password}</td>
                  <td className="p-2 border border-green-500">
                    <button
                      onClick={() => editPassword(index)}
                      className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 mx-1"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deletePassword(index)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 mx-1"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Manager;
