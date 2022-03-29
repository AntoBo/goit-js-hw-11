import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export default async function getPictures(query) {
  const options = {
    params: {
      key: '26342671-26c26899736dd731f47ba4106',
      q: query,
      per_page: 5,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    },
  };

  try {
    const response = await axios.get('', options);
    const data = response.data;
    console.log('data fetched');
    // console.log(data);
    return data;
  } catch (error) {
    console.error('caugth in fetch.js, ', error);
    return;
  }
}
