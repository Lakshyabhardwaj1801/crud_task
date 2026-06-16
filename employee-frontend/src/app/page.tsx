"use client";

import { useEffect, useState } from "react";
import axios from "axios";

type Employee = {
id: number;
name: string;
email: string;
department: string;
};

export default function Home() {
const [employees, setEmployees] = useState<Employee[]>([]);
const [editingId, setEditingId] = useState<number | null>(null);

const [form, setForm] = useState({
name: "",
email: "",
department: "",
});

const API = "http://localhost:3000/employee";

const fetchEmployees = async () => {
const res = await axios.get(API);
setEmployees(res.data);
};

useEffect(() => {
fetchEmployees();
}, []);

const addEmployee = async () => {
await axios.post(API, form);


setForm({
  name: "",
  email: "",
  department: "",
});

fetchEmployees();


};

const updateEmployee = async () => {
if (!editingId) return;


await axios.patch(
  `${API}/${editingId}`,
  form
);

setEditingId(null);

setForm({
  name: "",
  email: "",
  department: "",
});

fetchEmployees();


};

const deleteEmployee = async (id: number) => {
await axios.delete(`${API}/${id}`);
fetchEmployees();
};

return (
  <div className="min-h-screen bg-gray-100 p-10">
    <div className="max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold text-center">
        Employee Management System
      </h1>

      

      <div className="text-center mt-4">
        <span className="bg-blue-500 text-white px-4 py-2 rounded-full">
          Total Employees: {employees.length}
        </span>
      </div>
    </div>

    <div className="bg-white rounded-xl shadow p-6 mb-8">
      <h2 className="text-2xl font-semibold mb-4">
        {editingId
          ? "Update Employee"
          : "Add Employee"}
      </h2>

      <div className="grid md:grid-cols-3 gap-4">
        <input
          className="border p-3 rounded"
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
        />

        <input
          className="border p-3 rounded"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }
        />

        <input
          className="border p-3 rounded"
          placeholder="Department"
          value={form.department}
          onChange={(e) =>
            setForm({
              ...form,
              department: e.target.value,
            })
          }
        />
      </div>

      <button
        className="mt-4 bg-blue-600 text-white px-6 py-3 rounded"
        onClick={
          editingId
            ? updateEmployee
            : addEmployee
        }
      >
        {editingId
          ? "Update Employee"
          : "Add Employee"}
      </button>
    </div>

    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-2xl font-semibold mb-4">
        Employees
      </h2>

      {employees.length === 0 ? (
        <p className="text-center text-gray-500">
          No employees found.
        </p>
      ) : (
        employees.map((employee) => (
          <div
            key={employee.id}
            className="border rounded-lg p-4 mb-4 flex justify-between items-center"
          >
            <div>
              <p>
                <strong>Name:</strong> {employee.name}
              </p>

              <p>
                <strong>Email:</strong> {employee.email}
              </p>

              <p>
                <strong>Department:</strong> {employee.department}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                className="bg-yellow-500 text-white px-4 py-2 rounded"
                onClick={() => {
                  setEditingId(employee.id);

                  setForm({
                    name: employee.name,
                    email: employee.email,
                    department: employee.department,
                  });
                }}
              >
                Edit
              </button>

              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() =>
                  deleteEmployee(employee.id)
                }
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>

  </div>
    );
}
