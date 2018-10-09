import React, { Component } from 'react';
import api from '../Config/aipGetInfo';
import apiSize from '../Config/aipGetSize';
import { Link } from 'react-router-dom';
import _ from 'lodash';

class Photo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: {},
            tags: [],
        }
    }
    componentDidMount() {
        if (this.props.match) {
            let info = api.getInfo(api.key, this.props.match.params.id);
            let size = apiSize.getSize(apiSize.key, this.props.match.params.id);
            Promise.all([info, size]).then(([resInfo, resSize]) => {
                let arrImage = resInfo.data.photo;
                arrImage.url = resSize.data.sizes.size[6].source;
                this.setState({
                    image: arrImage,
                    tags: arrImage.tags.tag,
                });
            });
        }
    }
    render() {
        let { image, tags } = this.state;

        let ownername = _.result(image, 'owner.username');
        let title = _.result(image, 'title._content');
        let views = _.result(image, 'views');
        //let views = [...views, image.date.views];
        let listTags = [];
        if (tags.length > 0) {
            listTags = tags.map((tag, index) => {
                let path = `/search/${tag.raw}`;
                return (
                    <Link key={index} to={path}>
                        <span className="badge badge-secondary">{tag.raw}</span>
                    </Link>
                )
            });
        }
        return (
            <div>
                <div className="jumbotron">
                    <div className="container text-center">
                        <img src={image.url} alt={title} />
                    </div>
                    <div className="container-fluid bg-3 text-center">
                        <div className="row">
                            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                <h3><b>{ownername}</b></h3>
                                <h4>{title}</h4>
                                <i>
                                    <h6>views: {views}</h6>
                                </i>
                            </div>
                            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                <h3><b>Tags:</b></h3>
                                <p>
                                    {listTags}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Photo;