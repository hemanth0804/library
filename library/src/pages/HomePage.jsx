import React, { Component } from 'react';
import './HomePage.css';

class HomePage extends Component {
  showSignin = () => {
    let popup = document.getElementById("popup");
    let signin = document.getElementById("signin");
    let signup = document.getElementById("signup");
    let signinlibrarian = document.getElementById("signinlibrarian");
    let popupHeader = document.getElementById("popupHeader");
    popupHeader.innerHTML = "Login";
    signup.style.display = "none";
    signinlibrarian.style.display = "none";
    signin.style.display = "block";
    popup.style.display = "block";
  };

  closeSignin = (event) => {
    if (event.target.id === "popup") {
      let popup = document.getElementById("popup");
      popup.style.display = "none";
    }
  };

  showSignup = () => {
    let popup = document.getElementById("popup");
    let signin = document.getElementById("signin");
    let signup = document.getElementById("signup");
    let popupHeader = document.getElementById("popupHeader");
    popupHeader.innerHTML = "Create New Account";
    signup.style.display = "block";
    signin.style.display = "none";
    popup.style.display = "block";
  };

  showSigninlibrarian = () => {
    let popup = document.getElementById("popup");
    let signin = document.getElementById("signin");
    let signup = document.getElementById("signup");
    let signinlibrarian = document.getElementById("signinlibrarian");
    let popupHeader = document.getElementById("popupHeader");
    popupHeader.innerHTML = "Librarian Login";
    signup.style.display = "none";
    signin.style.display = "none";
    signinlibrarian.style.display = "block";
    popup.style.display = "block";
  };

  render() {
    return (
      <div id="container">
        <div id="popup" onClick={this.closeSignin}>
          <div id="popupWindow">
            <div id="popupHeader">Login</div>
            <div id="signin">
              <label className="usernameLabel">Username*</label>
              <input type="text" id="username" />
              <label className="passwordLabel">Password*</label>
              <input type="password" id="password" />
              <div className="forgotpassword">Forgot <label>Password?</label></div>
              <button className="signinButton">Sign In</button>
              <div className="div1"></div>
              <div className="div2">
                Don't have an account? <label onClick={this.showSignup}>SIGN UP NOW</label>
                For Librarian Login <label onClick={this.showSigninlibrarian}> LIBRARIAN SIGN IN</label>
              </div>
            </div>
            <div id="signinlibrarian">
              <label className="usernameLabel">Username*</label>
              <input type="text" id="username" />
              <label className="passwordLabel">Password*</label>
              <input type="password" id="password" />
              <div className="forgotpassword">Forgot <label>Password?</label></div>
              <button className="signinButton">Sign In</button>
              <div className="div1"></div>
              <div className="div2">
                For Learner Login <label onClick={this.showSignin}> LEARNER SIGN IN</label>
              </div>
            </div>
            <div id="signup">
              <label>Full Name*</label>
              <input type="text" id="fullname" />
              <label>Email</label>
              <input type="email" id="email" />
              <label>Password*</label>
              <input type="password" id="password" />
              <label>Confirm Password</label>
              <input type="password" id="confirmpassword" />

              <button>Register</button>
              <div>
                Already have an account? <span onClick={this.showSignin}>SIGN IN</span>
              </div>
            </div>
          </div>
        </div>

        <div className="homepage">
          {/* Header Section */}
          <header className="header">
            <div className="logo">
              <img src="pngegg.png" alt="Library Logo" />
              <div className="logotext">Library</div>
            </div>
            <nav className="navbar">
              <a href="/">Home</a>
              <a href="#about">About Us</a>
              <a href="#contact">Contact Us</a>
              <label className='signinText' onClick={this.showSignin}>Sign In</label>
            </nav>
          </header>

          {/* Hero Section */}
          <section className="hero">
            <div className="hero-content">
              <h1>Explore Knowledge, One Book at a Time</h1>
            </div>
          </section>

          {/* Features Section */}
          <section className="features">
            <h2>Features</h2>
            <div className="feature-list">
              <div className="feature-item">
                <h3>Search for Books</h3>
                <p>Highlight the ease of finding books in our catalog.</p>
              </div>
              <div className="feature-item">
                <h3>Borrow Books Online</h3>
                <p>Enjoy the convenience of requesting and returning books online.</p>
              </div>
              <div className="feature-item">
                <h3>Return Books</h3>
                <p>Seamless tools for returning books efficiently.</p>
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="testimonials">
            <h2>What People Say</h2>
            <div className="quotes">
              <blockquote>
                "A room without books is like a body without a soul." - Cicero
              </blockquote>
              <blockquote>
                "So many books, so little time." - Frank Zappa
              </blockquote>
            </div>
          </section>

          {/* Footer Section */}
          <footer className="footer">
            <div className="contact-details">
              <p>Contact us at: contact@library.com</p>
            </div>
            <div className="social-media">
              <a href="#">Facebook</a>
              <a href="#">Twitter</a>
              <a href="#">Instagram</a>
            </div>
            <nav className="footer-nav">
              <a href="#home">Home</a>
              <a href="#about">About Us</a>
              <a href="#catalog">Catalog</a>
              <a href="#signup">Sign Up</a>
              <a href="#login">Login</a>
              <a href="#contact">Contact Us</a>
            </nav>
          </footer>
        </div>
      </div>
    );
  }
}

export default HomePage;
