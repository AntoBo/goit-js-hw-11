import './sass/main.scss';
import axios from 'axios';

const options = {
  params: {
    key: '26342671-26c26899736dd731f47ba4106',
    q: 'cat',
    per_page: 5,
  },
};
axios.defaults.baseURL = 'https://pixabay.com/api/';

axios
  .get('', options)
  .then(r => console.log(r.data))
  .catch(err => console.log('error: ', err));
