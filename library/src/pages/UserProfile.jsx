import React from "react";
import { BASEURL, callApi, getSession, setSession } from "../api";

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: "",
      email: "",
      role: "",
      loading: true,
      error: null
    };
  }

  componentDidMount() {
    const csrid = getSession("csrid");

    if (!csrid) {
      console.warn("No session ID found, logging out.");
      this.logout();
    } else {
      const data = JSON.stringify({ csrid });
      callApi("POST", `${BASEURL}users/getUserProfile`, data, this.showProfile, this.handleError);
    }
  }

  showProfile = (response) => {
    try {
      const parsed = JSON.parse(response); // convert text to object
  
      if (parsed && parsed.fullname) {
        const { fullname, email, role} = parsed;
        this.setState({ fullname, email, role,  loading: false });
      } else {
        this.setState({ error: "Invalid user data received", loading: false });
      }
    } catch (e) {
      console.error("JSON parse error:", e);
      this.setState({ error: "Failed to parse user data", loading: false });
    }
  };
  

  handleError = (error) => {
    console.error("API call failed:", error);
    this.setState({ error: "Failed to load user profile", loading: false });
  };

  logout = () => {
    setSession("csrid", "", -1);
    window.location.replace("/");
  };

  render() {
    const { fullname, email, role, loading, error } = this.state;

    return (
      <div className="user-profile" style={{ padding: "1rem" }}>
        <h2>User Profile</h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : (
          <>
            <p><strong>Full Name:</strong> {fullname}</p>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Role:</strong> {role === "1" ? "Admin" : role === "2" ? "Librarian" : role === "3" ? "Learner" : "Unknown"}</p>
          </>
        )}
        <button onClick={this.logout} style={{ marginTop: "1rem", backgroundColor: "#ff5e5e", color: "#fff", border: "none", padding: "0.5rem 1rem", borderRadius: "5px" }}>
          Logout
        </button>
      </div>
    );
  }
}

export default UserProfile;
