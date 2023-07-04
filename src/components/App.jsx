import { useState, useEffect } from 'react';
import Notiflix from 'notiflix';

import { fetchImages } from './fetchImg';
import Container from './Container/Container';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';

function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (query !== '') {
      getImages(query, page);
    }
  }, [page, query]);

  const getImages = async (query, page) => {
    try {
      setIsLoading(true);
      const data = await fetchImages(query, page);

      if (data.hits.length === 0) {
        return Notiflix.Notify.failure(
          'Sorry, there are no images for your search query. Please try again.'
        );
      }
      setTotal(data.totalHits);
        setImages(prev => [...prev, ...data.hits]);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = query => {
    setQuery(query);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

    const totalPage = total / images.length;
    return (
      <Container>
        <Searchbar onSubmit={handleSubmit} />
        {isLoading && <Loader />}
        {images.length !== 0 && <ImageGallery images={images} />}
        {totalPage > 1 && !isLoading && images.length !== 0 && (
          <Button onClick={handleLoadMore} />
        )}
        {error && <p>Sorry, something went wrong. Please try again.</p>}
      </Container>
    );
  }


export default App;


// npm i notiflix
// npm install axios
// npm install react-loader-spinner --save

