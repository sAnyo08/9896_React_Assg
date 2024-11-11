import React, { useState, useEffect } from 'react';
import './MonthlyBudget.css';
import { Link } from 'react-router-dom';

function MonthlyBudget() {
    const [monthlyBudget, setMonthlyBudget] = useState('');

    useEffect(() => {
        const storedBudget = localStorage.getItem('monthlyBudget');
        if (storedBudget) {
            setMonthlyBudget(storedBudget);
        }
    }, []);

    const handleBudgetChange = (e) => {
        const newBudget = e.target.value;
        setMonthlyBudget(newBudget);
        localStorage.setItem('monthlyBudget', newBudget); // Save to localStorage
    };

    return (
        <div className="budget-container">
            <div className="form-group">
                <label htmlFor="monthly_budget">Monthly Budget</label>
                <input
                    type="number"
                    id="monthly_budget"
                    value={monthlyBudget}
                    onChange={handleBudgetChange}
                    placeholder="Enter Budget"
                    className="input"
                    required
                />
            </div>
            <Link to="/Expense_form">
                <button className="cta-button">Get Started</button>
            </Link>
        </div>
    );
}

export default MonthlyBudget;
