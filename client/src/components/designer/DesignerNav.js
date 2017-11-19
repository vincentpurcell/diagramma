import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as actions from '../../actions';

class DesignerNav extends Component {
    logout() {
        this.props.logoutUser();
    }

    render() {
        return (
            <div>
                <p>Hi {this.props.auth.displayName}</p>
                <nav>
                    <ul>
                        <li><Link to={'/designer'}>Dashboard</Link></li>
                        <li><Link to={'/designer/diagrams'}>Manage My Diagrams</Link></li>
                        <li><Link to={'/designer/upload'}>Upload</Link></li>
                    </ul>
                </nav>
            </div>
        );
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps, actions)(DesignerNav);
