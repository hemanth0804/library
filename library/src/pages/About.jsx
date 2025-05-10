import React from 'react';
import './About.css';
import Footer from '../components/Footer';

const About = () => {
    return (
        <>
            <header className="header">
                <div className="logo">
                    <img src="pngegg.png" alt="Library Logo" />
                    <div className="logotext">Library</div>
                </div>
                <nav className="navbar">
                    <a href="/">Home</a>
                </nav>
            </header>
            <main className="about-container">
                <div className="about-text">
                    <header>
                        <h1>About Us</h1>
                    </header>

                    <section className="about-us">
                        <div className="about-image">
                            <img src="/photo_2025-05-10_21-41-03.jpg" alt="Library interior" />
                        </div>
                    </section>

                    <section>
                        <p>
                            Welcome to the Library Management System! Our system is designed to help
                            manage and organize library resources effectively. Whether you're a librarian,
                            student, or faculty member, this app provides an easy-to-use interface for
                            handling books, user accounts, and circulation processes.
                        </p>
                    </section>

                    <section>
                        <h2>Our Mission</h2>
                        <p>
                            Our mission is to create a more efficient and accessible way to manage books,
                            keep track of users, and ensure smooth transactions for borrowing and returning
                            materials. We aim to streamline the library experience for everyone.
                        </p>
                    </section>

                    <section>
                        <h2>Features</h2>
                        <ul>
                            <li><strong>Book Management:</strong> Add, edit, and remove books.</li>
                            <li><strong>User Management:</strong> Track student and staff accounts.</li>
                            <li><strong>Search Functionality:</strong> Search books by title, author, or genre.</li>
                            <li><strong>Loan System:</strong> Track borrowed books and due dates.</li>
                            <li><strong>Notifications:</strong> Receive reminders for overdue books.</li>
                        </ul>
                    </section>

                    <section>
                        <h2>Contact Us</h2>
                        <p>If you have any questions or feedback, feel free to reach out to us.</p>
                    </section>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default About;
