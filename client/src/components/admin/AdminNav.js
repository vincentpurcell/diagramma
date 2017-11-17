import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as actions from '../../actions';

class AdminNav extends Component {
    render() {
        return (
            <div>
                <nav>
                    <ul>
                        <li><Link to={'/admin'}>Dashboard</Link></li>
                        <li><Link to={'/admin/users'}>Manage Users</Link></li>
                        <li><Link to={'/admin/superclusters'}>Manage Superclusters</Link></li>
                        <li><Link to={'/admin/images'}>Manage Images</Link></li>
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
