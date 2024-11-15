import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './HomePage.css'

const EditEmployeePage = () => {
  const [employee, setEmployee] = useState({
    username: '',
    email: '',
    status: 'active',
  });
  const { id } = useParams(); // Get the employee ID from the URL params
  const navigate = useNavigate(); // For navigation after updating

  // Fetch the employee data based on ID
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/employees/${id}`);
        setEmployee(response.data);
      } catch (error) {
        console.error('Error fetching employee:', error);
      }
    };
    fetchEmployee();
  }, [id]);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:3000/employees/${id}`, employee); // Update employee data
      navigate('/'); // Redirect to homepage after update
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Edit Employee</h1>
      <input
        type="text"
        name="username"
        value={employee.username}
        onChange={handleChange}
        placeholder="Username"
        required
      />
      <input
        type="email"
        name="email"
        value={employee.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <select name="status" value={employee.status} onChange={handleChange}>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
      <button type="submit">Update Employee</button>
    </form>
  );
};

export default EditEmployeePage;
