import axios from 'axios';

// const KEY = '39848189-0324458e2c4d1f52aa76f9617';

// axios.defaults.baseURL = 'https://pixabay.com/api/';

// export const fetchImages = () => {
//   return axios
//     .get(
//       `?q=cat&page=1&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
//     )
//     .then(response => console.log(response.data));
// };



export async function fetchImages(searchData, page) {
  const searchParams = new URLSearchParams({
    key: '39848189-0324458e2c4d1f52aa76f9617',
    q: searchData,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: 12,
    page,
  });
  const images = await axios.get(`https://pixabay.com/api/?${searchParams}`);
  return images.data;
}

fetchImages();
