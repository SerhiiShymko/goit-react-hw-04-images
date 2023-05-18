import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import getImages from '../../services/api';
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Button from 'components/Button/Button';
import Spiner from 'components/Loader/Loader';
import Modal from 'components/Modal/Modal';

import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export default function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [alt, setAlt] = useState(null);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [totalHits, setTotalHits] = useState(null);

  useEffect(() => {
    if (query !== '') {
      setStatus('pending');

      const fetchImages = async () => {
        try {
          const imageData = await getImages(query, page);
          setTotalHits(imageData.total);
          const imagesHits = imageData.hits;
          if (!imagesHits.length) {
            toast.warning(
              'No results were found for your search, please try something else.'
            );
          }
          setImages(
            prevImages => [...prevImages, ...imagesHits],
            setStatus('resolved')
          );

          if (page > 1) {
            const CARD_HEIGHT = 300;
            window.scrollBy({
              top: CARD_HEIGHT * 2,
              behavior: 'smooth',
            });
          }
        } catch (error) {
          setError(error);
          setStatus('rejected');
          toast.error(`Sorry something went wrong. ${error.message}`);
        }
      };
      fetchImages();
    }
  }, [query, page]);

  const handleFormSubmit = query => {
    resetState();
    setQuery(query);
  };

  const handleSelectedImage = (largeImageUrl, tags) => {
    setSelectedImage(largeImageUrl);
    setAlt(tags);
  };

  const resetState = () => {
    setQuery('');
    setPage(1);
    setImages([]);
    setSelectedImage(null);
    setAlt(null);
    setStatus('idle');
    setError(null);
    setTotalHits(null);
  };

  const loadMore = () => setPage(prevPage => prevPage + 1);

  const closeModal = () => setSelectedImage(null);

  return (
    <>
      <Searchbar onSubmit={handleFormSubmit} />
      <ToastContainer autoClose={3000} theme="colored" pauseOnHover />
      {status === 'pending' && <Spiner />}
      {error && (
        <h1 style={{ color: 'orangered', textAlign: 'center' }}>
          {error.message}
        </h1>
      )}
      {images.length > 0 && (
        <ImageGallery images={images} selectedImage={handleSelectedImage} />
      )}
      {images.length > 0 && images.length !== totalHits && (
        <Button onClick={loadMore} />
      )}
      {selectedImage && (
        <Modal selectedImage={selectedImage} tags={alt} onClose={closeModal} />
      )}
    </>
  );
}
