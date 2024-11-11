import { useState, useEffect } from 'react';
import './Expense_form.css'; // Import the new CSS file

export default function ExpenseTracker() {
    const [expenses, setExpenses] = useState([]);
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [remainingBudget, setRemainingBudget] = useState(null);
    const [sortCriteria, setSortCriteria] = useState('date'); // Default sorting by date
    const [warningMessage, setWarningMessage] = useState(''); // State for warning message

    // Fetch the monthly budget from localStorage on component mount
    useEffect(() => {
        const storedBudget = localStorage.getItem('monthlyBudget');
        if (storedBudget) {
            setRemainingBudget(parseFloat(storedBudget));
        }

        // Load expenses from localStorage
        const storedExpenses = JSON.parse(localStorage.getItem('expenses'));
        if (storedExpenses) {
            setExpenses(storedExpenses);
        }
    }, []);

    useEffect(() => {
        // Store expenses in localStorage whenever expenses state changes
        localStorage.setItem('expenses', JSON.stringify(expenses));

        // Calculate total expenses and check if 80% of the budget is used
        if (remainingBudget !== null) {
            const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
            const budgetThreshold = remainingBudget * 0.8; // 80% of the budget

            if (totalExpenses >= budgetThreshold) {
                setWarningMessage("80% of the budget has been utilized");
            } else {
                setWarningMessage('');
            }
        }
    }, [expenses, remainingBudget]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!category || !amount || !date) {
            alert('Please fill in all fields');
            return;
        }

        if (amount <= 0) {
            alert('Amount must be greater than zero');
            return;
        }

        const newExpense = {
            category,
            amount: parseFloat(amount),
            date,
        };

        // Add the new expense to the expenses state
        setExpenses([...expenses, newExpense]);
        setCategory('');
        setAmount('');
        setDate('');
        setSuccessMessage('Expense added successfully!');

        // Update the remaining budget after adding a new expense
        if (remainingBudget !== null) {
            setRemainingBudget((prevRemainingBudget) => prevRemainingBudget - newExpense.amount);
        }

        setTimeout(() => setSuccessMessage(''), 3000);
    };

    const handleDelete = (index) => {
        const updatedExpenses = expenses.filter((_, i) => i !== index);
        setExpenses(updatedExpenses);

        // Recalculate remaining budget after deleting an expense
        if (expenses[index]) {
            setRemainingBudget((prevRemainingBudget) => prevRemainingBudget + expenses[index].amount);
        }
    };

    // Function to handle sorting
    const handleSortChange = (e) => {
        setSortCriteria(e.target.value);
    };

    const sortExpenses = (expenses) => {
        switch (sortCriteria) {
            case 'amount':
                return [...expenses].sort((a, b) => a.amount - b.amount); // Sort by amount
            case 'category':
                return [...expenses].sort((a, b) => a.category.localeCompare(b.category)); // Sort by category
            case 'date':
            default:
                return [...expenses].sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort by date
        }
    };

    const sortedExpenses = sortExpenses(expenses);

    return (
        <div className="container">
            <h1 className="title">Expense Tracker</h1>

            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="input"
                    >
                        <option value="">Select category</option>
                        <option value="food">Food</option>
                        <option value="transportation">Transportation</option>
                        <option value="utilities">Utilities</option>
                        <option value="entertainment">Entertainment</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="amount">Amount</label>
                    <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter amount"
                        className="input"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="date">Date</label>
                    <input
                        type="date"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="input"
                        required
                    />
                </div>
                <button type="submit" className="submit-button">Add Expense</button>
            </form>

            {successMessage && <p className="success-message">{successMessage}</p>}

            {/* Display Remaining Budget */}
            <div className="remaining-budget">
                <h3>Remaining Budget: ${remainingBudget !== null ? remainingBudget.toFixed(2) : 'Not Set'}</h3>
            </div>

            {/* Display warning message if 80% of the budget is utilized */}
            {warningMessage && <p className="warning-message">{warningMessage}</p>}

            {/* Sorting Options */}
            <hr></hr>
            <div className="sort-options">
                <label htmlFor="sort">Sort By:</label>
                <select id="sort" value={sortCriteria} onChange={handleSortChange} className="input">
                    <option value="date">Date</option>
                    <option value="amount">Amount</option>
                    <option value="category">Category</option>
                </select>
            </div>

            <div>
                <h2 className="expense-title">Expense List</h2>
                {sortedExpenses.length === 0 ? (
                    <p>No expenses added yet.</p>
                ) : (
                    <table className="expense-table">
                        <thead>
                            <tr>
                                <th>Category</th>
                                <th>Amount</th>
                                <th>Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedExpenses.map((expense, index) => (
                                <tr key={index}>
                                    <td>{expense.category}</td>
                                    <td>${parseFloat(expense.amount).toFixed(2)}</td>
                                    <td>{expense.date}</td>
                                    <td>
                                        <button
                                            onClick={() => handleDelete(index)}
                                            className="delete-button"
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
}
