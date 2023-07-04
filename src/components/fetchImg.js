import axios from 'axios';

export const fetchImages = async (searchValue, page) => {
    try {
        const searchParams = new URLSearchParams({
            key: '35098687-e9db65cd1d1af185f37419a74',
            q: searchValue,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: 'true',
            per_page: 12,
            page,
        });
        const images = await axios.get(`https://pixabay.com/api/?${searchParams}`);
        return images.data;
    } catch (error) {
     console.log(error);
   }
}