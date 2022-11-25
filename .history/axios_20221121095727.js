import axios from "axios";
let token = localStorage.getItem('Token')
axios.defaults.baseURL = 'https://shope-b3.thaihm.site/api';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export default axios