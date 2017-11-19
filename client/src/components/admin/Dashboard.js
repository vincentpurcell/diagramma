import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';
import Admin from './Admin';

class AdminDashboard extends Component {
    render() {
        return (
            <Admin>
                <h1>Dashboard</h1>
            </Admin>
        );
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps, actions)(AdminDashboard);
