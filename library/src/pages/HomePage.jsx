import React, { Component } from 'react';
import './HomePage.css';
import { BASEURL, callApi, setSession } from '../api';
import Footer from '../components/Footer';



class HomePage extends Component {
  constructor() {
    super();
    this.userRegistration = this.userRegistration.bind(this);
    this.forgotPassword = this.forgotPassword.bind(this);
    this.signin = this.signin.bind(this);
  }

  showSignin() {
    let popup = document.getElementById("popup");
    let signin = document.getElementById("signin");
    let signup = document.getElementById("signup");
    let popupHeader = document.getElementById("popupHeader");
    signup.style.display = "none";
    signin.style.display = "block";
    popupHeader.innerHTML = "Login";
    popup.style.display = "block";
    username.value = "";
    password.value = "";

  }
  closeSignin(event) {
    if (event.target.id == "popup") {
      let popup = document.getElementById("popup");
      popup.style.display = "none";
    }
  }
  showSignup() {
    let popup = document.getElementById("popup");
    let signin = document.getElementById("signin");
    let signup = document.getElementById("signup");
    let popupHeader = document.getElementById("popupHeader");
    popupHeader.innerHTML = "Create New Account";
    signup.style.display = "block";
    signin.style.display = "none";
    popup.style.display = "block";

    let fullname = document.getElementById("fullname");
    let email = document.getElementById("email");
    let role = document.getElementById("role");
    let signuppassword = document.getElementById("signuppassword");
    let confirmpassword = document.getElementById("confirmpassword");

    fullname.value = "";
    email.value = "";
    role.value = "";
    signuppassword.value = "";
    confirmpassword.value = "";


  }
  userRegistration() {
    let fullname = document.getElementById("fullname");
    let email = document.getElementById("email");
    let role = document.getElementById("role");
    let signuppassword = document.getElementById("signuppassword");
    let confirmpassword = document.getElementById("confirmpassword");

    fullname.style.border = "";
    email.style.border = "";
    role.style.border = "";
    signuppassword.style.border = "";
    confirmpassword.style.border = "";

    if (fullname.value == "") {
      fullname.style.border = "1px solid red";
      fullname.focus();
      return;
    }

    if (email.value == "") {
      email.style.border = "1px solid red";
      email.focus();
      return;
    }

    if (role.value == "") {
      role.style.border = "1px solid red"
      role.focus();
      return;
    }

    if (signuppassword.value == "") {
      signuppassword.style.border = "1px solid red";
      signuppassword.focus();
      return;
    }

    if (confirmpassword.value == "") {
      confirmpassword.style.border = "1px solid red";
      confirmpassword.focus();
      return;
    }
    if (signuppassword.value !== confirmpassword.value) {
      signuppassword.style.border = "1px solid red";
      signuppassword.focus();
      return;
    }
    var data = JSON.stringify({
      fullname: fullname.value,
      email: email.value,
      role: role.value,
      password: signuppassword.value
    });
    callApi("POST", "http://localhost:8082/users/signup", data, this.getResponse)

  }
  getResponse(res) {
    let resp = res.split('::');
    alert(resp[1]);
    if (resp[0] === "200") {
      let signin = document.getElementById("signin");
      let signup = document.getElementById("signup");
      signup.style.display = "none";
      signin.style.display = "block";
    }
  }
  forgotPassword() {
    username.style.borders = "";
    if (username.value === "") {
      username.style.border = "1px solid red";
      username.focus()
      return;
    }
    let url = "http://localhost:8082/users/forgotpassword/" + username.value;
    callApi("GET", url, "", this.forgotPasswordResponse);
  }
  forgotPasswordResponse(res) {
    let data = res.split('::');
    if (data[0] === "200")
      responseDiv.innerHTML = `<br/><br/><label style='color:green'>${data[1]} </label>`;
    else
      responseDiv.innerHTML = `<br/><br/><label style='color:red'>${data[1]} </label>`;
  }
  signin() {
    username.style.border = "";
    password.style.border = "";
    responseDiv.innerHTML = "";

    if (username.value === "") {
      username.style.border = "1px solid red";
      username.focus();
      return;
    }
    if (password.value === "") {
      password.style.border = "1px solid red";
      password.focus();
      return;
    }

    let data = JSON.stringify({
      email: username.value,
      password: password.value

    });
    callApi("POST", BASEURL + "users/signin", data, this.signinResponse);
  }
  signinResponse(res) {
    let rdata = res.split('::');
    if (rdata[0] === "200") {
      setSession("csrid", rdata[1], 1);
      window.location.replace("/dashboard");
    }
    else {
      responseDiv.innerHTML = `<br/><br/><label style="color:red">${rdata[1]}</label>`;
    }
  }

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
              <div className="forgotpassword">Forgot <label onClick={this.forgotPassword}>Password?</label></div>
              <button className="signinButton" onClick={this.signin}>Sign In</button>
              <div className="div1" id='responseDiv'></div>
              <div className="div2">
                Don't have an account? <label onClick={this.showSignup}>SIGN UP NOW</label>
              </div>
            </div>
            <div id="signup">
              <label>Full Name*</label>
              <input type="text" id="fullname" />
              <label>Email</label>
              <input type="email" id="email" />
              <label>Select Role</label>
              <select id='role'>
                <option value=''>Select</option>
                <option value='1'>Admin</option>
                <option value='2'>Librarian</option>
                <option value='3'>Learner</option>
              </select>
              <label>Password*</label>
              <input type="password" id="signuppassword" />
              <label>Confirm Password</label>
              <input type="password" id="confirmpassword" />
              <button onClick={this.userRegistration}>Register</button>
              <div>
                Already have an account? <span onClick={this.showSignin}>SIGN IN</span>
              </div>
            </div>
          </div>
        </div>

        <div className="homepage">
          <header className="header">
            <div className="logo">
              <img src="pngegg.png" alt="Library Logo" />
              <div className="logotext">Library</div>
            </div>
            <nav className="navbar">
              <a href="/">Home</a>
              <a href="/about">About Us</a>
              <label className='signinText' onClick={this.showSignin}>Sign In</label>
            </nav>
          </header>

          <section className="hero">
            <div className="hero-content">
              <h1>Explore Knowledge, One Book at a Time</h1>
            </div>
          </section>

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
          <section className="about-section">
            <div className="about-content">
              <img src="/book1.jpg" alt="Library Interior" className="about-image" />
              <div className="about-text">
                <h2>Explore Our Library</h2>
                <p>Discover a world of knowledge, comfort, and convenience in our modern library spaces. From cozy reading corners to high-tech digital zones, we have it all.</p>
              </div>
            </div>
            <section className="library-highlight">
              <div className="library-highlight-content">
                <div className="highlight-text">
                  <h2>Why Choose Our Library?</h2>
                  <p>We offer an extensive collection of books, digital resources, and a peaceful atmosphere tailored for readers, researchers, and students alike. Our user-friendly system ensures a hassle-free borrowing experience.</p>
                </div>
                <img src="/download (1).jpg" alt="Comfortable Reading Space" className="highlight-image" />
              </div>
            </section>

          </section>
          <section className="testimonials">
            <h2>What People Say</h2>
            <div className="quotes">
              <blockquote>"A room without books is like a body without a soul." - Cicero</blockquote>
              <blockquote>"So many books, so little time." - Frank Zappa</blockquote>
            </div>
          </section>

          <Footer />
        </div>
      </div>
    );
  }
}

export default HomePage;
