import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';

class Dashboard extends Component {
    componentDidMount() {
        this.props.getMyImages({ value: this.props.auth.id, label: this.props.auth.displayName });
    }

    renderList() {
        if ( this.props.gallery.imageList && this.props.gallery.imageList.length) {
            return this.props.gallery.imageList.map((item) => {
                return (
                    <tr key={item.filename}>
                        <td><img alt="Thumnail preview" src={item.thumbnailUrl}/></td>
                        <td><p>{item.title}</p></td>
                        <td><p>{item.active ? 'Published' : 'Hidden'}</p></td>
                        <td><p>{item.votes.length}</p></td>
                    </tr>
                );
            });
        }

        return (
            <tr>
                <td colSpan="5"><p>You have no images.</p></td>
            </tr>
        );
    }

    render() {
        if (this.props.gallery.imageList && this.props.gallery.imageList.length) {
            return (
                <div>
                    <h5>Dashboard</h5>
                    <table>
                        <thead>
                            <tr>
                                <th>Thumbnail</th>
                                <th>Title</th>
                                <th>Status</th>
                                <th>Votes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderList()}
                        </tbody>
                    </table>
                </div>
            );
        }

        return (<p>You have no images.</p>);
    }
}

function mapStateToProps({ auth, gallery }) {
    return { auth, gallery };
}

export default connect(mapStateToProps, actions)(Dashboard);
