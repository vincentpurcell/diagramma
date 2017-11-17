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

    render() {
        return (
            <Link to={'/'}><h1 className="main-title">Diagramma</h1></Link>
        );
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps, actions)(Header);
