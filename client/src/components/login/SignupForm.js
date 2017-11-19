import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';

class SignupForm extends Component {
    tryLogin(e) {
        e.preventDefault();
        const username = this.refs.username.value;
        const password = this.refs.password.value;
        const displayName = this.refs.displayName.value;
        const email = this.refs.email.value;

        this.props.registerUser({ username, password, displayName, email, isDesigner: true });
    }

    renderError() {
        if (this.props.auth.error) {
            return (
                <p>Error Registering User.</p>
            );
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.tryLogin.bind(this)}>
                    <h3>Sign up</h3>
                    <input type="text" ref="username" placeholder="Username" />
                    <input type="text" ref="displayName" placeholder="Display Name" />
                    <input type="text" ref="email" placeholder="Email" />
                    <input type="password" ref="password" placeholder="Password" />
                    <input type="submit" value="Sign Up" />
                    {this.renderError()}
                </form>
            </div>
        );
    }
}

function mapStateToProps({ auth, gallery }) {
    return { auth };
}

export default connect(mapStateToProps, actions)(SignupForm);
