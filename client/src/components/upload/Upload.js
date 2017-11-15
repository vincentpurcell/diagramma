import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';

class Upload extends Component {
    constructor(props) {
        super(props);
        this.handleFiles = this.handleFiles.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const upload = this.props.uploadImage;
        Array.from(this.refs.files.files).forEach((file) => {
            upload(file);
        });
    }

    handleFiles(e) {
        this.props.startProcessingFilesForUpload();

        Array.from(e.target.files).forEach((file, index) => {
            const formData = new FormData();
            formData.append('data', file);
            this.props.saveImageBufferToState({
                filename: file.name,
                filetype: file.type,
                s3Url: null,
                success: null,
                attempts: 0,
                designer: null,
                working: null,
                tags: []
            });
        });
    }

    notReadyToUpload() {
        const queue = this.props.upload.imagesQueue;

        if (queue.length && queue.findIndex(i => !i.filename) > -1) {
            return true;
        }

        return false;
    }

    fileUploadProgress() {
        if (this.props.upload.imagesQueue.length) {
            return (
                <div>
                    <h2>Queue: </h2>
                    <ul>
                        {this.props.upload.imagesQueue.map(function(item){
                            return (
                                <li>
                                    <p>Filename: {item.filename}</p>
                                    <p>Attempts: {item.attempts}</p>
                                    <p>Working: {item.working === null ? 'Not yet' : (item.working ? 'Uploading...' : 'Done')}</p>
                                    <p>Success: {item.success === null ? 'Not yet' : (item.success ? 'Success' : 'Fail')}</p>
                                    <p>S3 URL: {item.s3Url || 'Not uploaded'}</p>
                                    <img height="50" width="50" src={item.s3Url}/>
                                </li>
                            );
                        })}
                    </ul>
                </div>
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
                        <input multiple type="file" ref="files" onChange={this.handleFiles} />
                        <input disabled={this.notReadyToUpload()} className='btn btn-primary' type="submit" value="Upload" />
                        {this.fileUploadProgress()}
                    </form>
                </div>
            </div>
        );
    }
}

function mapStateToProps({ auth, upload }) {
    return { auth, upload };
}

export default connect(mapStateToProps, actions)(Upload);
