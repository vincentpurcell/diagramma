import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'moment';

import * as actions from '../../actions';
import Admin from './Admin';

class ManageUsers extends Component {
    componentDidMount() {
        this.props.getDesigners(true);
        this.toggleActiveStatus = this.toggleActiveStatus.bind(this);
    }

    toggleActiveStatus(designer) {
        const saveObj = {
            id: designer.id,
            active: !designer.active
        };
        this.props.updateUser(saveObj);

        // This is a hack, we should be sequentially chaining the actions.
        setTimeout(() => this.props.getDesigners(true), 250);
    }

    renderToggleStatusButton(designer) {
        if (designer.active) {
            return (
                <button onClick={() => this.toggleActiveStatus(designer)}>Deactivate</button>
            );
        }

        return (
            <button onClick={() => this.toggleActiveStatus(designer)}>Activate</button>
        );
    }

    renderDesignerList() {
        if (!this.props.gallery || !this.props.gallery.designers) {
            return (<p>Loading...</p>);
        } else if (!this.props.gallery.designers.length) {
            return (<p>No users</p>);
        }

        return (
            <ul>
                {this.props.gallery.designers.map((designer) => {
                    return (
                        <li key={designer.id}>
                            <p>Display Name: {designer.displayName}</p>
                            <p>Username: {designer.username}</p>
                            <p>Email: {designer.email}</p>
                            <p>Created: {Moment(designer.created).format('LLL')}</p>
                            <p>Active: {designer.active ? 'Yes' : 'No'}</p>
                            {this.renderToggleStatusButton(designer)}
                        </li>
                    );
                })}
            </ul>
        );
    }

    render() {
        return (
            <Admin>
                <h1>Manage Users</h1>
                {this.renderDesignerList()}
            </Admin>
        );
    }
}

function mapStateToProps({ auth, gallery }) {
    return { auth, gallery };
}

export default connect(mapStateToProps, actions)(ManageUsers);
