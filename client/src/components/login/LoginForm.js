import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';

class LoginForm extends Component {
    tryLogin(e) {
        e.preventDefault();

        const username = this.refs.username.value;
        const password = this.refs.password.value;

        this.props.loginUser({ username, password });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.tryLogin.bind(this)}>
                    <h3>Sign in</h3>
                    <input type="text" ref="username" placeholder="Username" />
                    <input type="password" ref="password" placeholder="Password" />
                    <input type="submit" value="Login" />
                </form>
            </div>
        );
    }
}

function mapStateToProps({ auth, gallery }) {
    return { auth };
}

export default connect(mapStateToProps, actions)(LoginForm);
