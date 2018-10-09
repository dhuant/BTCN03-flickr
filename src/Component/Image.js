import React, { Component } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
class Image extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hover: false,
        }
    }
    showInfo = (event) => {
        event.preventDefault();
        this.setState({
            hover: true,
        })
    }
    hideInfo = (event) => {
        event.preventDefault();
        this.setState({
            hover: false,
        })
    }
    render() {
        let img = this.props;
        let desc = '';
        let url = `/photo/${img.id}`;
        if (this.state.hover) {
            desc = (
                <div className="view photo-list-photo-view awake">
                    <div className="interaction-view">
                        <div className="photo-list-photo-interaction">
                            <a className="overlay no-outline">
                            </a>
                            <div className="interaction-bar" title={img.title}>
                                <div className="text">
                                    <a className="title">{img.title}
                                    </a>
                                    <a className="attribution">
                                        by {img.ownername} - {img.views} views
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <Link to={url}>
                <div className="image" style={img.style} onMouseEnter={this.showInfo} onMouseLeave={this.hideInfo}>
                    <img src={img.src} alt={img.title} />
                    {desc}
                </div>
            </Link>

        );
    }
}

export default Image;