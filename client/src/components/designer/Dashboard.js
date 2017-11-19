import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';

class Dashboard extends Component {
    componentDidMount() {
        this.props.getMyImages({ value: this.props.auth.id, label: this.props.auth.displayName });
    }

    renderList() {
        if (this.props.gallery.imageList.length) {
            return (
                <div>
                    <h2>My images</h2>
                    <ul>
                        {this.props.gallery.imageList.map((item) => {
                            return (
                                <li key={item.filename}>
                                    <img height="50" alt="Thumnail preview" width="50" src={item.thumbnailUrl}/>
                                    <p>Title: {item.title}</p>
                                    <p>Votes: {item.votes.length}</p>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            );
        }

        return (<p>You have no images.</p>);
    }

    render() {
        return (
            <div>
                <h1>Designer Dashboard</h1>
                {this.renderList()}
            </div>
        );
    }
}

function mapStateToProps({ auth, gallery }) {
    return { auth, gallery };
}

export default connect(mapStateToProps, actions)(Dashboard);
