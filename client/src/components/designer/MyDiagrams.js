import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';

class MyDiagrams extends Component {
    constructor(props) {
        super(props);
        this.deleteImage = this.deleteImage.bind(this);
        this.toggleActiveStatus = this.toggleActiveStatus.bind(this);
    }

    componentDidMount() {
        this.props.getMyImages({ value: this.props.auth.id, label: this.props.auth.displayName });
    }

    deleteImage(image) {
        this.props.deleteImage(image.s3Key);
    }

    toggleActiveStatus(image) {
        const saveObj = {
            id: image.id,
            active: !image.active
        };

        this.props.updateImage(saveObj);

        // This is a hack, we should be sequentially chaining the actions.
        setTimeout(() => this.props.getMyImages({ value: this.props.auth.id, label: this.props.auth.displayName }), 250);
    }

    renderToggleStatusButton(image) {
        if (image.active) {
            return (
                <button className="btn black" style={{ marginLeft: '1rem' }} onClick={() => this.toggleActiveStatus(image)}>Unpublish</button>
            );
        }

        return (
            <button className="btn black" style={{ marginLeft: '1rem' }} onClick={() => this.toggleActiveStatus(image)}>Publish</button>
        );
    }

    renderList() {
        if ( this.props.gallery.imageList && this.props.gallery.imageList.length) {
            return this.props.gallery.imageList.map((item) => {
                return (
                    <tr key={item.filename}>
                        <td><img className="responsive-img" style={{ maxHeight: '100px' }} alt="Thumnail preview" src={item.thumbnailUrl}/></td>
                        <td><p>{item.title}</p></td>
                        <td><p>{item.active ? 'Published' : 'Hidden'} {this.renderToggleStatusButton(item)}</p></td>
                        <td><p>{item.votes.length}</p></td>
                        <td><button className="btn black waves" onClick={() => this.deleteImage(item)}>Delete</button></td>
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
                    <h5>My Diagrams</h5>
                    <table>
                        <thead>
                            <tr>
                                <th>Thumbnail</th>
                                <th>Title</th>
                                <th>Status</th>
                                <th>Votes</th>
                                <th>Delete</th>
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

export default connect(mapStateToProps, actions)(MyDiagrams);
