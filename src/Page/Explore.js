import React, { Component } from 'react';
//import Data from '../data';
import Image from '../Component/Image';
import justifiedLayout from 'justified-layout';
import api from '../Config/api';

class Explore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listImages: [],
            nextPage: 1,
            geometry: null,
            loadingState: false,
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.onScroll);
        this.getListImages();
    }
    onScroll = () => {
        var scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
        var scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
        var clientHeight = document.documentElement.clientHeight || window.innerHeight;
        var scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

        if (scrolledToBottom) {
            this.loadMoreImage();
        }
    }
    loadMoreImage = () => {
        this.setState({
            loadingState: true,
        });
        this.getListImages();
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll);
    }
    async getListImages() {
        const res = await api.getList(api.key, this.state.nextPage);
        const data = await res.data;
        this.setState({
            listImages: [...this.state.listImages, ...data.photos.photo],
            nextPage: this.state.nextPage + 1 < data.photos.pages ? this.state.nextPage + 1 : false,
            geometry: justifiedLayout(this.createLayout([...this.state.listImages, ...data.photos.photo]), {
                containerWidth: 1060,
                "containerHeight": 1269,
                "widowCount": 0,
                containerPadding: {
                    top: 10,
                    right: 20,
                    bottom: 50,
                    left: 50
                },
                boxSpacing: {
                    horizontal: 10,
                    vertical: 20
                }
            }),
            loadingState: false,
        });

    }
    createLayout = (image) => {
        return image.map((img) => {
            return { width: parseInt(img.width_m, 10), height: parseInt(img.height_m, 10) }
        });
    }
    render() {
        let listimages = this.state.listImages;
        let imgs = listimages.map((img, index) => {
            return (
                <Image
                    key={index}
                    id ={img.id}
                    style={this.state.geometry.boxes[index]}
                    title={img.title}
                    src={img.url_m}
                    ownername={img.ownername}
                    views={img.views}
                />
            )
        });
        return (
            <div className="container">
                <div className="main fluid-centered">
                    <div className="view photo-list-view" style={this.state.gometry }>
                        {imgs}
                    </div>
                </div>
            </div>
        );
    }
}


export default Explore;
