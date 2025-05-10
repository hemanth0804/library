import React, { Component } from "react";
import "./Dashboard.css";
import { BASEURL, callApi, getSession, setSession } from "../api";
import MenuBar from "../components/MenuBar.jsx";  
import BookManagement from "./BookManagement.jsx";
import BookSearch from "./BookSearch.jsx";
import BorrowedBooks from "./UnreturnedBooks.jsx";
import UserProfile from "./UserProfile.jsx";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { fullname: '', activeComponent: <BookManagement /> }; // Default component
    this.showFullname = this.showFullname.bind(this);
    this.loadComponent = this.loadComponent.bind(this);
  }

  componentDidMount() {
    let csr = getSession("csrid");
    if (!csr) this.logout();

    let data = JSON.stringify({ csrid: csr });
    callApi("POST", BASEURL + "users/getFullname", data, this.showFullname);
  }

  showFullname(response) {
    this.setState({ fullname: response });
  }

  logout() {
    setSession("csrid", "", -1);
    window.location.replace("/");
  }

  loadComponent(mid) {
    let components = {
      "1": <BookManagement />,
      "2": <BookSearch />,
      "3": <BorrowedBooks />,
      "4": <UserProfile />,
    };

    // Only update state if the selected menu option is valid
    if (components[mid]) {
      this.setState({ activeComponent: components[mid] });
    }
  }

  render() {
    const { fullname, activeComponent } = this.state;
    return (
      <div className='dashboard'>
        <div className='headers'>
          <img className='logo' src='/pngegg.png' alt='' />
          <div className='logoText'> Library</div>
          <img className='logout' onClick={() => this.logout()} src='/logout.png' alt='' />
          <label>{fullname}</label>
        </div>
        <div className='menu'>
          <MenuBar onMenuClick={this.loadComponent} />
        </div>
        <div className='outlet'>
          {activeComponent} 
        </div>
      </div>
    );
  }
}
