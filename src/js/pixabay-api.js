import axios from 'axios';

const API_KEY = '52315817-6546dbd007993710b423406a2';

export async function getImagesByQuery(query, page = 1) {
  const { data } = await axios('https://pixabay.com/api/', {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 15,
      page,
    },
  });
  return data;
}
