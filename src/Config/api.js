import axios from 'axios';

const key = '89e7ce40a0d330e3d2bde82db1dc5363';
const getList = (key,page) => axios.get(`https://api.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=${key}&extras=owner_name%2Curl_m%2C+views&per_page=20&page=${page}&format=json&nojsoncallback=1`);
export default {getList,key};



