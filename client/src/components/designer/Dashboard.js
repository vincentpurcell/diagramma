import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';
import '../../styles/my-diagrams.css';

class Dashboard extends Component {
    componentDidMount() {
        this.props.getMyImages({ value: this.props.auth.id, label: this.props.auth.displayName });
    }

    renderList() {
        return this.props.auth.myImages.map((item) => {
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

    renderImageListTable() {
        if (this.props.auth.myImages.length) {
            return (
                <table className="highlight responsive-table">
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
            );
        }
        return (
            <div>
                <p>You have no images.</p>
                <input className="waves-effect waves-light btn black white-text" type="button" value="Upload Images" />
            </div>
        )
    }

    render() {
        return (
            <div>
                <h5>Dashboard</h5>
                {this.renderImageListTable()}
            </div>
        );
    }
}

function mapStateToProps({ auth, gallery }) {
    return { auth, gallery };
}

export default connect(mapStateToProps, actions)(Dashboard);
