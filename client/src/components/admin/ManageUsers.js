import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';
import Admin from './Admin';

class ManageUsers extends Component {
    render() {
        return (
            <Admin>
                <h1>Manage Users</h1>
            </Admin>
        );
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps, actions)(ManageUsers);
