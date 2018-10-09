import axios from 'axios';

const key = '89e7ce40a0d330e3d2bde82db1dc5363';
const getTag = (key,tag,page) => axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${key}&tags=${tag}&sort=relevance&extras=owner_name%2Curl_m%2C+views&per_page=20&page=${page}&format=json&nojsoncallback=1`);
export default {getTag,key}