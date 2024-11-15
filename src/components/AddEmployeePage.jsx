import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddEmployeePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const employeeToEdit = location.state?.employee; 

  const [employee, setEmployee] = useState({
    id: null,
    username: '',
    email: '',
    status: 'Active', // Default value
  });

  const [statusOptions] = useState(['Active', 'Inactive']); 


  useEffect(() => {
    if (employeeToEdit) {
      setEmployee(employeeToEdit); 
    } else {
      
      setEmployee((prevState) => ({
        ...prevState,
        id: Date.now(),
      }));
    }
  }, [employeeToEdit]);

  
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (employeeToEdit) {
      // If employeeToEdit exists, update the employee
      try {
        const response = await axios.put(
          `http://localhost:3000/employees/${employeeToEdit.id}`,
          employee
        );
        console.log('Employee updated successfully', response.data);
        navigate('/'); // Redirect to home page after updating
      } catch (error) {
        console.error('Error updating employee:', error);
      }
    } else {
    
      try {
        const response = await axios.post('http://localhost:3000/employees', employee);
        console.log('Employee added successfully', response.data);
        navigate('/'); 
      } catch (error) {
        console.error('Error adding employee:', error);
      }
    }
  };

  return (
    <div>
      <h1>{employeeToEdit ? 'Edit Employee' : 'Add Employee'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={employee.username}
            onChange={(e) => setEmployee({ ...employee, username: e.target.value })}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={employee.email}
            onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
          />
        </div>
        <div>
          <label>Status:</label>
          <select
            value={employee.status}
            onChange={(e) => setEmployee({ ...employee, status: e.target.value })}
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">{employeeToEdit ? 'Update Employee' : 'Add Employee'}</button>
      </form>
    </div>
  );
};

export default AddEmployeePage;
