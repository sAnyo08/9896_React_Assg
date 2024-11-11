import './App.css';
import Expense_form from './Components/Expense_form';
import MonthlyBudget from './Components/MonthlyBudget';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Expense_form" element={<Expense_form />} />
        <Route path="/MonthlyBudget" element={<MonthlyBudget />} />
      </Routes>
    </Router>
  );
}

export default App;
