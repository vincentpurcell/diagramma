import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';
import '../../styles/image-viewer.css';

import jquery from 'jquery';
window.$ = window.jQuery = jquery;

class ImageViewer extends Component {
    hideImage() {
        this.props.hideImage();
    }

    showNext() {

    }

    showPrev() {

    }

    componentDidMount() {
        this.props.getVotes(this.props.gallery.showImage.id);
    }

    render() {
        return (
            <div className="image-viewer">
                <div className="container">
                    <p className="close-viewer" onClick={() => this.hideImage()}>&#x2715;</p>
                    <p className="next-btn" onClick={() => this.showNext()}>&rsaquo;</p>
                    <p className="prev-btn" onClick={() => this.showPrev()}>&rsaquo;</p>
                    <div className="image-container">
                        <img alt={`Diagram by ${this.props.gallery.showImage.designer.displayName}`} src={this.props.gallery.showImage.imageUrl} />
                    </div>
                    <div className="meta">
                        <h1>{this.props.gallery.showImage.designer.displayName}</h1>
                        <div className="actions">
                            <button className="vote-btn" onClick={this.props.castVote.bind(this.props.gallery.showImage)}>VOTE</button>
                            <p className="votes">Votes: {this.props.gallery.showImage.votes.length}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps({ auth, gallery }) {
    return { auth, gallery };
}

export default connect(mapStateToProps, actions)(ImageViewer);
