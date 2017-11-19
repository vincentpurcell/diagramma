import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';

class Designer extends Component {
    render() {
        return (
            <div>
                <h1>Designer View</h1>
                {this.props.children}
            </div>
        );
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps, actions)(Designer);
