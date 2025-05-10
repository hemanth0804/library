import React, { Component } from 'react';
import './MenuBar.css';
import { BASEURL, callApi, getSession } from '../api';

export default class MenuBar extends Component {
  constructor() {
    super();
    this.state = { menuItems: [] };
    this.loadMenus = this.loadMenus.bind(this);
  }

  componentDidMount() {
    const csr = getSession("csrid");
    const data = JSON.stringify({ csrid: csr });
    callApi("POST", BASEURL + "menus/getmenusbyrole", data, this.loadMenus);
  }

  loadMenus(response) {
    try {
      const data = JSON.parse(response);
      this.setState({ menuItems: Array.isArray(data) ? data : [] });
    } catch (error) {
      console.error("Error parsing menu data:", error);
      this.setState({ menuItems: [] });
    }
  }

  handleMenuClick = (mid) => {
    if (this.props.onMenuClick) {
      this.props.onMenuClick(mid);
    }
  };

  render() {
    const { menuItems } = this.state;

    return (
      <div className='menubar'>
        <div className='menuheader'>
          MENU <img src='./menu.png' alt='Menu Icon' />
        </div>
        <div className='menulist'>
          <ul>
            {menuItems.map((row) => (
              <li key={row.mid} onClick={() => this.handleMenuClick(row.mid)}>
                {row.menu}
                {row.icon && <img src={row.icon} alt={`${row.menu} icon`} />}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
