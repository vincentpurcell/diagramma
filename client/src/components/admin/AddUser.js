import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';
import Admin from './Admin';

class AddUser extends Component {
    render() {
        return (
            <Admin>
                <h1>Manage Images</h1>
            </Admin>
        );
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps, actions)(AddUser);
