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
        if (this.props.auth.authenticated && this.props.auth.admin) {
            return (
                <ul>
                    <li><NavLink exact activeClassName="active" to={'/admin'}>Dashboard</NavLink></li>
                    <li><NavLink exact activeClassName="active" to={'/admin/users'}>Manage Users</NavLink></li>
                    <li><a onClick={() => this.logout()}>Logout</a></li>
                </ul>
            );
        } else if (this.props.auth.authenticated) {
            return (
                <ul>
                    <li><NavLink exact activeClassName="active" to={'/designer'}>Dashboard</NavLink></li>
                    <li><NavLink exact activeClassName="active" to={'/designer/diagrams'}>Diagrams</NavLink></li>
                    <li><NavLink exact activeClassName="active" to={'/designer/upload'}>Upload</NavLink></li>
                    <li><NavLink exact activeClassName="active" to={'/designer/profile'}>Profile</NavLink></li>
                    <li><a onClick={() => this.logout()}>Logout</a></li>
                </ul>
            );
        } else {
            return (
                <ul>
                    <li><NavLink exact activeClassName="active" to={'/login'}>Login</NavLink></li>
                    <li><NavLink exact activeClassName="active" to={'/signup'}>Sign Up</NavLink></li>
                </ul>
            );
        }
    }

    showHeader() {
        return (
            <div>
                <div className={this.props.auth.authenticated ? 'navbar-fixed' : 'navbar-fixed unauth'}>
                    <nav className={this.props.auth.authenticated ? 'white z-depth-0' : 'white z-depth-0'}>
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
