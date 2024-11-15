import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './HomePage.css'

const HomePage = () => {
  const [employees, setEmployees] = useState([]);

  // Fetch employees from the server
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:3000/employees');
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };
    fetchEmployees();
  }, []);

  // Delete an employee
  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/employees/${id}`);
      // Update the list after deletion
      setEmployees((prevEmployees) =>
        prevEmployees.filter((employee) => employee.id !== id)
      );
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };
  

  return (
    <div>
      <header>
        <h1>Employee List</h1>
        <Link to="/add-employee">
          <button>Add Employee</button>
        </Link>
      </header>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.username}</td>
              <td>{employee.email}</td>
              <td>{employee.status}</td>
              <td>
                {/* Pass employee data to EditEmployeePage */}
                <Link to={`/edit-employee/${employee.id}`}>
                  <button>Edit</button>
                </Link>
                <button onClick={() => deleteEmployee(employee.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HomePage;
