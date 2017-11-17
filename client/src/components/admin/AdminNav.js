import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as actions from '../../actions';

class AdminNav extends Component {
    logout() {
        this.props.logoutUser();
    }

    render() {
        return (
            <div>
                <p>Hi {this.props.auth.displayName}</p>
                <nav>
                    <ul>
                        <li><Link to={'/admin'}>Dashboard</Link></li>
                        <li><Link to={'/admin/users'}>Manage Users</Link></li>
                        <li><Link to={'/admin/superclusters'}>Manage Superclusters</Link></li>
                        <li><Link to={'/admin/images'}>Manage Images</Link></li>
                        <li><p onClick={() => this.logout()}>Logout</p></li>
                    </ul>
                </nav>
            </div>
        );
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps, actions)(AdminNav);
