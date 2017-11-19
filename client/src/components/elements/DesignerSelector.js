import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';

import * as actions from '../../actions';
import 'react-select/dist/react-select.css';
import '../../styles/selecter.css';

class DesignerSelector extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.showAll = this.showAll.bind(this);
    }

    componentDidMount() {
        this.props.getDesigners();
    }

    handleChange(e) {
        if (e && e.value) {
            this.props.getImagesByDesigner(e);
        } else {
            this.props.getImages();
        }
    }

    showAll() {
        this.props.getImages();
    }

    getDesigners() {
        if (!this.props.gallery || !this.props.gallery.designers || !this.props.gallery.designers.length) {
            return [];
        }

        return this.props.gallery.designers.map(d => {
            return {
                label: d.displayName,
                value: d.id
            };
        });
    }

    render() {
        return (
            <div className="row-container">
                <button className="universe-btn" onClick={this.showAll}>Universe</button>
                <Select
                    value={this.props.gallery.designer}
                    className="designer-selector"
                    onChange={this.handleChange}
                    options={this.getDesigners()}
                    placeholder="View by Designer"
                />
            </div>
        );
    }
}

function mapStateToProps({ auth, gallery }) {
    return { auth, gallery };
}

export default connect(mapStateToProps, actions)(DesignerSelector);
