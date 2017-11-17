import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';
import AdminNav from './AdminNav';

class ManageSuperclusters extends Component {
    render() {
        return (
            <div>
                <h1>Manage Superclusters</h1>
                <AdminNav />
            </div>
        );
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps, actions)(ManageSuperclusters);
