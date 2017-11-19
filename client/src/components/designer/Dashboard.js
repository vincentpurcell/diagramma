import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';

class Dashboard extends Component {
    render() {
        return (
            <div>
                <h1>Designer Dashboard</h1>
            </div>
        );
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps, actions)(Dashboard);
