import React, { Component } from 'react';
import api from '../Config/apiTag';
import justifiedLayout from 'justified-layout';
import Image from '../Component/Image';


class SearchTag extends Component {
    constructor(props){
        super(props);
        this.state = {
            listImages: [],
            tag: '',
            geometry: null,
            loadingState: false,
            nextPage: 1,
        }
    }
    componentDidMount(){
        window.addEventListener('scroll', this.onScroll);
        this.getImageByTag(this.props.match.params.tag);
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            listImages: [],
            tag: '',
            geometry: null,
            loadingState: false,
            nextPage: 1,
        })
        this.getImageByTag(nextProps.match.params.tag);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll);
    }
    async getImageByTag (tag){
        const res = await api.getTag(api.key,tag,this.state.nextPage)
        const data = await res.data;
        this.setState({
            listImages: [...this.state.listImages, ...data.photos.photo],
            nextPage: this.state.nextPage + 1 < data.photos.pages ? this.state.nextPage + 1 : false,
            geometry: justifiedLayout(this.createLayout([...this.state.listImages, ...data.photos.photo]), {
                containerWidth: 1087,
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
            tag: '',
            loadingState: false,
        });
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
        this.getImageByTag(this.props.match.params.tag);
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
                <h3>
                    <b><i> Images for "{this.props.match.params.tag}"</i></b>
                </h3>
                    <div className="view photo-list-view" style={this.state.gometry}>
                        {imgs}
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchTag;