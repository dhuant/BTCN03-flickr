import axios from 'axios';
const key = '89e7ce40a0d330e3d2bde82db1dc5363';

const getSize = (key, id) => axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=${key}&photo_id=${id}&format=json&nojsoncallback=1`);
export default {getSize,key};