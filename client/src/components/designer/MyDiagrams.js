import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';

class MyDiagrams extends Component {
    constructor(props) {
        super(props);
        this.deleteImage = this.deleteImage.bind(this);
    }

    componentDidMount() {
        this.props.getMyImages({ value: this.props.auth.id, label: this.props.auth.displayName });
    }

    deleteImage(image) {
        this.props.deleteImage(image.s3Key);
    }

    renderList() {
        if (this.props.gallery.imageList.length) {
            return (
                <ul>
                    {this.props.gallery.imageList.map((item) => {
                        return (
                            <li key={item.filename}>
                                <p>Filename: {item.filename}</p>
                                <p>Title: {item.title}</p>
                                <p>Published: {item.active ? 'Yes' : 'No'}</p>
                                <p>s3Key: {item.s3Key}</p>
                                <p>Designer: {item.designer.displayName}</p>
                                <p>Votes: {item.votes.length}</p>
                                <p>Thumbnail:</p>
                                <img height="50" alt="Thumnail preview" width="50" src={item.thumbnailUrl}/>
                                <button onClick={() => this.deleteImage(item)}>Delete this image.</button>
                            </li>
                        );
                    })}
                </ul>
            );
        }

        return (<p>You have no images.</p>);
    }

    render() {
        return (
            <div>
                <h1>My Diagrams</h1>
                {this.renderList()}
            </div>
        );
    }
}

function mapStateToProps({ auth, gallery }) {
    return { auth, gallery };
}

export default connect(mapStateToProps, actions)(MyDiagrams);
