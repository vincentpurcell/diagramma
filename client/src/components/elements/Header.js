import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import * as actions from '../../actions';
import '../../styles/header.css';

class Header extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout() {
        this.props.logoutUser();
    }

    renderLinks() {
        if (this.props.auth.admin) {
            return (
                <ul>
                    <li><NavLink exact activeClassName="active" className="black-text" to={'/admin'}>Dashboard</NavLink></li>
                    <li><NavLink exact activeClassName="active" className="black-text" to={'/admin/users'}>Manage Users</NavLink></li>
                    <li><a className="black-text" onClick={() => this.logout()}>Logout</a></li>
                </ul>
            );
        } else if (this.props.auth.id) {
            return (
                <ul>
                    <li><NavLink exact activeClassName="active" className="black-text" to={'/designer'}>Dashboard</NavLink></li>
                    <li><NavLink exact activeClassName="active" className="black-text" to={'/designer/diagrams'}>Manage My Diagrams</NavLink></li>
                    <li><NavLink exact activeClassName="active" className="black-text" to={'/designer/upload'}>Upload</NavLink></li>
                    <li><NavLink exact activeClassName="active" className="black-text" to={'/designer/profile'}>My Profile</NavLink></li>
                    <li><a className="black-text" onClick={() => this.logout()}>Logout</a></li>
                </ul>
            );
        } else {
            return (
                <ul>
                    <li><NavLink exact activeClassName="active" className="black-text" to={'/login'}>Login</NavLink></li>
                    <li><NavLink exact activeClassName="active" className="black-text" to={'/signup'}>Sign Up</NavLink></li>
                </ul>
            );
        }
    }

    showHeader() {
        return (
            <div>
                <div className={this.props.auth.authenticated ? 'navbar-fixed' : 'navbar-fixed unauth'}>
                    <nav className={this.props.auth.authenticated ? 'white black-text' : 'transparent black-text z-depth-0'}>
                        <div className="nav-wrapper">
                            {this.renderLinks()}
                        </div>
                    </nav>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div>
                {this.showHeader()}
                <NavLink to={'/'}><h1 className="main-title">Diagramma</h1></NavLink>
            </div>
        );
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps, actions)(Header);
