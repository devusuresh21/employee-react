import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import AddEmployeePage from './components/AddEmployeePage';
import EditEmployeePage from './components/EditEmployeePage';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add-employee" element={<AddEmployeePage />} />
        <Route path="/edit-employee/:id" element={<EditEmployeePage />} />
      </Routes>
    </Router>
  );
}

export default App;
