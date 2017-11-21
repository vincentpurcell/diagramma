import React, { Component } from 'react';
import '../../styles/loading.css';

class SmoothImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false
        };
    }

    handleImageLoaded() {
        this.setState({ loaded: true });
    }

    handleImageErrored() {
        this.setState({ loaded: false });
    }

    componentWillReceiveProps() {
        if (this.props.refreshOnProps && this.state.loaded) {
            this.setState({ loaded: false });

            // Hack fallback if image is loaded from cache...
            // Interesting, images loaded from cache don't fire the onload event.
            setTimeout(() => {
                this.setState({ loaded: true });
            }, 750);
        }
    }

    renderSpinner() {
        if (!this.state.loaded) {
            return (
                <div className="spinner"></div>
            );
        }

        return;
    }

    renderImageClass() {
        if (!this.state.loaded) {
            return 'loading';
        }

        return 'ready';
    }

    render() {
        return (
            <div className="image-container valign-wrapper">
                {this.renderSpinner()}
                <img
                    className={`${this.props.className} smoothimage ${this.renderImageClass()}`}
                    src={this.props.src}
                    onLoad={this.handleImageLoaded.bind(this)}
                    onError={this.handleImageErrored.bind(this)}
                />
            </div>
        );
    }
}
export default SmoothImage;
