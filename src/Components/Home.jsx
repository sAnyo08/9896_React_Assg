import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

export default function LandingPage() {
    return (
        <div className="landing-page">
            <header className="header">
                <h1>Monthly Budget Tracker</h1>
                <p className="tagline">Manage your expenses, track your budget, and save more!</p>
                <Link to='/MonthlyBudget'><button className="cta-button">Get Started</button></Link>
            </header>

            <section className="features">
                <h2>Features</h2>
                <div className="feature-list">
                    <div className="feature">
                        <h3>Easy Expense Tracking</h3>
                        <p>Log your expenses quickly to stay on top of your budget.</p>
                    </div>
                    <div className="feature">
                        <h3>Monthly Budget Insights</h3>
                        <p>Analyze spending habits to understand where your money goes.</p>
                    </div>
                    <div className="feature">
                        <h3>Secure and Private</h3>
                        <p>Your data is safe, private, and accessible only by you.</p>
                    </div>
                </div>
            </section>

            <footer className="footer">
                <p>&copy; 2024 Monthly Budget Tracker. All rights reserved.</p>
            </footer>
        </div>
    );
}
