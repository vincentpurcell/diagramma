import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as actions from '../../actions';
import '../../styles/header.css';

class Header extends Component {
    constructor(props) {
        super(props);
        this.processLogout = this.processLogout.bind(this);
    }

    processLogout() {
        this.props.logoutUser();
    }

    showAuthHeader() {
        if (this.props.auth.authenticated) {
            const role = this.props.auth.admin ? 'admin' : 'designer'
            return (
                <div>
                    <li><Link to={`/${role}`}>Dashboard</Link></li>
                    <li><button onClick={() => this.props.logoutUser()}>Logout</button></li>
                </div>
            );
        } else {
            return (
                <div>
                    <li><Link to={'/login'}>Login</Link></li>
                    <li><Link to={'/signup'}>Sign Up</Link></li>
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                <Link to={'/'}><h1 className="main-title">Diagramma</h1></Link>
                {this.showAuthHeader()}
            </div>
        );
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps, actions)(Header);
