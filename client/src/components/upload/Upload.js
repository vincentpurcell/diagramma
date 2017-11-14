import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';

class Upload extends Component {
    constructor(props) {
        super(props);
        this.handleFile = this.handleFile.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log('uploading');
        console.log(this.props.upload);
        this.props.uploadImage(this.props.upload);
    }

    handleFile(e) {
        this.props.startProcessingFileForUpload();

        const reader = new FileReader();
        const file = e.target.files[0];

        reader.onload = (upload) => {
            this.props.finishProcessingFileForUpload({
                imageBuffer: upload.target.result,
                imageFilename: file.name,
                imageType: file.type
            });
            console.log(this.props.upload);
        };

        reader.readAsDataURL(file);
    }

    uploadedImage() {
        if (this.props.upload.s3) {
            return (
                <div>
                    <h4>Image uploaded!</h4>
                    <img className='image-preview' alt="Uploaded" src={this.props.upload.s3} />
                    <pre className='image-link-box'>{this.props.upload.s3}</pre>
                </div>
            );
        }
        return;
    }

    processingFile() {
        if (this.props.upload.uploading) {
            return (
                <p>Uploading...</p>
            );
        } else if (this.props.upload.success) {
            return (
                <p>Success!</p>
            );
        } else if (this.props.upload.imageFile && !this.props.upload.success) {
            return (
                <p>Fail...</p>
            );
        }
        return;
    }

    render() {
        return (
            <div className='row'>
                <div className='col-sm-12'>
                    <label>Upload an image</label>
                    <form onSubmit={this.handleSubmit} encType="multipart/form-data">
                        <input type="file" onChange={this.handleFile} />
                        <input disabled={!this.props.upload.readyToUpload} className='btn btn-primary' type="submit" value="Upload" />
                        {this.processingFile()}
                    </form>
                    {this.uploadedImage()}
                </div>
            </div>
        );
    }
}

function mapStateToProps({ auth, upload }) {
    return { auth, upload };
}

export default connect(mapStateToProps, actions)(Upload);
